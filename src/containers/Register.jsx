import React, { useState } from "react";
import { Container, Form, Button } from 'react-bootstrap';
import API from '../utils/API';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';

const Register = props => {

  const [form, setValues] = useState({
    fullname: "",
    username: "",
    password: "",
  });

  const [isComplete, setComplete] = useState(false);

  const handleInput = event => {
    setValues({
      ...form,
      [event.target.name]: event.target.value
    });
    if(form.fullname !== '' && form.username !== '' && form.password !== '') {
      setComplete(true);
    }
  }

  const handleSubmit = async event => {
    event.preventDefault();
    console.log(form);
    let res = await API.postRequest('/signup', form);
    if(res.success) {
      props.history.push('/login');
    }
    else {
      Swal.fire({
        title: 'Error!',
        text: res.message,
        icon: 'error',
      });
    }

    console.log(res);
  }

  return (
    <Container className="py-5">
      <h4 className="text-center">Register</h4>
      <Form onSubmit={handleSubmit} className="col-6 offset-3">
        <Form.Group controlId="nameLabel">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" name="fullname" onChange={handleInput} />
        </Form.Group>
        <Form.Group controlId="usernameLabel">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control type="text" name="username" onChange={handleInput} />
        </Form.Group>
        <Form.Group controlId="passwordLabel">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" name="password" onChange={handleInput} />
        </Form.Group>
        { isComplete ?
          <Button variant="success" type="submit">
            Registrarse
          </Button>
          : null
        }
      </Form>
    </Container>
  );

}

export default connect(null, null)(Register);