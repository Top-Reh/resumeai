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
    <section className='w-full h-full grid grid-cols-2 justify-center items-center align-middle py-10 px-20'>
        <div className='flex align-middle justify-center'>
          <img src='https://marketplace.canva.com/EAGIzZzlHCg/3/0/1131w/canva-blue-and-gray-simple-professional-cv-resume-krkiJPv9338.jpg' alt='resumephoto' className='w-4/6'></img>
        </div>
        <div className='w-full h-full border-2 border-gray-300 rounded-lg shadow-lg p-10 bg-white'>
            <div className='flex justify-between items-center'>
              <div className='flex align-middle justify-start items-center gap-5 w-full'> 
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpd4mJRIUwqgE8D_Z2znANEbtiz4GhI4M8NQ&s' alt='userpfp' className='rounded-full w-20 border-4 border-gray-200 p-2'></img>
                <div>
                  <h1 className='text-2xl font-bold text-black'>{data.firstname} {data.lastname}</h1>
                  <p className='text-gray-600'>{data.jobtitle}</p>
                </div>
              </div>
              <div className='w-full items-end justify-end flex'>
                <ScoreCircle score={86} />
              </div>
            </div>
            <h1 className='text-3xl font-bold text-center mt-20 text-black'>Resume Result</h1>
            <p className='text-center mt-10 text-black'>Your resume has been successfully generated!</p>
            <div className='flex justify-center mt-5'>
                <a href="/path/to/generated_resume.pdf" download className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>Download Resume</a>
            </div>
        </div>
    </section>
  )
}

export default Resumeresult