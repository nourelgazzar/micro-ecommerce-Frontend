import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  Typography,
  IconButton,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
} from '@mui/material';

const useStyles = makeStyles((theme) => ({}));
export default function ShopProductCard(props) {
  const classes = useStyles();

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
          <Typography>
            {' '}
            Subtotal({props.totalItems}
            {props.totalItems === 1 ? 'item' : 'items'} ): &nbsp;
          </Typography>

          <Typography variant="subtitle1" sx={{}}>
            {' '}
            EKH {props.totalPrice}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderStyle: 'dashed' }} />

      {/* <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}></Scrollbar> */}

      <Divider sx={{}} />

      <Box sx={{ p: 1 }}>
        <Button
          fullWidth
          disableRipple
          onClick={() => {
            props.setcheckout(true);
          }}
        >
          Proceed to buy
        </Button>
      </Box>
    </div>
  );
}
