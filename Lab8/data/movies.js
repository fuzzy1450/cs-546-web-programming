//import axios, md5
import * as helpers from "../helpers.js";
import axios from "axios";
import "md5";

export const searchMoviesByTitle = async (title) => {
	helpers.assertStr(title);
  let titleTrim = title.trim();


  
  let found = [];
  let target = 50; // at most, 50 results.
  
  for (let n=1; ((n-1)*10)<target; n++){
    let response = await axios.get(`http://www.omdbapi.com/?apikey=CS546&s=${titleTrim}&page=${n}`);
    if(response.data.Response=="False") throw `No search results for movie title ${titleTrim}`; // This will only happen if n=1 and there are no results. otherwise, shifting the target will make sure this isnt hit by accident


    target=helpers.min(50, parseInt(response.data.totalResults))
    found.push(...response.data.Search)
  }

  return found
};

export const getMovieById = async (id) => {
  helpers.assertStr(id);
  let idTrim = id.trim();


  let response = await axios.get(`http://www.omdbapi.com/?apikey=CS546&i=${idTrim}`);



  if(response.data.Response=="False") throw `No movies with id ${idTrim}`

  return response.data
};


