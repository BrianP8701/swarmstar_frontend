import React, { useContext, useState } from 'react';

interface BottomAreaProps {
    onHeightChange: (height: number) => void;
}

class BottomArea extends React.Component<BottomAreaProps> {
    divRef = React.createRef<HTMLDivElement>();

    componentDidMount() {
        // Set the initial height of the bottom area to 40px
        const initialHeight = 40; // Default height in pixels
        if (this.divRef.current) {
            this.divRef.current.style.height = `${initialHeight}px`;
            this.props.onHeightChange(initialHeight);
        }
    }

    adjustTextAreaHeight = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = event.target;
        const maxLines = 7;
        const lineHeight = 20;

        textarea.style.height = 'auto';
        const newHeight = Math.min(textarea.scrollHeight, lineHeight * maxLines);
        textarea.style.height = `${newHeight}px`;

        if (this.divRef.current) {
            this.divRef.current.style.height = `${newHeight}px`;
            this.props.onHeightChange(newHeight);
        }
    };

    render() {
        return (
            <div
                ref={this.divRef}
                style={{
                    width: '80%',
                    margin: '0 auto',
                    borderRadius: '15px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.85)',
                    position: 'relative',
                }}
            >
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    borderRadius: '15px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}>
                    <div style={{ width: '40px', height: '40px', flexShrink: 0, }}>
                        <button
                            style={{
                                width: '30px',
                                height: '30px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'transparent',
                                border: 'none',
                                padding: '0',
                                cursor: 'pointer',
                                marginTop: '5px'
                            }}
                        >
                            <img
                                src={process.env.PUBLIC_URL + '/file.png'}
                                alt="Wimpy Baby"
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                }}
                            />
                        </button>
                    </div>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <textarea
                            onInput={this.adjustTextAreaHeight}
                            style={{
                                width: 'calc(100% - 20px)',
                                minHeight: '40px',
                                border: 'none',
                                resize: 'none',
                                background: 'transparent',
                                lineHeight: '20px',
                                padding: '0',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                outline: 'none',
                                color: 'white',
                            }}
                            placeholder="Message ONNO..."
                        />
                    </div>
                    <div style={{ width: '40px', height: '40px', flexShrink: 0, }}>
                        <button
                            style={{
                                width: '30px',
                                height: '30px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'transparent',
                                border: 'none',
                                padding: '0',
                                cursor: 'pointer',
                                marginTop: '5px'
                            }}
                        >
                            <img
                                src={process.env.PUBLIC_URL + '/play.png'}
                                alt="Wimpy Baby"
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                }}
                            />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default BottomArea;