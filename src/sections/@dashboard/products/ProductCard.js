import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/Label';
import { ColorPreview } from '../../../components/color-utils';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  cart: {
    '&:hover': { cursor: 'pointer' },
  },
}));

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product, setopen, setquantity, setproduct }) {
  const classes = useStyles();

  const { name, cover, price, colors, status, priceSale } = product;

  return (
    <Card
      onClick={() => {
        if (product.is_available === 1) {
          setproduct(product);
          setopen(true);
        }
      }}
      className={product.is_available === 0 && classes.cart}
    >
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status}
          </Label>
        )}
        <ProductImgStyle alt={name} src={`http://localhost:8000/images/${product.image}`} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="h5" noWrap>
            {product.name}
          </Typography>
          <Typography variant="h10" noWrap>
            {product.description}
          </Typography>
        </Link>

        <div style={{ display: 'flex' }}>
          <div>
            <Typography variant="subtitle1">EKH &nbsp;{product.price} </Typography>
          </div>
          <div style={{ marginLeft: '33%' }}>
            {product.is_available === 0 && (
              <Typography
                component="span"
                variant="body1"
                sx={{
                  color: 'text.disabled',
                }}
              >
                {'OUT OF STOCK'}
              </Typography>
            )}
          </div>
        </div>
      </Stack>
    </Card>
  );
}
