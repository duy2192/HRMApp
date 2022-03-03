import NotFound from 'components/NotFound';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import OverViewPage from './pages/OverviewPage'
import AddPositionPage from './pages/AddPositionPage'
import DetailPage from './pages/DetailPage'
Position.propTypes = {};

function Position(props) {
  return (
      <Routes>
        <Route path='/' element={<OverViewPage/>}></Route>
        <Route path='/them' element={<AddPositionPage/>}></Route>
        <Route path='/:id' element={<DetailPage/>}></Route>
        <Route element={<NotFound/>}></Route>
      </Routes>
  ); 
}

export default Position;