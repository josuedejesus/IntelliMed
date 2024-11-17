import { useEffect, useState } from 'react';
import ChatBox from '../components/ChatBox';
import '../styles.css';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const Chat = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [chatId, setChatId] = useState(undefined);
    const [content, setContent] = useState(undefined);

    const [messages, setMesages] = useState([]);

    const handleGetMessages = (chatId) => {
        axios.post('http://localhost:4000/chat/get-messages', { chatId: chatId })
        .then((response) => {
            console.log('chat_id', chatId);
            console.log(response.data.data);
            setMesages(response.data.data);
        })
        .catch((error) => {

        })
    }

    const handleNewChat = () => {
        const chatData = {
            user_id: 11,
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

    useEffect(() => {
        if (chatId && content) {
            handleNewMessage(chatId, content);
            setContent(undefined);
        }
    }, [chatId, content]);

    useEffect(() => {
        //const location = useLocation();
        if (id) {
            setChatId(id);
            handleGetMessages(id);
        } else {
            console.log('new chat');
        }

    }, []);

    return(
        <div>
            <ul className='flex w-full p-2'>
                <li onClick={handleHistory} className='border rounded-md p-2 cursor-pointer'>Historial</li>
            </ul>
            <div className=''>
                <ChatBox
                    onSend={handleSendMessage}
                    messages={messages}
                />
            </div>
        </div>
    )
}

export default Chat;