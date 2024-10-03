import axios from 'axios';
import * as paramUtils from './paramUtils.js';
import * as books from "./books.js";


let lastNameCompare = (a, b) => a.last_name.localeCompare(b.last_name);

class AuthorData { // an object we will use to cache the data
    static loaded = null;
    static async load() {
            const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json')
            this.loaded = data
    };
    
    static async get() {
        if (!this.loaded) await this.load();
        return new AuthorData(this.loaded);
    };

    constructor (d){
        this.data = d;
    }

    toArray() {
        return this.data
    }

    filterEQ(field, value, discardCase=false) {     // filter with an equals comparison
        let arr = this.data
        let ret = []
        for (let i in arr) {
            let author = arr[i];
            if (!discardCase && author[field] == value) ret.push(author);
            if (discardCase && author[field].toLowerCase() == value.toLowerCase()) ret.push(author);
        }

        return new AuthorData(ret);
    }


    filterAgeMin(min) {    // filter the authors by age maximum (inclusive)
        let arr = this.data
        let ret = []
        for (let i in arr) {
            let author = arr[i];
            let age = utils.authorToAge(author);
            if (age >= min) ret.push(author);
        }

        return new AuthorData(ret);
    }


    filterAgeMax(max) {    // filter the authors by age maximum (inclusive)
        let arr = this.data
        let ret = []
        for (let i in arr) {
            let author = arr[i];
            let age = utils.authorToAge(author);
            if (age <= max) ret.push(author);
        }

        return new AuthorData(ret);
    }

    async filterGenre(genre) {    // not case sensitive
        let arr = this.data;
        let ret = [];
        for (let i in arr){
            let author = arr[i]
            let bookList = await books.utils.IDsToBooks(author.books);
            let genreList = books.utils.booksToGenres(bookList).map((x)=>x.toLowerCase());
            if (genreList.includes(genre.toLowerCase())) ret.push(author);
        }

        return new AuthorData(ret);
    }



    firstMatch(field, value) {
        let arr = this.data
        for (let i in arr) {
            let author = arr[i];
            if (author[field] == value) return author;
        }

        throw 'no match';
    };

    first() {
        return this.data[0];
    }

}

export const utils = { // etc. utilities
    async namesToAuthor(first, last) { // retrieve an author by first and last name. case insensitive
        let authors = await AuthorData.get();
        let author = authors.filterEQ("first_name", first, true).filterEQ("last_name", last, true).first();

        return author;
    },

    authorToAge(author) {   // this function calculates two ages via two different methods to try and obtain concensus
        // the first method, checkes the duration of life. (not always equal to age)
        let now = new Date();
        let then = new Date(author.date_of_birth);
        let robotAge = now-then;
        let roboYears = robotAge/(1000*60*60*24*365);

        // now we check the birthday by counting birthdays
        let birthday = author.date_of_birth.split("/");
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        let day = now.getDay();

        let age = (year - parseInt(birthday[2])); // rough birthday estimate. assumes they already had a birthday this year
        age--; // invert the assumption - they did not have a birthday this year.
        // now we need to check if they had a birthday this year. if they did, we need to add 1.
        if(month > parseInt(birthday[0])) {
            age++;
        } else if (month == parseInt(birthday[0]) && day >= parseInt(birthday[1])) {
            age++;
        }
        //if(parseInt(roboYears) != age) console.debug(`Age disparity. r: ${roboYears} c: ${age} b: ${author.date_of_birth}`);

        return age; // counting years is more accurate to find their age, rather than countingthe duration since their birth.
        // but if for some reason you guys expect me to use Date() - Date(), then just swap to the below return statement
        //return parseInt(roboYears);
    }
}


export const getAuthorById = async (id) => {
    paramUtils.assertStr(id, "Author ID");
    let trimId = id.trim();
    paramUtils.assertStr(id, "Author ID (trimmed)");
    try{
        let authors = await AuthorData.get()
        return authors.firstMatch("id", id)
    } catch (e) {
        throw 'author not found'
    }
};

export const authorsMultipleGenres = async () => {
    let r = []
    let authors = (await AuthorData.get()).toArray().sort(lastNameCompare);
    for (let i in authors) {
        let author = authors[i];
        
        let bookList = await books.utils.IDsToBooks(author.books)

        
        let authorGenres = books.utils.booksToGenres(bookList)
        if (authorGenres.length > 1) r.push(`${author.first_name} ${author.last_name}`);
    }
    return r;
};

export const averagePageCount = async (firstName, lastName) => {
    paramUtils.assertStr(firstName, "First Name");
    paramUtils.assertStr(lastName, "Last Name");
    let trimFirst = firstName.trim();
    let trimLast = lastName.trim()
    paramUtils.assertStr(trimFirst, "First Name (trimmed)");
    paramUtils.assertStr(trimLast, "Last Name (trimmed)");

    let author = await utils.namesToAuthor(trimFirst, trimLast);

    if (!author) throw 'Author Not Found';
    
    let bookList = await books.utils.IDsToBooks(author.books);
    let sum = 0;
    let n = 0;
    for (let i in bookList) {
        sum+= bookList[i].pageCount;
        n++;
    }
    return (n ? sum/n : 0); // if there are no books (n=0) then we cant divide sum by n.

};

export const getAuthorsByAgeRange = async (minAge, maxAge) => {
    paramUtils.assertWholeNumber(minAge, "1st Argument");
    paramUtils.assertWholeNumber(maxAge, "2nd Argument");
    if (minAge < 1) throw `1st Argument must be greater than or equal to 1`;
    if (minAge >= maxAge) throw `minAge cannot be greater or equal to maxAge`;

    let Authors = (await AuthorData.get()).filterAgeMin(minAge).filterAgeMax(maxAge);

    let ret = Authors.toArray();
    if (ret.length == 0) throw `No Authors found between the ages of ${minAge} and ${maxAge}`;

    return ret;


};

export const authorsByGenre = async (genre) => {};
