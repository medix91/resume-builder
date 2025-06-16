import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import AppRoutes from "./routes/AppRoutes";
import Sidebar from "./components/Sidebar";

const App: React.FC = () => (
  <Router>
    <div className="flex min-h-screen">
         <Sidebar />
      <main className="flex-1 md:ml-48">
   
        <AppRoutes />
      </main>
    </div>
  </Router>
);

export default App;
