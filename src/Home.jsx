import React, { useEffect } from 'react'
import { useState } from 'react' 
import './App.css'
import ScoreCircle from './scorecircle'
import { Link, useNavigate } from 'react-router-dom'

function Home() {
  const [resumedata, setResumesdata] = useState([]);
  const navigator = useNavigate();
  const handleGenerate = () => {
    navigator('/resumeform');
  };

  useEffect(() => {
    async function loadResumes() {
      try {
        const res = await fetch("https://resumeaibackend-pvvh.onrender.com/api/resume");
        if (!res.ok) throw new Error("Failed to fetch resumes");
        const data = await res.json();
        setResumesdata(data);
      } catch (err) {
        console.error("Error fetching resumes:", err);
      }
    }

    loadResumes();
  }, []);

  return (
    <section className=" flex flex-col gap-20 items-center justify-center w-full py-20">
      <div className='w-3/4 top-10 rounded-full bg-white flex justify-between align-middle items-center py-2 px-4 '>
        <h1 className='text-gray-600 font-extrabold text-xl'>RESUMIDIAI</h1>
        <button onClick={handleGenerate} className='bg-blue-500 text-white px-4 py-2 rounded-full font-bold cursor-pointer'>Generate Resume</button>
      </div>
      <div className='grid grid-cols-3 gap-8 w-5/6'>
          {
            resumedata.map((resume, index) => (
              <Link to={`/resumesingle/${resume._id}`} key={index} className="p-4 flex flex-col gap-2 bg-white rounded-lg shadow-md">
                <div className='flex justify-between items-center'>
                  <div>
                    <h2 className="text-2xl font-bold mb-2 text-black">{resume.firstname} {resume.lastname}</h2>
                    <p className="text-gray-600 text-xl font-bold">{resume.jobtitle}</p>
                  </div>
                  <ScoreCircle score={resume.aisummary.score} />
                </div>
                  <div className='flex flex-wrap gap-2 '>
                    <div className=''>
                      <h3 className="text-lg font-semibold mt-4 text-green-600">Key Skills</h3>
                      {resume.aisummary.skills.slice(0,4).map((skill, skillIndex) => (
                        <span key={skillIndex} className="text-green-500 text-center font-bold text-sm"> {skill} ,</span>
                      ))}
                      <span className='text-green-500 text-center font-bold text-sm ml-1'>. . . .</span>
                    </div>
                    <div className=''>
                      <h3 className="text-lg font-semibold mt-4 text-green-800">Professional Summary</h3>
                      {
                        resume.aisummary.strengths.slice(0,1).map((strength, strengthIndex) => (
                          <p key={strengthIndex} className="text-green-800 font-bold text-sm"> - {strength} ,</p>
                        ))
                      }
                      <span className='text-green-800 text-center font-bold text-sm ml-1'>. . . .</span>
                    </div>
                    <div className=''>
                      <h3 className="text-lg font-semibold mt-4 text-blue-800">Suggestions</h3>
                      {
                        resume.aisummary.suggestions.slice(0,1).map((suggestions, suggestionsIndex) => (
                          <p key={suggestionsIndex} className="text-blue-800 font-bold text-sm"> - {suggestions} ,</p>
                        ))
                      }
                      <span className='text-blue-800 text-center font-bold text-sm ml-1'>. . . .</span>
                    </div>
                  </div>
              </Link>
            ))
          }
      </div>
    </section>
  )
}

export default Home
