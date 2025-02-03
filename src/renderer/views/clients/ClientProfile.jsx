import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Grid, Modal } from '@mui/material';
import axios from 'axios';
import './ClientProfile.css'; 

const API_URL = 'http://localhost:5000/clients';
const UPLOAD_URL = 'http://localhost:5000/upload';
const IMAGE_PATH = '/imagenes';

const ClientProfile = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/${id}`)
      .then(response => setClient(response.data))
      .catch(error => console.error('Error obteniendo cliente:', error));
    
    fetchImages();
  }, [id]);

  const fetchImages = () => {
    axios.get(`${IMAGE_PATH}/${id}`)
      .then(response => setImages(response.data))
      .catch(error => console.error('Error obteniendo imágenes:', error));
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    
    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('userId', id);

    axios.post(UPLOAD_URL, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(() => {
      fetchImages();
      setSelectedFile(null);
    }).catch(error => console.error('Error subiendo imagen:', error));
  };


  const handleImageClick = (img) => {
    setSelectedImage(img);
    setOpenModal(true);
  }

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedImage(null);
  }

  if (!client) {
    return <Typography>Cargando...</Typography>;
  }

  return (
    <Card className="client-card">
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Ficha del Cliente
        </Typography>
        <div className="data-box">
          <Typography variant="body1"><strong>ID:</strong> {client.id}</Typography>
        </div>
        <div className="data-box">
          <Typography variant="body1"><strong>Nombre:</strong> {client.name}</Typography>
        </div>
        <div className="data-box">
          <Typography variant="body1"><strong>Email:</strong> {client.email}</Typography>
        </div>
        <div className="data-box">
          <Typography variant="body1"><strong>Teléfono:</strong> {client.phone}</Typography>
        </div>
      </CardContent>
      
      <label htmlFor="file-upload" className="upload-button">
        Elige un archivo
      </label>
      <input id="file-upload" type="file" onChange={handleFileChange} />
      <Button variant="contained" color="secondary" onClick={handleUpload} disabled={!selectedFile}>
        Subir Imagen
      </Button>
      
      <Grid container spacing={2} className="grid-container">
        {images.map((img, index) => (
          <Grid item xs={4} key={index}>
            <img 
              src={`${IMAGE_PATH}/${id}/${img}`} 
              alt={`Imagen ${index}`} 
              onClick={() => handleImageClick(img)}
            />
          </Grid>
        ))}
      </Grid>
      
      <Button variant="contained" color="primary" onClick={() => navigate('/')} className="back-button">
        Volver a la Lista
      </Button>

      {/* Modal para imagen grande */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img 
          src={`${IMAGE_PATH}/${id}/${selectedImage}`} 
          alt="Imagen grande" 
          className="modal-image"
          onClick={handleCloseModal} 
        />
      </Modal>
    </Card>
  );
};

export default ClientProfile;