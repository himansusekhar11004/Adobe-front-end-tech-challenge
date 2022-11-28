import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMoviesCollection, getSynopsisData, getSearchData } from '../actions';
import Loader from '../components/static_js/Loader'
import Header from '../components/Header/Header'
import History from '../components/MoviesCollection/History'
import ApplicationCard from '../components/MoviesCollection/ApplicationCard'
import { bindActionCreators } from 'redux';
import Synopsis from '../components/MoviesCollection/Synopsis';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			movieCollections: [],
			synopsis: {},
			synopsisActivated: false,
			currentDetails: {},
			toggle: true,
		}
	}

	componentDidMount(){
		const { getMoviesCollection } = this.props;
		getMoviesCollection();
	}

	handleFilter = () => {
		this.setState({toggle: !this.state.toggle}, () => this.state.toggle && this.props.getMoviesCollection());
	}

	componentDidUpdate(prevProps){
		const { loadingList, oppertunities, loadingSynopsis,synopsis,loadingSearch, searchMovies } = this.props.imdbReducer;
		console.log(prevProps, "   ", this.props.imdbReducer);
		if(prevProps.imdbReducer && prevProps.imdbReducer.loadingList && !loadingList){
			this.setState({movieCollections: (oppertunities || []), synopsisActivated: false})
		}

		if(prevProps.imdbReducer && prevProps.imdbReducer.loadingSearch && !loadingSearch){
			this.setState({movieCollections: (searchMovies || [])})
		}

		if(prevProps.imdbReducer && prevProps.imdbReducer.loadingSynopsis && !loadingSynopsis){
			this.setState({synopsis: (synopsis || []), synopsisActivated: true});
		}
	}

	handleSynopsis = (tconst, details) => {
		try{
			let localItem = localStorage.getItem("movies_history") || '[]';
			console.log(localItem, "localItem");
			const {title } = details || {};
			const movieTitle = title && title.title ? title.title : "";
			localItem  = JSON.parse(localItem);
			localItem = [...new Set(localItem)];
			localItem.push(movieTitle)
			localStorage.setItem("movies_history", JSON.stringify(localItem));
		}catch(err){
			console.log(err);
		}
		this.setState({synopsisActivated: true, currentDetails: details}, () => this.props.getSynopsisData(tconst))
	}

	handleSearch = (tconst) => {
		this.props.getSearchData(tconst);
	}

	render() {
		const { loadingList,  loadingSearch,  loadingSynopsis} = this.props.imdbReducer;

		if(loadingList || loadingSynopsis || loadingSearch) return <Loader/>

		return (
			<div>
				<Header 
					expiredFilter = { () => this.handleFilter() } 
					searchCallback = {(value) => this.handleSearch(value)}
					toggle = {this.state.toggle}
					/>
					{	
					this.state.toggle ?
						<div style={{ padding: '90px 0' }}>
						{
							!this.state.synopsisActivated ? 
								<div >
								{this.state.movieCollections.map((data, index) => <ApplicationCard key={index} clickedEvent = { (args, details) => this.handleSynopsis(args, details)} listData={data}/>)}
								</div>
							:
							<Synopsis synopsisInput = {this.state.synopsis} listData={this.state.currentDetails || {}} key = "synopsis" />
						}
						</div>
					:
					<div style={{ padding: '90px 0' }}>
						<History/>
					</div>
				}
			</div>
		);
	}
}

const  mapStateToProps = (state) => {
	const { imdbReducer } = state;
	return {
		imdbReducer
	};
}

const mapDispatchToProps = dispatch => bindActionCreators({
	  getMoviesCollection,
	  getSynopsisData,
	  getSearchData,
	}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App);
