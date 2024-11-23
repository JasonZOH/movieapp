import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Card from '../components/Card';

const Explore = () => {
  const params =  useParams();
  const [pageNumber, setPageNumber] = useState(1);
  const [data, setData] = useState([]);
  const [totalPageNum, setTotalPageNum] = useState(0);

  const fetchData = async() => {
    try {
      const response = await axios.get(`/discover/${params.explore}`, {
        params : {
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

  useEffect(()=> {
    fetchData();
  }, [pageNumber]);

  useEffect(()=>{
    setPageNumber(1);
    setData([]);
    fetchData();
  },[params.explore]);

  useEffect(()=> {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className='py-16 '>
      <div className='container mx-auto'>
        <h3 className='capitalize text-lg lg:text-xl font-semibold my-3 text-center'>Popular {params.explore} show</h3>

        <div className='grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start'>
          {
            data.map((exploreData, index) => {
              return(
                <Card data={exploreData} key={index} media_type={params.explore}/>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default Explore