import { useEffect, useState } from "react";
import ChatBox from "../components/ChatBox";
import "../styles.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import NavBar from "../components/NavBar";
import { FaRegBookmark } from "react-icons/fa";

const Chat = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [chatId, setChatId] = useState(undefined);
    const [messages, setMessages] = useState([]);
    const [userId, setUserId] = useState("");
    const [loading, setLoading] = useState(false);
    const [thinking, setThinking] = useState(false);

    const [newChat, setNewChat] = useState(false);

    const fetchMessages = async (chatId) => {
        try {
            setLoading(true);
            const response = await axios.post("http://localhost:4000/chat/get-messages", { chatId });
            setMessages(response.data.data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleNewChat = async (initialMessage) => {
        try {
            const responseTitle = await axios.post("http://localhost:4000/chat/get-chat-title", { message: initialMessage });
            const title = responseTitle.data.data;

            const chatData = {
                user_id: userId,
                title,
            };
            const responseChat = await axios.post("http://localhost:4000/chat/create-chat", { chatData });
            const newChatId = responseChat.data.data.chat_id;

            //navigate(`/chat/${newChatId}`, { replace: true });
            window.history.pushState({}, '', `/chat/${newChatId}`);

            setChatId(newChatId);

            await handleNewMessage(newChatId, initialMessage);
        } catch (error) {
            console.error("Error creating new chat:", error);
        }
    };

    const handleNewMessage = async (chatId, content) => {
        try {
            const userMessage = { chat_id: chatId, role: "user", content };
            await axios.post("http://localhost:4000/chat/create-message", { messageData: userMessage });

            setMessages((prevMessages) => [...prevMessages, userMessage]);

            const chatHistory = messages.map(({ role, content }) => ({ role, content }));
            chatHistory.push(userMessage);
            
            setThinking(true);
            const response = await axios.post("http://localhost:4000/chat/get-chat-response", { messages: chatHistory, userId: userId });

            const systemMessage = { chat_id: chatId, role: "system", content: response.data.data };

            await axios.post("http://localhost:4000/chat/create-message", { messageData: systemMessage });

            setMessages((prevMessages) => [...prevMessages, systemMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setThinking(false);
        }
    };

    const handleSendMessage = (message) => {
        if (chatId) {
            handleNewMessage(chatId, message);
        } else {
            handleNewChat(message);
        }
    };

    const handleHistory = () => {
        navigate("/history");
    };

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            const decoded = jwtDecode(accessToken);
            setUserId(decoded.id);

            if (id) {
                setChatId(id);
                fetchMessages(id);
            }
        } else {
            navigate("/");
        }
    }, [id, navigate]);

    return (
        <div className="w-full h-screen bg-gray-100">
            <NavBar />

            <ul className="flex w-full p-2">
                <li onClick={handleHistory} className="flex items-center border rounded-md p-2 cursor-pointer space-x-2 bg-white">
                    <FaRegBookmark />
                    <p>Historial</p>
                </li>
            </ul>

            <div className="flex justify-center items-center">
                <ChatBox loading={loading} thinking={thinking} onSend={handleSendMessage} messages={messages} />
            </div>
        </div>
    );
};

export default Chat;
