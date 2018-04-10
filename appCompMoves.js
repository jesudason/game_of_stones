var stonesDisplay = document.querySelector('.game');
var playComp = document.querySelector('.playComp');
var playFriend = document.querySelector('.playFriend');
var preGame = document.querySelector('.preGame');
var title = document.querySelector('.title');
var restart = document.querySelector('.restart');
var row1btns = document.querySelectorAll('.btnrow1');
var row2btns = document.querySelectorAll('.btnrow2');
var row3btns = document.querySelectorAll('.btnrow3');

var player1;
var player2;
var playWho;
var row1 = [0,1,2];
var row2 = [3,4,5,6];
var row3 = [7,8,9,10,11];
var allRows = [row1, row2, row3];
var btnSet = [0,1,2,3,4,5,6,7,8,9,10,11];
var remainingBtns = [0,1,2,3,4,5,6,7,8,9,10,11];
var allBtns = document.querySelectorAll('.button');
var endTurn = document.querySelector('.endTurn');
var btnLength = allBtns.length;

var whoseTurn = 'player1';
var endGame = document.querySelector('.endGame');
var instructions = document.querySelector('.instructions');
instructions.textContent = "Player One starts";	

stonesDisplay.style.display = 'none';
endGame.style.display = 'none';

// var reload = function() {
// 	allBtns.forEach(function(el) {
// 		el.disabled = false;
// 		el.style.visibility = 'visible';
// 		el.classList.remove('clicked');
// 		clickedBtns = [];
// 		whoseTurn = 'player1';
// 	});	
// }

// PLAY COMPUTER
var compGame = function() {
	preGame.style.display = 'none';
	stonesDisplay.style.display = 'flex';
	playWho = 'computer';
}


// PLAY FRIEND
var friendGame = function() {
	preGame.style.display = 'none';
	stonesDisplay.style.display = 'flex';
	playWho = 'friend';
}

var removeRow = function() {
	for (var i = 0; i < allRows.length; i++) {
		if (allRows[i].length === 0) {
			allRows.splice(i, 1);
		}
	}
}

var rmvCompStones = function() {
	if (allRows.length === 3) {
		remainingBtns = allRows[0].concat(allRows[1],allRows[2])
	} else if (allRows.length === 2) {
		remainingBtns = allRows[0].concat(allRows[1])
	} else {
		remainingBtns = allRows[0];
	}
	
	for (var i = 0; i < allBtns.length; i++) {
		if (remainingBtns.includes(i) === false) {
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
		if (allRows[1].length > allRows[0].length && allRows[0].length > 1) {
			if (allRows[0].length === 1) {
				allRows[1] = [];
			} else {
			allRows[1].splice(allRows[0].length);
			}
		} else if (allRows[0].length > allRows[1].length && allRows[1].length > 1) {
			allRows[0].splice(allRows[1].length);
		} else if (allRows[1].length === allRows[0].length) {
			allRows[Math.round(Math.random())].pop();
		} else if (allRows[0].length === 1) {
			allRows[1] = [];
		} else if (allRows[1].length === 1) {
			allRows[0] = [];
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
		else if ((allRows[0].length === 2 && allRows[1].length === 4 && allRows[2].length === 5) || (allRows[0].length === 3 && allRows[1].length === 2 && allRows[2].length === 1)) {
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
	if (remainingBtns.length != 1) {	
		instructions.textContent = "Player one, take your turn";
		whoseTurn = 'player1';
	}
}

// Prevent player from selecting stones in the wrong row
var disableBtn = function(event) {
		if (row1.includes(eventTarget)) {	
			row2btns.forEach(function(el) {
				el.disabled = true;
			});
			row3btns.forEach(function(el) {
				el.disabled = true;
			});
			// debugger
			instructions.textContent = "Row 1 selected. Please select another stone from row 1 or end your turn.";
			// row1.length -= 1;
			if (row1.length === 0 && btnLength !== 1) {
				instructions.textContent = 'There are no more available moves. End your turn';
			}
		}
	
		if (row2.includes(eventTarget)) {
			row1btns.forEach(function(el) {
				el.disabled = true;
			});
			
			row3btns.forEach(function(el) {
				el.disabled = true;
			});
	
			instructions.textContent = "Row 2 selected. Please select another stone from row 2 or end your turn.";
			// row2.length -= 1;
			if (row2.length === 0 && btnLength !== 1) {
				instructions.textContent = 'There are no more available moves. End your turn';
			}
		}
	

		if (row3.includes(eventTarget)) {
			row1btns.forEach(function(el) {
				el.disabled = true;
			});
			row2btns.forEach(function(el) {
				el.disabled = true;
			});
	
			instructions.textContent = "Row 3 selected. Please select another stone from row 3 or end your turn.";
			if (row3.length === 0 && btnLength !== 1) {
				instructions.textContent = 'There are no more available moves. End your turn';
			}
		}
}

var clickedBtns = [];
var selectButton = function(event) {
	eventTarget = Number(event.currentTarget.id); 
	disableBtn(event); 
	if (event.currentTarget.disabled !== true) {
		event.currentTarget.classList.add("clicked");
		for (var i = 0; i < allRows.length; i++) {
			if (allRows[i].includes(eventTarget)) {
				allRows[i].splice(allRows[i].indexOf(eventTarget), 1);
			} else {
				console.log('test');
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
	if (playWho === 'computer') {
		setTimeout(gameOver, 5000);

		if (remainingBtns.length === 1) {
			instructions.textContent = "PLAYER 1 WINS"
		} else {		
			instructions.textContent = "Computer's turn";
			setTimeout(checkCompMove, 2000);
			whoseTurn = 'player2';
		}
	}
}


for (var i = 0; i < allBtns.length; i++) {	
	allBtns[i].addEventListener('click', selectButton);
}

playComp.addEventListener('click', compGame);
playFriend.addEventListener('click', friendGame);

endTurn.addEventListener('click', removeBtns);
// restart.addEventListener('click', reload);





























