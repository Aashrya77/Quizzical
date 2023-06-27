import { Routes, Route } from 'react-router-dom';
import './App.css';
import Quiz from './Components/Quiz';
import FirstPage from './First-page/First-page';

function App() {
  return (
    <Routes>
      <Route path='/' element={<FirstPage/>}/>
      <Route path='/quiz' element={<Quiz/>}/>
    </Routes>
    
  );
}

export default App;
