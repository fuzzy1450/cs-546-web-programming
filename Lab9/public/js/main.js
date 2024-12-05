


const assertValidInt = (x) => {
    if (typeof x != "number") throw new Error("x must be a number");
    if (x != Number.parseInt(x)) throw new Error("x must be an integer");
    if (x < 0) throw new Error("x must be 0 or greater");
}

const fastFibLookupDict = {0: 0, 1: 1}; // dict lookup, to speedup the algo

let inf_index = 10000;
// infinity short circuit. similar to dict lookup, if fib(x) = infinity for some x, then fib(x+k) = infinity for all k>0
// fib(10k) = infinity, at least in chrome 131. it also doesnt exceed the maximum stack size, which is the primary motivation for doing this.


const fastFib = async (n) => {
    assertValidInt(n);
    if (n >= inf_index) return Infinity;
    if(fastFibLookupDict[n] != undefined) return fastFibLookupDict[n];

    let z = await fastFib(n-2);
    let y = await fastFib(n-1);
    let x = y + z;
    fastFibLookupDict[n] = x;

    if(x == Infinity) inf_index = Math.min(inf_index, n);
    return x;
}


const isPrime = async(n) => {
    for(let i = 2, sq = Math.sqrt(n); i<=sq; i++){
        if(n % i == 0) return false;
    }
    return n > 1;
}




const form = document.getElementById('fibForm');
const results = document.getElementById("fibonacciResults")

form.addEventListener("submit", async (e) => {
    e.preventDefault()
    console.dir(e)

    let data = new FormData(form);

    try {
        let x = Number.parseInt(data.get("fibonacci_index_input"))
        let fib_x = await fastFib(x);
        console.log(fib_x)
        let prime = (fib_x==Infinity) ? false : await isPrime(fib_x);

        let li = document.createElement("li")

        prime ? li.className="is-prime" : li.className="not-prime";

        li.appendChild(document.createTextNode(`The Fibonacci of ${x} is ${fib_x}.`))

        results.appendChild(li)

        results.scrollIntoView(false, "smooth")


    } catch (e) {
        alert(e)
    }
})
