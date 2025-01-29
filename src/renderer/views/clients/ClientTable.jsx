import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, Paper } from '@mui/material';
import axios from 'axios';

const API_URL = 'http://localhost:5000/clients';

const ClientTable = () => {
  // Estado para almacenar los clientes
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({ name: '', email: '', phone: '' });
  const [selectedClient, setSelectedClient] = useState(null);
  const [open, setOpen] = useState(false);

  // Cargar los clientes desde el almacenamiento local (simulando un archivo JSON)
  useEffect(() => {
    axios.get(API_URL)
    .then(response => setClients(response.data))
    .catch(error => console.error(error));
    //const storedClients = JSON.parse(localStorage.getItem('clients')) || [];
    //setClients(storedClients);
  }, []);

  // Función para agregar un nuevo cliente
  /*
  const handleAddClient = () => {
    if (newClient.name && newClient.email && newClient.phone) {
      const updatedClients = [...clients, { ...newClient, id: clients.length + 1 }];
      setClients(updatedClients);
      localStorage.setItem('clients', JSON.stringify(updatedClients)); // Simulando almacenamiento en un archivo JSON
      setNewClient({ name: '', email: '', phone: '' }); // Limpiar el formulario
    }
  };
  */

  const handleAddClient = () => {
  
    if( newClient.name && newClient.email && newClient.phone){
        axios.post(API_URL, newClient)
        .then(response => {
            setClients([...clients, response.data]);
            setNewClient({ name: '', email: '', phone: '' });
        })
        .catch(error => console.error(error));
    }
};

// Abrir ficha del cliente
const handleOpenClient = (client) => {
    setSelectedClient(client);
    setOpen(true);
  };

  // Cerrar modal
  const handleClose = () => {
    setOpen(false);
    setSelectedClient(null);
  };

  return (
    <div>
      <h2>Clientes</h2>

      {/* Formulario para agregar nuevos clientes */}
      <div style={{ marginBottom: '20px' }}>
        <TextField
          label="Nombre"
          variant="outlined"
          value={newClient.name}
          onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Correo Electrónico"
          variant="outlined"
          value={newClient.email}
          onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Teléfono"
          variant="outlined"
          value={newClient.phone}
          onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
          style={{ marginRight: '10px' }}
        />
        <Button variant="contained" color="primary" onClick={handleAddClient}>
          Agregar Cliente
        </Button>
      </div>

      {/* Tabla de clientes */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Correo Electrónico</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.id}</TableCell>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.phone}</TableCell>
                <TableCell>
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={() => handleOpenClient(client)}
                  >
                    Ver Ficha
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ClientTable;
