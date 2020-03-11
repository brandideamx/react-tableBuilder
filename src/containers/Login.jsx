import React, { useState } from "react";
import { connect } from 'react-redux';
import API from '../utils/API';
import { authUser } from "../actions";
import { Container, Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

const Login = props => {
  
  const [form, setValues] = useState({
    username: ''
  });

  const handleInput = event => {
    setValues({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async event => {
    event.preventDefault();
    console.log(form);
    let res = await API.postRequest('/signin', form);
    if(res.success) {
      props.authUser(res.data);
      props.history.push('/');
    }
    else {
      Swal.fire({
        title: 'Error!',
        text: res.message,
        icon: 'error',
      });
    }
  }
  
  return (
    <Container className="py-5">
      <h4 className="text-center">Login</h4>
      <Form onSubmit={handleSubmit} className="col-6 offset-3">
        <Form.Group controlId="usernameLabel">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control type="text" name="username" onChange={handleInput} />
        </Form.Group>
        <Form.Group controlId="passwordLabel">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" name="password" onChange={handleInput} />
        </Form.Group>
        <Button variant="success" type="submit">
          Iniciar Sesión
        </Button>
      </Form>
    </Container>
  );
}

const mapDispatchToProps = {
  authUser
};

export default connect(null, mapDispatchToProps)(Login);