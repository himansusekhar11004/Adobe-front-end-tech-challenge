import SearchIcon from '@material-ui/icons/Search';
import Toolbar from '@material-ui/core/Toolbar';
import { fade, makeStyles } from '@material-ui/core/styles';
import React, { useState, useCallback } from 'react';
import { DebounceInput } from 'react-debounce-input'
import debouce from "lodash.debounce";
const useStyles = makeStyles(theme => ({

		search: {
			position: 'relative',
			borderRadius: theme.shape.borderRadius,
			backgroundColor: fade(theme.palette.common.white, 0.15),
			'&:hover': {
				backgroundColor: fade(theme.palette.common.white, 0.25),
			},
			marginLeft: 0,
			width: '100%',
			[theme.breakpoints.up('sm')]: {
				marginLeft: theme.spacing(1),
				width: 'auto',
			},
		},

		searchIcon: {
			width: theme.spacing(7),
			height: '100%',
			position: 'absolute',
			pointerEvents: 'none',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		}
	})
);

export default function SearchJobBar({searchCallback}) {
	const classes = useStyles();
	const [search, setSearch] = useState('');
	const onChangeText = (e) => {
		setSearch(e.target.value);
		searchCallback(e.target.value);
	}
	const debouncedResults = useCallback(debouce(onChangeText, 300), []);
	return (
		<Toolbar>
			<div className={classes.search}>
				<div className={classes.searchIcon}> <SearchIcon /> </div>

				<DebounceInput
					value={search || ''}
					onChange={debouncedResults}
					placeholder="Find Your Favourite Movie"
					style={{
							padding: "8px 8px 8px 50px",
							borderRadius: "4px",
							cursor: "text",
							display: "inline-flex",
							position: "relative",
							fontSize: "1rem",
							boxSizing: "border-box",
							alignItems: "center",
							fontWeight: 400,
							lineHeight: "1.1876em",
							outline: "none",
							color: "#ffff",
							backgroundColor: "transparent",
							"letterSpacing": "0.00938em"
						}}
					/>
			</div>			
			</Toolbar>
	);

}