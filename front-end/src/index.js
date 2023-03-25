import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

// antd 
import 'antd/dist/reset.css';

//Pages
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';

import WeeklyPayrollPage from './pages/WeeklyPayrollPage';
import WeeklySchedulePage from './pages/WeeklySchedulePage';
import EmailPage from './pages/EmailPage';

import AccountSettingsPage from './pages/account-settings/AccountSettingsPage';
import AddStudentPage from './pages/account-settings/student/AddStudentPage';
import RemoveStudentPage from './pages/account-settings/student/RemoveStudentPage';
import ChangeStudentUnavailabilityPage from './pages/account-settings/student/ChangeStudentUnavailabilityPage';
import CreateShiftPage from './pages/account-settings/shift/CreateShiftPage';
import DeleteShiftPage from './pages/account-settings/shift/DeleteShiftPage';
import AddShiftExceptionPage from './pages/account-settings/shift/AddShiftExceptionPage';
import RemoveShiftExceptionPage from './pages/account-settings/shift/RemoveShiftExceptionPage';

import ReportSelectionPage from './pages/reports/ReportSelectionPage';
import MonthlyReportsPage from './pages/reports/MonthlyReportsPage';
import YearlyReportsPage from './pages/reports/YearlyReportsPage';
import StudentReportsPage from './pages/reports/StudentReportsPage';


const router = createBrowserRouter(
    createRoutesFromElements(<>
        <Route path='/' element={<HomePage/>}/>
        <Route path='login' element={<LoginPage/>}/>
        <Route path='signup' element={<SignupPage/>}/>

        <Route path='payroll' element={<WeeklyPayrollPage/>}/>
        <Route path='schedule' element={<WeeklySchedulePage/>}/>
        <Route path='email' element={<EmailPage/>}/>

        <Route path='settings' element={<AccountSettingsPage/>}/>
        <Route path='settings/addstudent' element={<AddStudentPage/>}/>
        <Route path='settings/removestudent' element={<RemoveStudentPage/>}/>
        <Route path='settings/changeunavailability' element={<ChangeStudentUnavailabilityPage/>}/>
        <Route path='settings/createshift' element={<CreateShiftPage/>}/>
        <Route path="settings/deleteshift" element={<DeleteShiftPage/>}/>
        <Route path="settings/addshiftexception" element={<AddShiftExceptionPage/>}/>
        <Route path="settings/removeshiftexception" element={<RemoveShiftExceptionPage/>}/>

        <Route path='reports' element={<ReportSelectionPage/>}/>
        <Route path='reports/monthly' element={<MonthlyReportsPage/>}/>
        <Route path='reports/yearly' element={<YearlyReportsPage/>}/>
        <Route path='reports/students' element={<StudentReportsPage/>}/>

        <Route path="*" element={<ErrorPage/>}/>
    </>)
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
    {/* <App /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
