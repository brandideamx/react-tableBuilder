import React from "react";
import { Container } from 'react-bootstrap';
import TableBuilder from '../components/TableBuilder';

const Home = () => {
  return (
    <Container className="my-5">
      <h3 className="text-left mb-3">Entradas</h3>
      <TableBuilder 
        showSearchBar={true}
        searchBarHint="Búsqueda"
        actions={true}
      />
    </Container>
  );
}

export default Home;