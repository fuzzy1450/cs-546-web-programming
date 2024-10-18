/*Here, you can export the data functions
to get the authors, books, getAuthorByID, getBookById.  You will import these functions into your routing files and call the relevant function depending on the route. 
*/
import axios from 'axios';
import * as paramUtils from '../helpers.js';

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

class BookData { // an object we will use to cache the data
    static loaded = null;
    static async load() {
            const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json')
            this.loaded = data // this will be the array of book objects
    };

    static async get() {
        if (!this.loaded) await this.load();
        return new BookData(this.loaded);
    };

    constructor (d){
        this.data = d;
    }

    toArray() {
        return this.data
    }

    first() {
        return this.data[0];
    }

    firstMatch(field, value) {
        let arr = this.data
        for (let i in arr) {
            let book = arr[i];
            if (book[field] == value) return book;
        }

        throw 'no match';
    };

    filterGenre(genre) {    // not case sensitive
        let arr = this.data;
        let ret = [];
        for (let i in arr){
            let book = arr[i];
            let genreList = book.genres.map((x)=>x.toLowerCase());
            if (genreList.includes(genre.toLowerCase())) ret.push(book);
        }

        return new BookData(ret);
    }

    calculateAveragePrice(){
        let arr = this.data;
        let sum = 0;
        let n = 0;

        for (let i in arr) {
            let book = arr[i];
            sum+=book.price;
            n++;
        }

        return n ? sum/n : 0;
    }

}


export const getAuthors = async () => {
    return (await AuthorData.get()).toArray();
}

export const getBooks = async () => {
    return (await BookData.get()).toArray();
};

export const getAuthorById = async (id) => {
    paramUtils.assertStr(id, "Author ID");
    let trimId = id.trim();
    paramUtils.assertStr(trimId, "Author ID (trimmed)");
    try{
        let authors = await AuthorData.get()
        return authors.firstMatch("id", trimId)
    } catch (e) {
        throw 'author not found'
    }
};


export const getBookById = async (id) => {
    paramUtils.assertStr(id, "Book ID");
    let trimId = id.trim();
    paramUtils.assertStr(trimId, "Book ID (trimmed)");
    let books = await BookData.get();

    try{
        return books.firstMatch("id", trimId)
    } catch (e) {
        throw 'book not found'
    }
};
