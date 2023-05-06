import './styles/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegisteredUsers from './pages/RegisteredUsers';
import Navbar from './components/Navbar';
import RegistrationPage from './pages/RegistrationPage';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>

        <Route path='/' element={<RegistrationPage />} />
        <Route path='/users' element={<RegisteredUsers />} />

      </Routes>

    </BrowserRouter>

  );
}

export default App;
