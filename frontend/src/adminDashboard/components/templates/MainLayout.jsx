import React from 'react'
import Sidebar from '../organisms/Sidebar'
import Navbar from '../organisms/Navbar'

import { useApp } from '../../context/AppContext'

const MainLayout = ({ children }) => {
  const { loading, error } = useApp()

  return (
    <div className="flex h-screen overflow-hidden bg-cinema-bg font-body text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          {error && (
            <div className="mb-4 rounded-lg border border-red-900/50 bg-red-900/20 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}
          {loading ? (
            <div className="text-cinema-muted text-sm">Loading...</div>
          ) : children}
        </main>
      </div>
    </div>
  )
}

export default MainLayout
