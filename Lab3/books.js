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
    paramUtils.assertStr(id, "Book ID (trimmed)");
    try{
        return BookData.firstMatch("id", id)
    } catch (e) {
        throw 'book not found'
    }
};

export const booksByFormat = async () => {};

export const mostPopularGenre = async () => {};

export const booksByPublisher = async (publisher) => {};

export const averagePriceByGenre = async (genre) => {};
