import { combineReducers } from 'redux';
import {
		GET_MOVIE_LIST,
		GET_MOVIE_LIST_SUCCESS,
		GET_MOVIE_LIST_ERROR,

		GET_MOVIE_SYNOPSIS,
		GET_MOVIE_SYNOPSIS_SUCCESS,
		GET_MOVIE_SYNOPSIS_ERROR,

		GET_MOVIE_SEARCH,
		GET_MOVIE_SEARCH_SUCCESS,
		GET_MOVIE_SEARCH_ERROR
} from './constants/ActionTypes';

const initialState = {
	loadingList: false,
	loadingSynopsis: false,
	loadingSearch: false,
	result: {}
}

const getMovieList = (state) => {
	return {
		...state,
		loadingList: true,
	}
}
const getMovieSynopsisList = (state) => {
	return {
		...state,
		loadingSynopsis: true,
	}
}
const getMovieSearchList = (state) => {
	return {
		...state,
		loadingSearch: true
	}
}

const setMoviesData = (state, action) => ({
	...state,
	loadingList: false,
	oppertunities: Array.isArray(action.result) && action.result.length ? action.result : [],
	totalItemCount: action.result.length ? action.result.length : 0,
	...action
})

const setMoviesSearchData = (state, action) => ({
	...state,
	loadingSearch: false,
	searchMovies: Array.isArray(action.result) && action.result.length ? action.result : [],
	...action
})

const setSynposisData = (state, action) => ({
	...state,
	loadingSynopsis: false,
	synopsis: action.result || {},
	...action
});

const setErrorMessage = (state, action) => ({
	 ...state,
		loadingList: false,
		error: action.error,
})

const setSynopsisErrorMessage = (state, action) => ({
	...state,
	loadingSynopsis: false,
	   error: action.error,
});

const setSearchErrorMessage = (state, action) => ({
	...state,
	loadingSearch: false,
	error: action.error,
})


export function imdbReducer( state = initialState, action ) {

	switch (action.type) {
		case GET_MOVIE_LIST:
			return getMovieList(state);
		case GET_MOVIE_LIST_SUCCESS:
			return setMoviesData(state, action);
		case GET_MOVIE_LIST_ERROR:
			return setErrorMessage(state, action);
		case GET_MOVIE_SYNOPSIS:
			return getMovieSynopsisList(state);
		case GET_MOVIE_SYNOPSIS_SUCCESS:
			return setSynposisData(state, action);
		case GET_MOVIE_SYNOPSIS_ERROR:
			return setSynopsisErrorMessage(state, action);
		case GET_MOVIE_SEARCH:
			return getMovieSearchList(state);
		case GET_MOVIE_SEARCH_SUCCESS:
			return setMoviesSearchData(state, action);
		case GET_MOVIE_SEARCH_ERROR:
				return setSearchErrorMessage(state, action);
		default:
			return state;
	}

}

const rootReducer = combineReducers({
	imdbReducer,
});

export default rootReducer;
