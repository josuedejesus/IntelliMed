import { useEffect, useState } from 'react';
import '../styles.css';

const ChatBox = ({
    onSend,
    messages
}) => {

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
            clearInterval(interval); // Detener el intervalo cuando el mensaje esté completo
          }
        }, 50); // Velocidad de la escritura
        return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
      }, [mess]);

    return(
        <div className='h-[800px] w-[50%] border pt-5 rounded-md'>
            <div className='h-[95%] bg-gray-300 p-2'>
                {messages.length > 0 ? (
                    messages.map((message, index) => (
                        <div className="bg-blue-500 text-white w-[50%] p-4 rounded-lg mb-2 break-words">
                            <p className='text-start'>{message.content}</p>
                        </div>
                    ))
                ) : (
                    <div className='flex items-center justify-center h-full'>
                        <p className='font-bold text-xl overflow-hidden border-r-4 border-black typing'>
                            {text}
                        </p>                    
                    </div>
                )}
                
                
            </div>
            <div className='flex justify-center items-center h-[5%]'>
                <input value={message} onChange={(e) => setMessage(e.target.value)} className='w-[80%] h-[90%] ml-1 focus:outline-none'/>
                <button disabled={message === ''} onClick={handleSendMessage} className={`border p-1 ml-1 mr-1 w-[20%] rounded-md ${message === '' ? 'bg-gray-300 ' : 'bg-white'}`}>Enviar</button>
            </div>
        </div>
    )
}

export default ChatBox;