import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useNavigate } from 'react-router-dom';

const Contacts = () => {
    
    const navigate = useNavigate();

    const handleRedirect = () => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            navigate('/history');
        } else {
            navigate('/login');
        }
    }

    const handleRegister = () => {
        navigate('/register');
    }

    const handleHome = () => {
        navigate('/home');
    }

    return (
        <div>
            <NavBar 
                onLogin={handleRedirect}
                onRegister={handleRegister}
            />
            
            <div className="flex justify-center items-center w-full bg-blue-100 p-10">
                <div className="flex w-[90%] rounded-2xl shadow-lg bg-white">
                    <div className="flex flex-col items-center w-full p-5 rounded-xl">
                        <p className="font-bold text-3xl mb-5">Contactos</p>
                        <div className="flex flex-col w-full space-y-5 mb-4">
                            <div className="flex flex-col items-start space-y-2">
                                <label>Nombre</label>
                                <input className="w-full border rounded-md p-2" />
                            </div>
                            <div className="flex flex-col items-start space-y-2">
                                <label>Correo Electrónico</label>
                                <input className="w-full border rounded-md p-2" />
                            </div>
                            <div className="flex flex-col items-start space-y-2">
                                <label>Mensaje</label>
                                <textarea 
                                    className="w-full border rounded-md p-2" 
                                    rows="5"
                                    placeholder="Escribe tu mensaje aqui..."/>
                            </div>
                        </div>
                        <div className="flex w-full space-x-2">
                            <button onClick={handleHome}className="w-1/2 bg-buttonGreen text-white h-10 rounded-md">
                                Salir
                            </button>
                            <button className="w-1/2 bg-blue-500 text-white h-10 rounded-md">
                                Enviar Mensaje
                            </button>
                        </div>
                    </div>
                </div>
            </div>
           
            <Footer />
        </div>
    );
};

export default Contacts;
