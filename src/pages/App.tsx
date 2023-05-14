import { Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';
import SignIn from '@/pages/SignIn';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </>
  );
};

export default App;