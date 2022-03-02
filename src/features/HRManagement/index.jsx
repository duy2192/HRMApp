import NotFound from 'components/NotFound';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddPersonnelPage from './pages/AddUserPage';
import OverViewPage from './pages/OverViewPage'
import DetailPage from './pages/DetailPage'
HRManagement.propTypes = {};

function HRManagement(props) {
  return (
      <Routes>
        <Route path='/' element={<OverViewPage/>}></Route>
        <Route path='/them' element={<AddPersonnelPage/>}></Route>
        <Route path='/:personnelid' element={<DetailPage/>}></Route>
        <Route element={<NotFound/>}></Route>
      </Routes>
  ); 
}

export default HRManagement;