export let assertStr = (v, varName) => {
	// this also does not allow empty strings
	if (typeof v !== "string")
		throw `${varName || v} must be a string. Recieved type ${typeof v}`;
	if (v.trim() == 0) throw `${varName || v} must not be empty.`; // this catches many things. most of them cant be used as keys for dicts.
};

export let min = (x, y) => x < y ? x : y;
