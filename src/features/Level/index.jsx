import NotFound from 'components/NotFound';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import OverViewPage from './pages/OverviewPage'
import DetailPage from './pages/DetailPage'
Level.propTypes = {};

function Level(props) {
  return (
      <Routes>
        <Route path='/' element={<OverViewPage/>}></Route>
        <Route path='/:depid' element={<DetailPage/>}></Route>
        <Route element={<NotFound/>}></Route>
      </Routes>
  ); 
}

export default Level;