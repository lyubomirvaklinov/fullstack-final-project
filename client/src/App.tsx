import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useStyles from './styles';
import MenuIcon from '@material-ui/icons/Menu';
import ItemsList from './components/ItemsList/ItemsList';
import { useSelector, useDispatch } from 'react-redux';
import Login from './components/Forms/Login/Login';
import './App.css';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CartView from './components/Cart/CartView';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { listItems } from './actions/itemActions';
import { loggingAction } from './actions/userActions';
import { ReduxState } from './shared/shared-types';
import Product from './components/ProductView/Product';
import Registration from './components/Forms/Register/Registration';
import { ManageItems } from './components/Forms/AddItem/AddNewItem';
import Delivery from './components/Delivery/Delivery';
import CheckOut from './components/CheckOut/CheckOut';
import ThankYou from './components/CheckOut/ThankYou';
import ProfileView from './components/Profile/ProfileView';
import MyOrders from './components/Profile/MyOrders/MyOrders';
import AdminOrderView from './components/Profile/AdminOrdersView/AdminOrderView';
import UserManagement from './components/UserManagement/UserManagement';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShopIcon from '@material-ui/icons/Shop';
import PeopleIcon from '@material-ui/icons/People';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { AddToCartReducerState } from './model/cartTypes';
import MyOrderView from './components/Profile/MyOrders/MyOrderView';
import { LoggingActions } from './model/userType';

const App: React.FC = () => {
  const itemsList = useSelector((state: ReduxState) => {
    return state.itemList;
  });
  const editItemSuccess = useSelector((state: ReduxState) => {
    return state.itemUpdate;
  });
  const saveItemSuccess = useSelector((state: ReduxState) => {
    return state.itemSave;
  });

  const itemDeleteSuccess: any = useSelector(
    (state: ReduxState) => state.itemDelete
  );

  const userLogging: LoggingActions = useSelector(
    (state: ReduxState) => state.userLogging
  );

  const orderDetails: any = useSelector(
    (state: ReduxState) => state.orderDetails
  );

  const cart: AddToCartReducerState = useSelector(
    (state: ReduxState) => state.cart
  );

  const [filter, setFilter] = useState({
    category: 'All',
    price: '',
  });

  const [filterState, setFilterState] = useState(false);

  const { userInfo } = userLogging;

  const detailsState = localStorage.getItem('order-details');

  useEffect(() => {
    dispatch(listItems());
  }, [
    editItemSuccess.success,
    saveItemSuccess.success,
    itemDeleteSuccess.success,
    orderDetails,
    detailsState,
    cart,
  ]);

  const { loading, result, error } = itemsList;
  const dispatch = useDispatch();
  const classes = useStyles();
  const [drawerState, setDrawerState] = useState(false);

  const handleLogOut = () => {
    dispatch(loggingAction());
    setFilter({
      category: 'All',
      price: '',
    });
    setFilterState(false);
  };

  const handleDrawerClose = () => {
    setDrawerState(false);
  };
  const handleDrawerOpen = () => {
    setDrawerState(true);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: '#660066' }}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {!detailsState && <MenuIcon onClick={handleDrawerOpen} />}
          </Typography>
          <Drawer
            style={{ width: '220px' }}
            variant="persistent"
            anchor="left"
            open={drawerState}
            onClose={handleDrawerClose}
            classes={{ paper: classes.drawerPaper }}
          >
            <Box m={1}>
              <CloseIcon onClick={handleDrawerClose} />
            </Box>
            <Divider />
            <List onClick={handleDrawerClose}>
              <Link to="/items" className={classes.link}>
                <ListItem button>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Store'} />
                </ListItem>
              </Link>
              {userInfo?.user.isAdmin && (
                <Link to="/manage-items" className={classes.link}>
                  <ListItem button>
                    <ListItemIcon>
                      <AddBoxIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Manage Items'} />
                  </ListItem>
                </Link>
              )}
              {userInfo?.user.isAdmin ? (
                <>
                  <Link to="/orders" className={classes.link}>
                    <ListItem button>
                      <ListItemIcon>
                        <ShopIcon />
                      </ListItemIcon>
                      <ListItemText primary={'Orders'} />
                    </ListItem>
                  </Link>
                  <Link to="/users" className={classes.link}>
                    <ListItem button>
                      <ListItemIcon>
                        <PeopleIcon />
                      </ListItemIcon>
                      <ListItemText primary={'Users'} />
                    </ListItem>
                  </Link>
                </>
              ) : (
                userInfo && (
                  <Link to="/my-orders" className={classes.link}>
                    <ListItem button>
                      <ListItemIcon>
                        <ShopIcon />
                      </ListItemIcon>
                      <ListItemText primary={'My Orders'} />
                    </ListItem>
                  </Link>
                )
              )}
            </List>
          </Drawer>

          {!detailsState && (
            <Box display="flex">
              <Link to="/items">
                <HomeIcon style={{color: "#f1f1f1"}}/>
              </Link>
            </Box>
          )}
          {userInfo && !detailsState ? (
            <Link to="/profile" className="link">
              <Button color="inherit" className="link">
                {userInfo.user.isAdmin ? (
                  <SupervisorAccountIcon />
                ) : (
                  <AccountCircleIcon />
                )}
              </Button>
            </Link>
          ) : (
            !detailsState && (
              <Link to="/login" className="link">
                <Button color="inherit" className="link">
                  Login
                </Button>
              </Link>
            )
          )}

          {userInfo && !detailsState ? (
            <Link to="/items" className="link">
              <Button color="inherit" onClick={handleLogOut}>
                Log Out
              </Button>
            </Link>
          ) : (
            !detailsState && (
              <Link to="/register" className="link">
                <Button color="inherit">Register</Button>
              </Link>
            )
          )}
          {!detailsState && (
            <Link to="/cart" className="link">
              <ShoppingCartIcon fontSize="large" color="inherit" />
            </Link>
          )}
        </Toolbar>
      </AppBar>

      <Switch>
        <Route exact path="/items">
          <ItemsList
            items={result}
            loading={loading}
            error={error}
            filter={filter}
            setFilter={setFilter}
            filterState={filterState}
            setFilterState={setFilterState}
          />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Registration />
        </Route>
        <Route path="/profile">
          <ProfileView />
        </Route>
        <Route path="/orders">
          <AdminOrderView />
        </Route>
        <Route path="/users">
          <UserManagement />
        </Route>
        <Route path="/my-orders">
          <MyOrders />
        </Route>
        <Route path="/order/:id">
          <MyOrderView />
        </Route>
        <Route path="/delivery-details">
          <Delivery />
        </Route>
        <Route path="/check-out">
          <CheckOut />
        </Route>
        <Route path="/thank-you">
          <ThankYou />
        </Route>
        <Route path="/manage-items">
          <ManageItems />
        </Route>
        <Route path="/edit-item/:id">
          <ManageItems />
        </Route>
        <Route path="/items/:id">
          <Product />
        </Route>
        <Route path="/cart/:id?">
          <CartView />
        </Route>
        <Redirect to="/items" />
      </Switch>
    </div>
  );
};

export default App;
