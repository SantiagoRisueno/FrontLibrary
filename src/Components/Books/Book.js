import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { AddBook } from './AddBook';
import { EditBook } from './EditBook';

export function Book() {
    const [books, setBooks] = useState([]);
    const [displayAddDialog, setDisplayAddDialog] = useState(false);
    const [displayEditDialog, setDisplayEditDialog] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [searchId, setSearchId] = useState('');
    const [searchedBook, setSearchedBook] = useState(null);
    const [displaySearchModal, setDisplaySearchModal] = useState(false);

    useEffect(() => {
        document.title = 'Libros';
        fetchData();
    }, []);

    const fetchData = () => {
        if (searchId === '') {
            fetch("http://localhost:8080/book", {
                method: "GET",
            })
                .then((res) => res.json())
                .then((data) => {
                    setBooks(data); // Guarda los libros en el estado
                })
                .catch(error => {
                    console.error("Error al obtener libros:", error);
                });
        } else {
            fetch(`http://localhost:8080/book/${searchId}`, {
                method: "GET",
            })
                .then((res) => res.json())
                .then((data) => {
                    setSearchedBook(data);
                    setDisplaySearchModal(true);
                })
                .catch(error => {
                    console.error("Error al obtener libro:", error);
                });
        }
    };

    const saveBook = () => {
        setDisplayAddDialog(false);
        fetchData(); // Actualiza la lista después de guardar
    };

    const editBook = (book) => {
        setSelectedBook(book);
        setDisplayEditDialog(true);
    };

    const deleteBook = (book) => {
        fetch(`http://localhost:8080/book/${book.id}`, {
            method: "DELETE",
        })
            .then(() => {
                console.log("Libro eliminado exitosamente");
                fetchData(); // Actualiza la lista después de eliminar
            })
            .catch(error => {
                console.error("Error al eliminar libro:", error);
            });
    };

    const handleSearch = () => {
        console.log('Buscar libro por ID:', searchId);
        // Aquí puedes implementar la lógica para buscar por ID
        fetchData();
    };

    const handleCancel = () => {
        setDisplaySearchModal(false);
        setSearchId('');
        setSearchedBook(null);
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
            <h1 style={{ textAlign: 'center' }}>Lista de Libros</h1>
            <div style={{ display: 'flex', alignItems: 'center', textAlign: 'left', marginBottom: '20px', marginLeft: '50px' }}>
                <Button label="Nuevo Libro" icon="pi pi-book" onClick={() => setDisplayAddDialog(true)} className="p-button-success" text raised rounded />

                <div style={{ marginLeft: '10px', marginRight: '10px', display: 'flex', alignItems: 'center' }}>
                    <input style={{ marginLeft: '10px', marginRight: '10px' }} type="text" placeholder="ID de Libro" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
                    <Button label="Buscar" icon="pi pi-search" onClick={handleSearch} className="p-button-success" text raised rounded />
                </div>
            </div>

            <Dialog header="Buscar Libro" visible={displaySearchModal} style={{ width: '45vw' }} onHide={handleCancel}>
                <div style={{ textAlign: 'center' }}>
                    {searchedBook ? (
                        <>
                            <p>Detalles del Libro:</p>
                            <p>Título: {searchedBook.name}</p>
                            <p>Editorial: {searchedBook.publishingHouse}</p>
                            <p>Fecha de Publicación: {searchedBook.publicationDate}</p>
                            {/* Agrega aquí más detalles si es necesario */}
                        </>
                    ) : (
                        <p>No se encontró ningún libro con el ID proporcionado.</p>
                    )}
                    <Button label="Cerrar" onClick={handleCancel} className="p-button-secondary" />
                </div>
            </Dialog>

            <Dialog header="Agregar Nuevo Libro" headerClassName="custom-dialog-header" visible={displayAddDialog} style={{ width: '45vw' }} onHide={() => setDisplayAddDialog(false)}>
                <AddBook onSave={saveBook} onCancel={() => setDisplayAddDialog(false)} />
            </Dialog>
            <Dialog header="Editar Libro" headerClassName="custom-dialog-header" visible={displayEditDialog} style={{ width: '45vw' }} onHide={() => setDisplayEditDialog(false)}>
                {selectedBook && <EditBook book={selectedBook} onSave={() => { setDisplayEditDialog(false); fetchData(); }} onCancel={() => setDisplayEditDialog(false)} />}
            </Dialog>

            <div style={{ textAlign: 'center', marginLeft: '50px', marginRight: '50px' }}>
                <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
                    <DataTable value={books} stripedRows style={{ width: '100%' }}>
                        <Column field="id" header="ID" />
                        <Column field="name" header="Título" />
                        <Column
                            header="Autor"
                            body={(rowData) => (
                                <div>{`${rowData.author.authorFirstName} ${rowData.author.authorLastName}`}</div>
                            )}
                        />
                        <Column field="author.nationality" header="Nacionalidad" />
                        <Column field="publishingHouse" header="Editorial" />
                        <Column field="publicationDate" header="Fecha de Publicación" />
                        <Column field="state" header="Estado" />
                        <Column
                            body={(rowData) => (
                                <div style={{ display: 'flex', gap: '10px', textAlign: 'center', marginBottom: '20px' }}>
                                    <Button label='Editar' icon="pi pi-pencil" onClick={() => editBook(rowData)} className="p-button-secondary" text raised rounded />
                                    <Button label='Eliminar' icon="pi pi-trash" onClick={() => deleteBook(rowData)} className="p-button-danger" text raised rounded />
                                </div>
                            )}
                        />
                    </DataTable>
                </div>
            </div>
        </div>
    );
}
