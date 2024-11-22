import { useState } from 'react';
import '../styles.css';
import axios from 'axios';
import logo from '../images/logo.png';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [details, setDetails] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();


    const handleLogin = () => {
        axios.post('http://localhost:4000/user/login', { email: email, password: password })
        .then((response) => {
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            navigate('/history');
        })
        .catch((error) => {
            console.log(error);
            setDetails(error.response.data.details);
            setSuccess(error.response.data.success);
            setTimeout(() => {
                setDetails('')
            }, 2000);
        })

    }

    return (
        <div className="flex justify-center items-center w-full h-screen bg-blue-100 p-10">
            <div className="flex w-[90%] rounded-2xl">
                <div className="flex justify-center items-center w-[60%] bg-white rounded-l-2xl">
                    <img 
                        src={logo} 
                        alt="IntelliMed" 
                        className="w-full object-fit" 
                    />
                </div>
                <div className="flex flex-col items-center bg-gray-100 w-[40%] p-5 rounded-r-2xl">
                    <p className="font-bold text-3xl mb-5">Iniciar Sesión</p>
                    <div className="flex flex-col w-full h-[80%] space-y-5 mb-4">
                        <div className="flex flex-col items-start space-y-2">
                            <label>Correo Electrónico</label>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} className="w-full border rounded-md p-2" />
                        </div>
                        <div className="flex flex-col items-start space-y-2">
                            <label>Contraseña</label>
                            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className="w-full border rounded-md p-2" />
                        </div>   
                        <p className={` h-[30px] ${success ? 'text-green-500' : 'text-red-500'}`}>{details}</p>
                    </div>
                    <button onClick={handleLogin} className="w-full bg-buttonGreen text-white h-10 rounded-md">
                            Iniciar Sesión
                    </button>
                </div>
            </div>
        </div>
    );
    
}

export default Login;