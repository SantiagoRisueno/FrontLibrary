import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { AddStudent } from './AddStudent';
import { EditStudent } from './EditStudent';

export function Student() {
    const [students, setStudents] = useState([]);
    const [displayAddDialog, setDisplayAddDialog] = useState(false);
    const [displayEditDialog, setDisplayEditDialog] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [searchId, setSearchId] = useState('');
    const [searchedStudent, setSearchedStudent] = useState(null);
    const [displaySearchModal, setDisplaySearchModal] = useState(false);

    useEffect(() => {
        document.title = 'Estudiantes';
        fetchData();
    }, []);

    const fetchData = () => {
        if (searchId === '') {
            fetch("http://localhost:8080/student", {
                method: "GET",
            })
                .then((res) => res.json())
                .then((data) => {
                    setStudents(data);
                })
                .catch(error => {
                    console.error("Error al obtener estudiantes:", error);
                });
        } else {
            fetch(`http://localhost:8080/student/${searchId}`, {
                method: "GET",
            })
                .then((res) => res.json())
                .then((data) => {
                    setSearchedStudent(data);
                    setDisplaySearchModal(true);
                })
                .catch(error => {
                    console.error("Error al obtener estudiante:", error);
                });
        }
    };

    const saveStudent = () => {
        setDisplayAddDialog(false);
        fetchData();
    };

    const editStudent = (student) => {
        setSelectedStudent(student);
        setDisplayEditDialog(true);
    };

    const deleteStudent = (student) => {
        fetch(`http://localhost:8080/student/${student.id}`, {
            method: "DELETE",
        })
            .then(() => {
                console.log("Estudiante eliminado exitosamente");
                fetchData();
            })
            .catch(error => {
                console.error("Error al eliminar estudiante:", error);
            });
    };

    const handleSearch = () => {
        console.log('Buscar estudiante por ID:', searchId);
        fetchData();
    };

    const handleCancel = () => {
        setDisplaySearchModal(false);
        setSearchId('');
        setSearchedStudent(null);
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
            <h1 style={{ textAlign: 'center' }}>Lista de Estudiantes</h1>
            <div style={{ display: 'flex', alignItems: 'center', textAlign: 'left', marginBottom: '20px', marginLeft: '50px' }}>
                <Button label="Nuevo Estudiante" icon="pi pi-user-plus" onClick={() => setDisplayAddDialog(true)} className="p-button-success" text raised rounded />

                <div style={{ marginLeft: '10px', marginRight: '10px', display: 'flex', alignItems: 'center' }}>
                    <input style={{ marginLeft: '10px', marginRight: '10px' }} type="text" placeholder="ID de Estudiante" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
                    <Button label="Buscar" icon="pi pi-search" onClick={handleSearch} className="p-button-success" text raised rounded />
                </div>
            </div>



            <Dialog header="Buscar Estudiante" visible={displaySearchModal} style={{ width: '45vw' }} onHide={handleCancel}>
                <div style={{ textAlign: 'center' }}>
                    {searchedStudent ? (
                        <>
                            <p>Detalles del Estudiante:</p>
                            <p>Nombre: {searchedStudent.firstName}</p>
                            <p>Apellido: {searchedStudent.lastName}</p>
                            <p>ID: {searchedStudent.studentId}</p>
                        </>
                    ) : (
                        <p>No se encontró ningún estudiante con el ID proporcionado.</p>
                    )}
                    <Button label="Cerrar" onClick={handleCancel} className="p-button-secondary" />
                </div>
            </Dialog>

            <Dialog header="Agregar Nuevo Estudiante" headerClassName="custom-dialog-header" visible={displayAddDialog} style={{ width: '45vw' }} onHide={() => setDisplayAddDialog(false)}>
                <AddStudent onSave={saveStudent} onCancel={() => setDisplayAddDialog(false)} />
            </Dialog>
            <Dialog header="Editar Estudiante" headerClassName="custom-dialog-header" visible={displayEditDialog} style={{ width: '45vw' }} onHide={() => setDisplayEditDialog(false)}>
                {selectedStudent && <EditStudent student={selectedStudent} onSave={() => { setDisplayEditDialog(false); fetchData(); }} onCancel={() => setDisplayEditDialog(false)} />}
            </Dialog>

            <div style={{ textAlign: 'center', marginLeft: '50px', marginRight: '50px' }}>
                <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
                    <DataTable value={students} stripedRows style={{ width: '100%' }}>
                        <Column field="id" header="ID" />
                        <Column field="firstName" header="Nombre" />
                        <Column field="lastName" header="Apellido" />
                        <Column field="studentId" header="ID Estudiante" />
                        <Column
                            body={(rowData) => (
                                <div style={{ display: 'flex', gap: '10px', textAlign: 'center', marginBottom: '20px' }}>
                                    <Button label='Editar' icon="pi pi-pencil" onClick={() => editStudent(rowData)} className="p-button-secondary" text raised rounded />
                                </div>
                            )}
                        />
                    </DataTable>
                </div>
            </div>
        </div>
    );
}
