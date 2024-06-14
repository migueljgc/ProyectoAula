import React, { useEffect, useState } from "react"
import { MenuAdmin, MenuSecre, MenuUser } from "./Menu"
import { BackGraund } from "./BackGraund"
import axios from "axios";

export const EditarPerfil = () => {

    const [user, setUser] = useState({
        user: '',
        name: '',
        lastName: '',
        email: '',
        identificationType: { idIdentificationType: '', nameIdentificationType: '' },
        identificationNumber: '',
        personType: { idPersonType: '', namePersonType: '' },
        dependence: ''
    });
    const [identificationType, setIdentificationTypes] = useState([]);
    const [personType, setPersonTypes] = useState([]);
    const [dependence, setDependence] = useState([]);
    
    useEffect(() => {
        // Obtener la información del usuario
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/api/auth/editar', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUser(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching user data', error);
            }
        };
        const fetchUserAndOptions = async () => {
            try {
                const token = localStorage.getItem('token');
                const userResponse = await axios.get('http://localhost:8080/api/auth/editar', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUser(userResponse.data);
    
                // Supongamos que estas son las rutas para obtener las listas de opciones
                const identificationTypesResponse = await axios.get('http://localhost:8080/api/identification_type/get', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setIdentificationTypes(identificationTypesResponse.data);
    
                const identificationDependenceResponse = await axios.get('http://localhost:8080/api/dependence/get', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setDependence(identificationDependenceResponse.data);
    
                const personTypesResponse = await axios.get('http://localhost:8080/api/person_type/get', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setPersonTypes(personTypesResponse.data);
            } catch (error) {
                console.error('Error fetching user data or options', error);
            }
        };
        fetchUserAndOptions();
        fetchUser();
    }, []);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        const selectedOption = name === "identificationType"
            ? identificationType.find(type => type.idIdentificationType === value)
            : personType.find(type => type.idPersonType === value);
        setUser(prevState => ({
            ...prevState,
            [name]: selectedOption
        }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:8080/api/auth/editar', user, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            alert('User updated successfully');
        } catch (error) {
            console.error('Error updating user data', error);
            alert('Error updating user');
        }
    };

    return (
        <div className="EditarPerfil">
            <BackGraund />
            <MenuAdmin />
            <div className="formu">
                <h1>Editar Perfil-</h1>
                <form onSubmit={handleSubmit} className="Formlogin">
                    <div className="input-box">
                        <label>User:</label>
                        <input type="text" name="user" value={user.user} onChange={handleChange} disabled />
                    </div><br />
                    <div className="input-box">
                        <label>Name:</label>
                        <input type="text" name="name" value={user.name} onChange={handleChange} />
                    </div><br />
                    <div className="input-box">
                        <label>Last Name:</label>
                        <input type="text" name="lastName" value={user.lastName} onChange={handleChange} />
                    </div><br />
                    <div className="input-box">
                        <label>Email:</label>
                        <input type="email" name="email" value={user.email} onChange={handleChange} />
                    </div><br />
                    <div className="input-box">
                        <label>Identification Type:</label>
                        <select name="identificationType" value={user.identificationType} onChange={handleSelectChange}>
                            {identificationType.map((type) => (
                                <option key={type.idIdentificationType} value={type.nameIdentificationType}>
                                    {type.nameIdentificationType}
                                </option>
                            ))}
                        </select>

                    </div><br />
                    <div className="input-box">
                        <label>Identification Number:</label>
                        <input type="text" name="identificationNumber" value={user.identificationNumber} onChange={handleSelectChange} />
                    </div><br />
                    <div className="input-box">
                        <label>Person Type:</label>
                        <select name="personType" value={user.personType} onChange={handleChange}>
                            {personType.map((type) => (
                                <option key={type.idPersonType} value={type.namePersonType}>
                                    {type.namePersonType}
                                </option>
                            ))}
                        </select>

                    </div><br />
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
        )
}

export const EditarPerfilSecre = () => {

    const [user, setUser] = useState({
        user: '',
        name: '',
        lastName: '',
        email: '',
        identificationType: '',
        identificationNumber: '',
        personType: '',
        dependence: ''
    });
    const [identificationType, setIdentificationTypes] = useState([]);
    const [personType, setPersonTypes] = useState([]);
    const [dependence, setDependence] = useState([]);
    
    useEffect(() => {
        // Obtener la información del usuario
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/api/auth/editar', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUser(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching user data', error);
            }
        };
        const fetchUserAndOptions = async () => {
            try {
                const token = localStorage.getItem('token');
                const userResponse = await axios.get('http://localhost:8080/api/auth/editar', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUser(userResponse.data);
    
                // Supongamos que estas son las rutas para obtener las listas de opciones
                const identificationTypesResponse = await axios.get('http://localhost:8080/api/identification_type/get', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setIdentificationTypes(identificationTypesResponse.data);
    
                const identificationDependenceResponse = await axios.get('http://localhost:8080/api/dependence/get', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setDependence(identificationDependenceResponse.data);
    
                const personTypesResponse = await axios.get('http://localhost:8080/api/person_type/get', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setPersonTypes(personTypesResponse.data);
            } catch (error) {
                console.error('Error fetching user data or options', error);
            }
        };
        fetchUserAndOptions();
        fetchUser();
    }, []);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:8080/api/auth/editar', user, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            alert('User updated successfully');
        } catch (error) {
            console.error('Error updating user data', error);
            alert('Error updating user');
        }
    };

    return (
        <div className="EditarPerfil">
            <BackGraund />
            <MenuSecre />
            <div className="formu">
                <h1>Editar Perfil-</h1>
                <form onSubmit={handleSubmit} className="Formlogin">
                    <div className="input-box">
                        <label>User:</label>
                        <input type="text" name="user" value={user.user} onChange={handleChange} disabled />
                    </div><br />
                    <div className="input-box">
                        <label>Name:</label>
                        <input type="text" name="name" value={user.name} onChange={handleChange} />
                    </div><br />
                    <div className="input-box">
                        <label>Last Name:</label>
                        <input type="text" name="lastName" value={user.lastName} onChange={handleChange} />
                    </div><br />
                    <div className="input-box">
                        <label>Email:</label>
                        <input type="email" name="email" value={user.email} onChange={handleChange} />
                    </div><br />
                    <div className="input-box">
                        <label>Identification Type:</label>
                        <select name="identificationType" value={user.identificationType} onChange={handleChange}>
                            {identificationType.map((type) => (
                                <option key={type.idIdentificationType} value={type.nameIdentificationType}>
                                    {type.nameIdentificationType}
                                </option>
                            ))}
                        </select>

                    </div><br />
                    <div className="input-box">
                        <label>Identification Number:</label>
                        <input type="text" name="identificationNumber" value={user.identificationNumber} onChange={handleChange} />
                    </div><br />
                    <div className="input-box">
                        <label>Person Type:</label>
                        <select name="personType" value={user.personType} onChange={handleChange}>
                            {personType.map((type) => (
                                <option key={type.idPersonType} value={type.namePersonType}>
                                    {type.namePersonType}
                                </option>
                            ))}
                        </select>

                    </div><br />
                    <div className="input-box">
                        <label>Dependence:</label>
                        <select name="dependence" value={user.dependence} onChange={handleChange}>
                            {dependence.map((type) => (
                                <option key={type.idDependence} value={type.nameDependence}>
                                    {type.nameDependence}
                                </option>
                            ))}
                        </select>
                    </div><br />
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
        )
}