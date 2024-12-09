import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import Modal from '../components/Modal';
import { FaX } from 'react-icons/fa6';


const Profileconfig = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState(undefined);

    const [name, setName] = useState('');
    const [lastname, setLasname] = useState('');
    const [phone, setPhone] = useState('');

    const [modifiedItems, setModifiedItems] = useState([]);

    const [uploadedFile, setUploadedFile] = useState(null);
    const [uploadedFileName, setUploadedFileName] = useState('');

    const [details, setDetails] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [hasFile, setHasFile] = useState(false);


    const handleModifyData = (field, value) => {
        setName(value);
        switch(field) {
            case 'name':
                setName(value);
                break;
            case 'lastname':
                setLasname(value);
                break;
            case 'phone':
                setPhone(value);
                break; 
        }

        setModifiedItems(prevItems => {
            const updatedItems = [...prevItems];
            const index = updatedItems.findIndex(item => item.hasOwnProperty(field));
            if (index !== -1) {
                updatedItems[index] = { [field]: value };
            } else {
                updatedItems.push({ [field]: value });
            }
            return updatedItems;
        });
    }

    const handleUpdateData = () => {
        console.log(modifiedItems);
        axios.post('http://localhost:4000/user/update-user', { userId: user.id, updatedData: modifiedItems})
        .then((response) => {
            console.log(response.data);
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);

            setDetails(response.data.details);
            setShowModal(true);
        })
        .catch((error) => {
            console.log(error.response.data.details);
        })
    }

    const handleFileUpload = (file) => {
        setUploadedFile(URL.createObjectURL(file));
        setUploadedFileName(file.name);
    }

    const handleGetFile = (userId) => {
        axios.post('http://localhost:4000/record/get-record', {userId: userId})
        .then((response) => {
            if (response.data.data) {
                const uint8Array = new Uint8Array(response.data.data.content.data);

                const blob = new Blob([uint8Array], { type: 'application/pdf' });

                const fileURL = URL.createObjectURL(blob);

                setHasFile(true);

                setUploadedFile(fileURL);
            }            
        })
        .catch((error) => {
            console.log(error.response.data.details);

        })
    }

    const handleSaveFile = async () => {
        try {
            const response = await fetch(uploadedFile);
            const blob = await response.blob();
            
            const file = new File([blob], 'archivo.pdf', { type: blob.type });
    
            const formData = new FormData();
            formData.append('file', file); 
            formData.append('user_id', user.id);
            formData.append('title', 'Test'); 
    

            console.log(formData);
            const axiosResponse = await axios.post('http://localhost:4000/record/add-record', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            setDetails(axiosResponse.data.details);
            setShowModal(true);
            setHasFile(true);
        } catch (error) {
            console.error('Error al guardar el archivo:', error);
        }
    };
    
    const handleDeleteFile = () => {
        axios.post('http://localhost:4000/record/remove-record', { userId: user.id})
        .then((response) => {
            setUploadedFile(null);
            setDetails(response.data.details);
            setShowModal(true);
            setHasFile(false);
        })
        .catch((error) => {

        })
    }

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            const decoded = jwtDecode(accessToken);
            setUser(decoded);
            setName(decoded.name);
            setLasname(decoded.lastname);
            setPhone(decoded.phone);
            handleGetFile(decoded.id);
        } else {

        }
    },[]);

    return (
        <div className="w-full flex flex-col items-center w-full h-screen bg-gray-100">
            <NavBar/>
            <div className="bg-green-100 text-green-800 p-4 rounded-md mb-4 shadow">
                <h2 className="text-lg font-semibold">¿Qué podés hacer aquí?</h2>
                <p className="text-sm mt-1">
                    En esta sección podés actualizar tu información personal, como nombre, apellido o número de teléfono, para mantener tu perfil al día.  
                    Además, podes gestionar tu expediente médico, subir nuevos documentos o eliminar los existentes. Esto ayuda a mejorar la precisión y personalización de tus consultas médicas.
                </p>
            </div>

            {user ? (
            <div className='flex w-full bg-gray-100 space-x-2 w-[50%] h-[65%] pr-2 pl-2'>
                
                <div className="flex flex-col items-center justify-center w-[50%] h-full space-y-5 pt-2 bg-white rounded-md">
                    <div className="w-[90%] flex flex-col items-start justify-center space-y-2">
                        <label>Nombre</label>
                        <input onChange={(e) => handleModifyData('name', e.target.value)} value={name} className="w-full border rounded-md p-2" />
                    </div>
                    <div className="w-[90%] flex flex-col items-start justify-center space-y-2">
                        <label>Apellido</label>
                        <input onChange={(e) => handleModifyData('lastname', e.target.value)} value={lastname} className="w-full border rounded-md p-2" />
                    </div>
                    <div className="w-[90%] flex flex-col items-start space-y-2">
                        <label>Número de Teléfono</label>
                        <input onChange={(e) => handleModifyData('phone', e.target.value)} value={phone} className="w-full border rounded-md p-2" />
                    </div>
                    <div className="flex justify-center w-full rounded-2xl">
                        <button onClick={handleUpdateData} className="w-1/2 bg-gray-200 hover:bg-gray-300 h-10 rounded-md">
                            Guardar Cambios
                        </button>
                    </div>
                    <p className="h-[30px]"></p>
                </div>
                <div className='flex flex-col items-center w-[50%] h-full bg-white rounded-md'>
                    <label>Tu Expediente Médico</label>
                    {uploadedFile ? (
                        <div className="w-full h-[500px] p-4 space-y-5">
                            <div className='flex w-full'>
                                <p className='w-full'>{uploadedFileName}</p>
                                {!hasFile && (
                                    <button className='w-[30px]' onClick={() => setUploadedFile(null)}><FaX/></button>
                                )}
                            </div>
                            
                            <iframe 
                                src={uploadedFile} 
                                className="w-full h-[90%] border rounded-md mt-2"
                                title="Vista previa del archivo"
                            />
                            <div className='flex justify-center space-x-2'>
                            
                            
                                {hasFile ? (
                                    <button onClick={handleDeleteFile} className="w-1/2 bg-gray-200 hover:bg-gray-300 h-10 rounded-md">
                                        Eliminar
                                    </button>
                                ) : (
                                    <button onClick={handleSaveFile} className="w-1/2 bg-gray-200 hover:bg-gray-300 h-10 rounded-md">
                                        Guardar
                                    </button>
                                )}
                                
                            
                            </div>
                            
                        </div>
                    ) : (
                        <div>
                            <input 
                                type="file" 
                                accept="application/pdf" 
                                className="w-full border rounded-md p-2" 
                                onChange={(e) => handleFileUpload(e.target.files[0])}
                            />
                        </div>
                    )}
                </div>
            </div>
            ):(
                <p></p>
            )}
            
            <Modal isOpen={showModal}>
                <div className='space-y-4'>
                    <p>{details}</p>
                    <div className='flex justify-end'>
                        <button onClick={() => setShowModal(false)} className='rounded-md p-2 font-semibold text-white bg-blue-400'>Aceptar</button>
                    </div>
                </div>
            </Modal>

        </div>
    );
};

export default Profileconfig;
