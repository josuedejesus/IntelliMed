import axios from 'axios';
import '../styles.css';
import { FaChevronRight, FaHistory, FaPlus } from "react-icons/fa";
import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import NavBar from '../components/NavBar';
import { SlOptionsVertical } from 'react-icons/sl';
import Modal from '../components/Modal';
import { ClipLoader } from 'react-spinners';



const History = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState(undefined);
    const [chats, setChats] = useState([]);
    const [fileteredChats, setFilteredChats] = useState([]);

    const [selectedChat, setSelectedChat] = useState(undefined);

    const [showModal, setShowModal] = useState(false);

    const [loading, setLoading] = useState(true);

    const [details, setDetails] = useState('');
    const [showDetails, setShowDetails] = useState(true);

    const [file, setFile] = useState(null);


    function formatDate(timestamp) {
        const date = new Date(timestamp); 
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear(); 

        return `${day}/${month}/${year}`;
    }

    const handleGetChats = (userId) => {
        setLoading(true);
        axios.post('http://localhost:4000/chat/get-chats', { userId: userId})
        .then((response) => {
            console.log(response.data.data);
            setFilteredChats(response.data.data);
            setChats(response.data.data);
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            setLoading(false);
        })
    }

    const handleOpenChat = (chatId) => {
        console.log(chatId)
        navigate(`/chat/${chatId}`);
    }

    const handleNewChat = () =>{
        navigate('/chat')
    }

    const handleSelectChat = (chat) => {
        setSelectedChat(chat);
        setShowModal(true);
    }

    const handleFilterChats = (value) => {
        const filtered = chats.filter((chat) =>
            chat.title.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredChats(filtered);
    }

    const handleUpdateChatTitle = (title) => {
        console.log(title);        
        const updatedChat = { ...selectedChat, title };     
        setSelectedChat(updatedChat);
    };

    const handleUpdateChat = () => {
        setFilteredChats((prevChats) =>
            prevChats.map((chat) =>
                chat.chat_id === selectedChat.chat_id ? { ...chat, ...selectedChat } : chat
            )
        );
        
        axios.post('http://localhost:4000/chat/update-chat', { chat: selectedChat })
        .then((response) => {
            console.log(response.data.details);
            setDetails(response.data.details);
        })
        .catch((error) => {

        })

        setShowModal(false);
    }
    

    const handleRemoveChat = () => {
        axios.post('http://localhost:4000/chat/remove-chat', { chatId: selectedChat.chat_id })
        .then((response) => {
            handleGetChats(user.id);
            setDetails(response.data.details);
        })
        .catch((error) => {
            console.log(error.response.data.details);
        })
        setShowModal(false);

    }

    const handleGetFile = (userId) => {
        axios.post('http://localhost:4000/record/get-record', {userId: userId})
        .then((response) => {
            if (response.data.data) {
                const uint8Array = new Uint8Array(response.data.data.content.data);

                const blob = new Blob([uint8Array], { type: 'application/pdf' });

                const fileURL = URL.createObjectURL(blob);

                setFile(fileURL);
            }

            
        })
        .catch((error) => {
            console.log(error.response.data.details);

        })
    }

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            const decoded = jwtDecode(accessToken);
            setUser(decoded);

            setLoading(true);
            handleGetFile(decoded.id);
            handleGetChats(decoded.id);
        } else {
            navigate('/home');
        }
        
    }, []);

    return(
        
        <div className='flex flex-col justify-center items-center bg-gray-100 h-screen'>
            <NavBar/>
            {loading ? (
                <div className='h-full'>
                    <div className='flex items-center justify-center w-[98%] h-full'><ClipLoader size={80} color='gray'/></div>

                </div>
            ):(
                <div className='h-full w-full'>
                    <div className="bg-green-100 text-green-800 p-4 rounded-md shadow">
                        `<h2 className="text-lg font-semibold">¿Qué podés hacer aquí?</h2>
                        <p className="text-sm mt-1">
                            Bienvenido a nuestra plataforma. Aquí podés iniciar un nuevo chat, revisar tus conversaciones previas o buscar información relevante en tiempo real.
                        </p>
                    </div>

                    {!file && (
                        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md shadow mb-4">
                            <h2 className="text-lg font-semibold">¡Aún no has agregado tu expediente médico!</h2>
                            <p className="text-sm mt-1">
                                Agregar tu expediente médico puede mejorar la precisión de las respuestas y recomendaciones del chat. Esto ayudará a personalizar la experiencia para tus necesidades específicas.
                            </p>

                            <Link 
                                to="/adjustments" 
                                className="text-blue-500 font-semibold mt-2 inline-block"
                            >
                                Agregar mi expediente médico
                            </Link>
                        </div>
                    )}

                    <ul className='flex w-full p-2'>
                        <li onClick={handleNewChat} className='flex items-center border rounded-md p-2 cursor-pointer space-x-2 bg-white'>
                            <FaPlus/>
                            <p>Nuevo Análisis</p>
                        </li>
                    </ul>
                    <div className='w-full p-1'>
                        <SearchBar
                            onSearch={handleFilterChats}
                        />
                    </div>
                    <div className='flex flex-col items-center w-full h-full'>
                        <p className='w-[98%] text-start pl-2 font-semibold text-xl mb-2'>Historial</p>
                            <ul className='w-[98%]'>
                            {(fileteredChats && fileteredChats.length) > 0 ? (
                                fileteredChats.map((chat, index) => (
                                <li className="group flex items-center justify-center w-[50%] mb-2 bg-white rounded-xl p-2 cursor-pointer hover:bg-gray-200 relative">
                                    <div onClick={() => handleSelectChat(chat)} className='w-[10%] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition'>
                                        <button>
                                            <SlOptionsVertical />
                                        </button>
                                    </div>
                                    <div onClick={() => handleOpenChat(chat.chat_id)} className='w-[80%]'>
                                        <p className='text-start ml-3'>{chat.title}</p>
                                        <p className='text-start ml-3'>{formatDate(chat.date)}</p>
                                    </div>
                                    <div className='flex justify-end w-[10%] text-gray-500'>
                                        <FaChevronRight />
                                    </div>
                                </li>
                                ))
                            ) : (
                                <div>No se encontraron chats.</div>
                            )}
                            
                            </ul>
                        
                    </div>
                </div>
            )}
            
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                {selectedChat && (
                    <div className='flex flex-col items-center space-y-2'>
                        <input onChange={(e) => handleUpdateChatTitle(e.target.value)} className='text-center w-full h-[30px] focus:outline-none' value={selectedChat.title}/>
                        <button onClick={handleUpdateChat} className='bg-gray-100 rounded-md p-2 hover:bg-gray-200'>Guardar Cambios</button>
                        <button onClick={handleRemoveChat} className='bg-gray-100 rounded-md p-2 hover:bg-gray-200'>Eliminar</button>
                    </div>
                )}
            </Modal>

            <Modal isOpen={details} onClose={() => setShowDetails(false)}>
                <div className='flex flex-col items-center space-y-2'>
                    <input onChange={(e) => handleUpdateChatTitle(e.target.value)} className='text-center w-full h-[30px] focus:outline-none' value={details}/>
                    <button onClick={() => setDetails('')} className='bg-gray-100 rounded-md p-2 hover:bg-gray-200'>Aceptar</button>
                </div>
            </Modal>
        </div>
    )
}

export default History;