import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/es';
import { Button } from 'react-bootstrap';

export default function TableBody(props) {
  const entries = useSelector(state => state.entries);
  return (
    <tbody>
      {entries.map(entry => <Row key={entry.id} entry={entry} edit={props.edit} delete={props.delete} />)}
    </tbody>
    );
}

function Row(props) {
  const { entry } = props;
  const properties = entry.properties;
  const customer = properties.customer;
  const products = properties.invoicedetails;
  const formatted = formatInvoices(products);

  const invoices = formatted.map(product => 
    <div key={product.id}>
      <p><span className="text-bold">Producto:</span> {product.description}</p>
      <p><span className="text-bold">Agricultor:</span> {product.grower}</p>
    </div>
  );

  const handleEdit = () => {
    props.edit(entry);
  }
  const handleDelete = () => {
    props.delete(entry.id);
  }

  return (
    <tr>
      <td>{entry.id}</td>
      <td>{customer}</td>
      <td>
        { invoices }
      </td>
      <td>{moment(entry.created_at).format('MMMM Do YYYY, h:mm:ss a')}</td>
      <td>
        <Button size="sm" variant="info" className="mr-2" onClick={handleEdit}>Editar</Button>
        <Button size="sm" variant="danger" onClick={handleDelete}>Eliminar</Button>
      </td>
    </tr>
  );
}

function formatInvoices(invoices) {
  if (invoices === undefined) return [];
  let keys = Object.keys(invoices);
  let formatted = [];
  keys.map((item) => {
      formatted.push(invoices[item]);
      return null;
  });
  return formatted;
}