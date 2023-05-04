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
        console.log("win = " + this.evalWin(x, y));
    },

    // Method to evaluate win conditions
    // Method to evaluate win conditions
    evalWin: function (row, column) {
        // Get the value of the current player's move
        let startValue = this.grid[row][column];
        // Variable to track if a win condition has been met
        let win = true;

        // Check row for a win condition
        for (let i = 0; i < this.grid.length; i++) {
            if (this.grid[row][i] !== startValue) {
                win = false;
                break;
            }
        }

        // Check column for a win condition if no win in row
        if (!win) {
            win = true;
            for (let i = 0; i < this.grid.length; i++) {
                if (this.grid[i][column] !== startValue) {
                    win = false;
                    break;
                }
            }
        }

        // Check diagonal for a win condition if no win in row or column
        if (!win) {
            win = true;
            for (let i = 0; i < this.grid.length; i++) {
                if (startValue !== this.grid[i][i]) {
                    win = false;
                    break;
                }
            }

            // Check other diagonal if no win in first diagonal
            if (!win) {
                win = true;
                for (let i = 0; i < this.grid.length; i++) {
                    if (startValue !== this.grid[i][this.grid.length - 1 - i]) {
                        win = false;
                        break;
                    }
                }
            }
        }

        // Return true if a win condition has been met, false otherwise
        return win;
    }

}

// Initialize the game when the script is loaded
game.init();