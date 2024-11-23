import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Card from '../components/Card';
import { useSelector } from 'react-redux';

const Search = () => {
  const location = useLocation();
  const bannerData = useSelector((state) => state.movieData.bannerData);
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPageNum, setTotalPageNum] = useState(0);
  const navigate = useNavigate();

  console.log(location.search?.slice(8));
  const fetchData = async() => {
    try {
      const response = await axios.get(`/search/multi`, {
        params : {
          query : location.search?.slice(8),
          page : pageNumber
        }
      });
      setData((preve) => {
        return[
          ...preve,
          ...response.data.results
        ]
      });
      setTotalPageNum(response.data.total_pages);
    } catch (error) {
      console.log("error", error);
    }
  }

  const handleScroll = () => {
    if((Math.round(window.innerHeight + window.scrollY)) >= document.body.offsetHeight){
      setPageNumber(preve => preve + 1);
    }
  }

  useEffect(()=>{
    setPageNumber(1);
    setData([]);
    fetchData();
  },[location?.search]);

  useEffect(()=> {
    fetchData();
  }, [pageNumber]);

  useEffect(()=> {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className='py-16'>
      <div className='lg:hidden my-2 mx-1 sticky top-[70px] z-30'>
        <input 
          type="text" 
          placeholder='Search here...'
          onChange={(e) => navigate(`/search?params=${e.target.value}`)}
          className='px-4 py-1 text-lg w-full bg-white rounded-full text-neutral-900'
        />
      </div>
      <div className='container mx-auto'>
        <h3 className='capitalize text-lg lg:text-xl font-semibold my-3'>Search Results</h3>
        <div className='grid grid-cols-[repeat(auto-fit,230px)] gap-4 justify-center lg:justify-start px-4'>
          {
            location.search?.slice(8) ? 
            (
              data.map((searchData, index) => {
                return(
                  <Card data={searchData} key={index} media_type={searchData.media_type}/>
                )
              })
            ) : (
              <div>
                <h2 className='text-lg text-white font-bold py-2'>Popular Movie/TV</h2>
                <div>
                  {
                    bannerData.map((trending, index) => {
                      return (
                        <div className='py-2'>
                          <Card data={trending} key={index} />
                        </div>
                        
                      )
                    })
                  }
                </div>
              </div>
              
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Search