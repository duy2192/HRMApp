import NotFound from 'components/NotFound';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HRStatPage from './pages/HRStatPage'
Position.propTypes = {};

function Position(props) {
  return (
      <Routes>
        <Route path='/thong-ke-nhan-su' element={<HRStatPage/>}></Route>
        <Route element={<NotFound/>}></Route>
      </Routes>
  ); 
}

export default Position;