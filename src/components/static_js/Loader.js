import React, { PureComponent } from 'react';
import LoaderImage from '../../assets/loading.gif'
import Img from 'react-image'

export default class Loader extends PureComponent {
	render(){
		return(
			<div style={{ width: '100vw', height: '100vh', display: 'flex'}}>
				<div  style ={{ margin: 'auto' }}><Img src={LoaderImage} /></div>
			</div>)
	}
}