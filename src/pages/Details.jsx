import React from 'react'
import { useParams } from 'react-router-dom'
import useFetchDetails from '../hooks/useFetchDetails';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Divider from '../components/Divider';
import HorizontalScrollCard from '../components/HorizontalScrollCard';
import useFetch from '../hooks/useFetch';

const Details = () => {
  const params = useParams();
  const { data : detailsData } = useFetchDetails(`/${params?.explore}/${params?.id}`);
  const { data : detailsCreditData } = useFetchDetails(`/${params?.explore}/${params?.id}/credits`);
  const { data : similarData } = useFetch(`/${params?.explore}/${params?.id}/similar`);
  const { data : recommendedData} = useFetch(`/${params?.explore}/${params?.id}/recommendations`);
  const imageUrl = useSelector((state) => state.movieData.imageUrl);

  const duration = Number(detailsData.runtime/60).toFixed(1).split(".");
  console.log(similarData);
  return (
    <div>
      <div className='w-full h-[450px] relative hidden lg:block'>
        <div className='w-full h-full'>
          <img 
            src={imageUrl+detailsData.backdrop_path} 
            className='h-full w-full object-cover'
          />
        </div>
        <div className='absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900 to-transparent'>

        </div>
      </div>

      <div className='container mx-auto px-4 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10'>
        <div className='relative mx-auto lg:-mt-28 lg:mx-0  w-fit min-w-60'>
          <img 
            src={imageUrl+detailsData.poster_path} 
            className='h-80 w-60 object-cover rounded'
          />
        </div>

        <div>
          <h2 className='text-2xl lg:text-4xl font-bold text-white'>{detailsData.title || detailsData.name}</h2>
          <p className='text-neutral-400 '>{detailsData.tagline}</p>

          <Divider />
          <div className='flex items-center my-2 justify-between text-center'>
            <p>
              Rating : {Number(detailsData.vote_average).toFixed(1)}+
            </p>
            <span>|</span>
            <p>
              View : {Number(detailsData.vote_count).toFixed(1)}
            </p>
            <span>|</span>
            <p>
              Duration : {duration[0]}h {duration[1]}m
            </p>
          </div>
          <Divider />

          <div>
            <h3 className='text-xl font-bold text-white mb-2'>Overview</h3>
            <p>{detailsData.overview}</p>

            <Divider />
            <div className='flex items-center gap-3 justify-between text-center'>
              <p>Status : {detailsData.status}</p>
              <span>|</span>
              <p>Release Date : {moment(detailsData.release_date).format("MMMM YYYY")}</p>
              <span>|</span>
              <p>Revenue: {Number(detailsData.revenue)}</p>
            </div>

            <Divider />
          </div>

          <div>
            <p> <span className='text-white'>Director :</span> {detailsCreditData?.crew?.find(e => e.job == "Director")?.name}</p>
            <p><span className='text-white'>Producer : </span> {detailsCreditData?.crew?.find(e => e.job == "Producer")?.name}</p>
          </div>

          <Divider />
          <h2 className='font-bold text-lg'>Cast :</h2>
          <div className='grid grid-cols-[repeat(auto-fit,_minmax(96px,_1fr))] gap-6'>
            {
              detailsCreditData?.cast?.filter(e => e?.profile_path !== null)?.map((cast, index) => {
                return (
                  <div key={index} className='mx-auto'>
                    <div>
                      <img 
                        src={imageUrl+cast?.profile_path} 
                        className='w-24 h-24 object-cover rounded-full'
                      />
                    </div>
                    <div className='font-bold text-center text-sm'>{cast?.name}</div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>

      <div>
        <HorizontalScrollCard media_type={params?.explore} data={similarData} heading={"Similar " + params?.explore} />
        <HorizontalScrollCard media_type={params?.explore} data={recommendedData} heading={"Recommended " + params?.explore} />
      </div>
    </div>
  )
}

export default Details