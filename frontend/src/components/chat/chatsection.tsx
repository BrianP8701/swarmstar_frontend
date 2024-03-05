import React, { useState, useRef, useEffect } from 'react';
import Message from '@components/chat/message';
import { useSelector, useDispatch } from 'react-redux';
import { RootStateType } from '@models/rootstate';
import useHandleUserMessage from '@/hooks/chat/handleUserMessage';

const ChatSection = () => {
    const [text, setText] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const { handleUserMessage } = useHandleUserMessage();
    const [currentMessage, setCurrentMessage] = useState('');

    let messages = useSelector((state: RootStateType) => state.chat.messages);
    if (!messages) {
        messages = [];
    }
    console.log('messages', messages);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = '40px'; // Reset height to shrink back when deleting text
            console.log('textareaRef.current.scrollHeight', textareaRef.current.scrollHeight);
            const newHeight = Math.min(textareaRef.current.scrollHeight, 400); // Allow growth up to 200px
            textareaRef.current.style.height = `${newHeight}px`;
        }
    }, [text, messages.length]);

    return (
        <div className="flex flex-col w-full h-full">
            <div ref={messagesContainerRef} className="flex-grow overflow-auto px-64">
                {messages.map((message, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                        <Message text={message.content} role={message.role} />
                    </div>
                ))}
            </div>
            <div className="flex justify-center items-end w-full pb-5">
                <button
                    className="left-0 mb-3"
                    style={{
                        width: '30px',
                        height: '30px',
                        backgroundImage: 'url(/file.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                ></button>
                <textarea
                    ref={textareaRef}
                    value={currentMessage}
                    onChange={(e) => {
                        setCurrentMessage(e.target.value);
                        setText(e.target.value);
                    }}
                    className="resize-none border border-gray-300 p-4 rounded-20"
                    style={{
                        width: 'calc(100% - 520px)',
                        minHeight: '40px',
                        maxHeight: '400px',
                        overflowY: 'auto',
                        background: 'transparent',
                        outline: 'none',
                    }}
                    placeholder="Type your message here..."
                />
                <button
                    className="right-0 mb-3"
                    style={{
                        width: '30px',
                        height: '30px',
                        backgroundImage: 'url(/play.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                    onClick={() => {
                        handleUserMessage(currentMessage);
                        setCurrentMessage('');
                    }}
                ></button>
            </div>
        </div>
    );
};

export default ChatSection;