import React, { useState, useRef, useEffect } from 'react';
import Pusher from 'pusher-js';

const Home = () => {
    const [name, setName] = useState('');
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        Pusher.logToConsole = true;

        const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
            cluster: process.env.REACT_APP_PUSHER_CLUSTER
        });

        const channel = pusher.subscribe('chat');
        channel.bind('message', function (data) {
            setMessages(prevMessages => [...prevMessages, data]);
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, []);

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (inputMessage.trim() !== '') {
            await fetch(`${process.env.REACT_APP_API}messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: name,
                    message: inputMessage
                })
            });

            setInputMessage('');
        }
    };

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div style={styles.chatContainer}>
            <div style={styles.header}>
                <input
                    type="text"
                    placeholder="Digite seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={styles.nameInput}
                />
            </div>
            <div style={styles.messagesContainer}>
                {messages.map((msg, index) => (
                    <div key={index} style={styles.message}>
                        <strong>{msg.username || 'Anônimo'}:</strong> {msg.message}
                    </div>
                ))}

                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} style={styles.inputContainer}>
                <input
                    type="text"
                    placeholder="Digite sua mensagem"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    style={styles.messageInput}
                />
                <button type="submit" style={styles.sendButton}>
                    Enviar
                </button>
            </form>
        </div>
    );
};

const styles = {
    chatContainer: {
        border: '1px solid #ccc',
        borderRadius: '5px',
        width: '100%',
        height: '98vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        boxSizing: 'border-box',
    },
    header: {
        marginBottom: '10px',
    },
    nameInput: {
        width: '100%',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        boxSizing: 'border-box',
    },
    messagesContainer: {
        flex: 1,
        overflowY: 'auto',
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '5px',
        wordWrap: 'break-word',
    },
    message: {
        margin: '5px 0',
    },
    inputContainer: {
        display: 'flex',
    },
    messageInput: {
        flex: 1,
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        boxSizing: 'border-box',
    },
    sendButton: {
        padding: '8px 12px',
        marginLeft: '5px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#28a745',
        color: 'white',
        cursor: 'pointer',
    },
};

export default Home;
