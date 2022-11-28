import React, { Component } from 'react';
import './header.css'
import Img from 'react-image'
import logo from  '../../assets/logo.png'
import SearchAppBar from '../Hooks/SearchJobBar'


export default function Header({toggle, expiredFilter, searchCallback}) {
	return(
		<div className="header-theme">
			<div className='logo-style' onClick={ () => expiredFilter() }><Img src={logo} height = "40px"/></div>
			<div className="menu-style">
				<div style={{color: toggle ? '#ef1c74' : '#ffffff' }} className='expiring-jobs' onClick={ () => expiredFilter() }>Movies</div>
				<div style={{color: !toggle ? '#ef1c74' : '#ffffff' }} className='expiring-jobs' onClick={ () => expiredFilter() }>History</div>
				<SearchAppBar searchCallback = { (input) => searchCallback(input) }/>
			</div>
		</div>
	)
}


