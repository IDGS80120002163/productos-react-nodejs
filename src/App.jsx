import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Results from "./components/Results";
import Search from "./components/Search";
import Product from "./components/Product";
import Banner from "./components/Banner";
import Sales from "./components/Sales";
import { useState } from "react";
import "./App.css"

const App = () => {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setShowResults(true);
  };

  const handleInicio = () => {
    setQuery("");
    setShowResults(false);
  };

  return (
    <Router>
      <div className="container mt-5">
        <Banner onInicio={handleInicio} />
        <br />
        <Routes>
          <Route
            path="/items"
            element={<Results query={query} />}
          />
          <Route
            path="/"
            element={
              !showResults ? <Search onSearch={handleSearch} /> : <Results query={query} />
            }
          />
          <Route
            path="/items/:productId"
            element={<Product />}
          />
          <Route path="/sales" element={<Sales />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
