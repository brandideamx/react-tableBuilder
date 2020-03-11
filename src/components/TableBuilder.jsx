import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Form, Pagination, Spinner } from 'react-bootstrap';
import moment from 'moment';
import 'moment/locale/es';
import MyModal from './MyModal';
import AddEntryForm from './AddEntryForm';
import EditEntryForm from './EditEntryForm';
import Swal from 'sweetalert2';
import API from '../utils/API';
import { getAllEntries } from '../actions';

// const WebSocketUrl = 'ws://localhost:8000';
const WebSocketUrl = 'wss://rancho-customs-brokers.herokuapp.com';


const TableBuilder = props => {
  const { entries, user } = useSelector(state => ({
    entries: state.entries,
    user: state.user,
  }));
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [offset, setOffset] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  
  const headers = {
    'Authorization': user.token
  }

  const [rows, setRows] = useState(entries);

  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState({
    heading: '',
    body: ''
  });
  const tableHeaders = [
    '# Entrada',
    'Distribuidor',
    'Productos',
    'Fecha'
  ];

  const [loading, setLoading] = useState(true);

  const ws = new WebSocket(WebSocketUrl);
  
  const totalRecords = async () => {
    const results = await API.authGetRequest('/entries/count', headers);
    setTotalRows(results.rows);
  }

  async function getData() {
    const res = await API.authGetRequest('/entries', headers);
    dispatch(getAllEntries(res));
    setRows(res);
    setLoading(false);
  }

  useEffect(() => {
    getData();
    totalRecords();
  }, [rows]);

  useEffect(() => {
    // WS action
    ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected')
    }

    ws.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      // const message = JSON.parse(evt.data)
      // addMessage(message)
      getData();
    }

    ws.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss
      // setState({
      //   ws: new WebSocket(URL),
      // })
    }
  }, []);

  const handleSearch = async event => {
    const query =event.target.value;
    const results = await API.authPostRequest('/entries/search', { query: query }, headers);
    setRows(results);
  }

  const afterSubmit = (action) => {
    setModalShow(false);
    ws.send(action);
    // getData();
  }

  const addEntryModal = () => {
    setModalData({
      heading: 'Agregar entrada',
      body: <AddEntryForm
              user={user}
              afterSubmit={() => afterSubmit('add')}
            />
    });
    setModalShow(true);
  }

  const handleEdit = (entry) => {
    setModalData({
      heading: 'Editar entrada',
      body: <EditEntryForm 
              user={user}
              entry={entry}
              afterSubmit={() => afterSubmit('edit')}
            />
    });
    setModalShow(true);
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Estas seguro?',
      text: "¡No podras revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      // if selects yes
      if (result.value) {     
        const res = await API.authGetRequest(`/entries/${id}/delete`, headers);
        if(!res.success) {
          Swal.fire({
            title: 'Error!',
            text: res.message,
            icon: 'error',
          });
        }
        else if(res.success) {
          Swal.fire({
            title: '¡Éxito!',
            text: res.message,
            icon: 'success',
          });
          getData();
          // afterSubmit('delete');
        }
      }
    })
  }

  const handleCurrentPage = props => {
    console.log(props);
  }

  const handleResultsPerPage = props => {
    console.log(props);
  }
  const handleOffset = props => {
    console.log(props);
  }

  return (
    <>
    { loading ?
      <div className="d-flex flex-center flex-align-center">
        <Spinner animation="border" variant="primary" />
      </div>
      :
    <>
      <div className="mb-3 d-flex flex-end flex-align-baseline">
        { props.showSearchBar ?
          <SearchBar 
            onChange={handleSearch}
            placeholder={props.searchBarHint}
          />
          : null
        }
        { props.actions ?
        <>
          <MyModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            heading={modalData.heading}
            body={modalData.body}
          />
          <Button 
            title="Agregar nueva"
            variant="success"
            size="md" 
            className="mx-1" 
            onClick={addEntryModal}
          >
            <i className="fa fa-plus"></i>
          </Button>
        </>
          : null
        }
      </div>
      <Table striped bordered hover size="sm">
        <TableHeaders 
          headers={tableHeaders}
          actions={props.actions}
        />
        <TableBody
          actions={props.actions}
          data={rows}
          edit={handleEdit}
          delete={handleDelete}
        />
      </Table>
      <TableFooter
        entries={totalRows}
        currentPage={currentPage}
        resultsPerPage={resultsPerPage}
        offset={offset}
      />
    </>
    }
    </>
  );
}

const TableFooter = (props) => {
  return (
    <div className="table-footer d-flex flex-space-between flex-align-baseline">
      <RowsCount entries={props.entries} />
      <Paginator 
        entries={props.entries}
        currentPage={props.currentPage}
        resultsPerPage={props.resultsPerPage}
        offset={props.offset}
      />
    </div>
  )
}

const RowsCount = (props) => {
  const records = props.entries;
  return (
    <span>{records} resultados.</span>
  )
}

const Paginator = props => {
  const { entries, resultsPerPage, offset, currentPage } = props;
  let totalPages = Math.ceil(entries / resultsPerPage);

  let i = 1;
  let pages = [];
  while(i <= totalPages) {
    pages.push(i);
    i++;
  }

  const Items = pages.map((page, index) => (
    <>
      { currentPage === page ?
        <Pagination.Item key={index} active>{page}</Pagination.Item>
        :
        <Pagination.Item key={index}>{page}</Pagination.Item>
      }
    </>
  )); 

  return(
    <Pagination>
      {/* <Pagination.Prev /> */}
      {Items}
      {/* <Pagination.Item active>1</Pagination.Item>
      <Pagination.Item>2</Pagination.Item>
      <Pagination.Item>3</Pagination.Item> */}
      {/* <Pagination.Next /> */}
    </Pagination>
  );
}

const SearchBar = props => {
  return (
    <Form.Control 
      type="text"
      name="search"
      onChange={props.onChange}
      placeholder={props.placeholder}
      className="mx-1"
    />
  )
}

const TableHeaders = ({ headers, actions = false }) => {
  return (
    <thead>
      <tr>
        { headers.map((header, index) => <th key={index}>{header}</th>) }
        { actions ?
          <th>Acciones</th>
          : null
        }
      </tr>
    </thead>
  );
}

const TableBody = props => {
  const { data } = props;
  return (
    <tbody>
      { data.length === 0 ?
        <EmptyRow />
        : 
        <>
          { data.map(entry => 
            <Row 
              key={entry.id}
              entry={entry} 
              actions={props.actions}
              edit={props.edit} 
              delete={props.delete} 
            />
          ) }
        </>
      }
    </tbody>
  );
}

const EmptyRow = () => {
  return (
    <tr>
      <td colSpan="5">No hay resultados</td>
    </tr>
  )
}

const Row = (props) => {
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
      <td>{moment(entry.created_at).format('MMMM D YYYY, h:mm a')}</td>
      { props.actions ?
        <td>
          <Button 
            title="Editar"
            size="sm" 
            variant="info" 
            className="mr-2" 
            onClick={handleEdit}>
            <i className="fa fa-pencil"></i>
          </Button>
          <Button 
            title="Eliminar"
            size="sm" 
            variant="danger" 
            onClick={handleDelete}>
            <i className="fa fa-trash"></i>
          </Button>
        </td>
        : null
      }
    </tr>
  );
}

const formatInvoices = (invoices) => {
  if (invoices === undefined) return [];
  let keys = Object.keys(invoices);
  let formatted = [];
  keys.map((item) => {
      formatted.push(invoices[item]);
      return null;
  });
  return formatted;
}

export default TableBuilder;