var n = 5;
//Tower of hanoi recusive function
function hanoi(n){
   //BASIS CASES:
   if(n<0) {
      console.log("ERROR: neg factorial not defined"); 
      return undefined;
   }
   if(n<=1) return 1;

   //RECURSIVE CASES
   
   return 2*hanoi(n-1)+1;

}

for(i=1; i<7; i++)
   console.log("Hanoi(" + i + ") = " + hanoi(i));
