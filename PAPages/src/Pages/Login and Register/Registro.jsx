import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BackGraund } from '../../../componentes/BackGraund';
import  FloatingMessage  from '../../../componentes/FloatingMessage';


export const Registro = () => {
    const [message, setMessage] = useState(null)
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        numero: '',
        usuario: '',
        contraseña: '',
        confirmarContraseña: '',
        tipoIdentificacion: '',
        identificacion: '',
        tipoPersona: '',
    });
   // const url = {
   //     links: 'http://localhost:5173/Activation'
    //}
//    const datos = `
  //      <h1>Hola ${formData.nombre} ${formData.apellido}</h1>
    //    <p>
      //      Gracias por iniciar el proceso de verificación de identidad en nuestra plataforma. Para completar la verificación, por favor haz clic en el siguiente enlace:
        //    <br /><br />
          //  <a href=${url.links}>Verificar Identidad</a>
 //           <br /><br />
   //         Este enlace te llevará a una página donde podrás confirmar tu identidad. Una vez completado este paso, tu verificación estará finalizada y podrás acceder a todos los beneficios de nuestra plataforma de manera segura.
     //       <br /><br />
       //     Si tienes alguna pregunta o necesitas asistencia durante este proceso, no dudes en contactarnos respondiendo a este correo.
         //   <br /><br />
//            Gracias de nuevo por tu colaboración.
  //          <br /><br />
    //        Atentamente,
      //      <br /><br />
//            Miguel Gavira<br /><br />
       //     S. G PQRS<br /><br />
     //       3015737613
   //     </p>
 //   `;

 const [passwordError, setPasswordError] = useState('');
 const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [identificationTypes, setIdentificationTypes] = useState([]);
    const [personTypes, setPersonTypes] = useState([]);

    useEffect(() => {
        document.title = "Registro"
       // localStorage.clear();
        const fetchIdentificationTypes = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/identification_type/get');
                console.log('Tipos de identificación obtenidos:', response.data);
                setIdentificationTypes(response.data);
            } catch (error) {
                console.error('Error al obtener tipos de identificación de la base de datos', error);
            }
        };

        const fetchPersonTypes = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/person_type/get');
                console.log('Tipos de persona obtenidos:', response.data);
                setPersonTypes(response.data);
            } catch (error) {
                console.error('Error al obtener tipos de persona de la base de datos', error);
            }
        };
        //console.log(datos)
        fetchIdentificationTypes();
        fetchPersonTypes();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleReset = () => {
        setFormData({
            nombre: '',
            apellido: '',
            correo: '',
            numero: '',
            usuario: '',
            contraseña: '',
            confirmarContraseña: '',
            tipoIdentificacion: '',
            identificacion: '',
            tipoPersona: '',
        });
    }


    const validatePassword = (password) => {
        const minLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerrCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(password);
        
        return minLength && hasUpperCase && hasNumber && hasSpecialChar && hasLowerrCase;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValidPassword = validatePassword(formData.contraseña);
        if (!isValidPassword) {
            setPasswordError('La contraseña debe tener mínimo 8 caracteres, al menos un número, un signo y una letra mayúscula.');
            return;
        } else {
            setPasswordError('Contraseña valida');
        }

        if (formData.contraseña !== formData.confirmarContraseña) {
            setConfirmPasswordError('Las contraseñas no coinciden');
            return;
        } else {
            setConfirmPasswordError('Contraseña valida');
        }
        setMessage({text: 'Cargando.....', type: 'info', duration: 10000})

        try {
            console.log('Datos del formulario a enviar:', formData);
            
            const selectedIdentificationType = identificationTypes.find(type => type.idIdentificationType === parseInt(formData.tipoIdentificacion));
            const selectedPersonType = personTypes.find(type => type.idPersonType === parseInt(formData.tipoPersona));
            if (formData.contraseña === formData.confirmarContraseña) {
                const userResponse = await axios.post('http://localhost:8080/api/auth/register', {
                    personType: { idPersonType: selectedPersonType.idPersonType },
                    name: formData.nombre,
                    lastName: formData.apellido,
                    email: formData.correo,
                    identificationType: { idIdentificationType: selectedIdentificationType.idIdentificationType }, // Enviar el objeto completo
                    identificationNumber: formData.identificacion,
                    user: formData.usuario,
                    password: formData.contraseña,
                    dependence: { idDependence: 7 }
                });
                alert('Se ha enviado un mensaje de verificacion a su correo, si no le aparece verifique la carpeta de spam.');
                console.log('Respuesta al guardar usuario:', userResponse.data);
                console.log('Usuario registrado correctamente');
                setConfirmPasswordError('')
                setPasswordError('')
                 handleReset();

                 //await axios.post('http://localhost:8080/api/send/message', {
                  //  toUser: [formData.correo],
                    //subject: 'Confirm your email',
                    //message: datos
               // });

            }
            else {
                alert('Contraseñas no coinciden')
            }

        } catch (error) {
            console.error('Error al guardar información en la base de datos', error);
        }
       
    };

    return (
        <div className="crearUsuario">
            <BackGraund />
            <div className="fr"><div className=""></div>
                <div className="formu">
                    <h1>Registro</h1>
                    <label htmlFor="">¿No tienes una cuenta? Regístrate</label>
                    <form className='formPQRS' onSubmit={handleSubmit}>
                        <div className="input-box1">
                            <label htmlFor="nombre">Nombre:</label><br />
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange} required
                            />
                        </div> <br />
                        <div className="input-box1">
                            <label htmlFor="apellido">Apellido:</label><br />
                            <input
                                type="text"
                                id="apellido"
                                name="apellido"
                                value={formData.apellido}
                                onChange={handleChange} required
                            />
                        </div> <br />
                        <div className="input-box1">
                            <label htmlFor="correo">Correo:</label><br />
                            <input
                                type="email"
                                id="correo"
                                name="correo"
                                value={formData.correo}
                                onChange={handleChange} required
                            />
                        </div> <br />
                        <div className="input-box1">
                            <label htmlFor="numero">Número:</label><br />
                            <input
                                type="text"
                                id="numero"
                                name="numero"
                                value={formData.numero}
                                onChange={handleChange} required
                            />
                        </div> <br />
                        <div className="input-box1">
                            <label htmlFor="usuario">Usuario:</label><br />
                            <input
                                type="text"
                                id="usuario"
                                name="usuario"
                                value={formData.usuario}
                                onChange={handleChange} required
                            />
                        </div> <br />
                        <div className="input-box1">
                            <label htmlFor="contraseña">Contraseña:</label><br />
                            <input
                                type="password"
                                id="contraseña"
                                name="contraseña"
                                value={formData.contraseña}
                                onChange={handleChange} required
                            />
                            {passwordError && <div className='errore'> {passwordError}</div>}
                        </div> <br />
                        <div className="input-box1">
                            <label htmlFor="confirmarContraseña">Confirmar Contraseña:</label><br />
                            <input
                                type="password"
                                id="confirmarContraseña"
                                name="confirmarContraseña"
                                value={formData.confirmarContraseña}
                                onChange={handleChange} required
                            />
                            {confirmPasswordError && <div className='errore'> {confirmPasswordError}</div>}
                        </div> <br />
                        <div className="select-box1">
                            <label htmlFor="tipoPersona">Tipo de Persona:</label><br />
                            <select
                                id="tipoPersona"
                                name="tipoPersona"
                                value={formData.tipoPersona}
                                onChange={handleChange} required
                            >
                                <option key="" value="">Seleccione el tipo</option>
                                {personTypes.map((type) => (
                                    <option key={type.idPersonType} value={type.idPersonType}>
                                        {type.namePersonType}
                                    </option>
                                ))}
                            </select>
                        </div> <br />
                        <div className="select-box1">
                            <label htmlFor="tipoIdentificacion">Tipo de Identificación:</label><br />
                            <select
                                id="tipoIdentificacion"
                                name="tipoIdentificacion"
                                value={formData.tipoIdentificacion}
                                onChange={handleChange} required
                            >
                                <option key="" value="">Seleccione Tipo de Identificación</option>
                                {identificationTypes.map((type) => (
                                    <option key={type.idIdentificationType} value={type.idIdentificationType}>
                                        {type.nameIdentificationType}
                                    </option>
                                ))}
                            </select>
                        </div> <br />
                        <div className="input-box1">
                            <label htmlFor="identificacion">Identificación:</label><br />
                            <input
                                type="text"
                                id="identificacion"
                                name="identificacion"
                                value={formData.identificacion}
                                onChange={handleChange} required
                            />
                        </div><br />
                        <div className="btnIniciarSesion">
                            <button type="submit">Registrar</button>
                        </div><br />
                        {message && <FloatingMessage message={message.text} type={message.type} duration={message.duration}/>}
                    </form>
                    <p>¿Ya tienes cuenta? <a href="/Login">Inicia Sesión</a></p>
                </div><div className=""></div>
            </div>
        </div>
    );
};