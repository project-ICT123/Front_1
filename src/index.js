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
import QuestionMajor from './page/major_recommand/questionMajor';
import QuestionPersonal from './page/personal_test/questionPersonal';
import MajorRecommand from './page/major_recommand/majorRecommand';
import Navbar from './asset/Navbar';
import StartQuiz  from './page/quiz_component/startQuiz';
import SeeResult from './page/quiz_component/seeresult';
import Result  from './page/quiz_component/result';

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
          
          {/* Test Routes */}
          <Route path="/personality_test" element={<Personal />} />
          <Route path="/major_test" element={<MajorRecommand />} />
          <Route path="/major_test/view_result/result/more_major_that_fit_you" element={<Moremajor />} />


          {/* Question Routes */}
          <Route path="/personal_test/all_question/personality" element={<QuestionPersonal />} />
          <Route path="/major_test/all_question/major/:userTestId" element={<QuestionMajor />} />
          <Route path="/major_test/view_result" element={<SeeResult />} />
          <Route path="/major_test/view_result/result" element={<Result />} />


          <Route path="/all_question/:typeqcm" element={<StartQuiz />} />
          
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);