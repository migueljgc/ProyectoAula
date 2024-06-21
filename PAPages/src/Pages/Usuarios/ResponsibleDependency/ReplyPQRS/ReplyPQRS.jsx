import { React, useEffect, useState } from 'react';
import { BackGraund } from '../../../../../componentes/BackGraund';
import { MenuSecre } from '../../../../../componentes/Menu';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { HiArrowCircleLeft } from 'react-icons/hi';

export const ReplyPQRS = () => {
    const [data, setData] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    const datas = state ? state.data : {};
    const [form, setForm] = useState(datas);
    const token = localStorage.getItem('token')
    const [formData, setFormData] = useState({
        answer: '',
        requestState: { idRequestState: 2 }
    });
    const maxCharsPerLine = 50;

    useEffect(() => {
        if (state && state.data) {
            setForm(state.data)
        }
    }, [state]);
    const handleReset = () => {
        setFormData({
            answer: '',
        });
    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const addLineBreaks = (str, maxChars) => {
        let result = '';
        let start = 0;
        while (start < str.length) {
            result += str.substring(start, start + maxChars) + '\n';
            start += maxChars;
        }
        return result.trim();
    };
    useEffect(() => {
        console.log(form.idRequest)
        console.log(form)
        document.title = "Responder PQRS"
        
    }, []);
    const habdleSubmit = async (e) => {
        e.preventDefault();
        const formattedAnswer = addLineBreaks(formData.answer, maxCharsPerLine);
        const formattedFormData = { ...formData, answer: formattedAnswer };
        console.log('tu ',formattedFormData)
            try {
                
                const response = await axios.put(`http://localhost:8080/api/request/update/${form.idRequest}`,formattedFormData,{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log('Response:', response.data);
                setData('CARGANDO')
                const dto = {
                    toUser: [`${form.user.email}`], // Ajusta los destinatarios según tu lógica
                    subject: 'Confirmación de Solicitud',
                    message: `<h2>Solicitud PQRS</h2>
                    <p>
                    Datos del remitente:<br/>
    
                    Nombre completo: ${form.user.name} ${form.user.lastName}<br/>
                    Tipo de identificacion: ${form.user.identificationType.nameIdentificationType}<br/>
                    Identificacion: ${form.user.identificationNumber}<br/>
                    Correo electrónico: ${form.user.email}<br/>
                    Tipo de persona: ${form.user.personType.namePersonType}<br/><br/>
    
                    Solicitud:<br/>
    
                    Tipo de Solicitud: ${form.requestType.nameRequestType}.<br/>
                    Dependencia: ${form.dependence.nameDependence}.<br/>
                    Categoría: ${form.category.nameCategory}.<br/>
                    Medio de Respuesta: ${form.mediumAnswer}.<br/>
                    Descripción: ${form.description}.<br/>
                    Respesta: ${formattedFormData.answer}.</p> `,
    
                    pdfContent: `
Solicitud PQRS
                    
Datos del remitente:
    
Nombre completo: ${form.user.name} ${form.user.lastName}
Tipo de identificacion: ${form.user.identificationType.nameIdentificationType}
Identificacion: ${form.user.identificationNumber}
Correo electrónico: ${form.user.email}
Tipo de persona: ${form.user.personType.namePersonType}
    
Solicitud:
    
Tipo de Solicitud: ${form.requestType.nameRequestType}.
Dependencia: ${form.dependence.nameDependence}.
Categoría: ${form.category.nameCategory}.
Medio de Respuesta: ${form.mediumAnswer}.
Descripción: ${form.description}.
Respesta: ${formattedFormData.answer}.
                    `
                };
                await axios.post('http://localhost:8080/api/send/sendEmailWithPdf', dto)

            } catch (error) {
                console.error('Error al actualizar el estado: ', error);
            }

            //////////////////////////////////////////////////////////////////////////////////////////

            alert('EXITOSO');
            navigate('/GestionPQRS');
            setData('')
            handleReset();
    };
    console.log(datas)
    if (!datas) {
        return <div>
            <BackGraund />
            <MenuSecre />
            <div><h2>No hay datos Seleccionados.</h2></div></div>;
    }

    return (
        <div>
            <BackGraund />
            <MenuSecre />
            <div className="gestion">
                <form onSubmit={habdleSubmit}>
                    <h1>RESPUESTA</h1>

                    <div className="input-box1">
                        <label>Respueta:</label><br />
                        <textarea
                            name="answer"
                            id="answer"
                            rows="4"
                            cols="50"
                            value={formData.answer || ''}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <br />

                    <div className="enviar">
                        <button type="submit">Enviar</button>
                        <HiArrowCircleLeft />
                        <br />
                        {data}
                    </div><br />
                </form>

            </div>
        </div>
    );
}

