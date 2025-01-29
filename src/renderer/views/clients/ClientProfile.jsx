import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button } from '@mui/material';
import axios from 'axios';

const API_URL = 'http://localhost:5000/clients';

const ClientProfile = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/${id}`)
      .then(response => setClient(response.data))
      .catch(error => console.error('Error obteniendo cliente:', error));
  }, [id]);

  if (!client) {
    return <Typography>Cargando...</Typography>;
  }

  return (
    <Card sx={{ maxWidth: 500, margin: 'auto', mt: 5, p: 2 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Ficha del Cliente
        </Typography>
        <Typography variant="body1"><strong>ID:</strong> {client.id}</Typography>
        <Typography variant="body1"><strong>Nombre:</strong> {client.name}</Typography>
        <Typography variant="body1"><strong>Email:</strong> {client.email}</Typography>
        <Typography variant="body1"><strong>Teléfono:</strong> {client.phone}</Typography>
      </CardContent>
      <Button variant="contained" color="primary" onClick={() => navigate('/')}>
        Volver a la Lista
      </Button>
    </Card>
  );
};

export default ClientProfile;
