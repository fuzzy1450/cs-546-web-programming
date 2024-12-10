// helper functions
let assertStr = (v, varName) => {
	// this also does not allow empty strings
	if (typeof v !== "string")
		throw `${varName || v} must be a string. Recieved type ${typeof v}`;
	if (v.trim() == 0) throw `${varName || v} must not be empty.`; // this catches many things. most of them cant be used as keys for dicts.
};

let min = (x, y) => x < y ? x : y;

let alphabet = "qwertyuiopasdfghjklzxcvbnm"	// for making sure that no numbers or symbols are in the username
let name_characters = "qwertyuiopasdfghjklzxcvbnm'" // included a single quote, for all the O'Briens out there.
let numbers ="1234567890"
let alpha_numer = alphabet+numbers
let uppercase = "QWERTYUIOPASDFGHJKLZXCVBNM"

let assertLenMin = (v, l, varName) => {
	if (!v.length) throw `${varName || v} does not have a length.`
	if (v.length < l) throw `${varName || v} must have a length of at least ${l}. Found ${v.length}`
}

let assertLenMax = (v, l, varName) => {
	if (!v.length) throw `${varName || v} does not have a length.`
	if (v.length > l) throw `${varName || v} must have a length of at most ${l}. Found ${v.length}`
}

let assertValidName = (v, varName) =>{
	assertStr(v, varName)
	assertLenMax(v, 25, varName)
	assertLenMin(v, 2, varName)
	for(let i in v){
		if (!(name_characters.includes(v[i].toLowerCase()))) throw `${varName || v} must only contain letters`;
	}

}

let assertValidUserID = (v, varName) => {
	assertStr(v, varName)
	assertLenMax(v, 10, varName)
	assertLenMin(v, 5, varName)
	for(let i in v){
		if (!(alphabet.includes(v[i].toLowerCase()))) throw `${varName || v} must only contain letters`;
	}
}

let assertHasUppercases = (v, n, varName) => {
	assertStr(v, varName)
	let c = 0
	for (let i in v) {
		if(uppercase.includes(v[i])) c++;
	}
	if (c < n) throw `${varName || v} must contain at least ${n} Uppercase letters. Found ${c}.`
}

let assertHasSymbols = (v, n, varName) => {
	assertStr(v, varName)
	let c = 0
	for (let i in v) {
		if (!alpha_numer.includes(v[i].toLowerCase())) c++;
	}
	if (c < n) throw `${varName || v} must contain at least ${n} Symbols. Found ${c}.`
}

let assertHasNumbers = (v, n, varName) => {
	assertStr(v, varName)
	let c = 0
	for (let i in v) {
		if (numbers.includes(v[i])) c++;
	}
	if (c < n) throw `${varName || v} must contain at least ${n} Numbers. Found ${c}.`
}

let assertHasNoSpaces = (v, varName) => {
	assertStr(v)
	if(v.includes(" ")) throw `${varName || v} must not contain any spaces`;
}

let assertValidPassword = (v, varName) => {
	assertStr(v, varName)
	assertLenMin(v, 8, varName)
	assertHasUppercases(v, 1, varName)
	assertHasSymbols(v, 1, varName)
	assertHasNumbers(v, 1, varName)
	assertHasNoSpaces(v, varName)
}

let assertValidQuote = (v, varName) => {
	assertStr(v, varName)
	assertLenMax(v, 255, varName)
	assertLenMin(v, 20, varName)
}

let assertValidHexColor = (v, varName) => {
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

let assertStringsEqual = (v1, v2, varName1, varName2) => {
	assertStr(v1, varName1)
	assertStr(v2, varName2)

	if (v1!=v2) {
		throw `Assertion failed - ${varName1 || v1} is not equal to ${varName2 || v2}`
	}
}

let assertStringsNotEqual = (v1, v2, varName1, varName2) => {
	assertStr(v1, varName1)
	assertStr(v2, varName2)

	if (v1==v2) {
		throw `Assertion failed - ${varName1 || v1} is equal to ${varName2 || v2}`
	}
}

let themeFields = ["backgroundColor","fontColor"]
let assertValidTheme = (v, varName) => {
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
let assertValidRole = (v, varName) => {
	if(!validRoles.includes(v)) throw `${varName || v} is not a valid role.`;
}



const signIn = document.getElementById('signin-form')
const signUp = document.getElementById('signup-form')

const error_message = document.getElementById("local_error_display")

const display_error = (message) => {
    error_message.innerHTML = message
    error_message.style.display = "block"
}

if(signIn) {
    console.log("Detected Sign In Page")
    signIn.addEventListener("submit", async (e) =>{
        let data = new FormData(signIn)

        try {
            let userId = data.get("userId")
            let password = data.get("password")
            assertValidUserID(userId, "User ID")
            assertValidPassword(password, "Password")
        } catch (er) {
            display_error(`${er}`)
            e.preventDefault()
        }
    })
}


if(signUp) {
    console.log("Detected Sign Up Page")
    signUp.addEventListener("submit", async (e) =>{
        let data = new FormData(signUp)

        try {
            let firstName = data.get("firstName")
            let lastName = data.get("lastName")
            let userId = data.get("userId")
            let password = data.get("password")
            let confirmPassword = data.get("confirmPassword")
            let favoriteQuote = data.get("favoriteQuote")
            let role = data.get("role")
            let backgroundColor = data.get("backgroundColor")
            let fontColor = data.get("fontColor")

            assertStr(firstName, "First Name")
            assertStr(lastName, "Last Name")
            assertStr(userId, "User ID")
            assertStr(password, "Password")
            assertStr(confirmPassword, "Password Confirmation")
            assertStr(favoriteQuote, "Favorite Quote")
            assertStr(role, "Role")
            assertStr(backgroundColor, "Background Color")
            assertStr(fontColor, "Font Color")
            
            assertValidName(firstName.trim(), "First Name")
            assertValidName(lastName.trim(), "Last Name")

            assertValidUserID(userId.trim(), "User ID")
            assertValidPassword(password.trim(), "Password")
            assertStringsEqual(password, confirmPassword, "password", "password confirmation")

            assertValidQuote(favoriteQuote.trim(), "Favorite Quote")

            assertValidTheme({backgroundColor: backgroundColor.trim(), fontColor: fontColor.trim()}, "Theme Preferences")

            assertValidRole(role.trim(), "Account Role")

        } catch (er) {
            display_error(`${er}`)
            e.preventDefault()
        }
    })
}


