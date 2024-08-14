import React, { useState, useEffect } from 'react';
import './Login.css';
import { VscAccount } from "react-icons/vsc";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { BackGraund } from '../../../componentes/BackGraund';
import axios from 'axios';

export const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isLogged, setIsLogged] = useState('');

    useEffect(() => {
        document.title = "Login"
        const storedUsername = localStorage.getItem('username');

        if (storedUsername) {
            setUser(storedUsername);
            setRememberMe(true);
        }
        checkLoginStatus();
    }, []);
    const checkLoginStatus = () => {
        const logged = localStorage.getItem('logget') === 'true';
        setIsLogged(logged);
        console.log('Logget: ', logged);
        if (logged) {
            const userData = JSON.parse(localStorage.getItem('user'));
            if (userData) {
                const { role } = userData;
                if (role === 'ADMIN') {
                    navigate('/HomePagesAdmin');
                } else if (role === 'USER') {
                    navigate('/HomePagesUser');
                } else if (role === 'SECRE') {
                    navigate('/HomePagesSecre');
                }
            }
        }

    };
    const onLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/auth/authenticate', {
                user,
                password,
            });
            console.log(response)
            if (response.status === 200) {
                const responseData = response.data;
                console.log(responseData)

                const { token, authorities } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify({ user, role: authorities[0] })); // Assuming single role
                const response1 = await axios.get('http://localhost:8080/api/auth/editar', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const stateUser = response1.data.stateUser;
                console.log(stateUser)
                if (stateUser === 'INACTIVO') {
                    alert('Usuario Inactivo');
                    return;
                }
                localStorage.removeItem('username');
                const users = (response1.data.user)
                console.log(users)
                localStorage.setItem('users', users);
                if (authorities.includes('ADMIN')) {
                    window.location.href = '/HomePagesAdmin';
                    localStorage.setItem('logget', true);
                } else if (authorities.includes('USER')) {
                    window.location.href = '/HomePagesUser';
                    localStorage.setItem('logget', true);
                } else if (authorities.includes('SECRE')) {
                    window.location.href = '/HomePagesSecre';
                    localStorage.setItem('logget', true);
                } else {

                    window.location.href = '/';

                }

            } else {
                alert('Credenciales incorrectas');
            }
        } catch (error) {
            console.error('Error al obtener los datos de la base de datos:', error);
            alert('Credenciales incorrectas');
        }

        if (rememberMe) {
            localStorage.removeItem('username')
            localStorage.setItem('username', user);
        }
    }
    if (isLogged) {
        return null; // o un spinner si quieres mostrar algo mientras se redirige
    }

    return (
        <div className='login'>
        
            <BackGraund />
            <div className="formLogin" onSubmit={onLogin}>
                <div className="usa">
                    <div className="usu"></div>
                </div>
                <div className="loginForm">
                    <form action="" className="Formlogin">
                        <h1>Login</h1>

                        <div className="input-box">
                            <label htmlFor='user'><VscAccount /> Usuario: </label><br />
                            <input type="text" className='usuario' value={user} onChange={e => setUser(e.target.value)} required />
                        </div><br />
                        <div className="input-box">
                            <label htmlFor=""><RiLockPasswordLine /> Contraseña: </label><br />
                            <input type="password" className='contrasena' value={password} onChange={e => setPassword(e.target.value)} required />
                        </div><br />
                        <div className="btnIniciarSesion">
                            <button type="submit">
                                Iniciar Sesión
                            </button>
                        </div><br />
                        <div className="remember-forgod">
                            <label> <input type="checkbox" checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)} /> Recuérdame</label>
                            <a href="/Recuperacion">  ¿Olvidaste tu contraseña?</a>
                        </div>
                        <div className="register">
                            <p>¿No tienes cuenta aún? <a href="/Registro">Registrar</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
