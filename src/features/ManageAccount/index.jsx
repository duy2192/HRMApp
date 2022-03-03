import NotFound from 'components/NotFound';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CreateAccountPage from './pages/CreateAccountPage';
import DetailPage from './pages/DetailPage';
import OverViewPage from './pages/OverViewPage'
ManageAccount.propTypes = {};

function ManageAccount(props) {
  return (
      <Routes>
        <Route path='/' element={<OverViewPage/>}></Route>
        <Route path='/them' element={<CreateAccountPage/>}></Route>
        <Route path='/:accountid' element={<DetailPage/>}></Route>
        <Route element={<NotFound/>}></Route>
      </Routes>
  ); 
}

export default ManageAccount;