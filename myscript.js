//myscript.js
//javascript for calculator app

var calcArray = new Array;

//append function
function appendNum(id) {
  if(calcArray[calcArray.length-1] === ")") {
    //number is negative; add to it inside the parenthesis
    calcArray.pop();
    calcArray.push(id.innerHTML);
    calcArray.push(")");
  } else {
    //number is positive; just add it
    calcArray.push(id.innerHTML);
  }
    updateDisplay();
}

function appendOp(id) {
  if(calcArray.length > 0) {
    //if operator not already present, push the operator to the array
    if(!isNaN(calcArray[calcArray.length-1]) || calcArray[calcArray.length-1] === ")") {
      calcArray.push(id.innerHTML);      
    }
  } 
  updateDisplay();
}

//append decimal function
function appendDecimal(id) {
  //check for 0 entry
  if(calcArray.length === 0) {
    calcArray.push("0", ".")
  }
  //check for decimal:
  if(calcArray[calcArray.length-1] != ".") {
    //check to make sure decimal is being added to a valid number
    if(!isNaN(calcArray[calcArray.length-1])) {
      //check to see that a decimal isn't already present
      for(var i=calcArray.length-1; !isNaN(calcArray[i]); i--) { //while calcArray[i] is a number
        
        console.log(calcArray[i]);
        if(calcArray[i-1] === ".") {
          return;
        }
      }
      calcArray.push(".");
    } 
  }
  updateDisplay();
}

//append sign function
function appendSign(id) {
  if(calcArray.length === 0) {
    return;
  }
  //check for operation first, remove it from the array, and store it
  if(calcArray[calcArray.length-1] === "÷" || 
    calcArray[calcArray.length-1] === "×" || 
    calcArray[calcArray.length-1] === "—" || 
    calcArray[calcArray.length-1] === "+" ||
    calcArray[calcArray.length-1] === "%")  {
    var op = calcArray[calcArray.length-1];
    calcArray.pop();
  }
  
  //check if the last number is negative and if so, change it to 
  //positive by removing parenthesis and negative sign
  if(calcArray[calcArray.length-1] === ")") {
    var tmpArr = new Array;
    
    //remove the closing parenthesis
    calcArray.pop();
    
    //search for the index of the first non-number symbol
    for(var i=calcArray.length-1; !isNaN(calcArray[i]); i--) {
      var index = i;
    }
    
    //store the number in a temporary array
    tmpArr = calcArray.slice(index);
    //remove the number and "(-" before it by resizing calcArray
    calcArray.length = index-1;
      //push the number from tmpArr back onto calcArray
     for(var i=0; i<tmpArr.length; i++) {
      calcArray.push(tmpArr[i]);
    }
  }
  
  else {
    var tmpArr = new Array;
    //number is positive, so change it to negative
    for(var i=calcArray.length-1; !isNaN(calcArray[i]); i--) {
      //search for the index of the first non-number symbol
      var index = i;
    }
    //store the number in a temp array
    var tmpArr = calcArray.splice(index);
    //insert "(-" and ")" before and after number;
    tmpArr.unshift("(-");
    tmpArr.push(")");
    //push the number with the "(-" and ")" back onto calcArray
    for(var i=0; i<tmpArr.length; i++) {
      calcArray.push(tmpArr[i]);
    }
  }
  //push the stored operation back onto calcArray
  //calcArray.push(op);
  updateDisplay();
}

//clear function
function clearDisplay(id) {
    //document.querySelector("#inputField").value = "";
    calcArray.length = 0;
  updateDisplay();
}

//delete function
function delLast(id) {
  //check for decimal point
  if(calcArray[calcArray.length-1] === ".") {
    calcArray.length = calcArray.length - 1;
  }
  //if last number is a positive or operation, pop it from the array
  if(calcArray[calcArray.length-1] !== ")") {
    calcArray.length = calcArray.length-1;
  } 
  
  if(calcArray[calcArray.length-1] === ")") {
    //number is negative, delete closing parenthesis and last number from 
    //the array then add closing parenthesis back to the array
    console.log("in delete negative");
    calcArray.pop();
    calcArray.pop();
    calcArray.push(")");
    //check for empty parenthesis:
    console.log(calcArray.join("") === "(-)")
    if(calcArray.join("") === "(-)") {
      calcArray.length = 0;   
    }
    
  }
       
  //no numbers left, so delete parenthesis and negative sign
  if(calcArray[calcArray.length-2] === "(-") {
    calcArray.length = calcArray.length-2;
    console.log("")
  }
  
  updateDisplay();
}

//function to update display
function updateDisplay() {
  document.querySelector("#inputField").value = calcArray.join("");
  //var tmpNum = calcArray.join("");
  //document.querySelector("#inputField").value = tmpNum;
  console.log(calcArray);
}

//perform calculation function
function evalCalc() {

  var noSymbols = calcArray.join("").replace(/÷/g, '/').replace(/×/g, '*').replace(/—/g, '-');
  var answer = eval(noSymbols);

  answer = answer.toString();  

  //clear out calcArray
  calcArray.length = 0;
  
  if(answer === "0") {
    //if answer is 0, reset array
    calcArray.length = 0;
  } 
  
  if(answer[0] === "-") {
    answer = answer.split(",");
    answer.unshift("(");
    answer.push(")");
    answer = answer.join("");
    
    calcArray.length = 0;
  }
    
  //store answer to calcArray
  calcArray = answer.split("");
  
  updateDisplay();
}
