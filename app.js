document.addEventListener("DOMContentLoaded", () => {
    let boxes = document.querySelectorAll(".box");
    let resetBtn = document.querySelector("#reset-btn");
    let newGameBtn = document.querySelector("#Newgame-btn");
    let msgContainer = document.querySelector(".msg-container");
    let msg = document.querySelector("#msg");

    let turn0 = true;
    let board = ["", "", "", "", "", "", "", "", ""];
    const players = ["X", "O"];
    
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const resetGame = () => {
        turn0 = true;
        board = ["", "", "", "", "", "", "", "", ""];
        boxes.forEach((box) => {
            box.innerHTML = "";
            box.disabled = false;
        });
        msgContainer.classList.add("hide");
    };

    const checkWinner = () => {
        for (let pattern of winPatterns) {
            let [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                showWinner(board[a]);
                return true;
            }
        }
        return false;
    };

    const showWinner = (winner) => {
        msg.innerText = `Congratulations, WINNER IS ${winner}  `;
        msgContainer.classList.remove("hide");
    };

    boxes.forEach((box, index) => {
        box.addEventListener("click", () => {
            let player = turn0 ? players[0] : players[1];
            box.innerHTML = player;
            box.disabled = true;
            board[index] = player;
            turn0 = !turn0;

            if (checkWinner()) {
                boxes.forEach((box) => (box.disabled = true));
            } else if (!board.includes("")) {
                msg.innerText = "It's a draw!";
                msgContainer.classList.remove("hide");
            }
        });
    });

    resetBtn.addEventListener("click", resetGame);
    newGameBtn.addEventListener("click", resetGame);
});
