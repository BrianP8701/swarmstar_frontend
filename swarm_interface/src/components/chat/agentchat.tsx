import React, { useState, useRef, useEffect } from 'react';
import Message from '@components/chat/message';
const AgentChat = () => {
    const [text, setText] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const [messageAreaHeight, setMessageAreaHeight] = useState('auto');

    const tempMessages: { text: string; role: string }[] = [
        { text: 'Hello, how can I assist you today?', role: 'agent' },
        { text: 'I need help with my order', role: 'customer' },
        { text: 'Sure, what is your order number?', role: 'agent' },
        { text: '123456', role: 'customer' },
    ];
    // Add more messages as needed for testing

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = '40px'; // Reset height to shrink back when deleting text
            const newHeight = Math.min(textareaRef.current.scrollHeight, 200); // Allow growth up to 300px
            textareaRef.current.style.height = `${newHeight}px`;
        }
    }, [text, tempMessages.length]);

    useEffect(() => {
        if (textareaRef.current && messagesContainerRef.current) {
            textareaRef.current.style.height = '40px'; // Reset height to shrink back when deleting text
            const newHeight = Math.min(textareaRef.current.scrollHeight, 200); // Allow growth up to 200px
            textareaRef.current.style.height = `${newHeight}px`;

            const chatContainerHeight = window.innerHeight - 150;
            console.log(chatContainerHeight)
            const messageAreaHeight = chatContainerHeight - newHeight - 10;
            messagesContainerRef.current.style.height = `${messageAreaHeight}px`
            setMessageAreaHeight(`${messageAreaHeight}px`);
        }
    }, [text]);

    return (
        <div className="h-full w-full flex flex-col border border-white relative" style={{ height: 'calc(100vh-48px)' }}>
            <div ref={messagesContainerRef} className="overflow-auto border border-white" style={{ marginBottom: '0px' }}> {/* Adjust marginBottom to '0px' */}
                {tempMessages.map((message, index) => (
                    <Message key={index} text={message.text} role={message.role} />
                ))}
            </div>
            <div className="flex justify-center items-end" style={{ marginBottom: '10px' }}>
                <button className="absolute left-0 ml-4"
                    style={{ bottom: '10px', width: '30px', height: '30px', backgroundImage: 'url(/play.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                </button>
                <textarea
                    ref={textareaRef}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="resize-none border border-gray-300 p-2 rounded-20"
                    style={{ width: 'calc(100% - 120px)', minHeight: '40px', maxHeight: '200px', overflowY: 'auto', background: 'transparent', outline: 'none' }} // Remove mb-3 and adjust style here if needed
                    placeholder="Type your message here..."
                />
                <button className="absolute right-0 mr-4"
                    style={{ bottom: '10px', width: '30px', height: '30px', backgroundImage: 'url(/play.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                </button>
            </div>
        </div>
    );
};

export default AgentChat;
