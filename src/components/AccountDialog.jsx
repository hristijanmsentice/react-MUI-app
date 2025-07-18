import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';

const AccountDialog = ({open, selected, selectEmail, onClose}) => {
    const [emails, setEmails ] = useState([])
    useEffect(() =>{
        if(localStorage.getItem('emails')) setEmails(JSON.parse(localStorage.getItem('emails')))
    }, [])
    const handleListItemClick = (email) => {

    }
    const handleClose = () => {
        onClose(false)
    }
	return (
		<div>
			<Dialog onClose={handleClose} open={open}>
				<DialogTitle>Assign to:</DialogTitle>
				<List sx={{ pt: 0 }}>
					{emails.map((email) => (
						<ListItem disablePadding key={email}>
							<ListItemButton onClick={() => selectEmail(email)}>
								<ListItemAvatar>
									<Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
										{email?.name ? (email.name).charAt(0) : ''}
									</Avatar>
								</ListItemAvatar>
								<ListItemText primary={email.email} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Dialog>
		</div>
	);
};

export default AccountDialog;
