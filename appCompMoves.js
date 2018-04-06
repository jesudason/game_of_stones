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
var allRows = [row1, row2, row3];

var allBtns = document.querySelectorAll('.button');
var endTurn = document.querySelector('.endTurn');
var btnLength = allBtns.length;

var whoseTurn = 'player1';

var instructions = document.querySelector('.instructions');
instructions.textContent = "Player One starts";	

stonesDisplay.style.display = 'none';

var startGame = function() {
	preGame.style.display = 'none';
	stonesDisplay.style.display = 'flex';
}

var reload = function() {
	allBtns.forEach(function(el) {
		el.disabled = false;
		el.style.visibility = 'visible';
		el.classList.remove('clicked');
		clickedBtns = [];
		whoseTurn = 'player1';
	});	
}

var removeRow = function() {
	for (var i = 0; i < allRows.length; i++) {
		if (allRows[i].length === 0) {
			allRows.splice(i, 1);
		}
	}
}

var remainingBtns = [];

var rmvCompStones = function() {
	if (allRows.length === 3) {
		remainingBtns = allRows[0].concat(allRows[1],allRows[2])
	} else if (allRows.length === 2) {
		remainingBtns = allRows[0].concat(allRows[1])
	} else {
		remainingBtns = allRows[0];
	}
	
	for (var i = 0; i < allBtns.length; i++) {
		if (remainingBtns.includes(allBtns[i]) === false) {
			allBtns[i].style.visibility = 'hidden';
		}
	}
}
var sorted;	
var rowSort = function() {
	if (allRows.length === 3) {
		sorted = [allRows[0].length, allRows[1].length, allRows[2].length].sort();
	}
}

var checkCompMove = function() {

	if (allRows.length === 1) {
		allRows[0].splice(1);
	} 
	else if (allRows.length === 2) {
		if (allRows[1].length > allRows[0].length) {
			if (allRows[0].length === 1) {
				allRows[1] = [];
			} else {
			allRows[1].splice(allRows[0].length);
			}
		} else if (allRows[0].length > allRows[1].length) {
			allRows[0].splice(allRows[1].length);
		} else if (allRows[1].length === allRows[0].length) {
			allRows[Math.round(Math.random())].pop();
		}
	}
	else if (allRows.length === 3) {
		rowSort();
		if (allRows[1].length === allRows[0].length && allRows[1].length !== 1) {
			allRows.splice(2, 1);
		}
		else if (allRows[1].length === allRows[2].length && allRows[2].length !== 1) {
			allRows.splice(0, 1);
		}

		else if (allRows[2].length === allRows[0].length && allRows[2].length !== 1) {
			allRows.splice(1, 1);
		}
		else if (allRows[0].length === 2 && allRows[1].length === 4 && allRows[2].length === 5) {
			allRows[Math.round(Math.random())].pop();
		}
		else if (allRows[0].length === 1 && allRows[1].length === 4 && allRows[2].length === 5) {
			allRows[2].splice(1);
		}
		else if (allRows[0].length === 3 && allRows[1].length === 1 && allRows[2].length === 5) {
			allRows[2].splice(2);
		}
		else if (allRows[0].length === 3 && allRows[1].length === 4 && allRows[2].length === 1) {
			allRows[1].splice(2);
		}
		else if (allRows[0].length === 3 && allRows[1].length === 2 && allRows[2].length === 5) {
			allRows[2].splice(1);	
		}
		else if (allRows[0].length === 3 && allRows[1].length === 4 && allRows[2].length === 2) {
			allRows[1].splice(1);
		}

		else if (sorted[0] == 1 && sorted[1] == 1) {
			for (var i = 0; i < allRows.length; i++) {
				if (allRows[i].length > 1) {
					allRows[i].splice(1);
				}
			}
		}

	}
	removeRow();
	rmvCompStones();
	if (remainingBtns.length === 1) {
		instructions.textContent = "COMPUTER WINS"
	} else {		
		instructions.textContent = "Player one, take your turn";
		whoseTurn = 'player1';
	}
}

var clickedBtns = [];
var selectButton = function(event) {
	eventTarget = event.currentTarget.id;
	disableBtn(event);
	if (event.currentTarget.disabled !== true) {

		event.currentTarget.classList.add("clicked");
		for (var i = 0; i < allRows.length; i++) {
			if (allRows[i].includes(event)) {
				allRows[i].splice(event, 1);
			}
		}
	}
	btnLength -= 1;
	clickedBtns = document.querySelectorAll('.clicked');

}

var gameOver = function() {
	if (btnLength === 1 && whoseTurn === 'player1') {
		instructions.textContent = "Player 1, you lose!";
	}

	if (btnLength ===1 && whoseTurn === 'player2') {
		instructions.textContent = "Player 2, you lose!";
	}
}

var removeBtns = function() {
	for (let el of clickedBtns) el.style.visibility = 'hidden';
	allBtns.forEach(function(el) {
		el.disabled = false;
	});
	removeRow();
	gameOver();

	if (remainingBtns.length === 1) {
		instructions.textContent = "PLAYER 1 WINS"
	} else {		
		instructions.textContent = "Computer's turn";
		setTimeout(checkCompMove, 2000);
		whoseTurn = 'player2';
	}
}

endTurn.addEventListener('click', removeBtns);

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
				instructions.textContent = 'end your turn, mate!';
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
				instructions.textContent = 'Remove Stones';
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
			// if ((row3.length === 0 && btnLength !== 1 )) {
			// 	alert('end your turn, mate!');
			// }
		}
	}
	// if (btnLength === 2) {
	// 	alert("Looking good! Now win this thing.");
	// }
}
// instructions.textContent = "First Player's Turn";

// for (var i = 0; i < allBtns.length; i++) {
// 	allBtns[i].addEventListener('click', hideButton);
// }

for (var i = 0; i < allBtns.length; i++) {	
	allBtns[i].addEventListener('click', selectButton);
}

startBtn.addEventListener('click', startGame)

restart.addEventListener('click', reload)





























