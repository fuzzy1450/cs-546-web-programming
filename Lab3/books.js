import axios from 'axios';
import * as paramUtils from './paramUtils.js';

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

export const utils = { // etc. utilities
    IDsToBooks: async(ids) => { // turn an array of ids into an array of books
        let r = [];
        for(let i in ids) {
            r.push(await getBookById(ids[i]))
        }
        return r;
    },

    booksToGenres: (books)=>{ // turn an array of books into an array of unique genres
        let s = {};
        for (let i in books){
            let book = books[i]
            for (let j in book.genres){
                let genre = book.genres[j]
                if(!s[genre]) s[genre]=0;
                s[genre]++;
            }
        }

        let r=[];
        for (let i in s){
            r.push(i);
        }
        return r;
    }
}

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

export const booksByFormat = async () => {
    let books = await BookData.get();
    let bookList = books.toArray();
    let formatDict = {};
    for (let i in bookList) {
        let book = bookList[i];
        let formatList = book.format;
        for (let j in formatList) {
            let fmt = formatList[j]
            if(formatDict[fmt]) {formatDict[fmt]++}
            else {formatDict[fmt] = 1};
        }
    }
    return formatDict;

};

export const mostPopularGenre = async () => {
    let books = await BookData.get();
    let bookList = books.toArray();
    let genreDict = {};

    for (let i in bookList) {
        let book = bookList[i];
        let genreList = book.genres;
        for (let j in genreList) {
            let genre = genreList[j]
            if(genreDict[genre]) {genreDict[genre]++}
            else {genreDict[genre] = 1};
        }
    }

    let s = []
    let m = 0;

    for (let genre in genreDict) {
        if(genreDict[genre] > m) {
            s = [genre];
            m = genreDict[genre];
        } else if (genreDict[genre] == m) {
            s.push(genre);
        }
    }
    let alphaCmp = (a, b) => a.localeCompare(b);

    s.sort(alphaCmp);
    if(s.length == 1) return s[0];
    return s;

};

export const booksByPublisher = async (publisher) => {
    paramUtils.assertStr(publisher, "1st Argument");
    let trimPublisher = publisher.trim().toLowerCase();
    paramUtils.assertStr(trimPublisher, "1st Argument (trimmed)");

    let books = await BookData.get();
    let bookList = books.toArray();
    
    let ret = [];

    for (let i in bookList) {
        let book = bookList[i];
        if(book.publisher.toLowerCase().trim() == trimPublisher) ret.push(book);
    }

    if (ret.length == 0) throw 'Publisher does not exist';

    return ret;

};

export const averagePriceByGenre = async (genre) => {};
