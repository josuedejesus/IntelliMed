import { useNavigate } from 'react-router-dom';

const Profileconfig = () => {

    const navigate = useNavigate();

    const handleHome = () => {
        navigate('/home');     
    }

    return (
        <div className="flex justify-center items-center w-full bg-blue-100 p-10 ">
            <div className="flex w-[90%] rounded-2xl">
                <div className="flex justify-center items-center w-[60%] bg-white rounded-l-2xl py-10">
                    <img 
                        src="/images/intellimedlogo.png"
                        alt="IntelliMed" 
                        className="w-full object-fit" 
                    />
                </div>
                <div className="flex flex-col items-center bg-gray-100 w-[40%] p-5 rounded-r-2xl">
                    <p className="font-bold text-3xl mb-5">Ajuste de Cuenta</p>
                    <div className="flex flex-col w-full space-y-5 mb-4">
                        <div className="flex flex-col items-start space-y-2">
                            <label>Nombre</label>
                            <input className="w-full border rounded-md p-2" />
                        </div>
                        <div className="flex flex-col items-start space-y-2">
                            <label>Apellido</label>
                            <input className="w-full border rounded-md p-2" />
                        </div>
                        <div className="flex flex-col items-start space-y-2">
                            <label>Fecha de Nacimiento</label>
                            <input type="date" className="w-full border rounded-md p-2" />
                        </div>
                        <div className="flex flex-col items-start space-y-2">
                            <label>Género</label>
                            <div className="space-x-2">
                                <label htmlFor="m">Masculino</label>
                                <input id="m" type="radio" name="gender" value="m" />
                                <label htmlFor="f">Femenino</label>
                                <input id="f" type="radio" name="gender" value="f" />
                            </div>
                        </div>
                        <div className="flex flex-col items-start space-y-2">
                            <label>Correo Electrónico</label>
                            <input className="w-full border rounded-md p-2" />
                        </div>
                        <div className="flex flex-col items-start space-y-2">
                            <label>Número de Teléfono</label>
                            <input className="w-full border rounded-md p-2" />
                        </div>
                        <div className="flex flex-col items-start space-y-2">
                            <label>Contraseña</label>
                            <input type="password" className="w-full border rounded-md p-2" />
                        </div>
                        <div className="flex flex-col items-start space-y-2">
                            <label>Verificar Contraseña</label>
                            <input type="password" className="w-full border rounded-md p-2" />
                        </div>
                        <div className="flex flex-col items-start space-y-2">
                            <label>Tu expediente</label>
                            <input type="file" accept="application/pdf" className="w-full border rounded-md p-2" />
                        </div>
                        <p className="h-[30px]"></p>
                    </div>
                    <div className="flex w-full space-x-2">
                        <button onClick={handleHome} className="w-1/2 bg-buttonGreen text-white h-10 rounded-md">
                            Salir
                        </button>
                        <button onClick={handleHome} className="w-1/2 bg-blue-500 text-white h-10 rounded-md">
                            Realizar cambios
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profileconfig;
