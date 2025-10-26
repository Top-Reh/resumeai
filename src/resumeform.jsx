import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResumeForm = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alldata, setAlldata] = useState({firstname: "", lastname: "", jobtitle: "",email:"",phonenumber:"",aisummary:"",pdffile:[]});
    const navigator = useNavigate();
    const handleprevious = () => {
        navigator('/');
    };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a resume file first!");
      return;
    }
    console.log(file);
    setAlldata({...alldata, pdffile: file});
    console.log('file path:', file.path);
    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);
      console.log('loading');
      // const res = await axios.post(
      //   "http://localhost:5000/api/resume/upload",
      //   formData,
      //   {
      //     // DO NOT set Content-Type here; let the browser include the boundary.
      //     // headers: { "Content-Type": "multipart/form-data" },
      //   }
      // );

      const res = await fetch("http://localhost:5000/api/resume/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      console.log("Upload successful:", res);
      console.log("message", data.message);
      console.log("filename", data.fileName);
      console.log("aiSummary", data.aiSummary);
      // let aiSummaryObject;
      // if (typeof data.aiSummary === "string") {
      //   try {
      //     aiSummaryObject = JSON.parse(data.aiSummary);
      //   } catch {
      //     aiSummaryObject = data.aiSummary; // fallback if not valid JSON
      //   }
      // } else {
      //   aiSummaryObject = data.aiSummary;
      // }
          console.log("Parsed aiSummary:", data.aiSummary);
          console.log("Score:", data.aiSummary.score);
          console.log("Skills:", data.aiSummary.skills);
          console.log("Strengths:", data.aiSummary.strengths);

      const newData = { ...alldata, aisummary: data.aiSummary };
      setAlldata(newData);
      console.log(newData);
      navigator('/resumeresult', { state: { alldata: newData } });
    } catch (error) {
      console.error("Error uploading:", error);
      alert("Upload failed. Check console for details.");
    } finally {
      console.log('loading done');
      setLoading(false);
    }
  };
  return (
    <div className="p-10 flex flex-col gap-6 items-center justify-center w-full">
      <div className='w-3/4 top-10 rounded-full bg-white flex justify-center align-middle items-center py-2 px-4 '>
        <h1 className='text-gray-600 font-extrabold text-xl'>RESUMIDIAI</h1>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-10 w-full">
        <InputField id="firstName" label="First name" placeholder="First name" value={alldata.firstname} onChange={e=>setAlldata({...alldata,firstname:e.target.value})}/>
        <InputField id="lastName" label="Last name" placeholder="Last name" value={alldata.lastname} onChange={e=>setAlldata({...alldata,lastname:e.target.value})}/>
        <InputField id="jobTitle" label="Job title" placeholder="Job title" value={alldata.jobtitle} onChange={e=>setAlldata({...alldata,jobtitle:e.target.value})}/>
        <InputField id="email" label="E-mail" placeholder="E-mail" value={alldata.email} onChange={e=>setAlldata({...alldata,email:e.target.value})}/>
        <InputField id="phone" label="Phone" placeholder="Phone" type="phone" value={alldata.phonenumber} onChange={e=>setAlldata({...alldata,phonenumber:e.target.value})}/>
      </div>
      <div className='bg-white py-3 flex align-middle justify-center rounded-[8px] w-full'>
        <input type="file" id="fileInput" className='text-black' onChange={(e) => setFile(e.target.files[0])} />
      </div>
      <div className='w-full flex justify-between align-middle'>
        <button
          className="w-fit rounded-lg cursor-pointer text-sm px-5 py-2 focus:outline-none h-[50px] border bg-violet-500 hover:bg-violet-600 focus:bg-violet-700 border-violet-500-violet- text-white focus:ring-4 focus:ring-violet-200 hover:ring-4 hover:ring-violet-100 transition-all duration-300"
          type="button"
          onClick={handleprevious} 
        >
          <div className="flex gap-2 items-center">Previous</div>
        </button>
      <div className="sm:flex sm:flex-row-reverse flex gap-4">
        <button
          className="w-fit cursor-pointer rounded-lg text-sm px-5 py-2 focus:outline-none h-[50px] border bg-violet-500 hover:bg-violet-600 focus:bg-violet-700 border-violet-500-violet- text-white focus:ring-4 focus:ring-violet-200 hover:ring-4 hover:ring-violet-100 transition-all duration-300"
          type="button"
        >
          <div className="flex gap-2 items-center" onClick={handleUpload}>Save changes</div>
        </button>
        <button
          className="bg-white cursor-pointer w-fit rounded-lg text-sm px-5 py-2 focus:outline-none h-[50px] border border-primary text-primary focus:ring-4 focus:ring-gray-100 text-black"
          type="button"
        >
          Cancel
        </button>
      </div>
      </div>
      {
        loading && <div className="loadingbg fixed h-full w-full inset-0 flex items-center justify-center z-50 transition-all duration-300 ease-in-out">
            <div id="loadingpage">
              <div id="loadingcontainer">
                  <div id="loadingring"></div>
                  <div id="loadingring"></div>
                  <div id="loadingring"></div>
                  <div id="loadingring"></div>
                  <div id="loadingh3">Generating</div>
              </div>
            </div>
          </div>
          
      }
    </div>
  );
};

// Reusable InputField component
const InputField = ({ id, label, placeholder, type = "text", disabled = false,value,onChange }) => {
  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        className="block w-full text-sm h-[50px] px-4 text-slate-900 bg-white rounded-[8px] border border-violet-200 appearance-none focus:border-transparent focus:outline focus:outline-2 focus:outline-primary focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px]"
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={onChange}
      />
      <label
        htmlFor={id}
        className="text-gray-500 peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] disabled:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
      >
        {label}
      </label>
    </div>
  );
};

export default ResumeForm;