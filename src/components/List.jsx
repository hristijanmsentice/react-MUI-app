import React, { useEffect, useState } from "react";
import moment from 'moment';
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { green, grey, red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { DeleteOutline } from "@mui/icons-material";
import { Edit } from "@mui/icons-material";
import PersonIconAdd from "@mui/icons-material/PersonAdd";
import PersonRemove from "@mui/icons-material/PersonRemove";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import CancelIcon from "@mui/icons-material/Cancel";
import AccountDialog from "./AccountDialog";
import { Button, TextField, Tooltip } from "@mui/material";
import { Grid, Checkbox } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
export default function RecipeReviewCard({
	list,
	index,
	assignList,
	removeAssignment,
	removeItemFromList,
	saveList,
    checklist
}) {
	const [isAssigned, setAssigned] = useState(false);
	const [copyList, setCopyList] = useState(null);
	useEffect(() => {
		setCopyList({ ...list });
	}, [list]);
	const [open, setOpen] = useState(false);
	const [isEditing, setEdit] = useState(false);
	const selectEmail = (email) => {
		assignList(email, list);
		setOpen(false);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const handleEdit = () => {
		if (isEditing) {
			setEdit(false);
			setCopyList({ ...list });
		} else {
			setEdit(true);
		}
	};
	const onSave = () => {
		saveList(copyList);
		setEdit(false);
	};
	return (
		<>
			<Card className="list-card-container" sx={{ width: '80%', height: 500, padding: '40px 20px', borderRadius: '24px', border: '1px solid green', marginBottom: '60px' }}>
				<CardHeader
					avatar={
                        <Tooltip title={list?.assigned ? `Assigned to: ${list.assigned?.name}` : 'Not Assigned'}>
                            <Avatar
                                sx={{ bgcolor: list.assigned ? list.assigned.color : grey[500] }}
                                aria-label="recipe"
                            >
                                {list?.assigned ? list.assigned?.name.charAt(0) : <NoAccountsIcon/>}
                            </Avatar>
                        </Tooltip>
					}
					action={
                        <Tooltip title={!list?.assigned ? 'Assign' : 'Remove assignment'}>
                            <IconButton aria-label="settings">
                                {!list?.assigned ? (
                                    <PersonIconAdd
                                        sx={{ color: green[500] }}
                                        onClick={() => setOpen(!open)}
                                    />
                                ) : (
                                    <PersonRemove
                                        sx={{ color: red[500] }}
                                        onClick={() => removeAssignment(list)}
                                    />
                                )}
                            </IconButton>
                        </Tooltip>
					}
				/>
				<div style={{ textAlign: "center", fontSize: "32px", height: '100px' }}>
					{!isEditing ? (
						<div>{list.title}</div>
					) : (
						<div>
							<TextField
								fullWidth
								sx={{ paddingInline: "16px" }}
								label="Title"
								onChange={(e) =>
									setCopyList({ ...copyList, title: e.target.value })
								}
								value={copyList.title}
								placeholder="Enter Title description.."
							/>
						</div>
					)}
				</div>
				{/* <CardMedia
					component="img"
					height="194"
					image="/static/images/cards/paella.jpg"
					alt="Paella dish"
				/> */}
				<CardContent>
					{/* {!isEditing ? (
						<Typography variant="body2" sx={{ color: "text.secondary" }}>
							{list?.description || "asdasd"}
						</Typography>
					) : (
						<TextField
							label="Description"
							placeholder="Enter Card description.."
                            sx={{fontSize: '24px'}}
						/>
					)} */}
					<div
						style={{ textAlign: "center", fontSize: "20px", color: "#717171", height: '170px' }}
					>
						{!isEditing ? (
							<div>
								<div style={{textAlign: 'center',  height: '150px', alignContent: 'center'}}>{list.description}</div>
								<div style={{ fontSize: "12px",  height: '20px' }}>
									Last Edited on: <span style={{color: 'black'}}>{moment(list.timestamp).format("DD/MM/YYYY hh:mm A")}</span>
								</div>
							</div>
						) : (
							<div>
								<TextareaAutosize
									aria-label="minimum height"
									fullWidth
									minRows={3}
									style={{
										width: "100%",
										backgroundColor: "white",
										color: "black",
										fontSize: "20px",
									}}
									value={copyList.description}
									onChange={(e) =>
										setCopyList({ ...copyList, description: e.target.value })
									}
									label="Description"
									placeholder="Enter Title description.."
								/>
							</div>
						)}
					</div>
				</CardContent>
				<CardActions disableSpacing>
					<Grid container size={12}>
						<Grid container size={12} sx={{justifyContent: 'space-between'}}>
                            <div style={{display: "flex"}}>
                                <Checkbox checked={list.isCompleted} onChange={(e) => checklist(list, e.target.checked)} name="gilad" sx={{
                                        color: green[500],
                                        '&.Mui-checked': {
                                        color: green[500],
                                        },
                                    }}
                                />
    							<div style={{alignContent: "center"}}>Mark as complete</div>

                            </div>
                            <div>
                                <Tooltip title={isEditing ? 'Cancel': 'Edit'}>
                                    <IconButton
                                        aria-label="add to favorites"
                                        onClick={() => handleEdit()}
                                    >
                                        {isEditing ? <CancelIcon /> : <Edit />}
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title={isEditing ? 'Save': 'Delete'}>
                                    <IconButton
                                        aria-label="share"
                                        onClick={() =>
                                            isEditing ? onSave() : removeItemFromList(list)
                                        }
                                    >
                                        {isEditing ? <CheckCircleIcon /> : <DeleteOutline />}
                                    </IconButton>
                                </Tooltip>
                            </div>
						</Grid>
					</Grid>
				</CardActions>
			</Card>
			<AccountDialog
				open={open}
				selectEmail={selectEmail}
				onClose={handleClose}
			/>
		</>
	);
}
