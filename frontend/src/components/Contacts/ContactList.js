import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddContact from './AddContact';

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [updatedContact, setUpdatedContact] = useState({ firstName: '', lastName: '', phone: '' });

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

  // Supprimer un contact
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

  // Préparer l'édition
  const handleEdit = (contact) => {
    setEditingContact(contact._id);
    setUpdatedContact({ firstName: contact.firstName, lastName: contact.lastName, phone: contact.phone });
  };

  // Mettre à jour le contact
const handleUpdate = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.patch(
      `http://localhost:5000/api/contacts/${id}`,
      updatedContact,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setContacts(contacts.map((c) => (c._id === id ? response.data : c)));
    setEditingContact(null);
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div>
      <h1>Mes Contacts</h1>
      <AddContact onContactAdded={handleContactAdded} />
      <ul>
        {contacts.map((contact) => (
          <li key={contact._id}>
            {editingContact === contact._id ? (
              <div>
                <input
                  type="text"
                  value={updatedContact.firstName}
                  onChange={(e) => setUpdatedContact({ ...updatedContact, firstName: e.target.value })}
                />
                <input
                  type="text"
                  value={updatedContact.lastName}
                  onChange={(e) => setUpdatedContact({ ...updatedContact, lastName: e.target.value })}
                />
                <input
                  type="text"
                  value={updatedContact.phone}
                  onChange={(e) => setUpdatedContact({ ...updatedContact, phone: e.target.value })}
                />
                <button onClick={() => handleUpdate(contact._id)}>Sauvegarder</button>
                <button onClick={() => setEditingContact(null)}>Annuler</button>
              </div>
            ) : (
              <div>
                {contact.firstName} {contact.lastName} - {contact.phone}{' '}
                <button onClick={() => handleEdit(contact)}>Modifier</button>
                <button onClick={() => handleDelete(contact._id)}>Supprimer</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactList;
