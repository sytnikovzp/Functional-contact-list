import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Grid,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import {
  selectContact,
  deleteContact,
} from '../../../store/slices/contactSlice';

function ContactItem({ contact }) {
  const dispatch = useDispatch();

  const { id, fName, lName } = contact;

  const onContactEdit = () => {
    dispatch(selectContact(contact));
  };

  const onItemDelete = (event) => {
    event.stopPropagation();
    dispatch(deleteContact(id));
  };

  const initialsAvatar = `${fName.charAt(0)}${lName.charAt(0)}`;

  const itemStyle = {
    border: '1px solid #009688',
    borderRadius: 5,
  };

  return (
    <Grid item xs={12}>
      <ListItem
        button
        onClick={onContactEdit}
        style={itemStyle}
        secondaryAction={
          <IconButton edge='end' aria-label='delete' onClick={onItemDelete}>
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemAvatar>
          <Avatar>{initialsAvatar}</Avatar>
        </ListItemAvatar>
        <ListItemText primary={`${fName} ${lName}`} />
      </ListItem>
    </Grid>
  );
}

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
