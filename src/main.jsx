import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './Home.jsx';
import ResumeForm from './resumeform.jsx';
import Resumeresult from './resumeresult.jsx';
import Resumesingle from './resumesingle.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resumeform" element={<ResumeForm />} />
        <Route path="/resumeresult" element={<Resumeresult />} />
        <Route path="/resumesingle/:resumeId" element={<Resumesingle />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

