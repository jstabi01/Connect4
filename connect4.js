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
	const _win = {
		northwest: (y, x) => {
			let matches = 0;
			y--;
			x--;
			while (testMatch(y, x)) {
				y--;
				x--;
				matches++;
			}

			return matches;
		},

		west: (y, x) => {
			let matches = 0;
			x--;
			while (testMatch(y, x)) {
				x--;
				matches++;
			}
			return matches;
		},

		southwest: (y, x) => {
			let matches = 0;
			y++;
			x--;
			while (testMatch(y, x)) {
				y++;
				x--;
				matches++;
			}
			return matches;
		},

		south: (y, x) => {
			let matches = 0;
			y++;
			while (testMatch(y, x)) {
				y++;
				matches++;
			}
			return matches;
		},

		southeast: (y, x) => {
			let matches = 0;
			y++;
			x++;
			while (testMatch(y, x)) {
				y++;
				x++;
				matches++;
			}
			return matches;
		},

		east: (y, x) => {
			let matches = 0;
			x++;
			while (testMatch(y, x)) {
				x++;
				matches++;
			}
			return matches;
		},

		northeast: (y, x) => {
			let matches = 0;
			y--;
			x++;
			while (testMatch(y, x)) {
				y--;
				x++;
				matches++;
			}
			return matches;
		}
	};

	const testMatch = (y, x) => {
		if (y >= 0 && y < HEIGHT && x >= 0 && x < WIDTH && board[y][x] === currPlayer) {
			return true;
		}
		return false;
	};

	let horizontalMatches = _win.west(y, x) + _win.east(y, x);
	let verticalMatches = _win.south(y, x);
	let rightDiagnolMatches = _win.southwest(y, x) + _win.northeast(y, x);
	let leftDiagnolMatches = _win.northwest(y, x) + _win.southeast(y, x);

	if (
		horizontalMatches >= 3 ||
		verticalMatches >= 3 ||
		rightDiagnolMatches >= 3 ||
		leftDiagnolMatches >= 3
	) {
		return endGame();
	}
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
