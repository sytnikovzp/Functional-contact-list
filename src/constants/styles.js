export const buttonStyle = {
  width: '120px',
};

export const contactItemStyle = {
  border: '1px solid #009688',
  borderRadius: 5,
};

export const contactFormItemStyle = {
  display: 'flex',
  alignItems: 'baseline',
  gap: 1,
  width: '90%',
};

const random = (number) => {
  return Math.floor(Math.random() * number);
};

export const generateAvatarColor = () => {
  return `rgb(${random(200)}, ${random(200)}, ${random(200)})`;
};
