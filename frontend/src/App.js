// src/App.js
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import ContactList from './components/Contacts/ContactList';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/contacts" element={<ContactList />} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
