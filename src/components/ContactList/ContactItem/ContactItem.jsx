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
import { contactItemStyle } from '../../../constants/styles';
import { generateAvatarColor } from '../../../constants/styles';

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

  const avatarStyle = {
    backgroundColor: generateAvatarColor(),
    borderRadius: '50%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
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
