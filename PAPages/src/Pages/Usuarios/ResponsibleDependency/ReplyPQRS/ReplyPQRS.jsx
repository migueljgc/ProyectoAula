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
    })

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
    useEffect(() => {console.log(form.idRequest)
        
    }, []);
    const habdleSubmit = async (e) => {
        e.preventDefault();
        
            try {
                
                const response = await axios.put(`http://localhost:8080/api/request/update/${form.idRequest}`,formData,{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log('Response:', response.data);
            } catch (error) {
                console.error('Error al actualizar el estado: ', error);
            }

            //////////////////////////////////////////////////////////////////////////////////////////

            alert('EXITOSO');
            navigate('/GestionPQRS');
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
                    </div><br />
                </form>

            </div>
        </div>
    );
}

