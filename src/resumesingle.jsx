import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import ScoreCircle from './scorecircle';

const Resumesingle = () => {
    const { resumeId } = useParams();
    const navigator = useNavigate();
    const [loading,setLoading] = useState(false);
    const [data, setData] = useState({});
    

    useEffect(() => {
        async function fetchResume() {
            try {
                const res = await fetch(`https://resumeaibackend-pvvh.onrender.com/api/resume/${resumeId}`);
                if (!res.ok) throw new Error("Failed to fetch resume");
                const fetchedData = await res.json();
                setData(fetchedData);
            } catch (err) {
                console.error("Error fetching resume:", err);
            }
        }
        fetchResume();
    }, [resumeId]);

    if (!data || Object.keys(data).length === 0) {
        return <p>User data not found.</p>;
    }

    const handleRemove = async () => {
        setLoading(true);
        if (!data || Object.keys(data).length === 0) {
          alert("No data to delete");
          return;
        }
        if (window.confirm("Are you sure you want to delete this resume?")) {
          try {
            const res = await fetch(`https://resumeaibackend-pvvh.onrender.com/api/resume/delete/${data._id}`, {
              method: "DELETE",
            });
            if (!res.ok) {
              const err = await res.text();
              throw new Error(err || "Delete failed");
            }
            navigator('/');
          } catch (err) {
            console.error("Delete error:", err);
            alert("Delete failed");
          }
            setLoading(false);
            navigator('/');
        } else {
          // User clicked "No" (Cancel)
          console.log('Deletion cancelled.');
        }
        };

    const downloadResume = async (id) => {
      const res = await fetch(`https://resumeaibackend-pvvh.onrender.com/api/resume/download/${id}`);
      if (!res.ok) return alert("Download failed");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "resume.pdf";
      link.click();
      link.remove();
    };

    const handleSave = () => {
      navigator('/');
    }

  return (
    <section className='w-full flex justify-center items-center align-middle py-10 px-20 flex-col gap-10'>
          <a href='/' className='w-3/4 top-10 rounded-full bg-white flex justify-center align-middle items-center py-2 px-4 '>
            <h1 className='text-gray-600 font-extrabold text-xl'>RESUMIDIAI</h1>
          </a>
            <div className={`w-full border-2 border-gray-300 rounded-lg shadow-lg p-10 bg-white flex flex-col justify-start gap-5`}>
                  <div className='flex justify-between items-center'>
                    <div className='flex align-top justify-start items-start gap-5 w-full'> 
                      <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpd4mJRIUwqgE8D_Z2znANEbtiz4GhI4M8NQ&s' alt='userpfp' className={`rounded-full w-20 border-4 ${data.aisummary.score > 75 ? "border-green-300" : data.aisummary.score < 40 ?"border-red-300":"border-orange-300"} p-2`}></img>
                      <div>
                        <h1 className='text-2xl font-bold text-black'>{data.firstname} {data.lastname}</h1>
                        <p className='text-gray-600'>{data.jobtitle}</p>
                      </div>
                      <button onClick={() => downloadResume(data._id)} className='text-green-500 p-3 cursor-pointer'>Download Resume</button>
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
                  <div className='w-full flex justify-end items-center mt-10 gap-10'>
                    <button className=' text-red-400 border-red-400 border py-3 rounded-full font-bold cursor-pointer px-16' onClick={handleRemove}>Remove</button>
                    <button className='bg-blue-500 text-white py-3 rounded-full font-bold cursor-pointer px-20' onClick={handleSave}>Save</button>
                  </div>
            </div>
            
            {
              loading && (
                <div className='saveloader'>
                  <svg
                    className="pl"
                    width="240"
                    height="240"
                    viewBox="0 0 240 240"
                  >
                    <circle
                      className="pl__ring pl__ring--a"
                      cx="120"
                      cy="120"
                      r="105"
                      fill="none"
                      stroke="#000"
                      strokeWidth="20"
                      strokeDasharray="0 660"
                      strokeDashoffset="-330"
                      strokeLinecap="round"
                    />
                    <circle
                      className="pl__ring pl__ring--b"
                      cx="120"
                      cy="120"
                      r="35"
                      fill="none"
                      stroke="#000"
                      strokeWidth="20"
                      strokeDasharray="0 220"
                      strokeDashoffset="-110"
                      strokeLinecap="round"
                    />
                    <circle
                      className="pl__ring pl__ring--c"
                      cx="85"
                      cy="120"
                      r="70"
                      fill="none"
                      stroke="#000"
                      strokeWidth="20"
                      strokeDasharray="0 440"
                      strokeLinecap="round"
                    />
                    <circle
                      className="pl__ring pl__ring--d"
                      cx="155"
                      cy="120"
                      r="70"
                      fill="none"
                      stroke="#000"
                      strokeWidth="20"
                      strokeDasharray="0 440"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              )
            }
        </section>
  )
}

export default Resumesingle