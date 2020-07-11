import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import { Button, Grid, MenuItem } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import useStyles from '../styles';
import { useDispatch, useSelector } from 'react-redux';
import { saveItem, updateItem } from '../../../actions/itemActions';
import { IdType } from '../../../shared/shared-types';
import { AppState } from '../../../store';
import { SingleItemType } from '../../../model/items-model';
import { useHistory, useParams } from 'react-router-dom';
import { TextField  } from 'formik-material-ui';
import { string, object, number } from 'yup';

interface newItem {
  _id: IdType;
  itemName: string;
  description: string;
  price: string;
  size: string;
  imageUrl: string;
  itemsInStock: string;
  rating: string;
  numReviews: string;
}

interface EditFormParams {
  id: IdType;
}

interface Props {}

export const ManageItems: React.FC<Props> = () => {
  const classes = useStyles();
  const params = useParams<EditFormParams>();
  const history = useHistory();
  const item: SingleItemType | undefined = useSelector((state: AppState) => {
    if (params.id) {
      const index = state.itemList.result.findIndex((i) => i._id === params.id);
      if (index >= 0) {
        return state.itemList.result[index];
      }
    }
    return undefined;
  });

  const dispatch = useDispatch();

  const initVals: newItem = {
    _id: item?._id || '',
    itemName: item?.itemName || '',
    description: item?.description || '',
    price: item?.price.toString() || '',
    size: item?.size || '',
    imageUrl: item?.imageUrl || '',
    itemsInStock: item?.itemsInStock?.toString() || '',
    rating: item?.rating?.toString() || '',
    numReviews: item?.numReviews?.toString() || '',
  };
  return (
    <Formik
      initialValues={initVals}
      validationSchema={object({
        itemName: string().required(),
        description: string().required(),
        price: number().required(),
        size: string().required(),
        imageUrl: string().url().required(),
        itemsInStock: number().required(),
      })}
      onSubmit={(values) => {
        // dispatch(loggingAction(email, password));
        const result = {
          _id: values._id,
          itemName: values.itemName,
          description: values.description,
          price: +values.price,
          size: values.size,
          imageUrl: values.imageUrl,
          itemsInStock: +values.itemsInStock,
          rating: +values.rating,
          numReviews: +values.numReviews,
        };
        if (result._id === '') {
          dispatch(saveItem(result));
        } else {
          dispatch(updateItem(result));
        }
        history.push('/items');
      }}
    >
      {({ values, handleChange }) => (
        <Box display="flex" justifyContent="center" margin="100px">
          <Form autoComplete="off">
            <Box display="flex" justifyContent="center" alignItems="center">
              {params.id ? <h1>Edit Item</h1> : <h1>Add New Item</h1>}
            </Box>
            <div>
              <Field
                fullWidth
                name="itemName"
                component={TextField}
                label="Enter Item Title"
                onChange={handleChange}
              />
            </div>
            <div>
              <Field
                fullWidth
                name="description"
                component={TextField}
                label="Enter Description"
                onChange={handleChange}
              />
            </div>
            <div>
              <Field
                fullWidth
                name="price"
                component={TextField}
                label="Enter Price"
                onChange={handleChange}
                style={{ width: 250 }}
              />
            </div>
            {/* <div>
              <Field
                fullWidth
                name="size"
                value={values.size}
                component={TextField}
                label="Available Size"
                onChange={handleChange}
              />
            </div> */}
            <div>
              <Field
                fullWidth
                name="imageUrl"
                component={TextField}
                label="Image URL"
                onChange={handleChange}
              />
            </div>
            <div>
              <Field
                fullWidth
                name="itemsInStock"
                component={TextField}
                label="Items Available"
                onChange={handleChange}
                style={{ width: 250 }}
              />
            </div>

            <Box display="flex" justifyContent="center" margin="25px">
              <Button className="btn" type="submit">
                Submit
              </Button>
            </Box>
          </Form>
        </Box>
      )}
    </Formik>
  );
};
