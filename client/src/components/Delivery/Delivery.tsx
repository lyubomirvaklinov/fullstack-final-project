import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Step,
  StepLabel,
  Stepper,
} from '@material-ui/core';
import { Field, Form, Formik, FormikConfig, FormikValues } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-material-ui';
import React, { useState, useEffect } from 'react';
import { bool, number, object, string } from 'yup';
import { ReduxState, LoggingActions } from '../../shared/shared-types';
import { useSelector, useDispatch } from 'react-redux';
import { saveOrderDetails, createOrder } from '../../actions/orderActions';
import { useHistory } from 'react-router-dom';
import { AddToCartReducerState } from '../../shared/cartTypes';
import { OrderDetails } from '../../shared/orderTypes';

const sleep = (time: any) => new Promise((acc) => setTimeout(acc, time));

export default function Home() {
  const userLogging: LoggingActions = useSelector(
    (state: ReduxState) => state.userLogging
  );
  const cart: AddToCartReducerState = useSelector(
    (state: ReduxState) => state.cart
  );
  const orderDetails: OrderDetails = useSelector(
    (state: ReduxState) => state.orderDetails
  );

  // console.log(orderDetails);

  const { userInfo, isLoggedIn } = userLogging;

  const dispatch = useDispatch();
  const history = useHistory();
  const detailsOrder = localStorage.getItem("order-details");

  useEffect(() => {
    if (detailsOrder) history.push('/check-out');
  }, [detailsOrder]);

  return !isLoggedIn ? (
    <div>Logging in ....</div>
  ) : (
    <Card>
      <CardContent>
        <FormikStepper
          initialValues={{
            firstName: '',
            lastName: '',
            email: userInfo?.user.email,
            address: '',
            payment: '',
            additionalInfo: '',
          }}
          onSubmit={async (values) => {
            await sleep(3000);
            dispatch(saveOrderDetails(values as OrderDetails));
          }}
        >
          <FormikStep
            label="Personal Data"
            validationSchema={object({
              firstName: string().required(),
              lastName: string().required(),
              email: string().email().required(),
              address: string().required(),
            })}
          >
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name="firstName"
                component={TextField}
                label="First Name"
              />
            </Box>
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name="lastName"
                component={TextField}
                label="Last Name"
              />
            </Box>
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name="email"
                component={TextField}
                label="E-mail"
              />
            </Box>
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name="address"
                component={TextField}
                label="Address"
              />
            </Box>
          </FormikStep>
          <FormikStep
            label="Payment"
            validationSchema={object({
              payment: bool().required(),
            })}
          >
            <Box paddingBottom={2}>
              <Field
                name="payment"
                type="checkbox"
                component={CheckboxWithLabel}
                Label={{ label: 'Cash on delivery' }}
              />
            </Box>
          </FormikStep>
          <FormikStep label="More Info">
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name="additionalInfo"
                component={TextField}
                label="Additional Information"
              />
            </Box>
          </FormikStep>
        </FormikStepper>
      </CardContent>
    </Card>
  );
}

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
  label: string;
}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

export function FormikStepper({
  children,
  ...props
}: FormikConfig<FormikValues>) {
  const childrenArray = React.Children.toArray(children) as React.ReactElement<
    FormikStepProps
  >[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
          setCompleted(true);
        } else {
          setStep((s) => s + 1);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          <Stepper alternativeLabel activeStep={step}>
            {childrenArray.map((child, index) => (
              <Step
                key={child.props.label}
                completed={step > index || completed}
              >
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {currentChild}

          <Grid container spacing={2}>
            {step > 0 ? (
              <Grid item>
                <Button
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  onClick={() => setStep((s) => s - 1)}
                >
                  Back
                </Button>
              </Grid>
            ) : null}
            <Grid item>
              <Button
                startIcon={
                  isSubmitting ? <CircularProgress size="1rem" /> : null
                }
                disabled={isSubmitting}
                variant="contained"
                color="primary"
                type="submit"
              >
                {isSubmitting ? 'Submitting' : isLastStep() ? 'Submit' : 'Next'}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
