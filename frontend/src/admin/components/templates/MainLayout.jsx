import { Outlet } from 'react-router-dom'
import Sidebar from '../organisms/Sidebar'
import Navbar from '../organisms/Navbar'

const MainLayout = ({ children }) => (
  <div className="flex h-screen overflow-hidden bg-[#0a0a0a] text-[#ffffff]">
    <Sidebar />
    <div className="flex-1 flex flex-col overflow-hidden">
      <Navbar />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6">
        {children ?? <Outlet />}
      </main>
    </div>
  </div>
)

export default MainLayout
