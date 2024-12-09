import { useEffect, useRef, useState } from 'react';
import '../styles.css';
import { ClipLoader, DotLoader, PacmanLoader, RingLoader, SyncLoader } from "react-spinners";


const ChatBox = ({
    onSend,
    messages,
    loading,
    thinking
}) => {

    const messagesEndRef = useRef(null);
    const [message, setMessage] = useState('');

    const [text, setText] = useState('');
    const mess = "Como te podemos ayudar?";

    const handleSendMessage = () => {
        onSend(message);
        setMessage('');
    }

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
          if (index < mess.length) {
            setText((prev) => prev + mess[index]);
            index += 1;
          } else {
            clearInterval(interval);
          }
        }, 20);
        return () => clearInterval(interval);
      }, [mess]);


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return(
        <div className='h-[750px] w-[90%] rounded-md bg-white'>
            {loading ? (
                <div className="flex flex-col items-center justify-center w-full h-screen">
                    <ClipLoader
                        size={80}
                        color="gray"
                        loading={true}
                    />
                </div>
            ) : (
                <div className="flex flex-col h-[95%] rounded-t-md bg-gray-200 p-2 overflow-y-auto space-y-2">
                {messages.length > 0 ? (
                    messages.map((message, index) => (
                        <div
                            key={index} 
                            className={`whitespace-pre-wrap p-4 rounded-3xl break-words  ${
                                message.role === "system"
                                    ? "text-black w-full text-start font-semibold self-start"
                                    : "text-white bg-gray-600 text-end self-end w-auto"
                            }`}
                        >
                            <p>{message.content}</p>
                        </div>
                    ))
                ) : (
                    <div className='flex items-center justify-center h-full'>
                        <p className='font-bold text-xl overflow-hidden border-r-4 border-black typing'>
                            {text}
                        </p>                    
                    </div>
                )}
                
                {thinking && (
                    <div className='flex w-[95%] m-5 p-2'>
                        <SyncLoader size={10} color='gray'/>
                    </div>
                )}
                <div ref={messagesEndRef}/>
                </div>
            )}
            
            <form className='flex bg-white rounded-md justify-center items-center pt-1 pb-1'
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                }}
            >
                <input value={message} onChange={(e) => setMessage(e.target.value)} className='w-[80%] h-[40px] ml-1 focus:outline-none rounded-md'/>
                <button type="submit" disabled={message === ''}  className={`p-1 ml-1 mr-1 w-[20%] h-[40px] rounded-md ${message === '' ? 'bg-gray-300 ' : 'bg-blue-400 text-white'}`}>Enviar</button>
            </form>
        </div>
    )
}

export default ChatBox;