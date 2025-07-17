import React from "react";
import AppsIcon from '@mui/icons-material/Apps';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
const ToggleView = ({changeView, view}) => {

	const handleAlignment = (event, newAlignment) => {
        changeView(newAlignment)
	};
	return (
		<div>
			<ToggleButtonGroup
				value={view}
				exclusive
				onChange={handleAlignment}
                sx={{border: '1px solid white', backdropFilter: 'blur(5px)', backgroundColor: '#1976d2'}}
				aria-label="text alignment"
			>
				<ToggleButton value="grid" aria-label="left aligned">
					<AppsIcon sx={{color: "white"}}/>
				</ToggleButton>
				<ToggleButton value="list" aria-label="centered">
					<FormatListBulletedIcon  sx={{color: "white"}}/>
				</ToggleButton>
			</ToggleButtonGroup>
		</div>
	);
};

export default ToggleView;
