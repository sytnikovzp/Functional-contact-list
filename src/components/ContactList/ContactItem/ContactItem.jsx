import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
// ===================================
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
// ===================================
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

  const generateAvatarColor = (name) => {
    const colors = [
      '#F44336',
      '#9C27B0',
      '#3F51B5',
      '#03A9F4',
      '#4CAF50',
      '#CDDC39',
      '#FFEB3B',
      '#FFC107',
      '#FF5722',
    ];
    const charCode = name.charCodeAt(0) + name.charCodeAt(name.length - 1);
    return colors[charCode % colors.length];
  };

  const avatarStyle = {
    backgroundColor: generateAvatarColor(initialsAvatar),
  };

  const contactItemStyle = {
    border: '1px solid #009688',
    borderRadius: 5,
  };

  return (
    <Grid item xs={12}>
      <ListItem
        button
        onClick={onContactEdit}
        style={contactItemStyle}
        secondaryAction={
          <IconButton edge='end' aria-label='delete' onClick={onItemDelete}>
            <HighlightOffIcon />
          </IconButton>
        }
      >
        <ListItemAvatar>
          <Avatar style={avatarStyle}>{initialsAvatar}</Avatar>
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
