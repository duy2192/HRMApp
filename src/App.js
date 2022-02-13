import { Route, Routes } from 'react-router-dom';
import AuthFeature from './features/Auth';
import NotFound from 'components/NotFound';
import Home from 'features/Layouts/Home';

function App() {
  return (
<>
<Routes>
  <Route path="/" element={<Home/>}></Route>
  <Route path="/user/*" element={<AuthFeature/>}></Route>
  <Route path='*' element={<NotFound/>}></Route>

</Routes>
</>
  );
}

export default App;
