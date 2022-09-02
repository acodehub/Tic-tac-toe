// store the 'O'and 'X' symbol in games.
let games = Array(9).fill("");

// store player score, computer score, draw score in scores.
let scores = [0, 0, 0];

// allow the player to click the empty box until the game message is shown.
let lock = 0;

// first round in the game. 
let round = 1;

// set all the boxes have mouse over function
allowed();

// player clicked on the empty box to trigger the start function.
function start(position) {

    if (unoccupied(position - 1) && lock == 0) {
        games[position - 1] = "O";

        let choice = document.getElementsByClassName("container")[0].getElementsByTagName("div")[position - 1];
        choice.innerHTML = "O";
        choice.style.cursor = "not-allowed";
        choice.style.backgroundColor = "#05518F";
        choice.style.color = "#FFFFFF";
        choice.onmouseover = function () {
            this.className = "";
        }
        choice.onmouseout = function () {
            this.className = "";
        }

        // when the player has three symbols and com has two symbols
        if (occupied() >= 5) {
            if (check() == "Player Wins") {
                score(1, 0, 0);
                message(1);

            } else if (occupied() == 9) {
                lock = 1;
                let roundbtn = document.getElementsByClassName("button")[0].getElementsByTagName("div")[0];
                roundbtn.style.cursor = "pointer";
                score(0, 0, 1);
                message(3);


            } else {
                com();

                if (check() == "Computer Wins") {
                    score(0, 1, 0);
                    message(2);

                }

            }

        } else {
            com();
        }

    }

}


// add player_score, computer_score, draw_score in scores
function score(player_score, computer_score, draw_score) {

    scores[0] += player_score;
    scores[1] += computer_score;
    scores[2] += draw_score;

    let player = document.getElementById("score").getElementsByTagName("h2")[0];
    let computer = document.getElementById("score").getElementsByTagName("h2")[1];
    let draw = document.getElementById("score").getElementsByTagName("h2")[2];

    let player_txt = player.innerHTML;
    let computer_txt = computer.innerHTML;
    let draw_txt = draw.innerHTML;

    player_txt = player_txt.split(" ")[0] + " " + scores[0];
    computer_txt = computer_txt.split(" ")[0] + " " + scores[1];
    draw_txt = draw_txt.split(" ")[0] + " " + scores[2];

    player.innerHTML = player_txt;
    computer.innerHTML = computer_txt;
    draw.innerHTML = draw_txt;

}

// computer choice
function com() {
    // returns a random integer between 0 and 9 (both included):
    let position = Math.floor(Math.random() * 10);
    if (unoccupied(position - 1)) {
        games[position - 1] = "X";

        let choice = document.getElementsByClassName("container")[0].getElementsByTagName("div")[position - 1];;
        choice.innerHTML = "X";
        choice.style.cursor = "not-allowed";
        choice.style.backgroundColor = "#4CAF50";
        choice.style.color = "#ffffff";
        choice.onmouseover = function () {
            this.className = "";
        }
        choice.onmouseout = function () {
            this.className = "";
        }
    } else if (occupied() < 9) {

        com();
    }

}

// check the player or computer had won the game.
function check() {

    let conditions = [];

    // hortizonal row condition
    conditions[0] = games[0] + games[1] + games[2];
    conditions[1] = games[3] + games[4] + games[5];
    conditions[2] = games[6] + games[7] + games[8];

    // vertical row condition
    conditions[3] = games[0] + games[3] + games[6];
    conditions[4] = games[1] + games[4] + games[7];
    conditions[5] = games[2] + games[5] + games[8];

    // diagonal row condition
    conditions[6] = games[0] + games[4] + games[8];
    conditions[7] = games[2] + games[4] + games[6];

    for (let i = 0; i < conditions.length; i++) {
        if (conditions[i] == "XXX") {
            lock = 1;
            notallowed();
            return "Computer Wins";

        } else if (conditions[i] == "OOO") {
            lock = 1;
            notallowed();
            return "Player Wins";
        }

    }
    return "none";
}

// change box and round button mouse cursor to not-allowed and remove mouse over function
function notallowed() {
    let choices = document.getElementsByClassName("container")[0].getElementsByTagName("div");
    for (let i = 0; i < choices.length; i++) {
        choices[i].style.cursor = "not-allowed";
        choices[i].onmouseover = function () {
            this.className = "";
        }
        choices[i].onmouseout = function () {
            this.className = "";
        }
    }
    let roundbtn = document.getElementsByClassName("button")[0].getElementsByTagName("div")[0];
    roundbtn.style.cursor = "pointer";
}

// change box and round button mouse cursor to pointer and add the mouse over function
function allowed() {
    let choices = document.getElementsByClassName("container")[0].getElementsByTagName("div");
    for (let i = 0; i < choices.length; i++) {
        choices[i].style.cursor = "pointer";
        choices[i].onmouseover = function () {
            this.className = "divHover";
        }
        choices[i].onmouseout = function () {
            this.className = "";
        }
    }
    let roundbtn = document.getElementsByClassName("button")[0].getElementsByTagName("div")[0];
    roundbtn.style.cursor = "not-allowed";
}

// set box to default background and text color.
function resetcolor() {
    let choices = document.getElementsByClassName("container")[0].getElementsByTagName("div");
    for (let i = 0; i < choices.length; i++) {
        choices[i].style.backgroundColor = "";
        choices[i].style.color = "";
    }
}

// check none symbol in the games.
function unoccupied(position) {
    // check the game array index has empty value
    if (games[position] == "") {
        return true;
    } else {
        return false;
    }

}

// count how many occupied 'O' or 'X' symbol in the games
function occupied() {

    let occupy = 0;

    for (let i = 0; i < games.length; i++) {
        if (games[i] != "") {
            occupy += 1;
        }

    }
    return occupy;
}


// reset the game variable and text.
function reset() {
    scores = [0, 0, 0];
    games = Array(9).fill("");
    round = 1;
    lock = 0;
    allowed();
    resetcolor();
    cleartxt(1);
}

// allow the player to click on the next round button
function replay() {
    if (occupied() > 1 && lock == 1) {
        games = Array(9).fill("");
        round += 1;
        lock = 0;
        cleartxt(0);
        resetcolor();
        message(0);
        allowed();
    }
}

// reset the text in the game.
function cleartxt(select) {
    if (select == 1) {
        let scoretxts = document.getElementById("score").getElementsByTagName("h2");
        for (let i = 0; i < scores.length; i++) {
            scoretxts[i].innerHTML = scoretxts[i].innerHTML.split(" ")[0] + " " + "0";
        }

        let message = document.getElementById("message").getElementsByTagName("h2")[0];
        message.innerHTML = message.innerHTML.split(" ")[0] + " " + round;

        let message2 = document.getElementById("message").getElementsByTagName("h2")[1];
        message2.innerHTML = "";

    }

    let choices = document.getElementsByClassName("container")[0].getElementsByTagName("div");
    for (let j = 0; j < choices.length; j++) {
        choices[j].innerHTML = " &nbsp; ";
    }
}

// select which game message to show in the game.
function message(choice) {
    let message = document.getElementById("message").getElementsByTagName("h2")[0];
    message.innerHTML = message.innerHTML.split(" ")[0] + " " + round;

    let message2 = document.getElementById("message").getElementsByTagName("h2")[1];

    switch (choice) {
        case 1:
            message2.innerHTML = ": Player Wins";
            break;

        case 2:
            message2.innerHTML = ": Computer Wins";
            break;

        case 3:
            message2.innerHTML = ": Tie";
            break;

        default:
            message2.innerHTML = "";
            break;
    }

}