import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
      <div className='flex min-h-screen'>
          {/* <Sidebar/> */}
          <div className='flex flex-col flex-1'>
              <Navbar/>
              <main className='bg-gray-50 flex-1'>
                  <Outlet/>
              </main>
          </div>
    </div>
  )
}

export default Layout