var counter = 100;   //line 1


function createItem(){
   var itemID = 1000;
   return function(){
      temp = itemID;
      itemID++;
	  
      return temp;}
}

var action = createItem();

console.log(action());
console.log(action());