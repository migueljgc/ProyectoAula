import React, { useState } from 'react';
import './menu.css';
import { Script, ScriptSecre, ScriptUser } from './script';
import { TiThMenu } from "react-icons/ti";


export const MenuAdmin = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="menus">
            <div className="usa">
                <div className="menu">
                    <header className="main-header">
                        <label htmlFor="btn-nav" className="btn-nav"><TiThMenu /></label>
                        <input type="checkbox" id="btn-nav" />
                        <nav>
                            <ul className="men">
                                <li><a href="/VerUsuarios"> Ver Usuario </a></li>
                                <li><a href="/CrearUsuario">Crear Usuario </a></li>
                                <li><a href="/CrearSecre">Crear Secretario de Dependencia </a></li>
                                <li><a href="/EdicionUsuario"> Edicion Usuarios </a></li>
                                <li><a href="/TiposCategoria"> Tipos de Categoria </a></li>
                                <li><a href="/TiposDependencia"> Tipos de Dependencia </a></li>
                                <li><a href="/TiposIdentificacion"> Tipos de Identificacion </a></li>
                                <li><a href="/TiposSolicitud"> Tipos de Solicitud </a></li>

                            </ul>
                        </nav>

                    </header>
                </div>
                <div className="usuario">
                    <div className="user-menu">
                        <div className="user-info">
                            <img src='/iconprofile.png' alt="Foto de perfil" className="profile-picture" width="35%" height="40%" onClick={() => setIsOpen((prev) => !prev)} />
                            <br />
                        </div>
                        {isOpen && (<Script />)
                        }

                    </div>



                </div>
                <div className="imag"><img src='/pqrspng.png' width="80%" height="85%" /></div>
            </div>
        </div>
    );

};

export const MenuSecre = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="menus">
            <div className="usa">
                <div className="menu">
                    <header className="main-header">
                        <label htmlFor="btn-nav" className="btn-nav"><TiThMenu /></label>
                        <input type="checkbox" id="btn-nav" />
                        <nav>
                            <ul className="men">
                                <li><a href="/GestionPQRS"> Gestion PQRS </a></li>

                            </ul>
                        </nav>

                    </header>
                </div>
                <div className="usuario">
                    <div className="user-menu">
                        <div className="user-info">
                            <img src='/iconprofile.png' alt="Foto de perfil" className="profile-picture" width="35%" height="40%" onClick={() => setIsOpen((prev) => !prev)} />
                            <br />
                        </div>
                        {isOpen && (<ScriptSecre />)
                        }

                    </div>



                </div>
                <div className="imag"><img src='/pqrspng.png' width="80%" height="85%" /></div>
            </div>
        </div>
    );

};

export const MenuUser = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="menus">
            <div className="usa">
                <div className="menu">
                    <header className="main-header">
                        <label htmlFor="btn-nav" className="btn-nav"><TiThMenu /></label>
                        <input type="checkbox" id="btn-nav" />
                        <nav>
                            <ul className="men">
                            <li><a href="/CrearPQRS"> Crear PQRS </a></li>
                                <li><a href="/VerPQRS"> Ver PQRS </a></li>

                            </ul>
                        </nav>

                    </header>
                </div>
                <div className="usuario">
                    <div className="user-menu">
                        <div className="user-info">
                            <img src='/iconprofile.png' alt="Foto de perfil" className="profile-picture" width="35%" height="40%" onClick={() => setIsOpen((prev) => !prev)} />
                            <br />
                        </div>
                        {isOpen && (<ScriptUser />)
                        }

                    </div>



                </div>
                <div className="imag"><img src='/pqrspng.png' width="80%" height="85%" /></div>
            </div>
        </div>
    );

};