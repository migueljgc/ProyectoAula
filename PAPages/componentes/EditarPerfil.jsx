import React, { useEffect, useState } from "react";
import { MenuAdmin, MenuSecre, MenuUser } from "./Menu";
import { BackGraund } from "./BackGraund";
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
        dependence: { idDependence: '', nameDependence: '' }
    });
    const [identificationTypes, setIdentificationTypes] = useState([]);
    const [personTypes, setPersonTypes] = useState([]);


    useEffect(() => {
        const fetchUserAndOptions = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = { 'Authorization': `Bearer ${token}` };

                // Fetch user data
                const userResponse = await axios.get('http://localhost:8080/api/auth/editar', { headers });
                setUser(userResponse.data);

                // Fetch identification types
                const identificationTypesResponse = await axios.get('http://localhost:8080/api/identification_type/get', { headers });
                setIdentificationTypes(identificationTypesResponse.data);

                // Fetch person types
                const personTypesResponse = await axios.get('http://localhost:8080/api/person_type/get', { headers });
                setPersonTypes(personTypesResponse.data);

            } catch (error) {
                console.error('Error fetching user data or options', error);
            }
        };

        fetchUserAndOptions();
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
            await axios.put('http://localhost:8080/api/user/editar', user, {
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
                <h1>Editar Perfil</h1>
                <form onSubmit={handleSubmit} className="Formlogin">
                    <div className="input-box">
                        <label>User:</label>
                        <input type="text" name="user" value={user.user} onChange={handleChange} disabled />
                    </div>
                    <br />
                    <div className="input-box">
                        <label>Name:</label>
                        <input type="text" name="name" value={user.name} onChange={handleChange} />
                    </div>
                    <br />
                    <div className="input-box">
                        <label>Last Name:</label>
                        <input type="text" name="lastName" value={user.lastName} onChange={handleChange} />
                    </div>
                    <br />
                    <div className="input-box">
                        <label>Email:</label>
                        <input type="email" name="email" value={user.email} onChange={handleChange} />
                    </div>
                    <br />
                    
                    <div className="input-box">
                        <label>Identification Number:</label>
                        <input type="text" name="identificationNumber" value={user.identificationNumber} onChange={handleChange} />
                    </div>
                    <br />
                    
                   
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

export const EditarPerfilUser = () => {
    const [user, setUser] = useState({
        user: '',
        name: '',
        lastName: '',
        email: '',
        identificationType: { idIdentificationType: '', nameIdentificationType: '' },
        identificationNumber: '',
        personType: { idPersonType: '', namePersonType: '' },
        dependence: { idDependence: '', nameDependence: '' }
    });
    const [identificationTypes, setIdentificationTypes] = useState([]);
    const [personTypes, setPersonTypes] = useState([]);


    useEffect(() => {
        const fetchUserAndOptions = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = { 'Authorization': `Bearer ${token}` };

                // Fetch user data
                const userResponse = await axios.get('http://localhost:8080/api/auth/editar', { headers });
                setUser(userResponse.data);

                // Fetch identification types
                const identificationTypesResponse = await axios.get('http://localhost:8080/api/identification_type/get', { headers });
                setIdentificationTypes(identificationTypesResponse.data);

                // Fetch person types
                const personTypesResponse = await axios.get('http://localhost:8080/api/person_type/get', { headers });
                setPersonTypes(personTypesResponse.data);

            } catch (error) {
                console.error('Error fetching user data or options', error);
            }
        };

        fetchUserAndOptions();
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
            await axios.put('http://localhost:8080/api/user/editar', user, {
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
            <MenuUser />
            <div className="formu">
                <h1>Editar Perfil</h1>
                <form onSubmit={handleSubmit} className="Formlogin">
                    <div className="input-box">
                        <label>User:</label>
                        <input type="text" name="user" value={user.user} onChange={handleChange} disabled />
                    </div>
                    <br />
                    <div className="input-box">
                        <label>Name:</label>
                        <input type="text" name="name" value={user.name} onChange={handleChange} />
                    </div>
                    <br />
                    <div className="input-box">
                        <label>Last Name:</label>
                        <input type="text" name="lastName" value={user.lastName} onChange={handleChange} />
                    </div>
                    <br />
                    <div className="input-box">
                        <label>Email:</label>
                        <input type="email" name="email" value={user.email} onChange={handleChange} />
                    </div>
                    <br />
                    
                    <div className="input-box">
                        <label>Identification Number:</label>
                        <input type="text" name="identificationNumber" value={user.identificationNumber} onChange={handleChange} />
                    </div>
                    <br />
                    
                   
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

export const EditarPerfilSecre = () => {

    const [user, setUser] = useState({
        user: '',
        name: '',
        lastName: '',
        email: '',
        identificationType: { idIdentificationType: '', nameIdentificationType: '' },
        identificationNumber: '',
        personType: { idPersonType: '', namePersonType: '' },
        dependence: { idDependence: '', nameDependence: '' }, // Añadir dependencia aquí
    });
    const [identificationTypes, setIdentificationTypes] = useState([]);
    const [personTypes, setPersonTypes] = useState([]);
    const [dependences, setDependences] = useState([]); // Estado para dependencias
    
    useEffect(() => {
        const fetchUserAndOptions = async () => {
            try {
                const token = localStorage.getItem('token');
                const userResponse = await axios.get('http://localhost:8080/api/auth/editar', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUser(userResponse.data);
    
                const identificationTypesResponse = await axios.get('http://localhost:8080/api/identification_type/get', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setIdentificationTypes(identificationTypesResponse.data);
    
                const dependenceResponse = await axios.get('http://localhost:8080/api/dependence/get', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setDependences(dependenceResponse.data);
    
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
            await axios.put('http://localhost:8080/api/user/editar', user, {
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
                <h1>Editar Perfil</h1>
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
                        <label>Identification Number:</label>
                        <input type="text" name="identificationNumber" value={user.identificationNumber} onChange={handleChange} />
                    </div><br />
                    
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    )
}
