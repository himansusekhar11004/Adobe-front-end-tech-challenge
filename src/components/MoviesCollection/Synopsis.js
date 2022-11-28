import React from 'react';
export default function Synopsis({listData, synopsisInput}){
    const notMentioned = 'Not mentioned'
    const {title, ratings, genres, plotOutline} = listData || {};
    let image = title && title.image && title.image.url ? title.image.url : "" ;
    let rank = ratings && ratings.topRank ? ratings.topRank : "";
    let rating = ratings && ratings.rating ? ratings.rating : "";
    let movieTitle = title && title.title ? title.title : "";
    let year =  title && title.year  ? title.year : "";
    let synopsis =  plotOutline && plotOutline.text  ? plotOutline.text : "";
    if(synopsisInput) {
        synopsis = synopsisInput && synopsisInput.length && synopsisInput[0]  ? synopsisInput[0].text : "";
    }
    return(
        <div key={"Synopsis"} className='card-top-view' style={{ display: "flex", justifyContent:"space-between", width: '80%',paddingTop: '10%'}}>
            <img alt="poster" src={image} style={{ height: '500px', width: "600px", flexBasis: "45%"}}/>
            <div className= "card-desc">				
                <div><span className='card-title'>Title: </span> <span className='card-title-values'>{movieTitle || notMentioned}</span></div>
                <div><span className='card-title'>Rank: </span> <span className='card-title-values'>{rank || notMentioned}</span></div>
                <div><span className='card-title'>Rating: </span> <span className='card-title-values'>{ rating || notMentioned }</span></div>
                <div><span className='card-title'>Genres: </span> <span className='card-title-values'>{(genres  ? genres.join(", ") : [] ) || notMentioned}</span></div>
                <div><span className='card-title'>Year: </span> <span className='card-title-values'>{year || notMentioned }</span></div>
                <div style={{maxHeight: "370px", overflow:"scroll"}}><span className='card-title'>Synopsis: </span> <span className='card-title-values'>{synopsis || notMentioned }</span></div>
            </div>
        </div>
    )
}