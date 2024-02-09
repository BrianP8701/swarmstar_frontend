import React from 'react';

interface MessageProps {
    text: string;
    role: string;
}

const Message: React.FC<MessageProps> = ({ text, role }) => {
    return (
        <div className="w-full flex">
            <div className="ml-5 " style={{ width: '20px', position: 'relative' }}>
                <img src="/path-to-image.png" alt="icon" style={{ width: '20px', height: '20px', position: 'absolute', top: '5px' }} />
            </div>
            <div className="flex flex-col justify-between" style={{ flexGrow: 1 }}>
                <div className="flex items-center" style={{ paddingLeft: '5px', minHeight: '20px' }}>
                    <span>{role}</span>
                </div>
                <div style={{ padding: '5px' }}>
                    <span>{text}</span>
                </div>
            </div>
        </div>
    );
};

export default Message;