import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MessageProps {
    text: string;
    role: string;
}

const Message: React.FC<MessageProps> = ({ text, role }) => {
    return (
        <div className="w-full flex" style={{ maxWidth: '100%' }}>
            <div className="ml-5" style={{ width: '20px', flexShrink: 0, position: 'relative' }}>
                <img src="/path-to-image.png" alt="icon" style={{ width: '20px', height: '20px', position: 'absolute', top: '5px' }} />
            </div>
            <div className="flex flex-col justify-between" style={{ flexGrow: 1, flexBasis: 'calc(100% - 25px)', paddingLeft: '5px' }}>
                <div className="flex items-center" style={{ minHeight: '20px' }}>
                    <span>{role}</span>
                </div>
                <div style={{ padding: '5px', overflowWrap: 'break-word' }}>
                    <ReactMarkdown>{text}</ReactMarkdown>
                </div>
            </div>
        </div>
    );
};

export default Message;
