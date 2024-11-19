import '../styles.css'




const NavBar = ({
    onLogin,
    onRegister
}) => {

    return (
        <nav className="flex items-center justify-between bg-blue-100 p-4 shadow-md">
            <div className="flex items-center">
                <img src="/images/intellimedlogo.png" alt="logo" className="w-10 h-10"/>
                <h1 className="text-xl font-semibold ml-2">IntelliMed</h1>
            </div>
            <div className="flex items-center">
                <a href="#" className="text-gray-600 hover:text-gray-800">Servicios</a>
                <a href="#" className="text-gray-600 hover:text-gray-800 ml-4">Contactanos</a>
                <button onClick={onLogin} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-600 ml-4">
                    Iniciar Sesión
                </button>
                <button onClick={onRegister} className="bg-white-600 text-blue px-4 py-2 rounded hover:bg-white-600">
                    Registrate
                </button>
            </div>
        </nav>
    )

}

export default NavBar;