import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import API from '../utils/API';
import Swal from 'sweetalert2';

const AddEntryForm = props => {
  const { user } = props;
  const headers = {
    'Authorization': user.token
  };
  const [errors, setErrors] = useState({});

  const [form, setValues] = useState({
    id: '',
    type: 0,
    properties: {}
  });

  const handleInput = event => {
    // We set the input value
    setValues({
      ...form,
      [event.target.name]: event.target.value
    })
    // We clear the error
    let newErrors = errors;
    delete newErrors[event.target.name];
    setErrors(newErrors);
  }

  const handleSubmit = async event => {
    event.preventDefault();
    // console.log(form);
    let res = await API.authPostRequest('/entries/add', form, headers);
    if(!res.success) {
      setErrors(res.err);
      Swal.fire({
        title: 'Error!',
        text: res.message,
        icon: 'error',
      });
    }
    if(res.success) {
      Swal.fire({
        title: '¡Éxito!',
        text: res.message,
        icon: 'success',
      });
      props.afterSubmit();
    }
    // console.log(res);
    // console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="entryId">
        <Form.Label>ID</Form.Label>
        <Form.Control type="text" name="id" onChange={handleInput} />
        { errors.hasOwnProperty("id") ?
          <span className="text-danger">
            {errors.id}
          </span>
          : null
        }
      </Form.Group>
      <Form.Group controlId="entryType">
        <Form.Label>Tipo</Form.Label>
        <Form.Control type="number" name="type" onChange={handleInput} />
        { errors.hasOwnProperty("type") ?
          <span className="text-danger">
            {errors.type}
          </span>
          : null
        }
      </Form.Group>
      <Form.Group controlId="entryProperties">
        <Form.Label>Propiedades</Form.Label>
        <Form.Control as="textarea" name="properties" onChange={handleInput} />
        { errors.hasOwnProperty("properties") ?
          <span className="text-danger">
            {errors.properties}
          </span>
          : null
        }
      </Form.Group>
      <Button variant="success" type="submit">
        Guardar
      </Button>
    </Form>
  );
}

export default AddEntryForm;