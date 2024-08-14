import React, { useState, useEffect, useRef } from 'react';
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
    const [form, setForm] = useState({
        dependencia: '',
    });
    const [categoriasTypes, setCategorias] = useState([]);
    const [date, setFecha] = useState('');
    const [requestType, setRequest] = useState([]);
    const [dependencias, setDependencias] = useState([]);
    const [filteredCategorias, setFilteredCategorias] = useState([]);
    const token = localStorage.getItem('token');
    const [archivo, setArchivo] = useState(null);
    const fileInputRef = useRef(null);


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
            console.log(fechaFormat)
            //setFormData(prevFormData => ({ ...prevFormData, date: fechaFormat }));
            console.log(formData)
        };

        
        fetchRequest();
        fetchCategorias();
        fetchDependencias();
        obtenerFecha();
    }, []);

    useEffect(() => {
        document.title = "Crear PQRS"
        const fetchUser = async () =>{
            const response1 = await axios.get('http://localhost:8080/api/auth/editar', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const user=(response1.data.user)
            console.log(response1.data)
            const username = user ;
                if (username) {
                    setFormData(prevFormData => ({ ...prevFormData, user: username }));
                }
        }
        fetchUser();
        
    }, []);
    const handleFileChange = (e) => {
        setArchivo (e.target.files[0])
    }

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
            date: '',
            description: '',
            idRequest: '',
            mediumAnswer: '',
            requestState: '',
            requestType: '',
            dependencia: '',
        });
        if (fileInputRef.current){
            fileInputRef.current.value= "";
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response1 = await axios.get('http://localhost:8080/api/auth/editar', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const user =response1.data.user
            console.log(user)
            const formDataToSend = new FormData();
            const selectedCategoria = categoriasTypes.find(type => type.idCategory === parseInt(formData.category));
            const selectedRequestType = requestType.find(type => type.idRequestType === parseInt(formData.requestType));
            const selecteddepen = dependencias.find(dep => dep.idDependence === parseInt(formData.dependencia));
            console.log(formData)
            const StateRequest = { idRequestState: 1 };
            if (archivo) {
                formDataToSend.append('archivo', archivo);
                console.log(archivo)
            }
            formDataToSend.append('request', new Blob([JSON.stringify({
                description: formData.description,
                mediumAnswer: formData.mediumAnswer,
                category: { idCategory: selectedCategoria ? selectedCategoria.idCategory : null },
                requestType: { idRequestType: selectedRequestType ? selectedRequestType.idRequestType : null },
                requestState: StateRequest,
                dependence: { idDependence: parseInt(formData.dependencia) },
                date: date
            })], {
                type: 'application/json'
            }));
            const respuesta = await axios.post('http://localhost:8080/api/request/save', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(respuesta.data)
            const responseData = respuesta.data;
            const numRadicado = responseData.requestState;
           
            
            console.log(response1.data)
            const dto = {
                toUser: [`${response1.data.email}`], // Ajusta los destinatarios según tu lógica
                subject: 'Confirmación de Solicitud',
                message: `<h2>Solicitud PQRS</h2>
                <p>
                Datos del remitente:<br/>

                Nombre completo: ${response1.data.name} ${response1.data.lastName}<br/>
                Tipo de identificacion: ${response1.data.identificationType.nameIdentificationType}<br/>
                Identificacion: ${response1.data.identificationNumber}<br/>
                Correo electrónico: ${response1.data.email}<br/>
                Tipo de persona: ${response1.data.personType.namePersonType}<br/><br/>

                Solicitud:<br/>

                Tipo de Solicitud: ${selectedRequestType.nameRequestType}.<br/>
                Dependencia: ${selecteddepen.nameDependence}.<br/>
                Categoría: ${selectedCategoria.nameCategory}.<br/>
                Medio de Respuesta: ${formData.mediumAnswer}.<br/>
                Descripción: ${formData.description}.</p> `,

                pdfContent: `
                Solicitud PQRS
                
                Datos del remitente:

                Nombre completo: ${response1.data.name} ${response1.data.lastName}
                Tipo de identificacion: ${response1.data.identificationType.nameIdentificationType}
                Identificacion: ${response1.data.identificationNumber}
                Correo electrónico: ${response1.data.email}
                Tipo de persona: ${response1.data.personType.namePersonType}

                Solicitud:
                Tipo de Solicitud: ${selectedRequestType.nameRequestType}.
                Dependencia: ${selecteddepen.nameDependence}.
                Categoría: ${selectedCategoria.nameCategory}.
                Medio de Respuesta: ${formData.mediumAnswer}.
                Descripción: ${formData.description}.
                `
            };
            alert('Solicitud Radicada Con Exito Su Numero De Radicado es: ' + numRadicado);
            await axios.post('http://localhost:8080/api/send/sendEmailWithPdf', dto);handleReset();
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
                            <label htmlFor="description">Concepto de Solicitud:</label><br />
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

                        <div className="input-box1">
                            <label htmlFor="archivo">Adjuntar Archivo:</label><br />
                            <input type="file"
                            id='file'
                            onChange={handleFileChange} 
                            ref={fileInputRef}
                            name='archivo'
                            />
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
