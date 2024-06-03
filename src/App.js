
import './App.css';
import Signup from './Screens/Signup';
import PostList from './Screens/PostList'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Signup />} />
          <Route path='/post' element={<PostList/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
