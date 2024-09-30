import axios from 'axios';
import * as paramUtils from './paramUtils.js'

class BookData { // an object we will use to cache the data
    static d = null;
    static async load() {
            const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json')
            this.d = data.sort(lastNameCompare) // this will be the array of book objects
    };

    static async get() {
        if (!this.d) await this.load();
        return this.d;
    };

    static async firstMatch(field, value) {
        let arr = await this.get()
        for (let i in arr) {
            let book = arr[i];
            if (book[field] == value) return author;
        }

        throw 'no match';
    };

}

export const getBookById = async (id) => {
    paramUtils.assertStr(id, "Author ID");
    let trimId = id.trim();
    paramUtils.assertStr(id, "Author ID (trimmed)");
    try{
        return AuthorData.firstMatch("id", id)
    } catch (e) {
        throw 'book not found'
    }
};

export const booksByFormat = async () => {};

export const mostPopularGenre = async () => {};

export const booksByPublisher = async (publisher) => {};

export const averagePriceByGenre = async (genre) => {};
