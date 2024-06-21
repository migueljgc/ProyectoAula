import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const ResetPassword = () => {
    const { token } = useParams(); // obtener el token de la URL
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            setMessage('Las contraseñas no coinciden.');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:8080/forgot-password/reset/${token}`, { newPassword });
            setMessage(response.data);
        } catch (error) {
            console.error('Error al restablecer contraseña:', error);
            setMessage('Error al restablecer contraseña.');
        }
    };

    return (
        <div>
            <h2>Restablecer Contraseña</h2>
            <input
                type="password"
                placeholder="Ingrese la nueva contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="Confirme la nueva contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={handleResetPassword}>Restablecer contraseña</button>
            <p>{message}</p>
        </div>
    );
};
    