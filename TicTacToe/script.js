let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#resetBtn");
let newbtn = document.querySelector("#newBtn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let draw = document.querySelector("#draw");

let turnO = true;
let count = 0;
let winnerd = false;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

boxes.forEach((box /*for individual box*/) => {
    box.addEventListener("click",() =>{
        count++;
        if(turnO){
            box.innerText = "O";
            turnO= false;
        }else{
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;//to avoid changing the value
        checkWinner();
        if(count === 9 && !winnerd){
                count = 0;
                drawCond();
        }
    });
});

const showWinner = (winner) => {
    count = 0;
    msg.innerText = `Congratulations, winner is ${winner}`;
    msgContainer.classList.remove("hide");
};

const drawCond = () => {
    draw.innerText = "Match is draw";
    msgContainer.classList.remove("hide");
};

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

const resetGame = () =>{
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val!= ""){
            if(pos1Val === pos2Val && pos3Val === pos2Val){
                winnerd = true;
                showWinner(pos1Val);
                disableBoxes();
            }
        }
    }
};

newbtn.addEventListener("click",resetGame);
reset.addEventListener("click",resetGame);