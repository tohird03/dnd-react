import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useLocalStorage } from 'usehooks-ts'
import { Button } from '../Button'
import { resetStores } from '../../store/stores'
import { ROUTES } from '../../constants/routes'
import './layout.scss'
import { observer } from 'mobx-react'
import { authStore } from '../../store/auth'

export const Layout = observer(() => {
  const navigate = useNavigate()
  const [, setAccessToken] = useLocalStorage<string>('accessToken', '');

  const handleLogout = () => {
    resetStores();
    setAccessToken('');
    navigate(ROUTES.signIn);
  }
  return (
    <>
      <header>
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="https://flowbite.com" className="flex items-center">
              <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Tasks</span>
            </a>
            <div className="flex items-center lg:order-2 gap-4">
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                {authStore?.thisuser?.fullname}
              </span>
              <Button text='Logout' onClick={handleLogout} />
            </div>
          </div>
        </nav>
      </header>
      <main>
        <div className='layout'>
          <Outlet />
        </div>
      </main>
    </>
  )
})
