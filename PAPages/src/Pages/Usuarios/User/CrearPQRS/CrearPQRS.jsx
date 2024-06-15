import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CrearPQRS.css';
import { MenuUser } from '../../../../../componentes/Menu';
import { BackGraund } from '../../../../../componentes/BackGraund';

export const CrearPQRS = () => {
    const [formData, setFormData] = useState({
        medioRespuesta: '',
        answer: '',
        category: '',
        date: '',
        description: '',
        idRequest: '',
        mediumAnswer: '',
        requestState: '',
        requestType: '',
        user: '', // Ya no se asignará directamente aquí
        dependencia: '',
    });

    const [categoriasTypes, setCategorias] = useState([]);
    const [date, setFecha] = useState('');
    const [requestType, setRequest] = useState([]);
    const [dependencias, setDependencias] = useState([]);
    const [filteredCategorias, setFilteredCategorias] = useState([]);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/category/get');
                setCategorias(response.data);
            } catch (error) {
                console.error('Error al obtener categorias:', error);
            }
        };

        const fetchRequest = async () => {
            try {
                const response1 = await axios.get('http://localhost:8080/api/request_type/get');
                setRequest(response1.data);
            } catch (error) {
                console.error('Error al obtener Tipos de solicitudes', error);
            }
        };

        const fetchDependencias = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/dependence/get');
                setDependencias(response.data);
            } catch (error) {
                console.error('Error al obtener dependencias:', error);
            }
        };

        const obtenerFecha = () => {
            const fechaActual = new Date();
            const fechaFormat = fechaActual.toISOString().slice(0, 10);
            setFecha(fechaFormat);
            setFormData(prevFormData => ({ ...prevFormData, date: fechaFormat }));
        };

        fetchRequest();
        fetchCategorias();
        fetchDependencias();
        obtenerFecha();
    }, []);

    useEffect(() => {
        document.title = "Crear PQRS"
        const username = localStorage.getItem('username');
        if (username) {
            setFormData(prevFormData => ({ ...prevFormData, user: username }));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'dependencia') {
            const dependenciaId = Number(value);
            setFormData(prevState => ({ ...prevState, dependencia: value }));

            const filtered = categoriasTypes.filter(cat => cat.dependence.idDependence === dependenciaId);
            setFilteredCategorias(filtered);
        } else {
            setFormData(prevState => ({ ...prevState, [name]: value }));
        }
    };

    const handleReset = () => {
        const fechaActual = new Date();
        const fechaFormat = fechaActual.toISOString().slice(0, 10);
        setFormData({
            medioRespuesta: '',
            answer: '',
            category: '',
            date: fechaFormat,
            description: '',
            idRequest: '',
            mediumAnswer: '',
            requestState: '',
            requestType: '',
            user: localStorage.getItem('username') || '',
            dependencia: '',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const selectedCategoria = categoriasTypes.find(type => type.idCategory === parseInt(formData.category));
            const selectedRequestType = requestType.find(type => type.idRequestType === parseInt(formData.requestType));
            console.log(formData)
            const StateRequest = { idRequestState: 1 };
            const respuesta = await axios.post('http://localhost:8080/api/request/save', {
                date: formData.date,
                description: formData.description,
                mediumAnswer: formData.mediumAnswer,
                category: { idCategory: selectedCategoria ? selectedCategoria.idCategory : null },
                requestType: { idRequestType: selectedRequestType ? selectedRequestType.idRequestType : null },
                requestState: StateRequest,
                dependence: { idDependence: parseInt(formData.dependencia) }
            });
            console.log(respuesta.data)
            const responseData = respuesta.data;
            const numRadicado = responseData.requestState;
           
            alert('Solicitud Radicada Con Exito Su Numero De Radicado es: ' + numRadicado);
            handleReset();
        } catch (error) {
            console.error('Error al guardar información:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className='CrearPQRS'>
            <BackGraund />
            <MenuUser />
            <div className="fr">
                <div className=""></div>
                <div className="formu">
                    <form className='formPQRS' onSubmit={handleSubmit}>
                        <h1>Registro de PQRS</h1>

                        <input type='hidden' name="date" value={date} />

                        <div className="select-box1">
                            <label htmlFor="requestType">Tipo de Solicitud:</label><br />
                            <select
                                id="requestType"
                                name="requestType"
                                value={formData.requestType}
                                onChange={handleChange}
                                required
                            >
                                <option key="" value="">Seleccione el tipo</option>
                                {requestType.map((type) => (
                                    <option key={type.idRequestType} value={type.idRequestType}>
                                        {type.nameRequestType}
                                    </option>
                                ))}
                            </select>
                        </div><br />

                        <div className="select-box1">
                            <label htmlFor="dependencia">Dependencia:</label><br />
                            <select
                                id="dependencia"
                                name="dependencia"
                                value={formData.dependencia}
                                onChange={handleChange}
                                required>
                                <option key="" value="">Seleccione la dependencia</option>
                                {dependencias.map((dep) => (
                                    <option key={dep.idDependence} value={dep.idDependence}>
                                        {dep.nameDependence}
                                    </option>
                                ))}
                            </select>
                        </div><br />

                        <div className="select-box1">
                            <label htmlFor="category">Categoria:</label><br />
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            >
                                <option key="" value="">Seleccione la categoría</option>
                                {filteredCategorias.map((type) => (
                                    <option key={type.idCategory} value={type.idCategory}>
                                        {type.nameCategory}
                                    </option>
                                ))}
                            </select>
                        </div><br />

                        <div className="select-box1">
                            <label htmlFor="mediumAnswer">Medio de Respuesta:</label><br />
                            <select
                                type="mediumAnswer"
                                id="mediumAnswer"
                                name="mediumAnswer"
                                value={formData.mediumAnswer}
                                onChange={handleChange}
                                required>
                                <option value="">Seleccione el tipo</option>
                                <option value="Correo">Correo</option>
                                <option value="Numero">Numero</option>
                            </select>
                        </div><br />

                        <div className="input-box1">
                            <label htmlFor="description">Concepto de Solicitud:</label>
                            <textarea
                                name="description"
                                id="description"
                                rows="4"
                                cols="50"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div><br />

                        <div className="enviar">
                            <button type="submit">Enviar</button>
                        </div><br />
                    </form>
                </div>
            </div>
        </div>
    );
};