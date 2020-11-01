var WIDTH = 7;
var HEIGHT = 6;

let currPlayer = 1;
var board = []; 
let current = document.getElementById('current');

function makeBoard() {
	for (let y = 0; y < HEIGHT; y++) {
		board.push(Array.from({ length: WIDTH }));
	}
}

function makeHtmlBoard() {
	let htmlBoard = document.getElementById('board');
	var top = document.createElement('tr');
	top.setAttribute('id', 'column-top');
	top.addEventListener('click', handleClick);

	for (var x = 0; x < WIDTH; x++) {
		var headCell = document.createElement('td');
		headCell.setAttribute('id', x);
		top.append(headCell);
	}
	htmlBoard.append(top);

	for (var y = 0; y < HEIGHT; y++) {
		const row = document.createElement('tr');
		for (var x = 0; x < WIDTH; x++) {
			const cell = document.createElement('td');
			cell.setAttribute('id', `${y}-${x}`);
			row.append(cell);
		}
		htmlBoard.append(row);
	}
}

function findSpotForCol(x) {
	for (let y = HEIGHT - 1; y >= 0; y--) {
		if (!board[y][x]) {
			return y;
		}
	}
	return null;
}

function placeInTable(y, x) {
	if (currPlayer === 1) {
		var placePiece = document.createElement('div');
		placePiece.setAttribute('class', 'piece');
		placePiece.style.background = 'MediumPurple';
		let cellPlacement = document.getElementById(`${y}-${x}`);
		cellPlacement.append(placePiece);
	} else {
		var placePiece = document.createElement('div');
		placePiece.setAttribute('class', 'piece');
		placePiece.style.background = 'LimeGreen';
		let cellPlacement = document.getElementById(`${y}-${x}`);
		cellPlacement.append(placePiece);
	}
}

function endGame(msg) {
	window.alert(`Player ${currPlayer} won!`);
}

function handleClick(evt) {
	let x = +evt.target.id;

	let y = findSpotForCol(x);
	if (y === null) {
		return;
	}

	placeInTable(y, x);
	board[y][x] = currPlayer;
	console.log(currPlayer);

	check_win(y, x);

	if (board.every((row) => row.every((cell) => cell))) {
		return endGame('Tie!');
	}

	if (currPlayer === 1) {
		currPlayer++;
		current.innerText = "Green's Turn";
		current.style.color = 'LimeGreen';
	} else {
		currPlayer--;
		current.innerText = "Purple's Turn";
		current.style.color = 'MediumPurple';
	}
}

function check_win(y, x) {
	if (x + 3 <= 6 && y >= 0) {
		for (i = 0, counter = 0; i <= 3; i++) {
			if (board[y][x + i] == currPlayer) {
				counter++;
			}

			if (counter == 4) return endGame();
		}
	}
	if (y + 3 <= 5 && x >= 0) {
		for (i = 0, counter = 0; i <= 3; i++) {
			if (currPlayer == board[y + i][x]) {
				counter++;
			}

			if (counter == 4) return endGame();
		}
	}
	if (y - 3 >= 0 && x + 3 <= 6) {
		for (i = 0, counter = 0; i <= 3; i++) {
			if (currPlayer == board[y - i][x + i]) {
				counter++;
			}

			if (counter == 4) return endGame();
		}
	}
	if (y - 3 >= 0 && x >= 0) {
		for (i = 0, counter = 0; i <= 3; i++) {
			if (currPlayer == board[y - i][x]) {
				counter++;
			}

			if (counter == 4) return endGame();
		}
	}
	if (y + 3 <= 5 && x - 3 >= 0) {
		for (i = 0, counter = 0; i <= 3; i++) {
			if (currPlayer == board[y + i][x - i]) {
				counter++;
			}

			if (counter == 4) return endGame();
		}
	}
	if (y + 3 <= 5 && x + 3 <= 6) {
		for (i = 0, counter = 0; i <= 3; i++) {
			if (currPlayer == board[y + i][x + i]) {
				counter++;
			}

			if (counter == 4) return endGame();
		}
	}
	if (x - 3 <= 0 && y >= 0) {
		for (i = 0, counter = 0; i <= 3; i++) {
			if (currPlayer == board[y][x - i]) {
				counter++;
			}

			if (counter == 4) return endGame();
		}
	}
	if (y - 3 >= 0 && x - 3 <= 0) {
		for (i = 0, counter = 0; i <= 3; i++) {
			if (currPlayer == board[y - i][x - i]) {
				counter++;
			}

			if (counter == 4) return endGame();
		}
	}
	return 0;
}

function fillBoard() {
	for (let y = 0; y < HEIGHT; y++) {
		for (let x = 0; x < WIDTH; x++) {
			board[y][x] = 0;
		}
	}
}

makeBoard();
makeHtmlBoard();
fillBoard();
