import { useContext } from 'react';
import { GlobalContext } from '@configs/GlobalContext';

const Sidebar = () => {
  const { setUser } = useContext(GlobalContext);

  const setUserCurrentSection = (section: string) => {
    setUser((prev) => {
      return { ...prev, currentSection: section };
    });
  };

  return (
    <div style={{ width: '40px', height: '100vh', backgroundColor: '#202123', position: 'fixed', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '50px', height: '50px', marginBottom: '30px', backgroundImage: 'url(' + process.env.PUBLIC_URL + '/WimpyBaby.png)', background: 'transparent22' }}></div>
      <button style={{ marginTop: '7.5px', marginBottom: '7.5px', background: 'transparent', width: '30px', height: '30px', padding: '0', border: 'none', backgroundImage: 'url(' + process.env.PUBLIC_URL + '/play.png)', backgroundSize: 'cover', backgroundPosition: 'center' }} onClick={() => setUserCurrentSection('Spawn')}></button>
      <button style={{ marginTop: '7.5px', marginBottom: '7.5px', background: 'transparent', width: '30px', height: '30px', padding: '0', border: 'none', backgroundImage: 'url(' + process.env.PUBLIC_URL + '/chat.png)', backgroundSize: 'cover', backgroundPosition: 'center' }} onClick={() => setUserCurrentSection('Chat')}></button>
      <button style={{ marginTop: '7.5px', marginBottom: '7.5px', background: 'transparent', width: '30px', height: '30px', padding: '0', border: 'none', backgroundImage: 'url(' + process.env.PUBLIC_URL + '/metrics.png)', backgroundSize: 'cover', backgroundPosition: 'center' }} onClick={() => setUserCurrentSection('Metrics')}></button>
      <button style={{ marginTop: '7.5px', marginBottom: '7.5px', background: 'transparent', width: '30px', height: '30px', padding: '0', border: 'none', backgroundImage: 'url(' + process.env.PUBLIC_URL + '/bug.png)', backgroundSize: 'cover', backgroundPosition: 'center' }} onClick={() => setUserCurrentSection('Debugging')}></button>
    </div>
  );
};

export default Sidebar;
