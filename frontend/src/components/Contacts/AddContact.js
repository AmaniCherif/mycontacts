// AddContact.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Paper, Typography } from '@mui/material';

function AddContact({ onContactAdded }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/contacts',
        { firstName, lastName, phone },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onContactAdded(response.data);
      setFirstName('');
      setLastName('');
      setPhone('');
    } catch (error) {
      console.error(error);
      alert('Erreur lors de l’ajout du contact.');
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Ajouter un contact
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          label="Prénom"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Nom"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Téléphone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Ajouter
        </Button>
      </Box>
    </Paper>
  );
}

export default AddContact;
