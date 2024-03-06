import React from 'react';


function Navbar() {
  return (
    <ul className="navbar-nav">
      <li className="nav-item">
        <a className="nav-link" href="http://localhost:3000/">Home</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="http://localhost:3000/author">Autores</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="http://localhost:3000/book">Libros</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="http://localhost:3000/loan">Préstamos</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="http://localhost:3000/student">Estudiantes</a>
      </li>
    </ul>
  );
}

export default Navbar;
