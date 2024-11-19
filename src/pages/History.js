import axios from 'axios';
import '../styles.css';
import { FaChevronRight } from "react-icons/fa";
import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const History = () => {

    const navigate = useNavigate();

    const [chats, setChats] = useState([]);

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

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const decoded = jwtDecode(accessToken);
        handleGetChats(decoded.id);
    }, []);

    return(
        <div className='flex flex-col bg-gray-100 h-screen'>
            <ul className='flex w-full p-2'>
                <li onClick={handleNewChat} className='border rounded-md p-2 cursor-pointer'>Nuevo Analisis</li>
            </ul>
            <div className='p-1'>
                <SearchBar/>
            </div>
            <div className='flex flex-col items-start w-[50%]'>
                <p className='pl-2 font-semibold text-xl mb-2'>Historial</p>
                <ul className='w-full m-2'>
                    {chats.length > 0 ? (
                        chats.map((chat, index) => (
                        <li onClick={() => handleOpenChat(chat.chat_id)} className='flex items-center justify-center w-[60%] mb-2 bg-white rounded-xl p-2 cursor-pointer'>
                            <div className='w-[50%]'>
                                <p className='text-start ml-3'>{chat.title}</p>
                                <p className='text-start ml-3'>{formatDate(chat.date)}</p>
                            </div>
                            <div className='flex justify-end w-[50%] text-gray-500'>
                                <FaChevronRight/>
                            </div>
                        </li>
                        ))
                    ) : (
                        <div>No hay chats disponibles.</div>
                    )}
                    
                </ul>
            </div>
            
            <div className='w-[50%]'>
                    <p></p>
            </div>
        </div>
    )
}

export default History;