import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
const  Home = lazy(() => import( './components/home/Home'));
const  Register = lazy(() => import( './components/register/Register'));
const  Login = lazy(() => import( './components/login/Login'));
const  ConfirmRegister = lazy(() => import( './components/register/ConfirmRegister'));
const  ConfirmPassword = lazy(() => import( './components/login/ConfirmPassword'));
function App() {
  return (
    <Router>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="octoprint/" element={<Home />} />
            <Route path="octoprint/register" element={<Register />} />
            <Route path="octoprint/login" element={<Login />} />
            <Route path="octoprint/confirm-register" element={<ConfirmRegister />} />
            <Route path="octoprint/confirm-password" element={<ConfirmPassword />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
