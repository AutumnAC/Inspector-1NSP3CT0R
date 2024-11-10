# Inspector-1NSP3CT0R
Point-and-click visual novel developed in JavaScript.

## Synopsis
In this point-and-click visual novel, find clues and use all your deductive reasoning skills to solve the mystery of the missing tablet alongside Inspector 1NSP3CT0R, legendary robot detective!

## Current Status
The game is fully functional; currently needs quality-of-life features and other touches to polish the gameplay experience.

## Future Goals
- Add a text blip effect where the text appears letter-by-letter
- Add more quality-of-life features like text history
- Improve the technical architecture to make creating future installments in the franchise easier
- Improve the art

## Process
Originally, this was a class project, so I had to come up with an idea that could reasonably be finished within three weeks (the time span for the project), that I would be passionate about (since I would be working on this project for three weeks, I wanted to make sure it was something I loved), and met all the project requirements. Thankfully, the requirements for the project were thankfully simple -- it simply had to be an interactive experience that made use of PIXI.js and at least one ES6 class -- so I really just had to worry about the first two concerns. After brainstorming, I ultimately settled on making a game in one of my favorite genres, the visual novel mystery. Once I'd decided on that, it just took a few brainstorming sessions to come up with the idea of Inspector 1NSP3CT0R and flesh out the story, and it was off to coding.
When I first started coding, I mostly just threw together a hodge-podge of concepts to prove to myself that I could get
something working -- experimenting with the basic technical architecture (including the required ES6 class), the displaying of dialogue, the switch between
clicking on objects and reading the dialogue. As I did so, I created art for the project when needed.
Once I had the setup for the game ready, I started actually implementing the game properly, filling out any missing
pieces of the story and the gameplay. I continued tweaking and polishing until the due date, where I submitted the project.
Once I'd submitted it, though, I wasn't satisfied. I really loved this little project, and while I did my best with the three weeks I had, I felt I could make it a lot better with more time, and possibly even continue Inspector 1NSP3CT0R's story with more games. So, I decided to turn Inspector 1NSP3CT0R into a personal project and continue improving it.
One thing I do regret about what I did during the original three weeks I had for the project is that I was heavily focused on getting stuff to work as soon as possible, and thought a lot less of the future and how efficiently the technical architecture might work going forward. So now, in addition to focusing on adding more quality-of-life features and polish to the game, I'm also working on the technical architecture to make it easier to work with.

## Technical Architecture and Classes

### Overview
Most of the game's code is handled in main.js, with each "scene," or gameplay section, functioning as its own unique method that's called at the end of the method immediately preceding it once the end conditions are met (all the dialogue being read, the user clicking on an answer, etc).
This is one of the main things I intend to improve; I hope to make scenes more modular, probably a class of their own, so that it's easier to create, add, and modify scenes without having to carefully pick through all the code in main.js.

### ClickableObject
ClickableObject inherits from PIXI.Sprite.  It handles displaying dialogue based on user interaction (usually when clicked, hence the name, though due to a quirk of the way I set up the code initially, some ClickableObjects have no sprites and function as containers for dialogue that's activated by means other than clicking -- this is one of the issues I intend to fix.)

### Dialogue
Each dialogue object holds a line of dialogue, and the name and sprite of the character speaking. When its display() function is called, it puts the information in the appropriate places in the DOM and PIXI canvas.

## Sources
- Sound effects generated by [Jsfxr](href=https://sfxr.me)
- Textbox font: [Concert One](https://fonts.google.com/specimen/Concert+One?subset=latin), Johan Kallas, Mihkel Virkus, Google Fonts
- Title font: [Nova Square](https://fonts.google.com/specimen/Nova+Square?subset=latin), Wojciech Kalinowski, Google Fonts
- Code to make PIXI.js objects clickable: [Dower Chin, Pixi.js: Pointer Events Part 1](https://www.youtube.com/watch?v=4MR2D41KQ1E)
- Code to prevent PIXI.js objects underneath another object from being clicked on: [Ninjadoodle, html5gamedevs.com](https://www.html5gamedevs.com/topic/10182-propagationdisabling-clicks-on-objects-underneath-others/)

## About the Developer
I'm Autumn Conway, a third-year Game Design and Development student. I have a penchant for the straightforward (or sometimes not-so-straightforward) logic of programming, and a passion for storytelling through games.
