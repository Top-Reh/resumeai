import React from 'react'
import { useState } from 'react' 
import './App.css'
import resumes from './data'
import ScoreCircle from './scorecircle'
import { useNavigate } from 'react-router-dom'

function Home() {

  const navigator = useNavigate();
  const handleGenerate = () => {
    navigator('/resumeform');
  };

  return (
    <section className=" flex flex-col gap-20 items-center justify-center w-full py-20">
      <div className='w-3/4 top-10 rounded-full bg-white flex justify-between align-middle items-center py-2 px-4 '>
        <h1 className='text-gray-600 font-extrabold text-xl'>RESUMIDIAI</h1>
        <button onClick={handleGenerate} className='bg-blue-500 text-white px-4 py-2 rounded-full font-bold cursor-pointer'>Generate Resume</button>
      </div>
      <div className='grid grid-cols-3 gap-8 w-5/6'>
          {
            resumes.map((resume, index) => (
              <div key={index} className="p-4 flex flex-col gap-2 bg-white rounded-lg shadow-md">
                <div className='flex justify-between items-center'>
                  <div>
                    <h2 className="text-2xl font-bold mb-2 text-black">{resume.name}</h2>
                    <p className="text-gray-600 text-xl font-bold">{resume.title}</p>
                  </div>
                  <ScoreCircle score={resume.score} />
                </div>
                  <div className='w-full h-60 bg-top bg-cover' style={{backgroundImage:`url(${resume.resumescreenshot})`}}></div>
              </div>
            ))
          }
      </div>
    </section>
  )
}

export default Home
