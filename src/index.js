import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import "primereact/resources/themes/saga-orange/theme.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Author } from './Components/Authors/Author';
import { Book } from './Components/Books/Book';
import { Student } from './Components/Students/Student';
import { Loan } from './Components/Loans/Loan'; 
import HomePage from './Components/HomePage';

ReactDOM.render(
  <Router>
    <div>
      <h1 style={{ textAlign: 'center' }}>Biblioteca Alejandro Segovia</h1>
    </div>
    
    <Routes>
      <Route path="/" element={<HomePage />} /> 
      <Route path="/author" element={<Author />} />
      <Route path="/book" element={<Book />} />
      <Route path="/student" element={<Student />} />
      <Route path="/loan" element={<Loan />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
