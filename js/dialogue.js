// Creates arrays holding all the dialogue for the game.
function createDialogue() {

    // Set the default dialogue for when all dialogue has run its course
    const defaultDialogue = new Dialogue("1NSP3CT0R", "Hmm... I think there's still more I need to investigate.");

    // Create the opening dialogue
    dialogueOpening = [
        new Dialogue("Captain", "Ah, 1NSP3CT0R, you're finally here."),
        new Dialogue("1NSP3CT0R", "I've told you a hundred times to address me as Inspector. And I only took 3.248234903 minutes."),
        new Dialogue("Captain", "Which is 3.2-whatever-it-was minutes too long when valuable ship property is missing!"),
        new Dialogue("1NSP3CT0R", "Would you like me to have broken the laws of space-time in order to arrive faster?"),
        new Dialogue("Captain", "Just help me find my tablet, will you, 1NSP3CT0R?"),
        new Dialogue("1NSP3CT0R", "Not if you keep calling me by that ridiculous jumble of characters."),
        new Dialogue("Captain", "... Fine... Inspector."),
        new Dialogue("1NSP3CT0R", "Thank you. Now, please walk me through what happened."),
        new Dialogue("Captain", 'I first noticed my tablet was missing shortly after you left our debriefing meeting early out of "boredom." The only ones here--'),
        new Dialogue("1NSP3CT0R", "--were the janitor, your first mate, and yourself. I'm aware. Do get to the point before I nod off."),
        new Dialogue("Captain", "You're a robot. You don't--never mind. Anyway, only the two of them and I were here, and neither of them have left."),
        new Dialogue("1NSP3CT0R", "When did you last see the tablet? Are you confident it couldn't have gone missing any other time?"),
        new Dialogue("Captain", "Yes. Right before you came in I remember seeing it on the table. And no one came in or out during our meeting, so..."),
        new Dialogue("1NSP3CT0R", "So the culprit must have been the first mate or the janitor, you mean."),
        new Dialogue("Captain", "Obviously!"),
        new Dialogue("1NSP3CT0R", "I think there are other potential perpetrators you may have overlooked. Yourself, for instance.", ),
        new Dialogue("Captain", "Why would I steal my own tablet?!"),
        new Dialogue("1NSP3CT0R", "Time will tell, I suppose. For now, I shall investigate."),
        new Dialogue("1NSP3CT0R", "Hmm... I can click on any objects or persons of interest to interact with them and find out more information about them.")
    ];

    // Create the dialogue for the table
    dialogueTable = [
        new Dialogue("1NSP3CT0R", "Interesting. This table is quite dusty.", ),
        new Dialogue("Captain", "What of it?", ),
        new Dialogue("1NSP3CT0R", "Ah, not much. Just that I wonder if your tablet can really be so important, given how little you've evidently used it."),
        new Dialogue("Captain", "... If there's nothing of note here, let's move on."),
        defaultDialogue
    ];

    // Create the dialogue for the first mate
    dialogueFirstMate = [
        new Dialogue("1NSP3CT0R", "Good to see you again."),
        new Dialogue("First Mate", "Likewise, Inspector."),
        new Dialogue("1NSP3CT0R", "Did you commit this heinous crime?"),
        new Dialogue("First Mate", "Of course not!",),
        new Dialogue("1NSP3CT0R", "Excellent news. That certainly narrows down the list of suspects."),
        new Dialogue("Captain", "Did you pause to think that she might, perhaps, be lying?!"),
        new Dialogue("1NSP3CT0R", "Yes, of course."),
        new Dialogue("Captain", "And yet you're eliminating her from the list of suspects?"),
        new Dialogue("1NSP3CT0R", "Yes, of course."),
        new Dialogue("Captain", '... Is this just because she called you "Inspector"?'),
        new Dialogue("1NSP3CT0R", "Yes, of course."),
        new Dialogue("Captain", "Sometimes I don't know why I even bother keeping you around, 1NSP3CT0R."),
        new Dialogue("1NSP3CT0R", "And I don't know why I bother staying when you refuse to address me properly."),
        new Dialogue("1NSP3CT0R", "But no matter. Back to the matter at hand, questioning the innocent witness."),
        new Dialogue("1NSP3CT0R", "Ma'am, I notice your hands are wet. Why is this?"),
        new Dialogue("First Mate", "I was helping the janitor clean the windows. So was the captain, actually."),
        new Dialogue("1NSP3CT0R", "I did wonder why the captain's hands were wet. But cleaning the windows is not your job, is it?"),
        new Dialogue("First Mate", "No, but the janitor was overwhelmed, and we didn't have any pressing duties at the moment, so we decided we might as well help."),
        new Dialogue("1NSP3CT0R", "I see. Well, that was kind of you... unless it was actually for nefarious purposes."),
        new Dialogue("First Mate", "Ugh, I thought you were on my side here... Inspector, are we done?"),
        new Dialogue("1NSP3CT0R", "Yes, for now. Thank you."),
        defaultDialogue
    ];

    // Create the dialogue for the janitor
    dialogueJanitor = [
        new Dialogue("1NSP3CT0R", "Hello. You're the janitor, correct?"),
        new Dialogue("Janitor", "Yep, that's me. What do you need?"),
        new Dialogue("Captain", "Did you take my tablet?!"),
        new Dialogue("Janitor", "N-No, of course not!"),
        new Dialogue("Captain", "Then why do you look so nervous and guilty?!"),
        new Dialogue("1NSP3CT0R", "Calm yourself, Captain, most innocent people become distressed when accused of a crime, I've found."),
        new Dialogue("Captain", "And so do guilty people!"),
        new Dialogue("1NSP3CT0R", "So, in other words, the janitor's denial of guilt provides us with no new information. Do you mind if I ask an actually relevant question?"),
        new Dialogue("Captain", "Ugh, go ahead."),
        new Dialogue("1NSP3CT0R", "Mr... Janitor... I notice your hands are wet. Do I assume correctly that it's from cleaning the window?"),
        new Dialogue("Janitor", "Erm, yes. I'm pretty sure you saw all three of us cleaning before you came in for your meeting, in fact."),
        new Dialogue("1NSP3CT0R", "That's true. Excellent, thank you... That is all."),
        new Dialogue("1NSP3CT0R", "Hmm... the janitor isn't the only one here with wet hands. That might be significant, Captain."),
        new Dialogue("Captain", "How so?"),
        new Dialogue("1NSP3CT0R", "You'll see. When the time is right."),
        new Dialogue("Captain", "Ugh... if you don't know, you can just say so..."),
        defaultDialogue
    ];

    // Create the end-of-scene dialogue
    dialogueEndInvestigation = [
        new Dialogue("1NSP3CT0R", "Well, I think we've investigated everything we needed to. Shall I explain what I believe can be deduced from the crime scene?"),
        new Dialogue("Captain", "Oh please, you can't possibly have enough clues to solve this mystery already."),
        new Dialogue("1NSP3CT0R", "But I do! And to prove it, why don't we deduce the facts together, Captain?"),
        new Dialogue("Captain", "I beg your pardon?!"),
        new Dialogue("1NSP3CT0R", "Most of the information we've learned today is completely extraneous and, indeed, quite dull."),
        new Dialogue("1NSP3CT0R", "But there are, as we speak, two clues that, when put together, definitively clears almost all of the possible suspects of this heinous crime."),
        new Dialogue("Captain", `"Almost all?" That's a weird way of phrasing it when we only have two suspects.`),
        new Dialogue("1NSP3CT0R", "Oh, Captain, as I believe I told you at the beginning of this investigation, there are other potential perpetrators you have overlooked."),
        new Dialogue("1NSP3CT0R", "But all will become clear if you pause and think."),
        new Dialogue("1NSP3CT0R", "So, let us do so now. What two clues definitively prove multiple peoples' innocence in one fell swoop?")
    ];

    // Create the dialogue for halfway through the logic scene
    dialogueEvidenceChosen = [
        new Dialogue("1NSP3CT0R", "I assume my reasoning is obvious?"),
        new Dialogue("Captain", "...Not at all. What does the fact that my hands are wet have to do with the dusty table? Are you saying we should have cleaned the table as well?"),
        new Dialogue("1NSP3CT0R", "Of course you should have cleaned that table. It's disgusting. But that's not my point."),
        new Dialogue("Captain", "So what IS your point?"),
        new Dialogue("1NSP3CT0R", "Well, the table is covered in dust. But your hands are wet and dripping everywhere."),
        new Dialogue("1NSP3CT0R", "If you had taken the tablet, you would have left water everywhere you touched."),
        new Dialogue("Captain", "...I see..."),
        new Dialogue("1NSP3CT0R", "No, you don't. Shall I tell you who the culprit is?"),
        new Dialogue("Captain", "YES!"),
        new Dialogue("1NSP3CT0R", "Very well. Knowing what we do about the wet hands, the only possible culprit is...")
    ];

    // Create the dialogue for the ending
    dialogueEnd = [
        new Dialogue("1NSP3CT0R", "Yes indeed, the culprit was me all along!"),
        new Dialogue("1NSP3CT0R", "I'm rather insulted you all had to have so much help to figure it out."),
        new Dialogue("Captain", "..."),
        new Dialogue("First Mate", "..."),
        new Dialogue("Janitor", "..."),
        new Dialogue("1NSP3CT0R", "What? Is there something the matter with my reasoning?"),
        new Dialogue("Captain", "Why did you make us go through all that if you could have just confessed to the crime the moment I called you here?!?!"),
        new Dialogue("First Mate", "Also, why did you commit the crime in the first place?!"),
        new Dialogue("Captain", "Also, I still don't understand how you committed the crime."),
        new Dialogue("1NSP3CT0R", "What terribly dull questions. I'm almost insulted you have to ask them. But very well."),
        new Dialogue("1NSP3CT0R", "I'll answer your most foolish question first, Captain, as how I committed the crime is easy."),
        new Dialogue("1NSP3CT0R", "It should have been obvious to you the moment you were explaining the crime."),
        new Dialogue("1NSP3CT0R", "After all, when I asked you if you were confident your tablet was still there..."),
        new Dialogue("1NSP3CT0R", "...You answered that you had seen it during our meeting, and didn't mention seeing it after."),
        new Dialogue("1NSP3CT0R", "It never seemed to have occurred to you that it might have gone missing not after I'd left, but during."),
        new Dialogue("1NSP3CT0R", "I simply picked it up off the table when you weren't paying attention and tucked it under my hat. It's still there, by the way. I shall return it to you later."),
        new Dialogue("Captain", "Are you insane?!?! Why would you take my tablet?!"),
        new Dialogue("1NSP3CT0R", "Ah yes, the only reasonable question anyone has asked yet, and it wasn't even originally asked by you."),
        new Dialogue("1NSP3CT0R", "I was bored. I thought a little mystery might generate a bit of excitement. Besides, you never pay any attention to that tablet."),
        new Dialogue("1NSP3CT0R", "I was betting it would be a week before you noticed. But I forgot to account for the presence of the first mate."),
        new Dialogue("1NSP3CT0R", "She was the one who noticed, was she not?"),
        new Dialogue("Captain", "...Yes."),
        new Dialogue("1NSP3CT0R", "I thought as much."),
        new Dialogue("Captain", "And that painfully long investigation and reasoning? Why on earth did we have to suffer through that?"),
        new Dialogue("First Mate", "Oh! Is it because you wanted to test our detective skills..."),
        new Dialogue("First Mate", "...And subtly train us in the art of detection so that we will be better equipped to solve the problems we face in our everyday lives?"),
        new Dialogue("1NSP3CT0R", "What?! No, why would I ever want to do that? As I said earlier, I was just bored!"),
        new Dialogue("First Mate", "...Oh."),
        new Dialogue("1NSP3CT0R", "Does that answer all your questions?"),
        new Dialogue("Captain", "...After a fashion."),
        new Dialogue("1NSP3CT0R", "Excellent! Then that's a wrap on this mystery."),
        new Dialogue("1NSP3CT0R", "") // blank dialogue to ensure the user can read the actual last line of dialogue
    ]; 
}