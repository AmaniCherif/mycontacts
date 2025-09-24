import React, { useState } from 'react';
import axios from 'axios';

function AddContact({ onContactAdded }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // ou d'où tu stockes le token
      const response = await axios.post(
        'http://localhost:5000/api/contacts',
        { firstName, lastName, phone },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onContactAdded(response.data); // callback pour mettre à jour la liste
      setFirstName('');
      setLastName('');
      setPhone('');
    } catch (error) {
      console.error(error);
      alert('Erreur lors de l’ajout du contact.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Prénom"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Nom"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Téléphone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <button type="submit">Ajouter Contact</button>
    </form>
  );
}

export default AddContact;
