import React from 'react';
import './assets/imgs/fondo2.jpg';
import './assets/css/foodhut.css'; // Importamos el archivo CSS

function HomePage() {
  return (
    <div>
      <header id="home" className="header">
        <div className="overlay text-white text-center">
          <h2 className="display-2 font-weight-bold my-3">UNIVERSIDAD DE LAS FUERZAS ARMADAS ESPE</h2>
          <a className="display-5 mb-5">Centro de acceso a las diversas fuentes de información, que apoya, dinamiza y fortalece las capacidades investigativas de estudiantes, docentes e investigadores, mediante el uso de recursos electrónicos, impresos &amp; en otros formatos y medios de almacenamiento para su completo desarrollo profesional.</a>
          <a className="btn btn-lg btn-primary" href="#about">Más acerca de nosotros</a>
        </div>
      </header>

      <div className="container-fluid wow fadeIn" id="about" data-wow-duration="1.5s">
        <div className="row">
          <div className="col-lg-6 has-img-bg"></div>
          <div className="col-lg-6">
            <div className="row justify-content-center">
              <div className="col-sm-8 py-5 my-5">
                <h2 className="mb-4">About Us</h2>
                <p>
                  <p>
                    Permite a los usuarios el acceso directo al fondo bibliográfico que se encuentra organizado por áreas del conocimiento y distribuido en la planta baja y primer piso; para la orientación cuentan con señalética. Además la infraestructura está implementada con un circuito cerrado de televisión, alarmas sonoras y audibles para mantener el orden.
                  </p>

                  <br />Para el acceso dentro del campus Universitario debe ingresar al micrositio de Biblioteca, a través del enlace: https://biblioteca.espe.edu.ec/ en la pestaña “Recursos en Línea”, en donde encontrará los recursos digitales disponibles y para ingresar simplemente tendrá que dar click sobre la elección de su interés.</p>
                <p>
                  <p>
                    <b>Acceso al Fondo Bibliográfico</b>
                  </p>
                  <p>Este servicio funciona mediante el esquema de Estantería Abierta,
                    organizado de acuerdo a una clasificación temática donde los usuarios
                    pueden acceder libremente a las colecciones.</p>
                </p>
                <p><b>Catálogo automatizado de consulta</b>
                  Catálogo destinado, para que la Comunidad Politécnica pueda
                  consultar y ubicar el fondo bibliográfico de forma rápida y precisa.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav className="custom-navbar navbar navbar-expand-lg navbar-dark fixed-top" data-spy="affix" data-offset-top="10">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
          <a className="navbar-brand m-auto" href="#">
            <img src="assets/imgs/fondo2.jpg" className="brand-img" alt="" />
            <span className="brand-txt">UNIVERSIDAD DE LAS FUERZAS ARMADAS ESPE</span>
          </a>
        </div>
      </nav>
    </div>
  );
}

export default HomePage;
