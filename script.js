const board = document.querySelector(".board");
let items = document.getElementsByClassName("square");
let symbol = "X";
let field = [];
const COUNT = 3;
let steps = COUNT ** 2, win = false;
for (let i = 0; i < COUNT; i++) {
    field[i] = [];
}
console.log(field);
/*
[
  [00, 01, 02],
  [10, 11, 12],
  [20, 21, 22],
]
0 % 3 => 0  1 / 3 => 0
0 % 3 => 0 1 / 3 => 1

8 / 3 => 2
8 % 3 => 2
0, 1, 2
*/
function startGame() {
    board.innerHTML = "";
    steps = COUNT ** 2;
for (let i = 0; i < COUNT**2; i++) {
    const square = document.createElement("div");
    square.className = "square";
    square.setAttribute("data-pos", i);
    square.textContent = "";
    fillField(i, "");
    square.addEventListener("click", setStep);
    board.append(square);
}
}

console.log(items);
function changeChar(char) {
    // если символ = Х, возвращаем 0 иначе Х
    // if (char === "X") {
    //     s = "0";
    // }else {
    //     s = "X"
    // } return s;
    return char === "X" ? "0" : "X";
}

function fillField(n, char) {
    let row = Math.floor(n / COUNT);
    let col = n % COUNT;
    field[row][col] = char;
}

function setStep(e) {
    const el = e.target;
    const pos = el.getAttribute("data-pos");
    if (!el.textContent) {
        steps --;
        el.textContent = symbol;
        fillField(pos, symbol);
        checkWin(symbol);
        symbol = changeChar(symbol);
    }
    if (steps === 0 && !win) {
        alert("Ничья!")
        startGame();
    }
}

function checkWin(s) {
    for (let i = 0; i < COUNT; i++) {
        if (field[i][0] === s && 
            field[i][1] === s && 
            field[i][2] === s) {
                showWin([i * COUNT + 0, i * COUNT + 1, i * COUNT + 2]);
                win = true;
                setTimeout(function() {
                    alert(`${s} win!`);
                    startGame();
                }, 1000);
                break;
                    }
        if (field[0][i] === s && 
            field[1][i] === s && 
            field[2][i] === s) {
                showWin([0 * COUNT + i, 1 * COUNT + i, 2 * COUNT + i]);
               win = true;
                setTimeout(function() {
                    alert(`${s} win!`);
                    startGame();
                },1000);
                break;
                    }
         if (field[0][0] === s && field[1][1] === s && field[2][2] === s) {
                showWin([0, 4, 8]);
                win = true;
                setTimeout(function() {
                    alert(`${s} win!`);
                    startGame();
                }, 1000);
                    }
        if (field[0][2] === s && field[1][1] === s && field[2][0] === s) {
                showWin([2, 4, 6]);
                win = true;
                setTimeout(function() {
                    alert(`${s} win!`);
                    startGame();
                }, 1000);
                    }
    }
    }

function showWin(posArr) {
    posArr.forEach(pos => {
        items[pos].classList.add("win");
    });
   }

    startGame();