"use strict";

// Class to hold assorted variables that multiple functions in main need access to
class Manager {
}

// Class for clickable objects
class ClickableObject extends PIXI.Sprite {

    // Constructor
    constructor(dialogueList, x, y, texture) {
        // Pass in a texture to its parent constructor
        super(texture);

        // Set up the other variables passed in from the constructor
        this.dialogueList = dialogueList;
        this.x = x;
        this.y = y;

        // Initalize the other values
        this.currentDialogue = 0;
        this.read = false;
        this.grayFilter = null;

        // Give it an appropriate z index so it's behind everything besides the background
        this.zIndex = -1;

        // Make it interactive
        this.interactive = true;
        this.buttonMode = true; 
        
        this.dialogueFunction = this.displayNextDialogue;

        // As long as the dialogueList exists
        if (this.dialogueList.length != 0 && this.dialogueList != null) {

            // The object should start displaying dialogue when it's clicked on
            this.on("pointerup", this.initiateDialogue);

        }
        // If the list doesn't exist, don't do anything -- let main.js give the clickable object custom behavior

        // Set up the event listeners
        this.on("pointerover", e => e.target.alpha = 0.7);
        this.on("pointerout", e => e.currentTarget.alpha = 1.0);
    }

    // Lets the dialogue begin
    initiateDialogue = () => {

        // Set the onclick to display the next line of dialogue
        nextButton.onclick = this.displayNextDialogue;

        // Enable the button
        nextButton.disabled = false;

        // Create the background filter
        this.grayFilter = new PIXI.Graphics();
        this.grayFilter.beginFill(0x333333);
        this.grayFilter.drawRect(0, 0, sceneWidth, sceneHeight);
        this.grayFilter.endFill();
        this.grayFilter.zIndex = 1;
        this.grayFilter.alpha = .75;
        this.grayFilter.interactive = true;
        this.grayFilter.on("pointerup", () => { /* Do nothing */ });
        crimeScene.addChild(this.grayFilter);
        crimeScene.addChild(speakingCharacter);

        // Start displaying the dialogue
        this.displayNextDialogue();
    }

    // Runs the next line of text in the array of dialogue
    displayNextDialogue = () => {
        // Run the display function on the current dialogue
        this.dialogueList[this.currentDialogue].display();

        // If we've only just started the dialogue
        if (this.currentDialogue == 0) {

            // Add to the current dialogue
            this.currentDialogue++;

            // Make the object no longer interactive
            this.interactive = false;
            this.buttonMode = false;

            // Make sure it's fully visible
            this.alpha = 1.0;
        }

        // As long as we haven't reached the end of the list of dialogue
        else if (this.currentDialogue < this.dialogueList.length - 1) {

            // Add to the current dialogue
            this.currentDialogue++;

            // Play a sound
            dialogueSound.play();
        }

        // If we have reached the end
        else {
            // Reset the current dialogue to zero
            this.currentDialogue = 0;

            // Remove the gray background
            crimeScene.removeChild(this.grayFilter);

            crimeScene.removeChild(speakingCharacter);

            // Set the dialogue to read
            this.read = true;

            // Remove the button -- do nothing
            nextButton.onclick = () => ({ /* Do nothing */ });

            // Disable the button
            nextButton.disabled = true;
        }
    }
}

// Class for holding dialogue information
class Dialogue {

    // Constructor
    constructor(characterName, text, dialogueFunction) {

        // Set the values passed in to the class fields
        this.characterName = characterName;
        this.text = text;

        this.dialogueFunction = dialogueFunction;
    }

    // Displays the character name and the dialogue
    display = () => {
        // Set the character name in the HTML to the character name
        nameDisplay.innerHTML = this.characterName;

        // Make the text display blank
        textDisplay.innerHTML = "";

        // Set the speaking character's texture to the texture of the character given in character's texture
        speakingCharacter.texture = app.loader.resources[`media/images/${this.characterName}.png`].texture;

        // Create an LCV of sorts
        let currentCharacter = 0;

        // Reassign the job of the next button
        //const eventListeners = nextButton.getEventListeners();
        //nextButton.onclick = () => displayAllText(this.text);
        
        // Make the text display character-by-character
        const intervalID = setInterval(() => animateText(this.text), 35);

        nextButton.addEventListener("click", () => displayAllText(this.text));

        function displayAllText (text){
            //nextButton.onclick = this.dialogueFunction;
            clearInterval(intervalID);
            //textDisplay.innerHTML = text;
        };

        // Displays the text, one character at a time
        function animateText(text)
        {
            
            // Add the next character to the display
            textDisplay.innerHTML += text[currentCharacter];

            // Play a sound
            dialogueBlipSound.play();

            // Add one to the current character
            currentCharacter++;

            // If the current character is past the end of the array
            if (currentCharacter === text.length)
            {
                // Clear the interval -- stop displaying the text
                clearInterval(intervalID);
            }
        }

        //textDisplay.innerHTML = this.text;
    }
}