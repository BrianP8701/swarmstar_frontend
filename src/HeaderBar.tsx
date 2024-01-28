import React, { useContext } from 'react';
import { GlobalContext } from './GlobalContext';

const HeaderBar = () => {
  const context = useContext(GlobalContext);
  const { isRunning } = context;

  return (
    <div style={{ height: '50px', backgroundColor: '#000000', position: 'fixed', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', marginLeft: '40px', width: 'calc(100vw - 80px)' }}>
      <div>Logo</div>
      <div>Swarm is {isRunning ? 'running' : 'not running'}</div>
    </div>
  );
};

export default HeaderBar;