import { makeStyles, createStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    table: {
      minWidth: 650,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
    btn: {
      backgroundColor: "#800095",
      '&:hover': {
        backgroundColor: "#800089",
    }
    },
    btn2: {
      color: "#800095"
    },
    step: {
      color: "#800095"
    }
  })
);
