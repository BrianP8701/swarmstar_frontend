import React from 'react';

const Section1 = () => {
    return <div>Section 1 content</div>;
  };
  
const Section2 = () => {
return <div>Section 2 content</div>;
};

interface MainProps {
    currentSection: string;
}
  
const Main = ({ currentSection }: MainProps) => {
return (
    <div style={{ flex: 1, height: '100vh', backgroundColor: '#242424', marginLeft: '40px' }}>
    {currentSection === 'Section1' && <Section1 />}
    {currentSection === 'Section2' && <Section2 />}
    {/* Add more conditions for more sections */}
    </div>
);
};

export default Main;