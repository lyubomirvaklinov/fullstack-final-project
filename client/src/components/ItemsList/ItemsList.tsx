import React, { ReactElement } from 'react';
import useStyles from '../Profile/styles';
import Grid from '@material-ui/core/Grid';
import SingleItem from '../SingleItem/SingleItem';
import { ItemListProps } from '../../model/itemTypes';
import { Box, Button, Typography, Divider } from '@material-ui/core';
import { Formik, Form } from 'formik';
import { MyRadio } from '../Forms/AddItem/AddNewItem';
import FilterListIcon from '@material-ui/icons/FilterList';

export default function ItemsList({
  items,
  filter,
  setFilter,
  filterState,
  setFilterState,
  ...rest
}: ItemListProps): ReactElement {
  const classes = useStyles();

  const toggleFilter = () => {
    setFilterState(!filterState);
  };

  return (
    <Box>
       <Typography variant="h4">
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          fontWeight="fontWeightBold"
          p={3}
          m={2}
        >
          Shop
        </Box>
        <Divider />
      </Typography>
      <Box display="flex" justifyContent="flex-end">
        {!filterState ? (
          <FilterListIcon onClick={toggleFilter} fontSize="large" />
        ) : (
          <Formik
            initialValues={{ category: '', price: '' }}
            onSubmit={({ category, price }) => {
              const result = { category: !category ? 'All' : category, price };
              setFilter(result);
            }}
          >
            {({ values, handleChange }) => (
              <div>
                <Box display="flex" justifyContent="flex-end">
                  <FilterListIcon onClick={toggleFilter} />
                </Box>
                <Form>
                  <Box m={1}>
                    <h4>Category:</h4>
                    <MyRadio
                      name="category"
                      type="radio"
                      value="All"
                      label="All"
                      onChange={handleChange}
                    />
                    <MyRadio
                      name="category"
                      type="radio"
                      value="Male"
                      label="Male"
                      onChange={handleChange}
                    />
                    <MyRadio
                      name="category"
                      type="radio"
                      value="Female"
                      label="Female"
                      onChange={handleChange}
                    />
                    <h4>Price:</h4>
                    <MyRadio
                      name="price"
                      type="radio"
                      value="Highest-Lowest"
                      label="Highest-Lowest"
                      onChange={handleChange}
                    />
                    <MyRadio
                      name="price"
                      type="radio"
                      value="Lowest-Highest"
                      label="Lowest-Highest"
                      onChange={handleChange}
                    />
                  </Box>
                  <Box display="flex" justifyContent="center" m={1}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.btn}
                    >
                      Filter
                    </Button>
                  </Box>
                  <Box display="flex" justifyContent="center" m={1}>
                    <Button
                      type="button"
                      className={classes.btn2}
                      onClick={() => {
                        window.location.reload(false);
                      }}
                    >
                      Reset
                    </Button>
                  </Box>
                </Form>
              </div>
            )}
          </Formik>
        )}
      </Box>
      <Box mt={3} mb={3}>
        <Grid
          container
          className={classes.root}
          style={{ maxWidth: 1500, margin: '0 auto' }}
        >
          <Grid item xs={12}>
            <Grid container justify="center" spacing={5}>
              {items &&
                items
                  .filter((i) => {
                    if (filter) {
                      switch (filter.category) {
                        case 'Male':
                          return i.category === 'Male';
                        case 'Female':
                          return i.category === 'Female';
                        case 'All':
                          return i;
                        default:
                      }
                    }
                  })
                  .sort((a, b) => {
                    switch (filter.price) {
                      case 'Lowest-Highest':
                        return a.price - b.price;
                      case 'Highest-Lowest':
                        return b.price - a.price;
                      default:
                        return b.itemsInStock - a.itemsInStock;
                    }
                  })
                  .map((item) => (
                    <SingleItem key={item._id} item={item} {...rest} />
                  ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
