import axios from 'axios';
import '../styles.css';
import { FaChevronRight, FaHistory, FaPlus } from "react-icons/fa";
import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import NavBar from '../components/NavBar';
import { SlOptionsVertical } from 'react-icons/sl';
import Modal from '../components/Modal';



const History = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState(undefined);
    const [chats, setChats] = useState([]);
    const [fileteredChats, setFilteredChats] = useState([]);

    const [chat, setChat] = useState(undefined);

    const [showModal, setShowModal] = useState(false);


    function formatDate(timestamp) {
        const date = new Date(timestamp); 
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear(); 

        return `${day}/${month}/${year}`;
    }

    const handleGetChats = (userId) => {
        axios.post('http://localhost:4000/chat/get-chats', { userId: userId})
        .then((response) => {
            console.log(response.data.data);
            setFilteredChats(response.data.data);
            setChats(response.data.data);
        })
        .catch((error) => {
            console.log(error);
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
        setChat(chat);
        setShowModal(true);
    }

    const handleFilterChats = (value) => {
        const filtered = chats.filter((chat) =>
            chat.title.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredChats(filtered);
    }

    const handleRemoveChat = () => {
        axios.post('http://localhost:4000/chat/remove-chat', { chatId: chat.chat_id })
        .then((response) => {
            setShowModal(false);
            handleGetChats(user.id);
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
            handleGetChats(decoded.id);
        } else {
            navigate('/home');
        }
        
    }, []);

    return(
        <div className='flex flex-col justify-center items-center bg-gray-100 h-screen'>
            <NavBar/>
            <ul className='flex w-full p-2'>
                <li onClick={handleNewChat} className='flex items-center border rounded-md p-2 cursor-pointer space-x-2 bg-white'>
                    <FaPlus/>
                    <p>Nuevo Analisis</p>
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
                        <div>No tiene chats disponibles.</div>
                    )}
                    
                </ul>
            </div>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                {chat && (
                    <div className='flex flex-col items-center space-y-2'>
                        <input className='text-center w-full h-[30px] focus:outline-none' value={chat.title}/>
                        <button className='bg-gray-100 rounded-md p-2 hover:bg-gray-200'>Guardar Cambios</button>
                        <button onClick={handleRemoveChat} className='bg-gray-100 rounded-md p-2 hover:bg-gray-200'>Eliminar</button>
                    </div>
                )}
            </Modal>
        </div>
    )
}

export default History;