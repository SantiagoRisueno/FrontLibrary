import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { AddAuthor } from './AddAuthor';
import { EditAuthor } from './EditAuthor';

export function Author() {
    const [authors, setAuthors] = useState([]);
    const [displayAddDialog, setDisplayAddDialog] = useState(false);
    const [displayEditDialog, setDisplayEditDialog] = useState(false);
    const [selectedAuthor, setSelectedAuthor] = useState(null);
    const [searchId, setSearchId] = useState('');
    const [searchedAuthor, setSearchedAuthor] = useState(null);
    const [displaySearchModal, setDisplaySearchModal] = useState(false);

    useEffect(() => {
        document.title = 'Autores';
        fetchData();
    }, []);

    const fetchData = () => {
        if (searchId === '') {
            fetch("http://localhost:8080/author", {
                method: "GET",
            })
                .then((res) => res.json())
                .then((data) => {
                    const sortedAuthors = data.sort((a, b) => a.authorFirstName.localeCompare(b.authorFirstName));
                    console.log("Autores ordenados:", sortedAuthors); // Agregar este console.log para verificar el orden de los autores
                    setAuthors(sortedAuthors); // Guarda los autores en el estado ordenados alfabéticamente
                })
                .catch(error => {
                    console.error("Error al obtener autores:", error);
                });
        } else {
            fetch(`http://localhost:8080/author/${searchId}`, {
                method: "GET",
            })
                .then((res) => res.json())
                .then((data) => {
                    setSearchedAuthor(data); // Establece el autor encontrado en el estado searchedAuthor
                    setDisplaySearchModal(true); // Muestra el modal de búsqueda
                })
                .catch(error => {
                    console.error("Error al obtener autor:", error);
                });
        }
    };


    const searchAuthor = () => {
        if (searchId !== '') {
            setDisplaySearchModal(true);
            fetch(`http://localhost:8080/author/${searchId}`, {
                method: "GET",
            })
                .then((res) => res.json())
                .then((data) => {
                    setSearchedAuthor(data);
                })
                .catch(error => {
                    console.error("Error al obtener autor:", error);
                });
        }
    };

    const handleCancel = () => {
        setDisplaySearchModal(false);
        setSearchId('');
        setSearchedAuthor(null);
    };

    const saveAuthor = () => {
        setDisplayAddDialog(false);
        fetchData();
    };

    const editAuthor = (author) => {
        setSelectedAuthor(author);
        setDisplayEditDialog(true);
    };

    const deleteAuthor = (author) => {
        fetch(`http://localhost:8080/author/${author.id}`, {
            method: "DELETE",
        })
            .then(() => {
                console.log("Autor eliminado exitosamente");
                fetchData();
            })
            .catch(error => {
                console.error("Error al eliminar autor:", error);
            });
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
            <p>
               
            </p>
            <h4 style={{ textAlign: 'center' }}>Lista de Autores</h4>
            <div style={{ display: 'flex', alignItems: 'center', textAlign: 'left', marginBottom: '20px', marginLeft: '50px' }}>
                <Button label="Nuevo Autor" icon="pi pi-user-plus" onClick={() => setDisplayAddDialog(true)} className="p-button-success" text raised rounded />

                <div style={{ marginLeft: '10px', marginRight: '10px', display: 'flex', alignItems: 'center' }}>
                    <input style={{ marginLeft: '10px', marginRight: '10px' }} type="text" placeholder="ID de Autor" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
                    <Button label="Buscar" icon="pi pi-search" onClick={searchAuthor} className="p-button-success" text raised rounded />
                </div>
            </div>


            <Dialog header="Buscar Autor" visible={displaySearchModal} style={{ width: '45vw' }} onHide={handleCancel}>
                <div style={{ textAlign: 'center' }}>
                    {searchedAuthor ? (
                        <>
                            <p>Detalles del Autor:</p>
                            <p>Nombre: {searchedAuthor.authorFirstName}</p>
                            <p>Apellido: {searchedAuthor.authorLastName}</p>
                            <p>Nacionalidad: {searchedAuthor.nationality}</p>
                        </>
                    ) : (
                        <p>No se encontró ningún autor con el ID proporcionado.</p>
                    )}
                    <Button label="Cerrar" onClick={handleCancel} className="p-button-secondary" />
                </div>
            </Dialog>

            <Dialog header="Agregar Nuevo Autor" visible={displayAddDialog} style={{ width: '45vw' }} onHide={() => setDisplayAddDialog(false)}>
                <AddAuthor onSave={saveAuthor} onCancel={() => setDisplayAddDialog(false)} />
            </Dialog>

            <Dialog header="Editar Autor" visible={displayEditDialog} style={{ width: '45vw' }} onHide={() => setDisplayEditDialog(false)}>
                {selectedAuthor && <EditAuthor author={selectedAuthor} onSave={() => { setDisplayEditDialog(false); fetchData(); }} onCancel={() => setDisplayEditDialog(false)} />}
            </Dialog>

            <div style={{ textAlign: 'center', marginLeft: '50px', marginRight: '50px' }}>
                <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
                    <DataTable value={authors} stripedRows style={{ width: '100%' }} sortField="authorFirstName" sortOrder={1}>
                        <Column field="id" header="ID" />
                        <Column field="authorFirstName" header="Nombre" />
                        <Column field="authorLastName" header="Apellido" />
                        <Column field="nationality" header="Nacionalidad" />
                        <Column body={(rowData) => (
                            <div style={{ display: 'flex', gap: '10px', textAlign: 'center', marginBottom: '20px' }}>
                                <Button label='Editar' onClick={() => editAuthor(rowData)} className="p-button-secondary" text raised rounded />
                                <Button label='Eliminar' onClick={() => deleteAuthor(rowData)} className="p-button-danger" text raised rounded />
                            </div>
                        )} />
                    </DataTable>

                </div>
            </div>
        </div>
    );

}
