import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { emptyContact } from '../../constants';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import {
  createContact,
  updateContact,
  deleteContact,
} from '../../store/slices/contactSlice';

function ContactForm() {
  const dispatch = useDispatch();

  const currentContact = useSelector(
    (state) => state.contactList.currentContact
  );

  const cPhoneRegExp = /^\+38\(0\d{2}\) \d{3}-\d{2}-\d{2}$/;

  const schema = Yup.object().shape({
    eMail: Yup.string()
      .email('Invalid email address')
      .required('Email is a required field'),
    cPhone: Yup.string()
      .matches(
        cPhoneRegExp,
        'The phone must be in the format +38(0XX) XXX-XX-XX'
      )
      .required('Phone is a required field'),
  });

  const onFormSubmit = (values, { resetForm }) => {
    if (values.id) {
      dispatch(updateContact(values));
    } else {
      dispatch(createContact(values));
      resetForm();
    }
  };

  const onContactDelete = () => {
    dispatch(deleteContact(currentContact.id));
  };

  const contactItemStyle = {
    display: 'flex',
    alignItems: 'baseline',
    gap: 1,
  };

  const buttonStyle = {
    width: '120px',
  };

  const renderForm = ({ errors, touched, setFieldValue }) => {
    return (
      <Form id='contact-form'>
        <Box
          id='wrapper-form'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid black',
            width: '275px',
            height: '400px',
            padding: '10px',
            gap: 2,
          }}
        >
          <Box sx={contactItemStyle}>
            <Field
              name='fName'
              as={TextField}
              label='First name'
              variant='outlined'
              fullWidth
            />
            <IconButton onClick={() => setFieldValue('fName', '')}>
              <ClearIcon />
            </IconButton>
          </Box>
          <Box sx={contactItemStyle}>
            <Field
              name='lName'
              as={TextField}
              label='Last name'
              variant='outlined'
              fullWidth
            />
            <IconButton onClick={() => setFieldValue('lName', '')}>
              <ClearIcon />
            </IconButton>
          </Box>
          <Box sx={contactItemStyle}>
            <Field
              name='eMail'
              as={TextField}
              label='E-mail'
              variant='outlined'
              fullWidth
              error={touched.eMail && Boolean(errors.eMail)}
              helperText={touched.eMail && errors.eMail}
            />
            <IconButton onClick={() => setFieldValue('eMail', '')}>
              <ClearIcon />
            </IconButton>
          </Box>
          <Box sx={contactItemStyle}>
            <Field
              name='cPhone'
              as={TextField}
              label='Phone'
              variant='outlined'
              fullWidth
              error={touched.cPhone && Boolean(errors.cPhone)}
              helperText={touched.cPhone && errors.cPhone}
            />
            <IconButton onClick={() => setFieldValue('cPhone', '')}>
              <ClearIcon />
            </IconButton>
          </Box>
        </Box>

        <Stack
          direction='row'
          justifyContent='center'
          spacing={3}
          mt='40px'
          width='275px'
        >
          <Button
            type='submit'
            id='save-btn'
            variant='contained'
            style={buttonStyle}
            startIcon={<PersonAddIcon />}
          >
            Save
          </Button>

          {currentContact.id ? (
            <Button
              id='delButton'
              type='button'
              variant='outlined'
              color='error'
              style={buttonStyle}
              endIcon={<PersonRemoveIcon />}
              onClick={onContactDelete}
            >
              Delete
            </Button>
          ) : (
            ''
          )}
        </Stack>
      </Form>
    );
  };

  return (
    <Formik
      initialValues={currentContact ? currentContact : emptyContact}
      onSubmit={onFormSubmit}
      validationSchema={schema}
      enableReinitialize
    >
      {({ errors, touched, setFieldValue }) =>
        renderForm({ errors, touched, setFieldValue })
      }
    </Formik>
  );
}

ContactForm.propTypes = {
  currentContact: PropTypes.object,
  onFormSubmit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default ContactForm;
