import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, IconButton, TextField, Tooltip } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import moment from "moment";
import { Edit, DeleteOutline } from "@mui/icons-material";
const GridView = ({ lists, checklist, removeItemFromList, saveList }) => {
	const [isEditing, setEdit] = useState(false);
	const [copyLists, setCopyLists] = useState([]);
	useEffect(() => {
        const arr = lists.map(s => {
            return {...s, isEditing: false}
        })
		setCopyLists([...arr]);
	}, [lists]);
	const handleEdit = (list) => {
        let arr = [...copyLists]
		if (list.isEditing) {
            let item = arr.find(s => s.id === list.id)
            if(item && lists.find(s => s.id === item.id)) {
                item = {...lists.find(s => s.id === item.id), isEditing: false}
            }
			setCopyLists(arr);
		} else {
			arr.find(s => s.id === list.id).isEditing = true
			setCopyLists(arr);
		}
	};
    const saveCopy = (prop, list, value) => {
        let arr = [...copyLists]
        let item = arr.find(s => s.id === list.id)
        if(item){
            item[prop] = value
            setCopyLists(arr)
        }
    }
	const onSave = (list) => {
		saveList(list);
        let arr = [...copyLists]
        arr.find(s => s.id === list.id).isEditing = false
	};
	return (
		<div>
			<TableContainer component={Paper}>
				<Table sx={{ width: "100%" }} size="large" aria-label="a dense table">
					<TableHead>
						<TableRow>
							<TableCell align="center">Completed</TableCell>
							<TableCell align="center">Title</TableCell>
							<TableCell align="center">Description</TableCell>
							<TableCell align="center">Last edited on:</TableCell>
							<TableCell align="center">Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{copyLists.map((row) => (
							<TableRow
								key={row.name}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell align="center">
									<Checkbox
										value={row.isCompleted}
										onChange={(e) => checklist(row, e.target.checked)}
									/>
								</TableCell>
								<TableCell align="center">{
                                !row.isEditing ? <>{row.title}</> : <><TextField value={row.title} onChange={(e)=> {saveCopy('title', row, e.target.value)}}/></>
                                }</TableCell>
								<TableCell align="center">{
                                !row.isEditing ? <>{row.description}</> : <><TextField value={row.description} onChange={(e)=> {saveCopy('description', row, e.target.value)}}/></>
                                }</TableCell>
								<TableCell align="center">
									{moment(row.timestamp).format("DD/MM/YYYY hh:mm A")}
								</TableCell>
								<TableCell align="center">
									{
										<div>
											<Tooltip title="Edit">
												<IconButton onClick={() => handleEdit(row)}>
													{row.isEditing ? <CancelIcon /> : <Edit />}
												</IconButton>
											</Tooltip>
											<Tooltip title="Delete">
												<IconButton
													onClick={() =>
														row.isEditing ? onSave(row) : removeItemFromList(row)
													}
												>
													{row.isEditing ? <CheckCircleIcon /> : <DeleteOutline />}
												</IconButton>
											</Tooltip>
										</div>
									}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default GridView;
