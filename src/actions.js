import {
	GET_MOVIE_LIST,
	GET_MOVIE_LIST_SUCCESS,
	GET_MOVIE_LIST_ERROR,

	GET_MOVIE_SYNOPSIS,
	GET_MOVIE_SYNOPSIS_SUCCESS,
	GET_MOVIE_SYNOPSIS_ERROR,

	GET_MOVIE_SEARCH,
	GET_MOVIE_SEARCH_SUCCESS,
	GET_MOVIE_SEARCH_ERROR,

} from './constants/ActionTypes';

const requests = require('superagent');
const imdbURI = "https://imdb8.p.rapidapi.com";
const app_key = "602625c36amsh372a5ec184b3689p110defjsnd37a14902eab";
const requestJobsList = (type) => {
	switch (type) {
		case GET_MOVIE_LIST:
			return {type: GET_MOVIE_LIST}
		case GET_MOVIE_SYNOPSIS:
			return {type: GET_MOVIE_SYNOPSIS}
		case GET_MOVIE_SEARCH:
				return {type: GET_MOVIE_SEARCH}
		default:
			return {type: null}
	}
}

const responseJobsList = (type, responseItem) => {
	//console.log(type, responseItem, "from fdfd")
	switch (type) {
		case GET_MOVIE_LIST_SUCCESS:
			return {type: GET_MOVIE_LIST_SUCCESS, result: responseItem}
		case GET_MOVIE_SYNOPSIS_SUCCESS:
			return {type: GET_MOVIE_SYNOPSIS_SUCCESS,  result: responseItem}
		case GET_MOVIE_SEARCH_SUCCESS:
			return {type: GET_MOVIE_SEARCH_SUCCESS,  result: responseItem}
		default:
			return {type: null}
	}
}

const responseJobListError = (type, error) => {
	switch (type) {
		case GET_MOVIE_LIST_ERROR:
			return {type: GET_MOVIE_LIST_ERROR, error}
		case GET_MOVIE_SYNOPSIS_ERROR:
			return {type: GET_MOVIE_SYNOPSIS_ERROR, error}
		case GET_MOVIE_SEARCH_ERROR:
				return {type: GET_MOVIE_SEARCH_ERROR, error}
		default:
			return {type: null}
	}

}

export const getMoviesCollection = () => (dispatch) => {
  dispatch(requestJobsList(GET_MOVIE_LIST));

  requests.get(`${imdbURI}/title/get-most-popular-movies`)
	.set('Accept', 'application/json')
	.set("X-RapidAPI-Key", app_key)
	.end(async (err, res) => {
			let result =  [];
			try {
				result = await getMoviesDetailsFromLinks(res.body);
			}catch(err){
				console.log(err);
			}
			if(err) return dispatch(responseJobListError(GET_MOVIE_LIST_ERROR, err))
			dispatch(responseJobsList(GET_MOVIE_LIST_SUCCESS, result))
		
		});
}

export const getSynopsisData = (tconst) => (dispatch) => {
	
	dispatch(requestJobsList(GET_MOVIE_SYNOPSIS));

	requests.get(`${imdbURI}/title/get-synopses?tconst=${tconst}`)
		.set('Accept', 'application/json')
		.set("X-RapidAPI-Key", app_key)
		.end(async (err, res) => {
		if(err) return dispatch(responseJobListError(GET_MOVIE_SYNOPSIS_ERROR, err))
		dispatch(responseJobsList(GET_MOVIE_SYNOPSIS_SUCCESS, res.body))
		})

}

export const getSearchData = (queryS) => (dispatch) => {
	dispatch(requestJobsList(GET_MOVIE_SEARCH));
	requests.get(`${imdbURI}/auto-complete?q=${queryS}`)
		.set('Accept', 'application/json')
		.set("X-RapidAPI-Key", app_key)
		.end(async (err, res) => {
			if(err) return dispatch(responseJobListError(GET_MOVIE_SEARCH_ERROR, err))
			let result = res.body || [];
			result = Array.isArray(result.d) ? result.d.filter(it => it.id && it.id.includes("tt") && !it.id.includes("/")).map(item => item.id)  : [];
			try{
				result = await getMoviesDetailsFromId(result);
			}catch(err){
				console.log("Error", err);
			}
			dispatch(responseJobsList(GET_MOVIE_SEARCH_SUCCESS, result))
	});
}

async function getMoviesDetailsFromLinks(topMovies){
	const topLinks = Array.isArray(topMovies) ?  topMovies : [];
	const topMovieDetails = topLinks.slice(0,5).map(item => new Promise((resolve, reject) => {
		const tconst = item ?  item.split("/")[2] : "";
		requests.get(`${imdbURI}/title/get-overview-details?tconst=${tconst}`)
		.set('Accept', 'application/json')
		.set("X-RapidAPI-Key", app_key)
		.end((err, res) => {
			if(err) return reject(err);
			const response = res.body;
			response.tconst = tconst;
			resolve(res.body);
		})
	}));
	let result =  [];
	try{
		result = await Promise.all(topMovieDetails);
	}catch(err){
		console.log("Error", err);
	}
	return result;
}

async function getMoviesDetailsFromId(topMovies){
	const topLinks = Array.isArray(topMovies) ?  topMovies : [];
	const topMovieDetails = topLinks.slice(0,5).map(item => new Promise((resolve, reject) => {
		requests.get(`${imdbURI}/title/get-overview-details?tconst=${item}`)
		.set('Accept', 'application/json')
		.set("X-RapidAPI-Key", app_key)
		.end((err, res) => {
			if(err) return reject(err);
			const response = res.body;
			response.tconst = item;
			resolve(res.body);
		})
	}));
	let result =  [];
	try{
		result = await Promise.all(topMovieDetails);
	}catch(err){
		console.log("Error", err);
	}
	return result;
}
