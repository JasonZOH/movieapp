import React, { useEffect, useState } from 'react'
import logo from './../assets/Logo.png';
import userIcon from './../assets/User.png';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { IoSearchSharp } from "react-icons/io5";
import { navigation } from '../constants/navigation';

const Header = () => {
  const location = useLocation();
  const [searchInput, setSearchInput] = useState(location?.search?.slice(8)?.split("%20")?.join(" "));
  const navigate = useNavigate();
  

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleSearch = () => {
    navigate(`/search?params=${searchInput}`);
  }

  useEffect(()=>{
    if(searchInput)
        navigate(`/search?params=${searchInput}`);
  }, [searchInput]);

  return (
    <header className='fixed top-0 w-full h-16 px-2 bg-black bg-opacity-75 z-40'>
      <div className='container mx-auto px-1 flex items-center h-full'>
        <Link to={"/"}>
          <img
            src={logo} 
            alt="logo" 
            width={120}
          />
        </Link>

        <nav className='hidden lg:flex items-center gap-1 ml-4'>
          {
            navigation.map((nav, index) =>{
              return(
                <div key={index}>
                  <NavLink 
                    key={nav.label} 
                    to={nav.href}
                    className={({isActive})=>`px-3 hover:text-neutral-100 ${isActive && "text-neutral-100"}`}
                  >
                    {nav.label}
                  </NavLink>
                </div>
              )
            })
          }
        </nav>

        <div className='ml-auto flex items-center gap-5'>
          <form 
            className='flex items-center gap-3'
            onSubmit={handleSubmit}
          >
            <input 
              type='text'
              placeholder='Search Here...'
              className='bg-transparent px-4 py-1 outline-none border-collapse hidden lg:block'
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
            <button className='text-2xl text-white' onClick={handleSearch}>
              <IoSearchSharp />
            </button>
          </form>
          <div className='w-8 h-8 cursor-pointer active:scale-50 transition-all'>
            <img
              src={userIcon}
              className='w-full h-full'
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header