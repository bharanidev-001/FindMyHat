const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(fieldArray){
    this.field=fieldArray;
  }
  // this.field=[];
  print(){
    for(let row of this.field){
      console.log(row.join(' '))
    } 
  }

  move(row,col){
   if (row < 0 || row >= this.field.length ||
        col < 0 || col >= this.field[0].length ||
        this.field[row][col] === hole) {
      console.log("Game over!");
      return false;
    } else if (this.field[row][col] === hat) {
      console.log("Congratulations!");
      return true;
    }

    this.field[row][col] = pathCharacter;
    return null;
  }

  generateField(height,width,holePercentage){
    let arrayField=[];

    for(let i=0;i<height;i++){
      const rows=[];

      for(let j=0;j<width;j++){

        let random=  Math.floor(Math.random()*2);

        if(random < holePercentage){
          rows.push(hole)
        }else{
          rows.push(fieldCharacter)
        }        
      }
      arrayField.push(rows)

      
    }
    
  const randomRow = Math.floor(Math.random() * height);
  const randomCol = Math.floor(Math.random() * width);
  arrayField[0][0]=pathCharacter;
  arrayField[randomRow][randomCol] = hat;
  // this.field=arrayField;
  // console.log(arrayField)
    return arrayField;
  }


}

const generatedField = new Field().generateField(3, 4, 0.3);

// for (const row of generatedField) {
//   console.log(row);
// }
const myField = new Field([...generatedField]);
myField.print();
// myField.generateField(3,4,0.3)

let rowIndex=0;
let colIndex=0;

while (true){
  const userInput = prompt("Which direction would you like to move? (u/d/l/r): ");
  let newRow = rowIndex;
  let newCol = colIndex;

  switch(userInput){
  case 'u': newRow-=1;
  break;
  case 'd': newRow+=1;
  break;
  case 'l':newCol-=1;
  break;
  case 'r':newCol+=1;
  break;
}
const result = myField.move(newRow, newCol);

if (result === true || result === false) {
    myField.print(); 
    break;
  }

  rowIndex = newRow;
  colIndex = newCol;
  myField.print(); 
  
}





