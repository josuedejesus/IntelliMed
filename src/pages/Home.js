import NavBar from '../components/NavBar';
import Footer from '../components/Footer';


const Home = () => {
    return (
        <div>
            <NavBar />
            <div className="flex h-screen">
                <div className="w-1/2 flex items-center justify-center">
                    <img src="/images/techbrain.png" alt="Welcome" className="max-w-full h-auto" />
                </div>

                <div className="w-1/2 flex flex-col items-center justify-center">
                    <h1 className="text-6xl font-bold mb-6 text-center">Bienvenido a IntelliMed</h1>
                    <h2 className="text-4xl mb-6 text-center"> ¡Listos para ayudarte! </h2>
                    <p className="text-l mb-6 text-center">Nuestro chatbot inteligente está aquí para ayudarte. Introduce tus síntomas y recibe respuestas rápidas y confiables que te guiarán en tus próximos pasos. Nuestro asistente utiliza inteligencia artificial para ofrecerte soluciones precisas y recomendaciones preliminares para tus necesidades de salud. Todo en una interfaz amigable y de fácil acceso. </p>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 mt-4">
                        ¡Comienza Ahora!
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home;