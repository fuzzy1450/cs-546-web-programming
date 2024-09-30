import axios from 'axios';
import * as paramUtils from './paramUtils.js'


let lastNameCompare = (a, b) => a.last_name.localeCompare(b.last_name);

class AuthorData { // an object we will use to cache the data
    static d = null;
    static async load() {
            const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json')
            this.d = data.sort(lastNameCompare)
    };

    static async get() {
        if (!this.d) await this.load();
        return this.d;
    };

    static async firstMatch(field, value) {
        let arr = await this.get()
        for (let i in arr) {
            let author = arr[i];
            if (author[field] == value) return author;
        }

        throw 'no match';
    };

}

export const getAuthorById = async (id) => {
    paramUtils.assertStr(id, "Author ID");
    let trimId = id.trim();
    paramUtils.assertStr(id, "Author ID (trimmed)");
    try{
        return AuthorData.firstMatch("id", id)
    } catch (e) {
        throw 'author not found'
    }
};

export const authorsMultipleGenres = async () => {};

export const averagePageCount = async (firstName, lastName) => {};

export const getAuthorsByAgeRange = async (minAge, maxAge) => {};

export const authorsByGenre = async (genre) => {};
