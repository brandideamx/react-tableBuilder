import React from "react";
import { Navbar, Container, NavDropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import API from "../../utils/API";
import { logoutUser, clearEntries } from "../../actions";


const Header = props => {
  const { user } = props;
  let hasUser = Object.keys(user).length > 0;

  const handleLogout = async () => {
    const headers = {
      'Authorization': user.token
    }
    let result = await API.authGetRequest('/logout', headers);
    if(result.success) {
      // Borramos al usuario del store
      props.logoutUser({});
      // Borramos las entradas del store
      props.clearEntries({});
    }
  }

  return (
    <>
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <img 
            alt="Rancho Customs Brokers"
            src="http://ranchocustomsbrokers.com/images/logo.png"
            className="img-responsive"
            height="60"
          />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Link className="mx-1" to="/">Home</Link>
          {hasUser ?
            <NavDropdown title={user.name} id="basic-nav-dropdown">
              <NavDropdown.Item to="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item href="#logout" onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          :
            <>
              <Link className="mx-1" to="/login">Login</Link>
              <Link className="mx-1" to="/register">Register</Link>
            </>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );

}

const mapStateToProps = state => {
  return {
    user: state.user
  };
}

const mapDispatchToProps = {
  logoutUser,
  clearEntries
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);