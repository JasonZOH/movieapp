import React, { useEffect, useState } from 'react'
import BannerHome from '../components/BannerHome';
import { useSelector } from 'react-redux';
import HorizontalScrollCard from '../components/HorizontalScrollCard';
import useFetch from '../hooks/useFetch';

const Home = () => {
  const trendingMovie = useSelector((state) => state.movieData.bannerData);
  const { data :nowPlayingData } = useFetch("/movie/now_playing");
  const { data :topRatedData } = useFetch("/movie/top_rated");
  const { data :popularTvShowData } = useFetch("/tv/popular");
  const { data :onTheAirShowData } = useFetch("/tv/on_the_air");
  return (
    <div>
      <BannerHome />

      <HorizontalScrollCard heading={"Trending"} data={trendingMovie} trending={true}/>
      <HorizontalScrollCard heading={"Now Playing"} data={nowPlayingData} media_type={"movie"}/>
      <HorizontalScrollCard heading={"Top Rated"} data={topRatedData} media_type={"movie"}/>
      <HorizontalScrollCard heading={"Popular TV Show"} data={popularTvShowData} media_type={"tv"}/>
      <HorizontalScrollCard heading={"On The Air"} data={onTheAirShowData} media_type={"tv"}/>
    </div>
  );
}

export default Home