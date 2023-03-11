import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import ShowList from './components/ShowList'
import ExpenseTracker from './components/ExpenseTracer';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ShowList />} />
          <Route path="/add" element={<ExpenseTracker onTrue={undefined} onClose={undefined} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
