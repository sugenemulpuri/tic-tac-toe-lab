const squares = document.querySelectorAll(".sqr"); //sets variable of squares to represent each square in the grid
const statusText = document.querySelector("#status");
//sets variable to message to the current player's turn
const restartBtn = document.querySelector("#restart");
//sets variable to button to restart game
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
//variable creating arrays denoting the combinations that will result in a player winning the game
let board = ["", "", "", "", "", "", "", "", ""];
//variable set to the empty array that will be filled with the player's tag of X or O
let currentPlayer = "X";
//sets the first player of the game
let running = false;
//the game is active



function initializeGame(){
    squares.forEach(sqr => sqr.addEventListener("click", squareClicked));
    //for each sqr div grouped in the squares variable clicked, an event listener is added to listen for click and then run the action that takes place when the square is clicked.
    restartBtn.addEventListener("click", restartGame);
    //when the restart button is clicked, the function that restarts the game is run.

    statusText.innerHTML = `${currentPlayer}'s turn`;
    //The H2's content is set to the current player's turn

    running = true;
    //The game is going on, when this value is changed the winning message will be displayed.
}
function squareClicked(){
    const squareIndex = this.getAttribute("id");
    //Getting the specific square on the board

    if(board[squareIndex] != "" || !running){
        return;
        //if the specific square is full or the game is over, return out of the function. this means that the squares cannot be clicked
    }

    updateSquare(this, squareIndex);
    // the square will be updated by the specific square that is clicked in the HTML and the corresponding index of the board array
    checkWinner();
    //at this stage when the square is clicked, the checkWinner function is ran to test if a match has been made as a result of the square being clicked
}
function updateSquare(sqr, index){
    board[index] = currentPlayer;
    //the specific index within the blank board array is set to the current player value
    sqr.innerHTML = currentPlayer;
    //the HTML displayed within the square will match the string of the current player value
}
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    // if it is true that the current player is X, then change the player to O, or else keep it as X
    statusText.innerHTML = `${currentPlayer}'s turn`;
    //change the HTML text of the status to the new player's turn after it was changed.
}
function checkWinner(){
    let roundWon = false;
    //by default, the game is not won

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        //indexing through the win condition combinations
        const sqrA = board[condition[0]];
        const sqrB = board[condition[1]];
        const sqrC = board[condition[2]];
        //setting up the possibility of 3 matches

        if(sqrA == "" || sqrB == "" || sqrC == ""){
            //if any of possibility of 3 matches is blank, the game is still running
            continue;
        }
        if(sqrA == sqrB && sqrB == sqrC){
            //if there are 3 synchronous matches, the game has been won
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.innerHTML = `${currentPlayer} wins!`;
        running = false;
        //display message that the player that the game is at wins and the game is no longer running

    }
    else if(!board.includes("")){
        statusText.innerHTML = `Draw!`;
        running = false;
        //if there are not 3 matches but it is the case is that none of the board array values are blank, it is a draw.
    }
    else{
        changePlayer();
        //the next turn is ran and the player is shifted
    }
}
function restartGame(){
    currentPlayer = "X";
    //the game will restart with X going first
    board = ["", "", "", "", "", "", "", "", ""];
    //the empty array that will be filled with X or O
    statusText.innerHTML = `${currentPlayer}'s turn`;
    //It is the first player's turn
    squares.forEach(sqr => sqr.innerHTML = "");
    //Iterating through the HTML to make each square blank
    running = true;
    //The game has restart
}

initializeGame();
//The game is ran through the initializing function