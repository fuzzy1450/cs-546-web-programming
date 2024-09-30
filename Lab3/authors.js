import axios from 'axios';
import * as paramUtils from './paramUtils.js'

//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Authors data link: https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json

//you must use axios to get the data

class AuthorData {
    static d = null;
    static async load() {
            const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json')
            this.d = data // this will be the array of author objects
    };

    static async get() {
        if (!this.d) await this.load();
        return this.d;
    };

}

const getAuthorById = async (id) => {};

const authorsMultipleGenres = async () => {};

const averagePageCount = async (firstName, lastName) => {};

const getAuthorsByAgeRange = async (minAge, maxAge) => {};

const authorsByGenre = async (genre) => {};
