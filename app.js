var stonesDisplay = document.querySelector('.game');
var startBtn = document.querySelector('.startBtn');
var preGame = document.querySelector('.preGame');
var title = document.querySelector('.title');
var restart = document.querySelector('.restart');
var player1;
var player2;

var row1 = [btn1,btn2,btn3];
var row2 = [btn4,btn5,btn6,btn7];
var row3 = [btn8,btn9,btn10,btn11,btn12];

var allBtns = document.querySelectorAll('.button');
var endTurn = document.querySelector('.endTurn');
var btnLength = allBtns.length;

var whoseTurn = 'player1';

var instructions = document.querySelector('.instructions');
instructions.textContent = "Player One starts";	

var reload = function() {
	allBtns.forEach(function(el) {
		el.disabled = false;
		el.style.visibility = 'visible';
		el.classList.remove('clicked');
		clickedBtns = [];
		whoseTurn = 'player1';
	});	
}

stonesDisplay.style.display = 'none';

var startGame = function() {
	preGame.style.display = 'none';
	stonesDisplay.style.display = 'flex';
}


startBtn.addEventListener('click', startGame)

restart.addEventListener('click', reload)


// var hideButton = function(event) {
// 	eventTarget = event.currentTarget.id;
// 	event.target.style.display = 'none';
// 	disableBtn(event);
// 	btnLength -= 1;
// }

var clickedBtns = [];
var selectButton = function(event) {
	eventTarget = event.currentTarget.id;
	disableBtn(event);
	if (event.currentTarget.disabled !== true) {

		event.currentTarget.classList.add("clicked");
	}
	btnLength -= 1;
	clickedBtns = document.querySelectorAll('.clicked');
}


var removeBtns = function() {
	for (let el of clickedBtns) el.style.visibility = 'hidden';
	allBtns.forEach(function(el) {
		el.disabled = false;
	});
	if (whoseTurn === 'player1') {
		instructions.textContent = "Player two, take your turn";
		whoseTurn = 'player2';
	} else {
		instructions.textContent = "Player one, take your turn";
		whoseTurn = 'player1';
	}
	checkCompMove()
	gameOver();
}



// Prevent player from selecting stones in the wrong row
var disableBtn = function(event) {
	for (var i = 0; i < row1.length; i++) {
		if (row1[i] === document.querySelector("#" + eventTarget)) {	
			row2.forEach(function(el) {
				el.disabled = true;
			});
			row3.forEach(function(el) {
				el.disabled = true;
			});
			instructions.textContent = "Row 1 selected. Please select another stone from row 1 or end your turn.";
			row1.length -= 1;
			if (row1.length === 0 && btnLength !== 1) {
				alert('end your turn, mate!');
			}
		}
		
	}
	for (var i = 0; i < row2.length; i++) {
		if (row2[i] === document.querySelector("#" + eventTarget)) {
			row1.forEach(function(el) {
				el.disabled = true;
			});
			row3.forEach(function(el) {
				el.disabled = true;
			});
			instructions.textContent = "Row 2 selected. Please select another stone from row 2 or end your turn.";
			row2.length -= 1;
			if (row2.length === 0 && btnLength !== 1) {
				alert('end your turn, mate!');
			}
		}
	}
	for (var i = 0; i < row3.length; i++) {
		if (row3[i] === document.querySelector("#" + eventTarget)) {
			row1.forEach(function(el) {
				el.disabled = true;
			});
			row2.forEach(function(el) {
				el.disabled = true;
			});
			instructions.textContent = "Row 3 selected. Please select another stone from row 3 or end your turn.";
			row3.length -= 1;
			if ((row3.length === 0 && btnLength !== 1 )) {
				alert('end your turn, mate!');
			}
		}
	}
	if (btnLength === 2) {
		alert("Looking good! Now win this thing.");
	}
}
// instructions.textContent = "First Player's Turn";

// for (var i = 0; i < allBtns.length; i++) {
// 	allBtns[i].addEventListener('click', hideButton);
// }

for (var i = 0; i < allBtns.length; i++) {
	allBtns[i].addEventListener('click', selectButton);
}

var gameOver = function() {
	if (btnLength === 1 && whoseTurn === 'player1') {
		alert('Player 1, you lose!');
		instructions.textContent = "Player 1, you lose!";
	}

	if (btnLength ===1 && whoseTurn === 'player2') {
		alert('Player 2, you lose!');	
		instructions.textContent = "Player 2, you lose!";
	}
}
endTurn.addEventListener('click', removeBtns)
	
// Against computer






























