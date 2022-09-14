import { React, useState, useEffect } from 'react';

import PropTypes from 'prop-types';
// material
import {
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Rating,
  Divider,
  Checkbox,
  FormGroup,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import ButtonComp from '../../../components/Button';

// components
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import { ColorManyPicker } from '../../../components/color-utils';

// ----------------------------------------------------------------------

export const SORT_BY_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High-Low' },
  { value: 'priceAsc', label: 'Price: Low-High' },
];
export const FILTER_GENDER_OPTIONS = ['Men', 'Women', 'Kids'];
export const FILTER_CATEGORY_OPTIONS = ['All', 'Shose', 'Apparel', 'Accessories'];
export const FILTER_RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];
export const FILTER_PRICE_OPTIONS = [
  { value: 'below', label: 'Below $25' },
  { value: 'between', label: 'Between $25 - $75' },
  { value: 'above', label: 'Above $75' },
];
export const FILTER_COLOR_OPTIONS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];

// ----------------------------------------------------------------------

ShopFilterSidebar.propTypes = {
  isOpenFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
};

export default function ShopFilterSidebar({
  isOpenFilter,
  onOpenFilter,
  onCloseFilter,
  categories,
  brands,
  category,
  brand,
  price,
  brandvalue,
  pricevalue,
  categoryvalue,
}) {
  const [clear, setclear] = useState(false);
  const handleChangeCategory = (event) => {
    category(event.target.value);
  };
  const handleChangeBrand = (event) => {
    brand(event.target.value);
  };
  const handleChangePrice = (event) => {
    price(event.target.value);
  };

  useEffect(() => {
    if (clear === true) {
      brand('');
      category('');
      price('');
      setclear(false);
    }
  }, [clear]);
  return (
    <>
      <Button disableRipple color="inherit" endIcon={<Iconify icon="ic:round-filter-list" />} onClick={onOpenFilter}>
        Filters&nbsp;
      </Button>

      <Drawer
        anchor="right"
        open={isOpenFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280, border: 'none', overflow: 'hidden' },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          <Button sx={{ width: 300 }} onClick={() => {}}>
            Filter
          </Button>
          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" width={20} height={20} />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            <div>
              <Typography variant="subtitle1" gutterBottom>
                Category
              </Typography>
              <RadioGroup onChange={handleChangeCategory} value={categoryvalue}>
                {categories.map((item) => (
                  <FormControlLabel key={item} value={item.name} control={<Radio />} label={item.name} />
                ))}
              </RadioGroup>
            </div>{' '}
            <div>
              <Typography variant="subtitle1" gutterBottom>
                Brand
              </Typography>
              <RadioGroup onChange={handleChangeBrand} value={brandvalue}>
                {brands.map((item) => (
                  <FormControlLabel key={item} value={item.name} control={<Radio />} label={item.name} />
                ))}
              </RadioGroup>
            </div>{' '}
            <div>
              <Typography variant="subtitle1" gutterBottom>
                Price
              </Typography>
              <RadioGroup onChange={handleChangePrice} value={pricevalue}>
                {FILTER_PRICE_OPTIONS.map((item) => (
                  <FormControlLabel key={item.value} value={item.value} control={<Radio />} label={item.label} />
                ))}
              </RadioGroup>
            </div>
          </Stack>
        </Scrollbar>

        <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon="ic:round-clear-all" />}
            onClick={() => {
              setclear(true);
            }}
          >
            Clear All
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
