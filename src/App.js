import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Forcasting } from './Components/forcasting';


function App() {
  
  return (
    
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Forcasting />}>
       
         
        </Route>
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
