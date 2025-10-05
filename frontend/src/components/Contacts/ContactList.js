// ContactList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddContact from './AddContact';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  TextField
} from '@mui/material';

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [updatedContact, setUpdatedContact] = useState({ firstName: '', lastName: '', phone: '' });
  const [search, setSearch] = useState('');

  // Récupérer tous les contacts
  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/contacts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleContactAdded = (newContact) => {
    setContacts((prev) => [...prev, newContact]);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/contacts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts(contacts.filter((c) => c._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (contact) => {
    setEditingContact(contact._id);
    setUpdatedContact({ firstName: contact.firstName, lastName: contact.lastName, phone: contact.phone });
  };

  const handleUpdate = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `http://localhost:5000/api/contacts/${id}`,
        updatedContact,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setContacts(contacts.map((c) => (c._id === id ? response.data : c)));
      setEditingContact(null);
    } catch (error) {
      console.error(error);
    }
  };

  // Filtrer les contacts par recherche
  const filteredContacts = contacts.filter(
    (c) =>
      c.firstName.toLowerCase().includes(search.toLowerCase()) ||
      c.lastName.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={3}>Mes Contacts</Typography>

      {/* Formulaire ajout contact */}
      <AddContact onContactAdded={handleContactAdded} />

      {/* Barre de recherche */}
      <TextField
        label="Rechercher un contact"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Liste des contacts */}
      <Grid container spacing={2} mt={1}>
        {filteredContacts.map((contact) => (
          <Grid item xs={12} sm={6} md={4} key={contact._id}>
            <Card>
              <CardContent>
                {editingContact === contact._id ? (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <TextField
                      label="Prénom"
                      value={updatedContact.firstName}
                      onChange={(e) => setUpdatedContact({ ...updatedContact, firstName: e.target.value })}
                    />
                    <TextField
                      label="Nom"
                      value={updatedContact.lastName}
                      onChange={(e) => setUpdatedContact({ ...updatedContact, lastName: e.target.value })}
                    />
                    <TextField
                      label="Téléphone"
                      value={updatedContact.phone}
                      onChange={(e) => setUpdatedContact({ ...updatedContact, phone: e.target.value })}
                    />
                    <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                      <Button variant="contained" color="primary" onClick={() => handleUpdate(contact._id)}>Sauvegarder</Button>
                      <Button variant="outlined" onClick={() => setEditingContact(null)}>Annuler</Button>
                    </Box>
                  </Box>
                ) : (
                  <Box>
                    <Typography variant="h6">{contact.firstName} {contact.lastName}</Typography>
                    <Typography variant="body2">{contact.phone}</Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                      <Button variant="contained" size="small" onClick={() => handleEdit(contact)}>Modifier</Button>
                      <Button variant="outlined" size="small" color="error" onClick={() => handleDelete(contact._id)}>Supprimer</Button>
                    </Box>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ContactList;
