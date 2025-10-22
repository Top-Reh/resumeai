import React from 'react'
import ScoreCircle from './scorecircle'
import { useLocation } from 'react-router-dom';

const Resumeresult = () => {
  const location = useLocation();
  const data = location.state?.alldata || {};
  if (!data || Object.keys(data).length === 0) {
    return <p>User data not found.</p>;
  }

  return (
    <section className='w-full flex justify-center items-center align-middle py-10 px-20'>
        <div className={`w-full border-2 border-gray-300 rounded-lg shadow-lg p-10 bg-white flex flex-col justify-start gap-5`}>
              <div className='flex justify-between items-center'>
                <div className='flex align-middle justify-start items-center gap-5 w-full'> 
                  <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpd4mJRIUwqgE8D_Z2znANEbtiz4GhI4M8NQ&s' alt='userpfp' className={`rounded-full w-20 border-4 ${data.aisummary.score > 75 ? "border-green-300" : data.aisummary.score < 40 ?"border-red-300":"border-orange-300"} p-2`}></img>
                  <div>
                    <h1 className='text-2xl font-bold text-black'>{data.firstname} {data.lastname}</h1>
                    <p className='text-gray-600'>{data.jobtitle}</p>
                  </div>
                </div>
                <div className='w-1/2 items-end justify-end flex '>
                  <ScoreCircle score={data.aisummary.score} />
                </div>
              </div>
              <div className='flex gap-10'>
                <div className='grid grid-cols-3 gap-3'>
                  <h1 className='text-xl font-bold col-span-3 text-green-600'>Key Skills</h1>
                  {data.aisummary.skills && data.aisummary.skills.map((skill, index) => (
                    <h1 key={index} className='bg-green-400 text-center py-2 px-4 font-bold rounded-2xl text-sm'>{skill}</h1>
                  ))}
                </div>
                <div className='flex flex-col justify-start gap-5'>
                  <div className='flex flex-col gap-3'>
                    <h1 className='text-xl font-bold text-green-800'>Professional Summary</h1>
                    {
                      data.aisummary.strengths && data.aisummary.strengths.map((strengths, index) => (
                        <p key={index} className='text-green-800 text-sm'>- {strengths}</p>
                      ))
                    }
                  </div>
                  <div className='flex flex-col gap-3'>
                    <h1 className='text-xl font-bold text-blue-800'>Suggestions</h1>
                    {
                      data.aisummary.suggestions && data.aisummary.suggestions.map((suggestion, index) => (
                        <p key={index} className='text-blue-800 text-sm'>- {suggestion}</p>
                      ))
                    }
                  </div>
                </div>
              </div>
              <div className='w-full flex justify-end items-center mt-10'>
                <button className='bg-blue-500 text-white px-4 py-3 rounded-full font-bold cursor-pointer px-20'>Save</button>
              </div>
        </div>
    </section>
  )
}

export default Resumeresult