// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        });
    }
    // Function below - will allow the user to submit the answer by hitting Enter button (not clicking the "submit")

    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    });

    runGame("addition"); // not clear why this is here
});

/**
 * The main game "loop", called when the scrpt is first loaded
 * and after the user's answer has been processed
 */
function runGame(gameType) {

    document.getElementById("answer-box").value = ""; // so starting new game, You should not have to delete old answer
    document.getElementById("answer-box").focus(); // this line means, that as soon as page will be reloaded, answer box will be in focus - cursor will be there!

    // Create two random numbers between 1 and 25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2);
    } else if (gameType === "subtract") {
        displaySubtractQuestion(num1, num2);
    } else {
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type: ${gameType}. Aborting`; // this throws msg to console
    }
}

/** 
 * Checks the answer against the first element in
 * the returned calculateCorrectAnswer array
 */
function checkAnswer() {

    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];
    
    if (isCorrect) { // par that is in brackets is alternative to say if isCorrect is true 
        alert('Hey! You got it right! :D');
        incrementScore();
    } else {
        alert(`Awwww..... You answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}`);
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);

}

/** 
 * Gets the operands (the numbers) and the operator (plus, minus etc)
 * directly from the dom and returns the correct answer.
 * parseInt is used to be sure that it is a number (integer) and not string
 */
function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else if (operator === "x") {
        return [operand1 * operand2, "multiply"];
    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"];
    } else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}. Aborting!`; // this throws msg to console
    }
}

/** 
 * Gets the current score from the DOM and increments it by 1
 */
function incrementScore() {

    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore; // this ++func adds 1 to the value! impntant put the ++ before! 

}

/** 
 * Gets the current tally of incorrect answers from the DOM and increments it by 1
 * !!! need to think, why the oldscore can be the same variable.. is it correct style to do that?
 */
function incrementWrongAnswer() {
    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore; // this ++func adds 1 to the value! impntant put the ++ before! 

}

function displayAdditionQuestion(operand1, operand2) {
    
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";
}

function displaySubtractQuestion(operand1, operand2) {
    
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2; 
    /*
    Meaning of the second part of the line is
    Which is bigger: operand1 or operand2?
    If operand1 is bigger, return that.
    If operand 2 is bigger, return that instead.
    This is called javascript TERNARY operator

    And one more thing - need to think, why this fuction is firsly coonected to discplay
    with that I am meaning that the operands are displayed in the ascending value
    */
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1; 
    document.getElementById('operator').textContent = "-";
}

function displayMultiplyQuestion(operand1, operand2) {
    
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "x";
}