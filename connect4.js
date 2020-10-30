/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

var WIDTH = 7;
var HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
var board = []; // array of rows, each row is array of cells  (board[y][x])
let current = document.getElementById('current');

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
	// TODO: set "board" to empty HEIGHT x WIDTH matrix array
	for (let y = 0; y < HEIGHT; y++) {
		board.push(Array.from({ length: WIDTH }));
	}
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
	// TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
	let htmlBoard = document.getElementById('board');
	// TODO: add comment for this code
	var top = document.createElement('tr');
	//creates a table row
	top.setAttribute('id', 'column-top');
	//gives it an id of top column
	top.addEventListener('click', handleClick);
	//adds a click even listener

	for (var x = 0; x < WIDTH; x++) {
		var headCell = document.createElement('td');
		headCell.setAttribute('id', x);
		top.append(headCell);
		//creates a data table for length of width, sets id to width
	}
	htmlBoard.append(top);
	//appends top to the table

	// TODO: add comment for this code
	for (var y = 0; y < HEIGHT; y++) {
		const row = document.createElement('tr');
		//creates rows for length of the height
		for (var x = 0; x < WIDTH; x++) {
			const cell = document.createElement('td');
			cell.setAttribute('id', `${y}-${x}`);
			row.append(cell);
			//creates cells for each row
		}
		htmlBoard.append(row);
		//appends to the table
	}
}

function findSpotForCol(x) {
	// TODO: write the real version of this, rather than always returning 0
	for (let y = HEIGHT - 1; y >= 0; y--) {
		// y is height - 1 (height of table minus insertion row), if y is greater than zero minus y
		//if (y isnt filled) {select this y}
		//else return null
		if (!board[y][x]) {
			return y;
		}
	}
	return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
	// TODO: make a div and insert into correct table cell
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
	// get x from ID of clicked cell
	let x = +evt.target.id;

	// get next spot in column (if none, ignore click)
	let y = findSpotForCol(x);
	if (y === null) {
		return;
	}

	// place piece in board and add to HTML table
	// TODO: add line to update in-memory board
	placeInTable(y, x);
	board[y][x] = currPlayer;
	console.log(currPlayer);

	if (x + 3 <= 6 && y >= 0) {
		if (
			board[y][x] == currPlayer &&
			board[y][x + 1] == currPlayer &&
			board[y][x + 2] == currPlayer &&
			board[y][x + 3] == currPlayer
		) {
			endGame();
		}
	}
	if (y - 3 >= 0 && x + 3 <= 6) {
		if (
			board[y][x] == currPlayer &&
			board[y - 1][x + 1] == currPlayer &&
			board[y - 2][x + 2] == currPlayer &&
			board[y - 3][x + 3] == currPlayer
		) {
			endGame();
		}
	}
	if (y - 3 >= 0 && x >= 0) {
		if (
			board[y][x] == currPlayer &&
			board[y - 1][x] == currPlayer &&
			board[y - 2][x] == currPlayer &&
			board[y - 3][x] == currPlayer
		) {
			endGame();
		}
	}
	if (y + 3 <= 5 && x - 3 >= 0) {
		if (
			board[y][x] == currPlayer &&
			board[y + 1][x - 1] == currPlayer &&
			board[y + 2][x - 2] == currPlayer &&
			board[y + 3][x - 3] == currPlayer
		) {
			endGame();
		}
	}
	if (y + 3 <= 5 && x >= 0) {
		if (
			board[y][x] == currPlayer &&
			board[y + 1][x] == currPlayer &&
			board[y + 2][x] == currPlayer &&
			board[y + 3][x] == currPlayer
		) {
			endGame();
		}
	} else if (y + 3 <= 5 && x + 3 <= 6) {
		if (
			board[y][x] == currPlayer &&
			board[y + 1][x + 1] == currPlayer &&
			board[y + 2][x + 2] == currPlayer &&
			board[y + 3][x + 3] == currPlayer
		) {
			endGame();
		}
	} else if (x - 3 <= 0 && y >= 0) {
		if (
			board[y][x] == currPlayer &&
			board[y][x - 1] == currPlayer &&
			board[y][x - 2] == currPlayer &&
			board[y][x - 3] == currPlayer
		) {
			endGame();
		}
	} else if (y + 3 <= 5 && x - 3 >= 0) {
		if (
			board[y][x] == currPlayer &&
			board[y + 1][x - 1] == currPlayer &&
			board[y + 2][x - 2] == currPlayer &&
			board[y + 3][x - 3] == currPlayer
		) {
			endGame();
		}
	} else if (y + 3 <= 5 && x >= 0) {
		if (
			board[y][x] == currPlayer &&
			board[y + 1][x] == currPlayer &&
			board[y + 2][x] == currPlayer &&
			board[y + 3][x] == currPlayer
		) {
			endGame();
		}
	} else if (y + 3 <= 5 && x + 3 <= 6) {
		if (
			board[y][x] == currPlayer &&
			board[y + 1][x + 1] == currPlayer &&
			board[y + 2][x + 2] == currPlayer &&
			board[y + 3][x + 3] == currPlayer
		) {
			endGame();
		}
	} else console.log(`checked ${y} ${x}`);

	if (board.every((row) => row.every((cell) => cell))) {
		return endGame('Tie!');
	}

	// switch players
	// TODO: switch currPlayer 1 <-> 2
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
