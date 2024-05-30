import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// ===================================
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
// ===================================
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import BackspaceIcon from '@mui/icons-material/Backspace';
// ===================================
import {
  createContact,
  updateContact,
  deleteContact,
} from '../../store/slices/contactSlice';
import { emptyContact } from '../../constants';
import { buttonStyle } from '../../constants/styles';

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

  const contactFormItemStyle = {
    display: 'flex',
    alignItems: 'baseline',
    gap: 1,
    width: '90%',
  };

  const renderForm = ({ errors, touched, setFieldValue }) => {
    return (
      <Form id='contact-form'>
        <Paper
          elevation={3}
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
          <Box sx={contactFormItemStyle}>
            <Field
              name='fName'
              as={TextField}
              label='First name'
              variant='filled'
              fullWidth
            />
            <IconButton onClick={() => setFieldValue('fName', '')}>
              <BackspaceIcon />
            </IconButton>
          </Box>
          <Box sx={contactFormItemStyle}>
            <Field
              name='lName'
              as={TextField}
              label='Last name'
              variant='filled'
              fullWidth
            />
            <IconButton onClick={() => setFieldValue('lName', '')}>
              <BackspaceIcon />
            </IconButton>
          </Box>
          <Box sx={contactFormItemStyle}>
            <Field
              name='eMail'
              as={TextField}
              label='E-mail'
              variant='filled'
              fullWidth
              error={touched.eMail && Boolean(errors.eMail)}
              helperText={touched.eMail && errors.eMail}
            />
            <IconButton onClick={() => setFieldValue('eMail', '')}>
              <BackspaceIcon />
            </IconButton>
          </Box>
          <Box sx={contactFormItemStyle}>
            <Field
              name='cPhone'
              as={TextField}
              label='Phone'
              variant='filled'
              fullWidth
              error={touched.cPhone && Boolean(errors.cPhone)}
              helperText={touched.cPhone && errors.cPhone}
            />
            <IconButton onClick={() => setFieldValue('cPhone', '')}>
              <BackspaceIcon />
            </IconButton>
          </Box>
        </Paper>

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
              startIcon={<PersonRemoveIcon />}
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
