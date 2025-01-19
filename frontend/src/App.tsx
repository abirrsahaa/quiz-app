import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Landing';
import QuizPage from './pages/QuizPage';
import Dashboard from './pages/Dashboard';


function App() {
  return (  
    <Router>
      <div className="min-h-screen min-w-screen bg-background flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/dashboard" element={<Dashboard/>} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;