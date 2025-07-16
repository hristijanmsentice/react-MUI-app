import React, { useEffect, useState, useMemo } from "react";
import List from "./List";
import { Button, Grid, Card } from "@mui/material";
import { green } from "@mui/material/colors";
import Filters from "./Filters";
const Todo = () => {
	const [lists, setLists] = useState([]);
	const [filter, setFilter] = useState("All");
	const [search, setSearch] = useState("");
	const filterLists = () => {
		let arr = [...lists];
		switch (filter) {
			case "All":
				arr = [...lists];
				break;
			case true:
				arr = [...lists.filter((s) => s.isCompleted)];
				break;
			case false:
				arr = [...lists.filter((s) => !s.isCompleted)];
				break;
			default:
				arr = [...lists];
				break;
		}
		if (search != "") {
			arr = arr.filter((s) =>
				s.title.toLowerCase().includes(search.toLowerCase())
			);
		}
		return arr;
	};
	const filteredLists = useMemo(() => {
		return filterLists();
	}, [filter, lists, search]);

	const changeFilter = (value) => {
		setFilter(value);
	};
	const searching = (value) => {
		setSearch(value);
	};
	useEffect(() => {
		if (localStorage.getItem("lists"))
			setLists(JSON.parse(localStorage.getItem("lists")));
	}, []);
	const addNewListItem = () => {
		const arr = [...lists];
		arr.push({
			title: `Name - ${arr.length}`,
			description: "Some text",
			timestamp: Date.now(),
			id: Date.now(),
			assigned: false,
			isCompleted: false,
		});
		setLists(arr);
		localStorage.setItem("lists", JSON.stringify(arr));
	};
	const assignList = (email, list) => {
		const arr = [...lists];
		arr.find((s) => s.id === list.id).assigned = email;
		setLists(arr);
		localStorage.setItem("lists", JSON.stringify(arr));
	};
	const removeAssignment = (list) => {
		const arr = [...lists];
		arr.find((s) => s.id === list.id).assigned = false;
		setLists(arr);
		localStorage.setItem("lists", JSON.stringify(arr));
	};
	const removeItemFromList = (list) => {
		const arr = [...lists];
		const index = arr.findIndex((s) => s.id === list.id);
		if (index > -1) {
			arr.splice(index, 1);
			setLists(arr);
			localStorage.setItem("lists", JSON.stringify(arr));
		}
	};
	const saveList = (copy) => {
		const arr = [...lists];
		const index = arr.findIndex((s) => s.id === copy.id);
		if (index > -1) {
			arr[index] = { ...copy, timestamp: Date.now() };
			setLists(arr);
			localStorage.setItem("lists", JSON.stringify(arr));
		}
	};
	const checklist = (list, value) => {
		const arr = [...lists];
		const index = arr.findIndex((s) => s.id === list.id);
		if (index > -1) {
			arr[index] = { ...list, isCompleted: value };
			setLists(arr);
			localStorage.setItem("lists", JSON.stringify(arr));
		}
	};
	const numChecked = useMemo(() => {
		return (lists.filter(s => s.isCompleted).length / lists.length) * 100
	}, [lists])
	return (
		<div className="lists-grid">
			<Grid
				container
				size={10}
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignContent: "center",
					padding: "20px 3.5% 60px 3.5%",
				}}
			>
				<Filters
					changeFilter={changeFilter}
					searching={searching}
					filter={filter}
					search={search}
					numChecked={numChecked}
				/>
				<Button
					variant="contained"
					sx={{ height: "56px" }}
					bgcolor={green[500]}
					onClick={() => addNewListItem()}
				>
					Add new List
				</Button>
			</Grid>
			{filteredLists.length ? (
				<>
					<Grid
						container
						size={8}
						sx={{
							display: "flex",
							justifyContent: "center",
							alignContent: "center",
						}}
					>
						{filteredLists.map((list, index) => {
							return (
								<Grid
									key={list.id}
									size={4}
									sx={{
										display: "flex",
										alignContent: "center",
										justifyContent: "center",
									}}
								>
									<List
										assignList={assignList}
										list={list}
										removeAssignment={removeAssignment}
										removeItemFromList={removeItemFromList}
										saveList={saveList}
										checklist={checklist}
									/>
								</Grid>
							);
						})}
					</Grid>
				</>
			) : (
				<>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignContent: "center",
						}}
					>
						<Card
							sx={{
								width: "80%",
								height: "300px",
								borderRadius: "24px",
								display: "flex",
								justifyContent: "center",
							}}
							elevation={5}
						>
							<div
								style={{
									alignContent: "center",
									fontSize: "24px",
									color: "#717171",
								}}
							>
								{!lists.length
									? <span>'There are no lists added. Click <span style={{color:"black", fontWeight: 600}}>"Add new lists"</span> button to add one.</span>
									: "There are no lists with current filters!"}
							</div>
						</Card>
					</div>
				</>
			)}
		</div>
	);
};

export default Todo;
