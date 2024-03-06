import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { AddLoan } from './AddLoan';

export function Loan() {
    const [loans, setLoans] = useState([]);
    const [displayAddDialog, setDisplayAddDialog] = useState(false);
    const [searchId, setSearchId] = useState('');
    const [searchedLoan, setSearchedLoan] = useState(null);

    useEffect(() => {
        document.title = 'Préstamos';
        fetchData();
    }, []);

    const fetchData = () => {
        if (searchId === '') {
            fetch("http://localhost:8080/loan", {
                method: "GET",
            })
                .then((res) => res.json())
                .then((data) => {
                    setLoans(data);
                })
                .catch(error => {
                    console.error("Error al obtener préstamos:", error);
                });
        } else {
            fetch(`http://localhost:8080/loan/${searchId}`, {
                method: "GET",
            })
                .then((res) => res.json())
                .then((data) => {
                    setSearchedLoan(data);
                })
                .catch(error => {
                    console.error("Error al obtener préstamo:", error);
                });
        }
    };

    const handleAdd = () => {
        setDisplayAddDialog(true);
    };

    const saveLoan = () => {
        setDisplayAddDialog(false);
        fetchData();
    };

    const handleSearch = () => {
        console.log('Buscar préstamo por ID:', searchId);
        fetchData();
    };

    return (
        <div>
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
                        <span className="brand-txt">Food Hut</span>
                    </a>
                </div>
            </nav>
            <h1 style={{ textAlign: 'center' }}>Lista de Préstamos</h1>
            <div style={{ display: 'flex', alignItems: 'center', textAlign: 'left', marginBottom: '20px', marginLeft: '50px' }}>
                <Button label="Nuevo Préstamo" icon="pi pi-plus" onClick={handleAdd} className="p-button-success" text raised rounded />

                <div style={{ marginLeft: '10px', marginRight: '10px', display: 'flex', alignItems: 'center' }}>
                    <input style={{ marginLeft: '10px', marginRight: '10px' }} type="text" placeholder="ID de Préstamo" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
                    <Button label="Buscar" icon="pi pi-search" onClick={handleSearch} className="p-button-success" text raised rounded />
                </div>
            </div>

            <div style={{ textAlign: 'center', marginLeft: '50px', marginRight: '50px' }}>
                <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
                    <DataTable value={loans} stripedRows style={{ width: '100%' }}>
                        <Column field="id" header="ID" />
                        <Column field="loanDate" header="Fecha de Préstamo" />
                        <Column field="returnDate" header="Fecha de Devolución" />
                        <Column field="student.firstName" header="Nombre del Estudiante" />
                        <Column field="student.lastName" header="Apellido del Estudiante" />
                        <Column field="book.name" header="Nombre del Libro" />
                    </DataTable>
                </div>
            </div>

            <Dialog header="Detalles del Préstamo" visible={searchedLoan !== null} style={{ width: '45vw' }} onHide={() => setSearchedLoan(null)}>
                <div style={{ textAlign: 'center' }}>
                    {searchedLoan ? (
                        <>
                            <p>ID: {searchedLoan.id}</p>
                            <p>Fecha de Préstamo: {searchedLoan.loanDate}</p>
                            <p>Fecha de Devolución: {searchedLoan.returnDate}</p>
                            <p>Nombre del Estudiante: {searchedLoan.student.firstName}</p>
                            <p>Apellido del Estudiante: {searchedLoan.student.lastName}</p>
                            <p>Nombre del Libro: {searchedLoan.book.name}</p>
                        </>
                    ) : (
                        <p>No se encontró ningún préstamo con el ID proporcionado.</p>
                    )}
                    <Button label="Cerrar" onClick={() => setSearchedLoan(null)} className="p-button-secondary" />
                </div>
            </Dialog>

            <Dialog header="Agregar Nuevo Préstamo" headerClassName="custom-dialog-header" visible={displayAddDialog} style={{ width: '45vw' }} onHide={() => setDisplayAddDialog(false)}>
                <AddLoan onSave={saveLoan} onCancel={() => setDisplayAddDialog(false)} />
            </Dialog>
        </div>
    );
}
