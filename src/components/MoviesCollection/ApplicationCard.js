import React, { Component } from 'react';
import './application-card.css'
export default function ApplicationCard({listData, index, clickedEvent}){

	const notMentioned = 'Not mentioned'
	const {title, ratings, genres, plotOutline, id} = listData || {};
	let image = title && title.image && title.image.url ? title.image.url : "" ;
	let rank = ratings && ratings.topRank ? ratings.topRank : "";
	let rating = ratings && ratings.rating ? ratings.rating : "";
	let movieTitle = title && title.title ? title.title : "";
	let year =  title && title.year  ? title.year : "";
	let story =  plotOutline && plotOutline.text  ? plotOutline.text : "";
	const tconst = id ? id.split("/")[2] : null;
	return(
		<div onClick={ () => clickedEvent(tconst, listData)} key={index} className='card-top-view' style={{ display: "flex", cursor: 'pointer', justifyContent:"space-between", width: '80%'}}>
			<img alt="poster" src={image} style={{ height: '500px', width: "600px", flexBasis: "45%"}}/>
			<div className= "card-desc">				
				<div><span className='card-title'>Title: </span> <span className='card-title-values'>{movieTitle || notMentioned}</span></div>
				<div><span className='card-title'>Rank: </span> <span className='card-title-values'>{rank || notMentioned}</span></div>
				<div><span className='card-title'>Rating: </span> <span className='card-title-values'>{ rating || notMentioned }</span></div>
				<div><span className='card-title'>Genres: </span> <span className='card-title-values'>{genres.join(", ") || notMentioned}</span></div>
				<div><span className='card-title'>Year: </span> <span className='card-title-values'>{year || notMentioned }</span></div>
				<div><span className='card-title'>Story Title: </span> <span className='card-title-values'>{story || notMentioned }</span></div>

			</div>
			{/* <div><a target="_blank" rel="apply" className='apply-button-div' href={applylink}> <span style={{ margin: 'auto' }}>APPLY</span></a></div> */}
		</div>
	)
	
}