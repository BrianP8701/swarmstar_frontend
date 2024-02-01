import React, { useContext } from 'react';
import { GlobalContext } from 'GlobalContext';

const HeaderBar = () => {
  const context = useContext(GlobalContext);
  const { isRunning } = context;

  return (
    <div style={{ height: '50px', width: '100%', backgroundColor: '#202123', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '10px' }}>
      <div>{isRunning ? 'Running' : 'Not running'}</div>
    </div>
  );
};

export default HeaderBar;