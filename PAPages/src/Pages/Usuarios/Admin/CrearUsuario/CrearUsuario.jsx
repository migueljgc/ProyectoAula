import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BackGraund } from '../../../../../componentes/BackGraund';
import './CrearUsuario.css'
import { MenuAdmin } from '../../../../../componentes/Menu';

export const CrearUsuario = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        numero: '',
        rol: '',
        usuario: '',
        contraseña: '',
        confirmarContraseña: '',
        tipoIdentificacion: '',
        identificacion: '',
        tipoPersona: '',
    });

    const [identificationTypes, setIdentificationTypes] = useState([]);
    const [personTypes, setPersonTypes] = useState([]);
    const [rolesTypes, setRolesTypes] = useState([]);

    useEffect(() => {
        document.title = "Crear Usuarios"
        const fetchIdentificationTypes = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/identification_type/get');
                console.log('Tipos de identificación obtenidos:', response.data);
                setIdentificationTypes(response.data);
            } catch (error) {
                console.error('Error al obtener tipos de identificación:', error);
            }
        };

        const fetchPersonTypes = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/person_type/get');
                console.log('Tipos de persona obtenidos:', response.data);
                setPersonTypes(response.data);
            } catch (error) {
                console.error('Error al obtener tipos de persona:', error);
            }
        };
        const fetchRolesTypes = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/user/get')
                console.log('Tipos de roles obtenidos:', response.data);
                setRolesTypes(response.data);
            } catch (error) {
                console.error('Error al obtener el rol:', error);
            }
        };

        fetchIdentificationTypes();
        fetchPersonTypes();
        fetchRolesTypes();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleReset = () => {
        setFormData({
            nombre: '',
            apellido: '',
            correo: '',
            numero: '',
            usuario: '',
            rol: '',
            contraseña: '',
            confirmarContraseña: '',
            tipoIdentificacion: '',
            identificacion: '',
            tipoPersona: '',
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log('Datos del formulario a enviar:', formData);

            const selectedIdentificationType = identificationTypes.find(type => type.idIdentificationType === parseInt(formData.tipoIdentificacion));
            const selectedPersonType = personTypes.find(type => type.idPersonType === parseInt(formData.tipoPersona));
            const estadoUsuario = 'ACTIVO';
            if (formData.contraseña === formData.confirmarContraseña) {
                const userResponse = await axios.post('http://localhost:8080/api/auth/registerAd', {
                personType: { idPersonType: selectedPersonType.idPersonType },
                name: formData.nombre,
                lastName: formData.apellido,
                email: formData.correo,
                identificationType: { idIdentificationType: selectedIdentificationType.idIdentificationType }, // Enviar el objeto completo
                identificationNumber: formData.identificacion,
                user: formData.usuario,
                password: formData.contraseña,
                stateUser: estadoUsuario,
                role: formData.rol,
                dependence: { idDependence: 7}
            });
            console.log('Respuesta al guardar usuario:', userResponse.data);
            console.log('Usuario registrado correctamente');
            alert('Usuario Registrado Correctamente');
            handleReset();
        }

        } catch (error) {
            console.error('Error al guardar información:', error);
        }
       
    };

    return (
        <div className="crearUsuario">
            <BackGraund />
            <MenuAdmin />
            <div className="fr"><div className=""></div>
                <div className="formu">
                    <h1>Registro</h1>
                    <form className='formPQRS' onSubmit={handleSubmit}>
                        <div className="input-box1">
                            <label htmlFor="nombre">Nombre:</label><br />
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange} required
                            />
                        </div> <br />
                        <div className="input-box1">
                            <label htmlFor="apellido">Apellido:</label><br />
                            <input
                                type="text"
                                id="apellido"
                                name="apellido"
                                value={formData.apellido}
                                onChange={handleChange} required
                            />
                        </div> <br />
                        <div className="input-box1">
                            <label htmlFor="correo">Correo:</label><br />
                            <input
                                type="email"
                                id="correo"
                                name="correo"
                                value={formData.correo}
                                onChange={handleChange} required
                            />
                        </div> <br />
                        <div className="input-box1">
                            <label htmlFor="numero">Número:</label><br />
                            <input
                                type="text"
                                id="numero"
                                name="numero"
                                value={formData.numero}
                                onChange={handleChange} required
                            />
                        </div> <br />
                        <div className="input-box1">
                            <label htmlFor="usuario">Usuario:</label><br />
                            <input
                                type="text"
                                id="usuario"
                                name="usuario"
                                value={formData.usuario}
                                onChange={handleChange} required
                            />
                        </div> <br />
                        <div className="input-box1">
                            <label htmlFor="contraseña">Contraseña:</label><br />
                            <input
                                type="password"
                                id="contraseña"
                                name="contraseña"
                                value={formData.contraseña}
                                onChange={handleChange} required
                            />
                        </div> <br />
                        <div className="input-box1">
                            <label htmlFor="confirmarContraseña">Confirmar Contraseña:</label><br />
                            <input
                                type="password"
                                id="confirmarContraseña"
                                name="confirmarContraseña"
                                value={formData.confirmarContraseña}
                                onChange={handleChange} required
                            />
                        </div> <br />
                        <div className="select-box1">
                            <label htmlFor="rol">Roles:</label><br />
                            <select
                                id="rol"
                                name="rol"
                                value={formData.rol}
                                onChange={handleChange} required
                            >
                                <option key="" value="">Seleccione el tipo</option>
                                <option value="USER">USER</option>
                                <option  value="ADMIN">ADMIN</option>
                            </select>
                        </div> <br />
                        <div className="select-box1">
                            <label htmlFor="tipoPersona">Tipo de Persona:</label><br />
                            <select
                                id="tipoPersona"
                                name="tipoPersona"
                                value={formData.tipoPersona}
                                onChange={handleChange} required
                            >
                                <option key="" value="">Seleccione el tipo</option>
                                {personTypes.map((type) => (
                                    <option key={type.idPersonType} value={type.idPersonType}>
                                        {type.namePersonType}
                                    </option>
                                ))}
                            </select>
                        </div> <br />
                        <div className="select-box1">
                            <label htmlFor="tipoIdentificacion">Tipo de Identificación:</label><br />
                            <select
                                id="tipoIdentificacion"
                                name="tipoIdentificacion"
                                value={formData.tipoIdentificacion}
                                onChange={handleChange} required
                            >
                                <option key="" value="">Seleccione Tipo de Identificación</option>
                                {identificationTypes.map((type) => (
                                    <option key={type.idIdentificationType} value={type.idIdentificationType}>
                                        {type.nameIdentificationType}
                                    </option>
                                ))}
                            </select>
                        </div> <br />
                        <div className="input-box1">
                            <label htmlFor="identificacion">Identificación:</label><br />
                            <input
                                type="text"
                                id="identificacion"
                                name="identificacion"
                                value={formData.identificacion}
                                onChange={handleChange} required
                            />
                        </div><br />
                        <div className="registrar">
                            <button type="submit">Registrar</button>
                        </div><br />
                    </form>
                </div><div className=""></div>
            </div>
        </div>
    )
}