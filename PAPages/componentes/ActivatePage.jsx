import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


export const ActivatePage = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/auth/verify-email`, {
                    params: { token }
                });
                if (response.status === 200) {
                    alert('Correo electrónico verificado correctamente');
                    navigate('/');
                } else {
                    alert(`Error al verificar correo electrónico: ${response.data}`);
                }
            } catch (error) {
                console.error('Error verifying email:', error);
                alert('Error al verificar correo electrónico');
            }
        };

        verifyEmail();
    }, [token]);

    return (
        <div>
            Verificando correo electrónico...
        </div>
    );
};
