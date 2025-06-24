let player1Input = document.querySelector("#player1");
let player2Input = document.querySelector("#player2");
let startBtn = document.querySelector("#start-btn");
let nameContainer = document.querySelector(".name-input-container");

let player1Name = "Player 1";
let player2Name = "Player 2";


startBtn.addEventListener("click", () => {
    const p1 = player1Input.value.trim();
    const p2 = player2Input.value.trim();

    if (p1 && p2) {
        player1Name = p1;
        player2Name = p2;
        nameContainer.style.display = "none"; // hide input box
    } else {
        alert("Please enter both player names.");
    }
});


let boxes = document.querySelectorAll(".box");
let ResetBtn = document.querySelector("#ResetBtn");
let newGameButton = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true;
const winPat = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [1,4,7],
    [2,5,8],
    [0,3,6],
    [0,4,8],
    [2,4,6]
];

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if(turn0){
            box.innerText = "O";
            turn0 = false;
        }else{
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;
        checkWin();
    }); 
    
});
const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}
const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    let winnerName = winner === "O" ? player1Name : player2Name;
    msg.innerText = `🎉 Congratulations, ${winnerName} wins!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}; 
const resetGame = () => {
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");

}

const checkWin = () => {
    let winnerFound = false;

    for (let pat of winPat) {
        let pos1 = boxes[pat[0]].innerText;
        let pos2 = boxes[pat[1]].innerText;
        let pos3 = boxes[pat[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                winnerFound = true;
                break;
            }
        }
    }

    if (!winnerFound) {
        checkDraw();
    }
};


const checkDraw = () => {
    let filled = 0;
    boxes.forEach((box) => {
        if (box.innerText !== "") {
            filled++;
        }
    });

    if (filled === 9) {
        // No winner found & all boxes filled
        msg.innerText = `It's a Draw! 🤝`;
        msgContainer.classList.remove("hide");
        disableBoxes();
    }
};

newGameButton.addEventListener('click' , resetGame);
ResetBtn.addEventListener('click' , resetGame);






