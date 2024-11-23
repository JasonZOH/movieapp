import React from 'react'
import { mobileNavigation } from '../constants/navigation'
import { NavLink } from 'react-router-dom'

const MobileNavigation = () => {
  
  return (
    <section className='lg:hidden h-14 bg-black bg-opacity-80 backdrop-blur-2xl fixed bottom-0 w-full z-40'>
      <div className='flex items-center justify-between h-full text-neutral-400'>
        {
          mobileNavigation.map((mnav, index) => {
            return(
              <NavLink 
                key={mnav.label+"mobilenavigation"}
                to={mnav.href}
                className={({isActive}) => `px-4  flex h-full items-center flex-col justify-center ${isActive && "text-white"}`}
              >
                <div className='text-2xl'>
                  {mnav.icon}
                </div>
                <p className='text-sm'>{mnav.label}</p>
              </NavLink>
            )
          })
        }
      </div>
    </section>
  )
}

export default MobileNavigation