import axios from 'axios';
import * as paramUtils from './paramUtils.js';
import * as books from "./books.js";


let lastNameCompare = (a, b) => a.last_name.localeCompare(b.last_name);

class AuthorData { // an object we will use to cache the data
    static d = null;
    static async load() {
            const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json')
            this.d = data
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

export const utils = { // etc. utilities
    async namesToAuthor(first, last) { // retrieve an author by first and last name. case insensitive
        let authors = await AuthorData.get();
        for (let i in authors) {
            let author = authors[i];
            if (author.first_name.toLowerCase() == first.toLowerCase() 
              && author.last_name.toLowerCase() == last.toLowerCase()) {
                return author;
                }
        }
        return null;
    }
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

export const authorsMultipleGenres = async () => {
    let r = []
    let authors = (await AuthorData.get()).sort(lastNameCompare);
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

export const getAuthorsByAgeRange = async (minAge, maxAge) => {};

export const authorsByGenre = async (genre) => {};
