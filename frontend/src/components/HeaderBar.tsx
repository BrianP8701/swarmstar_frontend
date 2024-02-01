import { useContext } from 'react';
import { GlobalContext } from '@configs/GlobalContext';

const HeaderBar = () => {
  const context = useContext(GlobalContext);
  const { user } = context;
  const isRunning = user.isRunning;

  return (
    <div style={{ height: '50px', width: '100%', backgroundColor: '#202123', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '10px' }}>
      <div>{isRunning ? 'Running' : 'Not running'}</div>
    </div>
  );
};

export default HeaderBar;