import { useEffect, useState } from 'react';
import ChatBox from '../components/ChatBox';
import '../styles.css';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import NavBar from '../components/NavBar';
import { FaHistory, FaRegBookmark } from 'react-icons/fa';

const Chat = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [chatId, setChatId] = useState(undefined);
    const [content, setContent] = useState(undefined);

    const [messages, setMesages] = useState([]);

    const [userId, setUserId] = useState('');

    const [loading, setLoading] = useState(undefined);

    const handleGetMessages = (chatId) => {
        axios.post('http://localhost:4000/chat/get-messages', { chatId: chatId })
        .then((response) => {
            setMesages(response.data.data);
        })
        .catch((error) => {

        })
        .finally(() => {
            setLoading(false);
        })
    }

    const handleNewChat = () => {
        const chatData = {
            user_id: userId,
            title: "Test",
        };

        axios.post('http://localhost:4000/chat/create-chat', { chatData: chatData })
        .then((response) => {
            console.log(response);
            const chat_id = response.data.data.chat_id;
            console.log(chat_id);
            navigate(`/chat/${chat_id}`, { replace: true });
            setChatId(chat_id);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const handleNewMessage = (chatId, content) => {
        console.log('Ejecutando');
        const messageData = {
            chat_id: chatId,
            sender: "c",
            content: content
        };

        console.log(messageData);

        axios.post('http://localhost:4000/chat/create-message', { messageData: messageData })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const handleSendMessage = (message) => {
        if (chatId) {
            handleNewMessage();

        } else {
            handleNewChat();

        }

        const newMessage = {
            message_id: 0,
            chat_id: chatId,
            message_time: 0,
            sender: 'u',
            content: message
        };

        setMesages((prevMessages) => [...prevMessages, newMessage])
        setContent(message);        
    }

    const handleHistory = () => {
        navigate('/history');
    }

    const handleEndSession = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/';
    }

    useEffect(() => {
        if (chatId && content) {
            handleNewMessage(chatId, content);
            setContent(undefined);
        }
    }, [chatId, content]);

    useEffect(() => {
        //const location = useLocation();
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            const decoded = jwtDecode(accessToken);
            setUserId(decoded.id);
            if (id) {
                setChatId(id);
                handleGetMessages(id);
                setLoading(true)
            } else {
                console.log('new chat');
            }
        } else {
            navigate('/');
        }
    }, []);

    return(
        <div className='w-full h-screen bg-gray-100'>
            <NavBar/>

            <ul className='flex w-full p-2'>
                <li onClick={handleHistory} className='flex items-center border rounded-md p-2 cursor-pointer space-x-2 bg-white'>
                    <FaRegBookmark/>
                    <p>Historial</p>
                </li>
            </ul>
            <div className='flex justify-center items-center'>
                <ChatBox
                    loading={loading}
                    onSend={handleSendMessage}
                    messages={messages}
                />
            </div>
        </div>
    )
}

export default Chat;