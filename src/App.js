
/*import React from "react";
import UrlForm from "./UrlForm";
function App() {
  return (
    <div className="container">
      <h1 className="mt-4 text-center">URL Shortner</h1>
      <UrlForm />
    </div>
  );
} 

export default App; */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UrlForm from './UrlForm';
import UrlStats from './UrlStats';
import UrlRetrieve from './UrlRetrieve';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UrlForm />} />
        <Route path="/stats" element={<UrlStats />} />
        <Route path="/retrieve" element={<UrlRetrieve />} />
      </Routes>
    </Router>
  );
};

export default App;