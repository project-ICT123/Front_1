// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import App from './App';
import Login from './auth/login';
import Signup from './auth/signup';
import ProfilePage from './page/User/account';
import Personal from './page/personal_test/personal';
import Question from './page/quiz_component/question';
import MajorRecommand from './page/major_recommand/majorRecommand';
import Navbar from './asset/Navbar';
import SeeResult from './page/quiz_component/seeresult';
import Result  from './page/major_recommand/result';
import Results  from './page/personal_test/result';


import Moremajor from './page/major_recommand/moremajor';

// Wrapper component to conditionally render Navbar
const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/signup'];

  return (
    <div className="text-center text-blue flex flex-col min-h-screen">
      {!hideNavbarRoutes.includes(location.pathname) && (
        <header className="flex-shrink-0 sticky top-0 z-50">
          <Navbar />
        </header>
      )}
      
      <main className="flex-grow bg-bgcolor">
        {children}
      </main>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/youracc" element={<ProfilePage />} />
          
          {/* Major Test Routes */}
          <Route path="/major_test" element={<MajorRecommand />} />
          <Route path="/major_test/all_question/major/:userTestId" element={<Question />} />
          <Route path="/major_test/view_result" element={<SeeResult />} />
          <Route path="/major_test/view_result/result" element={<Result />} />
          <Route path="/major_test/view_result/result/more_major_that_fit_you" element={<Moremajor />} />

          {/* Personal Test Routes */}
          <Route path="/personality_test" element={<Personal />} />
          <Route path="/personal_test/all_question/personality/:userTestId" element={<Question />} />
          <Route path="/personal_test/view_result" element={<SeeResult />} />
          <Route path="/personal_test/view_result/result" element={<Results />} />

        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);