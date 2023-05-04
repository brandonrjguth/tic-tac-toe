const game = {
    // The game board represented as a 2D array
    grid: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ],

    // Method to initialize the game
    init: function () {
        // Set the current player to player 1
        this.currentPlayer = 1;
        // Get the board and currentPlayer elements from the DOM
        const board = document.getElementById('board');
        const currentPlayerDisplay = document.getElementById('currentPlayer');

        // Loop through the rows of the grid
        for (let x = 0; x < this.grid.length; x++) {
            // Create a new row element and add it to the board
            let gridRow = document.createElement('div');
            gridRow.classList.add("row");
            board.appendChild(gridRow);

            // Loop through the columns of the current row
            for (let y = 0; y < this.grid[x].length; y++) {
                // Create a new box element and add it to the current row
                let gridBox = document.createElement('div');
                gridBox.classList.add('box');
                gridBox.setAttribute('id', 'gridX' + x + "Y" + y);
                // Add an event listener for player moves
                gridBox.addEventListener("click", () => {
                    this.play(x, y, gridBox);
                })
                gridRow.appendChild(gridBox);
            }
        }
    },

    // Method to handle player moves
    play: function (x, y, gridBox) {
        // Check which player's turn it is
        if (this.currentPlayer === 1) {
            // Update the game state and display for player 1's move
            this.grid[x][y] = "X";
            gridBox.textContent = "X"
            // Set the current player to player 2
            this.currentPlayer = 2;
        } else if (this.currentPlayer === 2) {
            // Update the game state and display for player 2's move
            this.grid[x][y] = "O";
            gridBox.textContent = "O"
            // Set the current player to player 1
            this.currentPlayer = 1;
        }

        // Check for win conditions
        console.log("valid row = " + this.evalRow(x, y));
        console.log("valid column = " + this.evalCol(x, y));
        console.log("valid diagonal = " + this.evalDiagonal(x, y));
    },

    // Method to evaluate rows for a win condition
    evalRow: function (row, column) {
        for (let i = 0; i < this.grid.length; i++) {
            let startValue = this.grid[row][column]
            if (this.grid[row][i] !== startValue) {
                return false;
            }
        }
        return true
    },

    // Method to evaluate columns for a win condition
    evalCol: function (row, column) {
        for (let i = 0; i < this.grid.length; i++) {
            let startValue = this.grid[row][column]
            if (this.grid[i][column] !== startValue) {
                return false;
            }
        }
        return true
    },

    // Method to evaluate diagonals for a win condition
    evalDiagonal: function (row, column) {

        // Check diagonal from top left to bottom right
        //Start out true, if false, break and continue to check
        //top right to top left
        let diagonalComplete = true;
        let startValue = this.grid[row][column];
        for (let i = 0; i < this.grid.length; i++) {
            if (startValue !== this.grid[i][i]) {
                diagonalComplete = false;
                break
            }
        }

        //return true if top left to bottom right is all the
        if (diagonalComplete) {
            return true
        }

        // Check diagonal from top right to bottom left
        //Start out true, if false, break 
        diagonalComplete = true

        for (let i = 0; i < this.grid.length; i++) {
            if (startValue !== this.grid[i][this.grid.length - 1 - i]) {
                diagonalComplete = false;
                return false
            }
        }
        if (diagonalComplete) {
            return true
        }
    }
}

// Initialize the game when the script is loaded
game.init();