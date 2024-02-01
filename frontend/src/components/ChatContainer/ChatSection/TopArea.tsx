import React from 'react';

const TopArea = ({ bottomAreaHeight }: { bottomAreaHeight: number }) => {
    const topAreaHeight = `calc(100% - ${bottomAreaHeight}px)`;
    // The component might use the bottomAreaHeight prop to adjust its own styling or behavior
    return (
        <div style={{
            height: topAreaHeight,
            flex: 1, // Adjusts as the text area grows
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '15px 15px 0 0',
            boxShadow: 'inset 0px 0px 20px 0px rgba(0,0,0,0.85)',
        }}>
            {/* Top area content */}
        </div>
    );
}

export default TopArea;