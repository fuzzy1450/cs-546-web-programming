//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
export let assertStr = (v, varName) => {
	// this also does not allow empty strings
	if (typeof v !== "string")
		throw `${varName || v} must be a string. Recieved type ${typeof v}`;
	if (v.trim() == 0) throw `${varName || v} must not be empty.`; // this catches many things. most of them cant be used as keys for dicts.
};

export let min = (x, y) => x < y ? x : y;

let alphabet = "qwertyuiopasdfghjklzxcvbnm"	// for making sure that no numbers or symbols are in the username
let name_characters = "qwertyuiopasdfghjklzxcvbnm'" // included a single quote, for all the O'Briens out there.
let numbers ="1234567890"
let alpha_numer = alphabet+numbers
let uppercase = "QWERTYUIOPASDFGHJKLZXCVBNM"

export let assertLenMin = (v, l, varName) => {
	if (!v.length) throw `${varName || v} does not have a length.`
	if (v.length < l) throw `${varName || v} must have a length of at least ${l}. Found ${v.length}`
}

export let assertLenMax = (v, l, varName) => {
	if (!v.length) throw `${varName || v} does not have a length.`
	if (v.length > l) throw `${varName || v} must have a length of at most ${l}. Found ${v.length}`
}

export let assertValidName = (v, varName) =>{
	assertStr(v, varName)
	assertLenMax(v, 25, varName)
	assertLenMin(v, 2, varName)
	for(let i in v){
		if (!(name_characters.includes(v[i].toLowerCase()))) throw `${varName || v} must only contain letters`;
	}

}

export let assertValidUserID = (v, varName) => {
	assertStr(v, varName)
	assertLenMax(v, 10, varName)
	assertLenMin(v, 5, varName)
	for(let i in v){
		if (!(alphabet.includes(v[i].toLowerCase()))) throw `${varName || v} must only contain letters`;
	}
}

export let assertHasUppercases = (v, n, varName) => {
	assertStr(v, varName)
	let c = 0
	for (let i in v) {
		if(uppercase.includes(v[i])) c++;
	}
	if (c < n) throw `${varName || v} must contain at least ${n} Uppercase letters. Found ${c}.`
}

export let assertHasSymbols = (v, n, varName) => {
	assertStr(v, varName)
	let c = 0
	for (let i in v) {
		if (!alpha_numer.includes(v[i].toLowerCase())) c++;
	}
	if (c < n) throw `${varName || v} must contain at least ${n} Symbols. Found ${c}.`
}

export let assertHasNumbers = (v, n, varName) => {
	assertStr(v, varName)
	let c = 0
	for (let i in v) {
		if (numbers.includes(v[i])) c++;
	}
	if (c < n) throw `${varName || v} must contain at least ${n} Numbers. Found ${c}.`
}

export let assertHasNoSpaces = (v, varName) => {
	assertStr(v)
	if(v.includes(" ")) throw `${varName || v} must not contain any spaces`;
}

export let assertValidPassword = (v, varName) => {
	assertStr(v, varName)
	assertLenMin(v, 8, varName)
	assertHasUppercases(v, 1, varName)
	assertHasSymbols(v, 1, varName)
	assertHasNumbers(v, 1, varName)
	assertHasNoSpaces(v, varName)
}

export let assertValidQuote = (v, varName) => {
	assertStr(v, varName)
	assertLenMax(v, 255, varName)
	assertLenMin(v, 20, varName)
}

export let assertValidHexColor = (v, varName) => {
	assertStr(v, varName)
	let splt = v.split("#")

	try {
		assertLenMin(splt, 2)
		assertLenMax(splt, 2)
	} catch {
		throw `${varName || v} is not a valid hex code - must be in format #RRGGBB`
	}

	let hex = splt[1].toUpperCase()
	let hex_digits = "0123456789ABDEF"
	try {
		assertLenMax(hex, 6)
		assertLenMin(hex, 6)
	} catch {
		throw `${varName || v} is not a valid hex code - must be in format #RRGGBB`
	}

	for (let i in hex){
		if(!hex_digits.includes(hex[i])){
			throw `${varName || v} contains an invalid hex character (${hex[i]} @ ${i})`
		}
	}
}

export let assertStringsEqual = (v1, v2, varName1, varName2) => {
	assertStr(v1, varName1)
	assertStr(v2, varName2)

	if (v1!=v2) {
		throw `Assertion failed - ${v1 || varName1} is not equal to ${v2 || varName2}`
	}
}

export let assertStringsNotEqual = (v1, v2, varName1, varName2) => {
	assertStr(v1, varName1)
	assertStr(v2, varName2)

	if (v1==v2) {
		throw `Assertion failed - ${v1 || varName1} is equal to ${v2 || varName2}`
	}
}

let themeFields = ["backgroundColor","fontColor"]
export let assertValidTheme = (v, varName) => {
	let c = 0
	for(let i in v){
		if(themeFields.includes(i)) {c++} else throw `${varName || v} cannot contain a ${i} property`;
	}
	if (c != themeFields.length) throw `${varName || v} must contain ${themeFields.length} properties. Found ${c}`;

	let bg = v.backgroundColor.toUpperCase(), fc = v.fontColor.toUpperCase()
	assertValidHexColor(bg, "Background Color")
	assertValidHexColor(fc, "Font Color")
	assertStringsNotEqual(bg.toUpperCase(), fc.toUpperCase(), "Background Color", "Font Color")
}

let validRoles = ["user", "admin"]
export let assertValidRole = (v, varName) => {
	if(!validRoles.includes(v)) throw `${varName || v} is not a valid role.`;
}

export let generateStyleString= (themePreference) => {
	return `background-color: ${themePreference.backgroundColor}; color: ${themePreference.fontColor}`
}
