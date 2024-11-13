//import express and express router as shown in lecture code and worked in previous labs.  Import your data functions from /data/movies.js that you will call in your routes below
import express from "express";
const router = express.Router();

import * as helpers from "../helpers.js";
import * as movies from '../data/movies.js';

router.route("/").get(async (req, res) => {
	res.render("home", {
		pageTitle: "Movie Search"
	});
});

router.route("/moviesearch").post(async (req, res) => {
	let title = req.body.searchByTitle


	try {
		helpers.assertStr(title)
	} catch (e) {
		res.render("error", {
			pageTitle: "Search Error",
			error: "You must enter a search term!",
			errorClass:"bad-input"
		})
		return
	}

	let titleTrim = title.trim()
	let searchResults;

	try {
		searchResults = await movies.searchMoviesByTitle(titleTrim)
	} catch (e) {
		console.error(e)
		res.render("error", {
			pageTitle: "Search Error",
			error: `We're sorry, but no results were found for ${titleTrim}.`,
			errorClass:"movie-not-found"
		})
		return
	}
	res.render("searchResults", {pageTitle: "Search Results", movies:searchResults})
	return;


	//code here for POST this is where your form will be submitting searchByTitle and then call your data function passing in the searchByTitle and then rendering the search results of up to 50 Movies.
});

router.route("/getmovie/:id").get(async (req, res) => {
	let id = req.params.id
	try {
		helpers.assertStr(id)
	} catch (e) {
		res.render("error", {
			pageTitle: "ID Error",
			error: "You must enter an id.",
			errorClass:"bad-input"
		})
		return
	}

	let idTrim = id.trim();

	let movieResult;

	try {
		movieResult = await movies.getMovieById(idTrim)
	} catch (e) {
		res.render("error", {
			pageTitle: "Search Error",
			error: `We're sorry, but no movie was found with id ${idTrim}.`,
			errorClass:"movie-not-found"
		})
		return
	}
	res.render("getmovie", {movie: movieResult})
	return;


});

export { router };
