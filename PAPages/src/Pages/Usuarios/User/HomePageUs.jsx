import React, { useEffect } from 'react';
import { BackGraund } from '../../../../componentes/BackGraund';
import { MenuUser } from '../../../../componentes/Menu';

export const HomePageUs = () => {
    const user = localStorage.getItem('users');
    console.log(user)
    useEffect(()=> {
        document.title = "Home"
    })
    return (
        <div className="crearUsuario">
            <BackGraund />
            <MenuUser />
            <div className="">
                <ul>
                    <h2>{user && <p>Bienvenido, {user}!</p>}</h2>
                    <h1>RESUMEN</h1>
                    <ul>
                        <li>
                            <p>
                                Este proyecto se centra en desarrollar un software para gestionar PQRS (Peticiones, Quejas, Reclamos y Sugerencias) en la alcaldía de Villanueva Bolívar. Su objetivo principal es mejorar la comunicación entre los ciudadanos y la alcaldía, automatizando el proceso de atención a estas solicitudes.
                                Actualmente, la interacción entre la administración y la comunidad enfrenta desafíos debido a la falta de un sistema eficiente, obligando a los ciudadanos a presentar sus PQRS de forma manual y en papel. Este método arcaico ha provocado demoras y una gestión inadecuada de las PQRS, resultando en insatisfacción ciudadana.
                                El software propuesto ofrecerá una plataforma digital que facilitará la presentación y seguimiento de PQRS, mejorando la capacidad de la alcaldía para responder de manera oportuna y efectiva.
                            </p>
                        </li>
                    </ul>
                    <h1>JUSTIFICACION</h1>
                    <ul>
                        <li>
                            <p>
                                La generación de peticiones en entidades estatales es muy común, por lo que es crucial desarrollar este proyecto en la alcaldía municipal de Villanueva, Bolívar. Actualmente, los procedimientos de gestión de PQRS en esta entidad no permiten una trazabilidad adecuada, resultando en la desaparición de peticiones sin ser finalizadas. La implementación del software propuesto permitirá un control efectivo de las PQRS por dependencia, mejorando la atención y ofreciendo soluciones a las problemáticas presentadas.
                                Esta iniciativa, basada en entrevistas previas, busca mejorar el registro de solicitudes, respuestas e interacciones entre ciudadanos y trabajadores encargados de estos requerimientos. Un sistema PQRS eficiente cubrirá las necesidades de las entidades públicas y privadas, proporcionando una herramienta potente de comunicación que acelerará procesos y reducirá colas y esperas físicas.
                            </p>
                        </li>
                    </ul>
                    <h1>OBJETIVOS</h1>
                    <ul>
                        <li>
                            <h2>
                                Objetivo General
                            </h2>
                        </li>
                        <ul>
                            <li>
                                <p>
                                    Desarrollar un sistema de información para la gestión de las PQRS con el fin de obtener mayor control sobre las peticiones, quejas, reclamos y solicitudes en la Alcaldía Municipal de Villanueva, Bolívar.
                                </p>
                            </li>
                        </ul>
                        <li>
                            <h2>
                                Objetivo Especifico
                            </h2>
                        </li>
                        <ul>
                            <li>
                                <p>
                                    Realizar el levantamiento de información para la identificación de los requisitos funcionales y no funcionales en la alcaldía municipal de Villanueva.
                                </p>
                            </li>
                            <li>
                                <p>
                                    Analizar el proceso actual de la gestión de PQRS en la alcaldía municipal de Villanueva Bolívar.
                                </p>
                            </li>
                            <li>
                                <p>
                                    Modelar el proceso de la gestión de PQRS de la alcaldía de Villanueva.
                                </p>
                            </li>
                        </ul>
                    </ul>
                    <h1>RASTREO COMERCIAL</h1>
                    <ul>
                        <li>
                            <p>
                                La generación de peticiones en entidades estatales es muy común, por lo que es crucial desarrollar este proyecto en la alcaldía municipal de Villanueva, Bolívar. Actualmente, los procedimientos de gestión de PQRS en esta entidad no permiten una trazabilidad adecuada, resultando en la desaparición de peticiones sin ser finalizadas. La implementación del software propuesto permitirá un control efectivo de las PQRS por dependencia, mejorando la atención y ofreciendo soluciones a las problemáticas presentadas.
                                Esta iniciativa, basada en entrevistas previas, busca mejorar el registro de solicitudes, respuestas e interacciones entre ciudadanos y trabajadores encargados de estos requerimientos. Un sistema PQRS eficiente cubrirá las necesidades de las entidades públicas y privadas, proporcionando una herramienta potente de comunicación que acelerará procesos y reducirá colas y esperas físicas.
                            </p>
                        </li>
                        <ul>
                            <li>
                                <p>
                                    Interfaz Intuitiva y Amigable
                                </p>

                            </li>
                            <li>
                                <p>
                                    Personalización y Flexibilidad
                                </p>

                            </li>
                            <li>
                                <p>
                                    Funcionalidades Especializadas
                                </p>

                            </li>
                            <li>
                                <p>
                                    Escalabilidad y Modularidad
                                </p>

                            </li>
                            <li>
                                <p>
                                    Soporte Técnico y Servicio al Cliente
                                </p>

                            </li>
                        </ul>

                    </ul>
                </ul>
            </div>
        </div>
    )
}