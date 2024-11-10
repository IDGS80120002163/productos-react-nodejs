import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = ({ onSearch }) => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      onSearch(input);
      navigate(`/items?search=${encodeURIComponent(input)}`); //Navega a la ruta con el parámetro de búsqueda
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Buscar..."
        className="form-control"
      />
      <button type="submit" className="btn btn-primary ms-2">
        Buscar
      </button>
    </form>
  );
};

export default Search;
