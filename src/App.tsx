import { Routes, Route } from 'react-router-dom';

import Main from './pages/main/Main';
import CurrentNote from './pages/currentNote/CurrentNote';

import './index.scss';
import './App.scss';

function App() {
    return (
        <div className="notes-wrapper">
            <Routes>
                <Route path="/react-notes" element={<Main/>}/>
                <Route path="/react-notes/editor" element={<CurrentNote/>}/>
                <Route path="/react-notes/editor/:id" element={<CurrentNote/>}/>
            </Routes>
        </div>
    );
}

export default App;
