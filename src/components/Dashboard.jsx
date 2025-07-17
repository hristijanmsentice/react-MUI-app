import React, { useEffect, useState } from "react";
import { PieChart, BarChart } from "@mui/x-charts";
import { Grid, Card, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
	const COLORS = ["#f44336", "#2196f3", "#4caf50", "#ff9800", "#9c27b0"];
	const [lists, setLists] = useState([]);
	const [emails, setEmails] = useState([]);
  const navigate = useNavigate();
	useEffect(() => {
		if(!localStorage.getItem('user')) navigate('/login')
		if (localStorage.getItem("lists"))
			setLists(JSON.parse(localStorage.getItem("lists")));
		if (localStorage.getItem("emails"))
			setEmails(JSON.parse(localStorage.getItem("emails")));
	}, []);
	const barXlabels = emails.map((s) => s.name);
	let cData = [];
	let ncData = [];
	let aData = [];
	let naData = [];
	emails.forEach((e) => {
		cData.push(
			lists.filter(
				(s) => s?.assigned && s?.assigned?.name === e.name && s.isCompleted
			).length
		);
	});
	emails.forEach((e) => {
		ncData.push(
			lists.filter(
				(s) => s?.assigned && s?.assigned?.name === e.name && !s.isCompleted
			).length
		);
	});
	emails.forEach((e) => {
		aData.push(
			lists.filter((s) => s?.assigned && s?.assigned?.name === e.name).length
		);
	});
	// emails.forEach(e => {
	//   naData.push(lists.filter(s => s?.assigned && s?.assigned?.name === e.name).length)
	// })
	console.log(
		JSON.stringify(
			aData.map((s) => {
				return { data: [s] };
			})
		)
	);
	return (
		<div style={{ height: "100vh" }}>
      <div style={{padding: '2% 5% 0% 5%'}}>
        <Button variant="outlined" onClick={() => navigate('/todo')}>Back</Button>
        </div>
			<Grid
				container
				size={12}
				sx={{ padding: "5%", alignContent: "center" }}
				spacing={4}
			>
				<Grid
					size={4}
					sx={{
						alignContent: "center",
					}}
				>
					<Card
						elevation={5}
						sx={{
							width: "100%",
							height: "100%",
              padding: '15%',
							borderRadius: "24px",
							alignContent: "center",
						}}
					>
						<PieChart
							sx={{ alignContent: "center" }}
							series={[
								{
									data: [
										{
											id: 0,
											value: lists.filter((s) => !s.assigned).length,
											label: "Not Assigned",
										},
										{
											id: 1,
											value: lists.filter((s) => s.assigned).length,
											label: "Assigned",
										},
									],
									innerRadius: 30,
									outerRadius: 100,
									paddingAngle: 2,
									cornerRadius: 2,
									cx: 150,
									cy: 150,
								},
							]}
							width={300}
							height={260}
						/>
					</Card>
				</Grid>
				<Grid
					size={4}
					sx={{
						alignContent: "center",
					}}
				>
					<Card
						elevation={5}
						sx={{
							width: "100%",
							height: "100%",
							borderRadius: "24px",
							alignContent: "center",
						}}
					>
						<BarChart
							width={500}
							height={300}
							series={[
								{ data: cData, label: "Completed", id: "pvId", stack: "total" },
								{
									data: ncData,
									label: "Not completed",
									id: "uvId",
									stack: "total",
								},
							]}
							xAxis={[{ data: barXlabels, scaleType: "band" }]}
						/>
					</Card>
				</Grid>
				<Grid
					size={4}
					sx={{
						alignContent: "center",
					}}
				>
					<Card
						elevation={5}
						sx={{
							width: "100%",
							height: "100%",
							borderRadius: "24px",
							alignContent: "center",
						}}
					>
						<BarChart
							xAxis={[{ scaleType: "band", data: barXlabels }]}
							series={[
								{
									data: aData,
									colorMap: barXlabels.map((label, index) => ({
										key: label,
										color: COLORS[index],
									})),
								},
							]}
							width={500}
							height={300}
						/>
					</Card>
				</Grid>
			</Grid>
		</div>
	);
};

export default Dashboard;
