import { useContext, useState } from 'react';
import { GlobalContext } from '@configs/GlobalContext';
import BottomArea from '@components/ChatContainer/ChatSection/BottomArea';
import TopArea from '@components/ChatContainer/ChatSection/TopArea';

const ChatSection = () => {
  const { agents } = useContext(GlobalContext);
  const [bottomAreaHeight, setBottomAreaHeight] = useState(40);

  if (!agents.currentAgent) {
    return <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '90%',
      width: '90%',
      borderRadius: '15px',
      boxShadow: 'inset 0px 0px 20px 0px rgba(0,0,0,0.85), 0px 0px 20px 0px rgba(0,0,0,0.85)',
      color: 'white',
    }}>

    </div>;
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex',
      height: '90%',
      width: '90%',
      borderRadius: '15px',
      boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.85)',
    }}>
      <TopArea bottomAreaHeight={bottomAreaHeight} />
      <BottomArea onHeightChange={setBottomAreaHeight} />
    </div>
  );
};

export default ChatSection;

