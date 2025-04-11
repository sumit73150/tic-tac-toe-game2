let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset-btn");
let newGamebtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// Function to reset the game
const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

// Attach click events to boxes
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

// Disable all boxes
const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

// Enable and clear all boxes
const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
};

// Show winner message
const showWinner = (winner) => {
    msg.innerText = `Congratulations! The Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

// Check for a winner or draw
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            return;
        }
    }

    // Check for draw
    const isDraw = Array.from(boxes).every((box) => box.disabled && box.innerText !== "");
    if (isDraw) {
        msg.innerText = "It's a Draw!";
        msgContainer.classList.remove("hide");
    }
};

// Event listeners for reset and new game buttons
newGamebtn.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);
