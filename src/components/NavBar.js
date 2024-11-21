import { FaRegUser, FaUser } from 'react-icons/fa';
import '../styles.css'
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';




const NavBar = ({
    onLogin,
    onRegister,
    onSignOut,
}) => {

    const [user, setUser] = useState(undefined);
    const [show, setShow] = useState(false);

    const navigate= useNavigate();


    const handleEndSession = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/';
    }

    const handleRedirect = (route) => {
        //window.location.href = `/${route}`;
        navigate(`/${route}`);
    }

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            const decoded = jwtDecode(accessToken);
            setUser(decoded);
        }
    }, []);

    return (
        <nav className="flex items-center justify-between bg-blue-100 p-4 shadow-md">
            <div className="flex items-center">
                <img src="/images/intellimedlogo.png" alt="logo" className="w-10 h-10"/>
                <h1 className="text-xl font-semibold ml-2">IntelliMed</h1>
            </div>
            <div className="flex items-center">
                <a href="#" className="text-gray-600 hover:text-gray-800">Servicios</a>
                <a href="#" className="text-gray-600 hover:text-gray-800 ml-4">Contactanos</a>
                {user ? (
                    <div className='flex items-center justify-center space-x-1 ml-5'>
                        <p>{user.name}</p>
                        <p>{user.lastname}</p>
                        <button onClick={() => setShow(!show)} className='flex justify-center items-center border w-[40px] h-[40px] bg-white rounded-3xl'>
                            <FaRegUser/>
                        </button>
                        <div className='absolute right-0 mt-14 w-48'>
                            {show && (
                                <div className='absolute right-0 mt-2 w-48 bg-white border rounded-b-md shadow-lg'>
                                    <ul className='py-2'>
                                        <li onClick={() => handleRedirect('adjustments')} className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>Ajustes</li>
                                        <li onClick={handleEndSession} className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>Cerrar Sesión</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                ):(
                    <div>
                        <button onClick={handleRedirect('login')} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-600 ml-4">
                            Iniciar Sesión
                        </button>
                        <button onClick={handleRedirect('register')} className="bg-white-600 text-blue px-4 py-2 rounded hover:bg-white-600">
                            Registrate
                        </button>
                        
                    </div>
                )}
                
                
            </div>
        </nav>
    )

}

export default NavBar;