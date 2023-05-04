const game = {
    grid:
        [
            [null,null,null],
            [null,null,null],
            [null,null,null]
        ],

    init:function(){

        this.currentPlayer = 1;
        const board = document.getElementById('board');
        const currentPlayer = document.getElementById('currentPlayer');

        for (let x = 0; x < this.grid.length; x++){
            let gridRow = document.createElement('div');
            gridRow.classList.add("row");
            board.appendChild(gridRow);

            for (let y=0; y< this.grid[x].length;  y++){
                let gridBox = document.createElement('div');
                gridBox.classList.add('box');
                gridBox.setAttribute('id', 'gridX'+x+"Y"+y);
                gridBox.addEventListener("click", () => {
                    this.play(x, y, gridBox);
                })
                gridRow.appendChild(gridBox);
            }
        }
    },

    play: function(x,y, gridBox){
        if (this.currentPlayer === 1){
            this.grid[x][y] = "X";
            gridBox.textContent = "X"
            this.currentPlayer = 2;
        } else if (this.currentPlayer === 2){
            this.grid[x][y] = "O";
            gridBox.textContent = "O"
            this.currentPlayer = 1;
        }

        console.log("valid row = "+this.evalRow(x,y));
        console.log("valid column = "+this.evalCol(x,y));
        console.log("valid diagonal = "+this.evalDiagonal(x,y));
    },
    evalRow:function(row,column){
        //evaluate Row
        for (let i = 0; i < this.grid.length; i++) {
            let startValue = this.grid[row][column]
            if (this.grid[row][i] !== startValue) {
                return false;
            } 
        }  
        return true
    },
    evalCol:function(row,column){
        //evalute Column
        for (let i = 0; i < this.grid.length; i++) {
            let startValue = this.grid[row][column]
            if (this.grid[i][column] !== startValue) {
                return false;
            } 
    }  
    return true
    },
    evalDiagonal:function(row,column){

        let diagonalComplete = true;
        let startValue = this.grid[row][column];
        //evaluate Diagonal
        for (let i = 0; i < this.grid.length; i++) {
            if (startValue !== this.grid[i][i]) {
            diagonalComplete = false;   
            console.log(diagonalComplete);
            break     
            } 
        }
        
        if (diagonalComplete) {
            return true
        }

        diagonalComplete = true
        
        for (let i = 0; i < this.grid.length; i++) {
            if (startValue !== this.grid[i][this.grid.length -1 - i]) {
            diagonalComplete = false;   
            break         
            }  
        }

        if (diagonalComplete) {
            return true
        }   

   

    return false
}
    
} 

game.init();
