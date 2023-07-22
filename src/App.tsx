import { Routes, Route } from 'react-router-dom';

import Main from './pages/main/Main';
import CurrentNote from './pages/currentNote/CurrentNote';

import './index.scss';
import './App.scss';

function App() {
    return (
        <div className="notes-wrapper">
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/editor" element={<CurrentNote/>}/>
                <Route path="/editor/:id" element={<CurrentNote/>}/>
            </Routes>
        </div>
    );
}

export default App;
