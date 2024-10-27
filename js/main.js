"use strict";

// Only run once the window has loaded
window.onload = loadGame;

// The PIXI application
let app;

// The application width and height
let sceneWidth;
let sceneHeight;

// Scenes
let titleScene;
let crimeScene;
let logicScene;

// Title screen display
let titleSceneContainer;

// The inspector's arm
let culprit1NSP3CT0R;

// The number of wrong answers
let wrongAnswers = 0;

// The wrong answers display
let wrongAnswersDisplay;

// The sounds
let dialogueSound;
let dialogueBlipSound;
let wrongSound;
let rightSound;

// The arrays of dialogue
let dialogueOpening;
let dialogueTable;
let dialogueFirstMate;
let dialogueJanitor;
let dialogueEndInvestigation;
let dialogueEvidenceChosen;
let dialogueEnd;

// The sprite of the character currently speaking
let speakingCharacter;

// The button to advance dialogue
let nextButton;

// The textbox text and character name
let nameDisplay;
let textDisplay;

// Creates the canvas, sprite images, and sounds
function loadGame() {
    // Load the sounds
    dialogueSound = new Howl({
		src: ['media/sounds/dialogueAdvance.wav']
	});

    dialogueBlipSound = new Howl({
		src: ['media/sounds/dialogueBlipSound.wav']
	});

    wrongSound = new Howl({
		src: ['media/sounds/wrongSound.wav']
	});

    rightSound = new Howl({
		src: ['media/sounds/rightSound.wav']
	});

    // Create the canvas
    app = new PIXI.Application({
        width: 800,
        height: 500,
    });
    document.body.appendChild(app.view);

    app.renderer.backgroundColor = 0xa1abc9;

    // Add the images
    app.loader.add([
        "media/images/background.png",
        "media/images/1NSP3CT0R.png",
        "media/images/Captain.png",
        "media/images/First Mate.png",
        "media/images/Janitor.png",
        "media/images/first-mate-object.png",
        "media/images/janitor-object.png",
        "media/images/table.png",
        "media/images/captain-culprit.png",
        "media/images/first-mate-culprit.png",
        "media/images/janitor-culprit.png",
        "media/images/inspector-culprit.png",
    ]);
    app.loader.onComplete.add(setup);
    app.loader.load();
}

// Does any remaining setup not handled by loadGame
function setup() {
    // Set the width and height constants equal to the scene width and height
    sceneWidth = app.view.width;
    sceneHeight = app.view.height;

    // Prevent double-clicking selection issues
    app.view.onselectstart = function() { return false; }

    // Create the title scene
    titleScene = new PIXI.Container();
	app.stage.addChild(titleScene);

    // Create the crime scene -- let z-index values work on it
    crimeScene = new PIXI.Container();
    crimeScene.sortableChildren = true;
	app.stage.addChild(crimeScene);

    // Create the logic scene
    logicScene = new PIXI.Container();
	app.stage.addChild(logicScene);

    // Start the game
    runTitleScene();
}

// Sets up and runs the title scene
function runTitleScene() {

    // Make the title scene visible
	logicScene.visible = false;
	crimeScene.visible = false;
    titleScene.visible = true;

    // Create the title screen HTML
    titleSceneContainer = document.createElement("div");
    titleSceneContainer.className = "canvas-size-container";
    titleSceneContainer.id = "title-screen-container";
    let titleSceneContainerInnerHTML = "<h1>Inspector 1NSP3CT0R:<br>Robot Detective</h1>"
    titleSceneContainer.innerHTML = titleSceneContainerInnerHTML;
    
    // Create the start button
    let startButton = document.createElement("button");
    startButton.type = "button";
    startButton.id = "start-button";
    startButton.innerHTML = "Begin Mystery";
    startButton.onclick = startGame;
    titleSceneContainer.appendChild(startButton);

    // Add the title screen elements to the document
    document.body.appendChild(titleSceneContainer);

    // Create the textbox
    let textBox = document.createElement("div");
    textBox.id = "dialogue-box";
    textBox.style.width = `${sceneWidth}px`;
    document.body.appendChild(textBox);
        
    // Create 1NSP3CT0R's sprite and add it to the scene
    speakingCharacter = new PIXI.Sprite(app.loader.resources["media/images/1NSP3CT0R.png"].texture);
    speakingCharacter.x = 250;
    speakingCharacter.y = 150;
    speakingCharacter.zIndex = 2;
    titleScene.addChild(speakingCharacter);

    // Starts the game
    function startGame() {

        // Remove the title screen HTML from the screen
        document.body.removeChild(titleSceneContainer);

        // Play a sound
        rightSound.play();

        // Begin the game
        runCrimeScene1();    
    }
}

// Runs the first segment of the crime scene part of the game
function runCrimeScene1() {
    
    // Make the title scene invisible and the crime scene visible
    titleScene.visible = false;
	crimeScene.visible = true;

    // Set up the inner html of the textbox
    let textBoxInnerHTML = "<button type='button' id='next-button'>>>></button><h3 id='character-name'></h3><p id='dialogue'></p>"
    document.querySelector("#dialogue-box").innerHTML = textBoxInnerHTML;
        
    // Get references to the textbox elements and the button
    nameDisplay = document.querySelector("#character-name");
    textDisplay = document.querySelector("#dialogue");
    nextButton = document.querySelector("#next-button");

    // Add the speaking character to the scene
    crimeScene.addChild(speakingCharacter);

    // Create a list to hold all the clickable objects with dialogue in the scene
    let sceneObjects = [];

    // Create the background
    let backgroundImage = new PIXI.Sprite(app.loader.resources["media/images/background.png"].texture);
    backgroundImage.zIndex = -1;
    crimeScene.addChild(backgroundImage);

    // Create all the dialogue
    createDialogue();

    // Create the table
    let table = new ClickableObject(dialogueTable, 20, 290, app.loader.resources["media/images/table.png"].texture);
    crimeScene.addChild(table);
    sceneObjects.push(table);

    // Create the first mate
    let firstMate = new ClickableObject(dialogueFirstMate, 220, 100, app.loader.resources["media/images/first-mate-object.png"].texture);
    crimeScene.addChild(firstMate);
    sceneObjects.push(firstMate);

    // Create the janitor
    let janitor = new ClickableObject(dialogueJanitor, 600, 80, app.loader.resources["media/images/janitor-object.png"].texture);
    crimeScene.addChild(janitor);
    sceneObjects.push(janitor);

    // Create a new clickable object with no texture to hold the end-of-scene dialogue
    let endInvestigation = new ClickableObject(dialogueEndInvestigation, 0, 0, null);
    
    // Add the scene-ending check to the ticker
    app.ticker.add(endScene);

    // Start the dialogue
    let openingDialogue = new ClickableObject(dialogueOpening, 0, 0, null);
    openingDialogue.initiateDialogue(nextButton);

    // Checks if the scene should end and, if so, will end the scene
    function endScene () {

        // Variable holding the amount of dialogue read
        let readDialogue = 0;

        // Loop through all the dialogue in the scene
        for (let dialogue of sceneObjects) {

            // If the dialogue is read, add to the list
            if (dialogue.read) {
                readDialogue++;
            }
        }

        // If all the dialogue in the scene has been read
        if (readDialogue >= sceneObjects.length) {

            // Remove this method from the ticker
            app.ticker.remove(endScene);

            // Initiate the last piece of dialogue
            endInvestigation.initiateDialogue(nextButton);

            // Add the method that moves on to the next scene to the ticker
            app.ticker.add(nextScene);
        }
    }

    // Starts the next scene
    function nextScene() {

        // If the final bit of dialogue has been read
        if (endInvestigation.read) {

            // Remove this method from the ticker
            app.ticker.remove(nextScene);

            // Run the next scene
            runLogicScene();
        }
    }
}

// Runs the first logic scene.
function runLogicScene() {

    // Make the crime scene invisible and the logic scene visible
	crimeScene.visible = false;
    logicScene.visible = true;

    // Set up the number of correct button selections and total button selections
    let correctSelections = 0;
    let totalSelections = 0;

    // Create a display for the user's wrong answers so far
    wrongAnswersDisplay = new PIXI.Text(`Wrong answers: ${wrongAnswers}`);
	wrongAnswersDisplay.style = new PIXI.TextStyle({
		fill: 0x000000,
		fontSize: 40,
		fontFamily: "'Concert One', sans-serif",
	});
	wrongAnswersDisplay.x = 250;
	wrongAnswersDisplay.y = 10;
	logicScene.addChild(wrongAnswersDisplay);

    // Create a container to hold the buttons
    let evidenceButtonContainer = document.createElement("div");
    evidenceButtonContainer.className = "canvas-size-container";
    document.body.appendChild(evidenceButtonContainer);

    // Add the buttons to the scene
    makeEvidenceButton("The dusty table", true);
    makeEvidenceButton("The janitor's nervousness", false);
    makeEvidenceButton("The wet hands of the captain, first mate, and janitor", true);
    makeEvidenceButton('The first mate calling 1NSP3CT0R "Inspector"', false);

    // Add 1NSP3CT0R's arm to the scene
    culprit1NSP3CT0R = new ClickableObject([], 600, 400, app.loader.resources["media/images/inspector-culprit.png"].texture);
    logicScene.addChild(culprit1NSP3CT0R);

    // Creates the buttons for the player to click on when selecting evidence
    function makeEvidenceButton(buttonText, isCorrect) {

        // Create the button
        let newButton = document.createElement("button");
        newButton.type = "button";
        newButton.className = "evidence-button";

        // The button needs data for whether or not it's selected
        newButton.dataset.selected = "false";

        // It also needs data for whether or not it's correct
        newButton.dataset.isCorrect = isCorrect;

        // Set its text to the passed-in text
        newButton.innerHTML = buttonText;

        // Attach its onclick listener to checkCorrectButtons()
        newButton.onclick = checkCorrectButtons;

        // Add the button to the button container
        evidenceButtonContainer.appendChild(newButton);
    }

    // Handles everything that should happen if a button is pressed
    function checkCorrectButtons() {

        // If the button isn't selected
        if (this.dataset.selected == "false") {

            // Make it selected
            this.dataset.selected = "true";

            // Add to the number of total answers
            totalSelections++;

            // If the button is one of the correct ones
            if (this.dataset.isCorrect == "true") {

                // Add to the number of correct answeres
                correctSelections++;
            }

            // If there are now two answers
            if (totalSelections == 2) {

                // If there are two correct answers
                if (correctSelections == 2) {

                    // Play the right answer sound
                    rightSound.play();

                    // Remove the button container
                    document.body.removeChild(evidenceButtonContainer);

                    // Run the next scene
                    runCrimeScene2();
                }

                // Otherwise, the answer is wrong
                else {
                    // Play an error noise
                    wrongSound.play();

                    // Add to the number of wrong answers
                    wrongAnswers++;

                    // Update the wrong answer text
                    wrongAnswersDisplay.text = `Wrong answers: ${wrongAnswers}`;

                    // Reset the total and correct answers
                    totalSelections = 0;
                    correctSelections = 0;

                    // Deselect all the buttons
                    for (let button of document.querySelectorAll(".evidence-button")) {
                        button.dataset.selected = "false";
                    }
                }
            }
        }

        // If the button was already selected
        else {

            // Deselect it
            this.dataset.selected = "false";

            totalSelections--;

            // If the button was correct, decrease the number of correct answers
            if (this.dataset.isCorrect = "true") {
                correctSelections--;
            }
        }
    }
}

// Runs the second round of the crime scene
function runCrimeScene2() {
    // Switch the visibility of the two scenes
	logicScene.visible = false;
	crimeScene.visible = true;

    // Start the dialogue
    let evidenceChosen = new ClickableObject(dialogueEvidenceChosen);
    evidenceChosen.initiateDialogue(nextButton);

    // Add the nextScene function to the ticker
    app.ticker.add(nextScene);

    // Checks if all the dialogue has been read before moving on
    function nextScene() {

        // If all the dialogue has been read
        if (evidenceChosen.read) {

            // Remove this method from the ticker
            app.ticker.remove(nextScene);

            // Run the next scene
            runLogicScene2();
        }
    }
}

// Runs the final deduction sequence
function runLogicScene2() {

    // Swap the visibility of the scenes
	crimeScene.visible = false;
    logicScene.visible = true;

    // Make clicking on the inspector run the correct answer method
	culprit1NSP3CT0R.on("pointerup", correctAnswer);

    // Add the incorrect culprits to the scene
    let culpritCaptain = new ClickableObject([], 35, 80, app.loader.resources["media/images/captain-culprit.png"].texture);
	culpritCaptain.on("pointerup", wrongAnswer); // make clicking on the incorrect culprit options run the wrong answer method
    logicScene.addChild(culpritCaptain);

    let culpritFirstMate = new ClickableObject([], 293, 80, app.loader.resources["media/images/first-mate-culprit.png"].texture);
	culpritFirstMate.on("pointerup", wrongAnswer);
    logicScene.addChild(culpritFirstMate);

    let culpritJanitor = new ClickableObject([], 550, 80, app.loader.resources["media/images/janitor-culprit.png"].texture);
	culpritJanitor.on("pointerup", wrongAnswer);
    logicScene.addChild(culpritJanitor);

    // Runs the next scene if the player selects the correct answer
    function correctAnswer() {

        // Play the right answer sound
        rightSound.play();

        // Clear the scene for the next use of it
        logicScene.removeChild(culprit1NSP3CT0R);
        logicScene.removeChild(culpritCaptain);
        logicScene.removeChild(culpritFirstMate);
        logicScene.removeChild(culpritJanitor);

        // Run the next scene
        runCrimeScene3();
    }

    // Lets the user know they chose a wrong answer
    function wrongAnswer() {

        // Add to the number of wrong answers
        wrongAnswers++;

        // Play a sound
        wrongSound.play();

        // Update the wrong answers text
        wrongAnswersDisplay.text = `Wrong answers: ${wrongAnswers}`;
    }
}

// Runs the next part of the story
function runCrimeScene3() {

    // Switch the scenes' visibility
	logicScene.visible = false;
	crimeScene.visible = true;

    // Start the dialogue
    let end = new ClickableObject(dialogueEnd);
    end.initiateDialogue(nextButton);

    // Add checking for the next scene to the ticker
    app.ticker.add(nextScene);

    // Checks if the next scene should be run
    function nextScene() {

        // If all the dialogue has been read
        if (end.read) {

            // Remove this method from the ticker
            app.ticker.remove(nextScene);

            // Run the final scene
            runFinalScene();
        }
    }    
}

// Run the ending sequence of the game
function runFinalScene() {
    // Change the visibility of the scenes
    crimeScene.visible = false;
    titleScene.visible = true;

    // Add the speaking character back into the scene and move it down slightly
    titleScene.addChild(speakingCharacter);
    speakingCharacter.y = 200;

    // Get references to the textbox elements
    let nameDisplay = document.querySelector("#character-name");
    let textDisplay = document.querySelector("#dialogue");    

    // Add the title screen back in
    document.body.appendChild(titleSceneContainer);

    // Get rid of the start button
    titleSceneContainer.removeChild(document.querySelector("#start-button"));

    // Get a reference to the heading
    let titleScreenHeading = document.querySelector("#title-screen-container > h1");
    titleScreenHeading.style.fontFamily = "'Concert One', sans-serif";
    titleScreenHeading.style.fontSize = "2rem";

    // Create the variable to display the last piece of dialogue
    let lastDialogue;

    // Check the number of wrong answers, and display a message accordingly
    if (wrongAnswers == 0) {
        titleScreenHeading.innerHTML = "Congratulations, you've reached the end! And with 0 wrong answers to boot!";

        lastDialogue = new Dialogue("1NSP3CT0R",
            "I'm quite impressed... though your deductive capabilities are still no match for my own, of course.");
    }
    else if (wrongAnswers > 0 && wrongAnswers <= 3) {
        titleScreenHeading.innerHTML = `Congratulations, you've reached the end! And with only ${wrongAnswers} wrong answer(s), too.`

        lastDialogue = new Dialogue("1NSP3CT0R",
            "Good work, I suppose. But I think you could have done better, don't you agree?");
    }
    else {
        titleScreenHeading.innerHTML = `Congratulations, you've reached the end! Though you guessed wrongly ${wrongAnswers} times...`

        lastDialogue = new Dialogue("1NSP3CT0R",
            "At least you figured it out eventually.");
    }

    // Display the last dialogue
    lastDialogue.display();
}