import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListStockComponent from './components/ListStockComponent';
import CreateStockComponent from './components/CreateStockComponent';

function App() {
    return (
        <div>
            <Router>
                <div className="container">
                    <Routes>
                        <Route path="/" element={<ListStockComponent />} />
                        <Route path="/stocks" element={<ListStockComponent />} />
                        <Route path="/add-stock/:id" element={<CreateStockComponent />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
