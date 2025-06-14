import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import EditCV from "./pages/EditCV";


function App() {


  return (
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/edit" />} />
        <Route path="/edit" element={<EditCV />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
