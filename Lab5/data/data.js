/*Here, you can export the data functions
to get the authors, books, getAuthorByID, getBookById.  You will import these functions into your routing files and call the relevant function depending on the route. 
*/

import * as books from "./books.js";
import * as authors from "./authors.js";

export const getAuthors = authors.getAuthors;

export const getBooks = books.getBooks;

export const getAuthorById = authors.getAuthorById;

export const getBookById = books.getBookById;