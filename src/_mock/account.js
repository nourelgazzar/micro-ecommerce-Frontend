import { NoBackpackSharp } from '@mui/icons-material';

// ----------------------------------------------------------------------
const FN = localStorage.getItem('usernameF');
const LN = localStorage.getItem('usernameL');
const Email = localStorage.getItem('email');

const account = {
  displayName: FN + LN,
  email: Email,
  photoURL: '/static/mock-images/avatars/avatar_default.jpg',
};

export default account;
