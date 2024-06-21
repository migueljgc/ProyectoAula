import { BackGraund } from "./BackGraund"
import React, { useState } from "react";
import './Recovery.css';
import axios from "axios";

export const Recovery = () => {

    const [email, setEmail] = useState('');

    const handleResetRequest = async () => {
        try {alert("exito")
            const response = await axios.post('http://localhost:8080/forgot-password/envio', {email} );
            
        } catch (error) {
            console.error('Error al solicitar restablecimiento de contraseña:', error);
            
        }
    };
    return (
        <div className="recovery">
            <BackGraund />
            <div className="reco">

                    <h2>¿Olvidate tu contraseña?</h2>
                    <label>Para recuperar tu contraseña ingrese su Email o Numero</label><br /><br />
                    <div className="input-box2">
                        <label htmlFor="Email">Email:</label><br />
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div > <br />
                    <button onClick={handleResetRequest}> Solicitar</button>
                    <div className="">
                        <p>¿Ya tiene cuenta? <a href="/Login">Inicia Sesion</a></p>
                    </div><br />
                
            </div>
        </div>

    )
}