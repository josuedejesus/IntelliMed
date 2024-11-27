import '../styles.css';
import logo from '../images/logo.png';
import { useState } from 'react';
import { validatePassword } from '../utils/validator';
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retypedPassword, setRetypedPassword] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');


    const [success, setSuccess] = useState('');
    const [details, setDetails] = useState('');

    const handleRegister = () => {
        if (validatePassword(password, retypedPassword)) {
            const userData = {
                name: name,
                lastname: lastname,
                email: email,
                password: password,
                date_of_birth: birthDate,
                gender: gender,
                phone: phone,
                role: 1
            };

            console.log(userData);
            axios.post('http://localhost:4000/user/register', {userData: userData})
            .then((response) => {
                console.log('response', response.data.details);
                setSuccess(response.data.success);
                setDetails(response.data.details);
                setTimeout(() => {
                    setDetails('')
                }, 2000);
            })
            .catch((error) => {
                console.log(error.response.data.details);
                setSuccess(error.response.data.success);
                setDetails(error.response.data.details);
                setTimeout(() => {
                    setDetails('')
                }, 2000);
            })

        } else {
            console.log(birthDate);
            setDetails('Las contrasenas no son iguales.');
            setTimeout(() => {
                setDetails('')
            }, 2000);
            console.log('Las contrasenas no son iguales.', password, ' ', retypedPassword);
        }
    }

    return(
        <div className="flex justify-center items-center w-full bg-blue-100 p-10">
            <div className="flex w-[90%] rounded-2xl">
                <div className="flex justify-center items-center w-[60%] bg-white rounded-l-2xl">
                    <img 
                        src={logo} 
                        alt="IntelliMed" 
                        className="w-full object-fit" 
                    />
                </div>
                <div className="flex flex-col items-center bg-gray-100 w-[40%] p-5 rounded-r-2xl">
                    <p className="font-bold text-3xl mb-5">Crear Cuenta</p>
                    <div className="flex flex-col w-full space-y-5 mb-4">
                        <div className="flex flex-col items-start space-y-2">
                            <label>Nombre</label>
                            <input onChange={(e) => setName(e.target.value)} value={name} className="w-full border rounded-md p-2" />
                        </div>
                        <div className="flex flex-col items-start space-y-2">
                            <label>Apellido</label>
                            <input onChange={(e) => setLastname(e.target.value)} value={lastname} className="w-full border rounded-md p-2" />
                        </div>
                        <div className="flex flex-col items-start space-y-2">
                            <label>Fecha de Nacimiento</label>
                            <input type='date' onChange={(e) => setBirthDate(e.target.value)} value={birthDate} className="w-full border rounded-md p-2" />
                        </div>
                        <div className="flex flex-col items-start space-y-2">
                            <label>Genero</label>
                            <div className='space-x-2'>
                                <label for="m">Masculino</label>
                                <input onChange={(e) => setGender(e.target.value)} id='m' type='radio' name='gender' value="m"/>
                                <label for="f">Femenino</label>
                                <input onChange={(e) => setGender(e.target.value)} id='f' type='radio' name='gender' value="f"/>
                            </div>

                        </div>      
                        <div className="flex flex-col items-start space-y-2">
                            <label>Correo Electrónico</label>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} className="w-full border rounded-md p-2" />
                        </div>
                        <div className="flex flex-col items-start space-y-2">
                            <label>Numero de Telefono</label>
                            <input onChange={(e) => setPhone(e.target.value)} value={phone} className="w-full border rounded-md p-2" />
                        </div>
                        <div className="flex flex-col items-start space-y-2">
                            <label>Contraseña</label>
                            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className="w-full border rounded-md p-2" />
                        </div>
                        <div className="flex flex-col items-start space-y-2">
                            <label>Verificar Contraseña</label>
                            <input onChange={(e) => setRetypedPassword(e.target.value)} value={retypedPassword} type="password" className="w-full border rounded-md p-2" />
                        </div>      
                        <p className={` h-[30px] ${success ? 'text-green-500' : 'text-red-500'}`}>{details}</p>
                    </div>
                    <button onClick={handleRegister} className="w-full bg-buttonGreen text-white h-10 rounded-md">
                            Registrarse
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Register;