import ContactItem from './ContactItem/ContactItem';
import { getContacts, addNewContact } from '../../store/slices/contactSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Grid from '@mui/material/Grid';

function ContactList() {
  const dispatch = useDispatch();

  const contacts = useSelector((state) => state.contactList.arrContacts);

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  const onNewContact = () => {
    dispatch(addNewContact());
  };

  const buttonStyle = {
    width: '120px',
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          borderRadius: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          width: '300px',
          height: '400px',
          paddingTop: '10px',
        }}
      >
        <Grid container spacing={1}>
          {contacts.map((contact) => {
            return <ContactItem key={contact.id} contact={contact} />;
          })}
        </Grid>
      </Paper>

      <Stack
        direction='row'
        justifyContent='center'
        spacing={3}
        mt='40px'
        width='275px'
      >
        <Button
          id='new-btn'
          type='button'
          variant='contained'
          color='success'
          style={buttonStyle}
          startIcon={<GroupAddIcon />}
          onClick={onNewContact}
        >
          New
        </Button>
      </Stack>
    </Box>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.array,
};

ContactList.defaultProps = {
  contacts: [],
};

export default ContactList;
