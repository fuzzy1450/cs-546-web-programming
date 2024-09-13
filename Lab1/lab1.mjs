export const questionOne = (arr) => {
	let isComposite = (x) => { // quick and easy checking if an integer is composite.
		if (x == 1) return true; // the example in the doc considers 1s to be composite. 
		let n = 2, halfX = x/2
		while(n<=halfX){
			if(x%n == 0){
				return true;
			}
			n++;
		}
		return false;
	}
	
	let retArr = [0,0,false]
	
	for(i in arr){
		let x = arr[i]
		if(isComposite(x)){
			retArr[1]+=x
		} else {
			retArr[0]+=x
		}
	}
	
	retArr[2] = ((retArr[0]+retArr[1])%2==0)
	
	return retArr
};

export const questionTwo = (index, multiplier) => {
	if(Array.isArray(index)) {
		multiplier = index[1]
		index = index[0]
	}
	let fibonacci = function fib(n) {
		if(n<0){
			throw Error(`Bad Argument - Cannot get the fibbonaci of ${n}!`) // this will also catch non-integers!
		} else if(n==0 || n==1){
			return n
		} else {
			return fib(n-1)+fib(n-2)
		}
	}
	
	
	fibIndex = fibonacci(index)
	retObj = {}
	retObj[fibIndex] = fibIndex * multiplier
	return retObj
};


export const questionThree = (str) => {
	let validCharCode = (i) => {
		if(i == 32) { // char code for space (' ')
			return true
		} else if(i>=65 && i<=90) { // 'A' - 'Z'
			return true;
		} else if (i>=97 && i<=122) { // 'a' - 'z'
			return true;
		} else {
			return false;
		}
	}
	
	let newStr = ""
	
	for(i in str){ // sanitize the input
		if( validCharCode(str.charCodeAt(i)) ){
			newStr += str[i]
		}
	}
	
	sentenceArray = newStr.split(' ');
	
	return sentenceArray.length;
	
};

export const questionFour = (arr) => {
	let n = arr.length
	let sum = 0
	
	for(i in arr){
		let x = arr[i]
		sum+= (x*x*x)
	}
	
	// we are NOT using the math library
	// we ARE reinventing the wheel
	// we will preferentially round up if the true mean has 2 n
	let remain = sum%n
	if(remain == 0){
		return sum/n
	} else if(remain >= n/2){ // the eq part of the gr_eq makes our logic preferntially round up
		sum += (n-remain)
		return sum/n
		
	} else { // otherwise, we round down
		sum -= remain
		return sum/n
	}
};



//DO NOT FORGET TO UPDATE THE INFORMATION BELOW OR IT WILL BE -2 POINTS PER FIELD THAT IS MISSING OR NOT CHANGED.
export const studentInfo = {
  firstName: 'Evan',
  lastName: 'Kupsch',
  studentId: '10428138'
};
