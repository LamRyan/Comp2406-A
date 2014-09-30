var item1 =150;   

function f(x) { 
  var item2 = 20; 
  
  function g(x) {
      var tax = 1.13;           
      return (item1 + item2 + x) * tax;     
  }
          
  return g(x);     
}
   
console.log(f(7));
