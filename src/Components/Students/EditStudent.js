import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';

export function EditStudent(props) {
    const [studentData, setStudentData] = useState({
        firstName: '',
        lastName: '',
        studentId: ''
    });

    useEffect(() => {
        if (props.student) {
            setStudentData({
                firstName: props.student.firstName,
                lastName: props.student.lastName,
                studentId: props.student.studentId
            });
        }
    }, [props.student]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudentData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8080/student/${props.student.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(studentData)
        })
            .then(response => {
                if (response.ok) {
                    console.log("Estudiante actualizado exitosamente");
                    props.onSave();
                } else {
                    throw new Error('Error al actualizar estudiante');
                }
            })
            .catch(error => {
                console.error("Error al actualizar estudiante:", error);
            });
    };

    const handleCancel = () => {
        props.onCancel();
    };

    return (
        <div className="add-student-form">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={studentData.firstName}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                <div>
                    <label>Apellido:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={studentData.lastName}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                <div>
                    <label>ID del Estudiante:</label>
                    <input
                        type="text"
                        name="studentId"
                        value={studentData.studentId}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                <div className="button-group" style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <Button label="Guardar" icon="pi pi-save" type="submit" className="p-button-secondary" raised rounded />
                    <Button label="Cancelar" icon="pi pi-times" onClick={handleCancel} className="p-button-danger" raised rounded />
                </div>
            </form>
        </div>
    );
}
