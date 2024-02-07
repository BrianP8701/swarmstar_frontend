// components/Layout.tsx
import Sidebar from '@components/Sidebar';
import Headerbar from '@components/Headerbar';

const Layout = ({ children }) => (
  <div>
    <Sidebar />
    <Headerbar />
    <main>{children}</main> {/* Page-specific content will be rendered here */}
  </div>
);

export default Layout;
