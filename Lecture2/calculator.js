export const addTwoNumbers = (num1, num2) => {
	assertNum(num1, "num1")
	assertNum(num1, "num2")
	return num1+num2
};

export const subtractTwoNumbers = (num1, num2) => {
	assertNum(num1, "num1")
	assertNum(num1, "num2")
	return num1-num2
};

export const multiplyTwoNumbers = (num1, num2) => {
	assertNum(num1, "num1")
	assertNum(num1, "num2")
	return num1*num2
};
export const divideTwoNumbers = (num1, num2) => {
	assertNum(num1, "num1")
	assertNum(num1, "num2")
	if(num2 == 0) throw "Error: division by zero"
	return num1/num2
};



const assertNum = (v, varName) => {
	if(typeof v != 'number') throw `${varName || v} is not of type Number`;
	if(isNaN(v)) throw `${varName || v} is NaN`
}

