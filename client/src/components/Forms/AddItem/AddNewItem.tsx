import React from 'react';
import Box from '@material-ui/core/Box';
import {
  Button,
  Radio,
  FormControlLabel,
  Checkbox,
  Typography,
  Divider
} from '@material-ui/core';
import { Formik, Form, Field, useField, FieldAttributes } from 'formik';
import useStyles from '../../Profile/styles';
import { useDispatch, useSelector } from 'react-redux';
import { saveItem, updateItem } from '../../../actions/itemActions';
import { IdType } from '../../../shared/shared-types';
import { AppState } from '../../../store';
import { SingleItemType } from '../../../model/items-model';
import { useHistory, useParams } from 'react-router-dom';
import { TextField } from 'formik-material-ui';
import { string, object, number} from 'yup';


type MyRadioProps = { label: string } & FieldAttributes<{}>;

export const MyRadio: React.FC<MyRadioProps> = ({ label, ...props }) => {
  const [field] = useField<{}>(props);
  return <FormControlLabel {...field} control={<Radio />} label={label} />;
};
type MyCheckBoxProps = { label: string } & FieldAttributes<{}>;

const MyCheckBox: React.FC<MyCheckBoxProps> = ({ label, ...props }) => {
  const [field] = useField<{}>(props);
  return <FormControlLabel {...field} control={<Checkbox />} label={label} />;
};

interface newItem {
  _id: IdType;
  itemName: string;
  description: string;
  price: string;
  imageUrl: string;
  itemsInStock: string;
  category: string;
  size: string[];
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
    imageUrl: item?.imageUrl || '',
    itemsInStock: item?.itemsInStock?.toString() || '',
    category: item?.category || '',
    size: item?.size || [],
    numReviews: item?.numReviews?.toString() || '',
  };
  return (
    <Formik
      initialValues={initVals}
      validationSchema={object({
        itemName: string().required(),
        description: string().required(),
        price: number().required(),
        imageUrl: string().url().required(),
        itemsInStock: number().required(),
      })}
      onSubmit={(values) => {
        const result = {
          _id: values._id,
          itemName: values.itemName,
          description: values.description,
          price: +values.price,
          imageUrl: values.imageUrl,
          itemsInStock: +values.itemsInStock,
          category: values.category,
          size: values.size,
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
              {params.id ? <Typography variant="h4">
              <Box
                p={3}
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontWeight="fontWeightBold"
              >
                Edit Item
              </Box>
              <Divider />
            </Typography> : <Typography variant="h4">
              <Box
                p={3}
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontWeight="fontWeightBold"
              >
                Add Item
              </Box>
            <Divider />
            </Typography>}
            </Box>
            <Box m={3}>
            <div>
              <Field
                name="itemName"
                component={TextField}
                label="Enter Item Title"
                onChange={handleChange}
                style={{ width: 250 }}
              />
            </div>
            <div>
              <Field
                name="description"
                component={TextField}
                label="Enter Description"
                onChange={handleChange}
                style={{ width: 250 }}
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
            <div>
              <Field
                fullWidth
                name="imageUrl"
                component={TextField}
                label="Image URL"
                onChange={handleChange}
                style={{ maxWidth: 250 }}
              />
            </div>
            <div>
              <Field
                name="itemsInStock"
                component={TextField}
                label="Items Available"
                onChange={handleChange}
                style={{ width: 250 }}
              />
            </div>
            <div>
              <Box m={1}>
                <h4>Category:</h4>
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
              </Box>
            </div>
            <div>
              <h4>Available Sizes: </h4>
              <Box display="flex" justifyContent="flex-start" flexWrap="wrap" >
                <MyCheckBox name="size" type="checkbox" value="S" label="S" onChange={handleChange}/>
                <MyCheckBox name="size" type="checkbox" value="M" label="M"  onChange={handleChange}/>
                <MyCheckBox name="size" type="checkbox" value="L" label="L"  onChange={handleChange}/>
                <MyCheckBox name="size" type="checkbox" value="XL" label="XL"  onChange={handleChange}/>
              </Box>
            </div>

            <Box display="flex" justifyContent="center" flexDirection="column" m={3}>
              <Button className={classes.btn} variant="contained"
          color="primary" type="submit">
                Submit
              </Button>
              <Button className={classes.btn2} type="button" onClick={() => history.push('/items')}>
                Cancel
              </Button>
            </Box>
            </Box>
          </Form>
        </Box>
      )}
    </Formik>
  );
};
