import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const Results = ({ query }) => {
  const [searchParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const searchQuery = searchParams.get("search") || query;

  useEffect(() => {
    if (!searchQuery) return;

    const fetchResults = async () => {
      try {
        const response = await fetch(`https://api-productos-29tq.onrender.com/api/items?q=${searchQuery}`);
        if (!response.ok) throw new Error("Error en la solicitud");

        const data = await response.json();
        setItems(data || []);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchResults();
  }, [searchQuery]);

  const handleProductClick = (productId) => {
    navigate(`/items/${productId}`); // Navega a la ruta de detalles del producto
  };

  if (error) return <p>Error al obtener los resultados: {error}</p>;

  return (
    <div>
      <h3>Resultados de la búsqueda</h3>
      <div className="row">
        {items.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <p>{items.length} resultado(s) para "{searchQuery}"</p>
            <div className="card">
              <img src={product.image} className="card-img-fluid" alt={product.title} />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">Precio: ${product.price}</p>
                <p className="card-text">Categoría: {product.category}</p>
                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.round(product.rating) ? "text-warning" : ""}>
                      &#9733;
                    </span>
                  ))}
                </div>
                <button
                  className="btn btn-info mt-3"
                  onClick={() => handleProductClick(product.id)}
                >
                  Ver producto
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
