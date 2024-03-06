import React, { useState } from 'react';
import { Button } from 'primereact/button';

export function AddStudent(props) {
    const [studentData, setStudentData] = useState({
        firstName: '',
        lastName: '',
        studentId: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudentData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:8080/student", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(studentData)
        })
            .then(response => response.json())
            .then(data => {
                console.log("Estudiante agregado exitosamente:", data);
                props.onSave();
            })
            .catch(error => {
                console.error("Error al agregar estudiante:", error);
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
                    />
                </div>
                <div>
                    <label>Apellido:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={studentData.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>ID del Estudiante:</label>
                    <input
                        type="text"
                        name="studentId"
                        value={studentData.studentId}
                        onChange={handleChange}
                    />
                </div>
                <div className="button-group">
                    <Button label="Guardar" type="submit" className="p-button-secondary" />
                </div>
            </form>
        </div>
    );
}