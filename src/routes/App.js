import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from '../containers/Home';
import Login from '../containers/Login';
import Register from '../containers/Register';
import Error404 from '../containers/404';
import Layout from '../components/layout/Layout';
import { connect } from 'react-redux';

const AppRoutes = props => {
  const { user } = props;
  const hasUser = Object.keys(user).length > 0;

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute path="/" component={Home} auth={hasUser} />
          <Route component={Error404} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}


const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
      auth===true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
          pathname: "/login"
          }}
        />
      )
      }
    />
  );
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, null)(AppRoutes);