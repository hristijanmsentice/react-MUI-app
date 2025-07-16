import React from "react";
import {
	Select,
	FormControl,
	MenuItem,
	TextField,
	InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LinearProgress from "@mui/material/LinearProgress";

const Filters = ({ changeFilter, searching, filter, search, numChecked }) => {
	return (
		<div style={{ display: "flex", width: "80%" }}>
			<div style={{ width: "20%" }}>
				<div style={{ color: "white" }}>Filters</div>
				<FormControl fullWidth>
					<Select
						id="demo-simple-select"
						value={filter}
						defaultValue="All"
						sx={{
							backgroundColor: "transparent",
							backdropFilter: "blur(5px)",
							color: "white",
							border: "1px solid white",
						}}
						variant="outlined"
						onChange={(e) => changeFilter(e.target.value)}
					>
						<MenuItem value={"All"}>All</MenuItem>
						<MenuItem value={true}>Completed</MenuItem>
						<MenuItem value={false}>Not Completed</MenuItem>
					</Select>
				</FormControl>
			</div>
			<div style={{ width: "30%", marginLeft: "28px" }}>
				<div style={{ color: "white" }}>Search</div>
				<TextField
					fullWidth
					id="outlined-start-adornment"
					value={search}
					onChange={(e) => searching(e.target.value)}
					sx={{
						backgroundColor: "transparent",
						backdropFilter: "blur(5px)",
						color: "white",
						border: "1px solid white",
					}}
					slotProps={{
						input: {
							startAdornment: (
								<InputAdornment position="start">
									<SearchIcon color="white" />
								</InputAdornment>
							),
						},
					}}
				/>
			</div>
			{/* Progress bar outside the flex container */}
			<div style={{ margin: "0px 0px 0px 16px", width:'50%', backgroundColor: 'transparent', alignContent: 'space-between', borderRadius: '12px' }}>
				<div style={{ color: "white", margin: "0px 0px 0px 16px" }}>Progress</div>
				<div style={{display:"flex", alignContent: 'center'}}>
					<LinearProgress variant="determinate" color="success" value={numChecked} sx={{ width: "80%", alignSelf: "center", marginLeft: "20px", height: '25px', borderRadius: '12px', marginTop: '12px' }}/>
					<div style={{alignContent: 'center', margin: '8px 0px 0px 12px', fontWeight: '600'}}>{numChecked.toFixed(2)}%</div>
				</div>
			</div>{" "}
		</div>
	);
};

export default Filters;
