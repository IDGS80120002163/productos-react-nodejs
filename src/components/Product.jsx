import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://api-productos-29tq.onrender.com/api/items/${productId}`);
        setProduct(response.data);
      } catch (error) {
        setError("Producto no encontrado");
      }
    };

    if (productId) fetchProduct();
    else setError("ID de producto no válido");
  }, [productId]);

  const handlePurchase = async () => {
    try {
      const response = await axios.post("https://api-productos-29tq.onrender.com/api/addSale", { productId });
      
      setProduct((prevProduct) => ({
        ...prevProduct,
        stock: prevProduct.stock - 1
      }));

      Swal.fire({
        icon: "success",
        title: "Compra realizada con éxito",
        text: response.data.message,
        confirmButtonText: "Aceptar",
      });
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Error en la compra";
      setError(errorMessage);
      Swal.fire({
        icon: "error",
        title: "Error en la compra",
        text: errorMessage,
        confirmButtonText: "Aceptar",
      });
    }
  };

  if (error) return <p>{error}</p>;
  if (!product) return <p>Cargando...</p>;

  return (
    <div className="card mt-5 p-4">
      <div className="row g-0">
        <div className="col-md-4 d-flex align-items-center justify-content-center">
          <img 
            src={product.image} 
            alt={product.title} 
            style={{ width: '80%', height: 'auto' }} 
            className="img-fluid"
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h3 className="card-title">{product.title}</h3>
            <p className="card-text"><strong>Descripción:</strong> {product.description}</p>
            <p className="card-text"><strong>Precio:</strong> ${product.price}</p>
            <p className="card-text"><strong>Categoría:</strong> {product.category}</p>
            <p className="card-text"><strong>Stock:</strong> {product.stock} unidades</p>
            <div className="rating mb-3">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.round(product.rating) ? "text-warning" : ""}>
                  &#9733;
                </span>
              ))}
            </div>
            <button 
              className="btn btn-success" 
              onClick={handlePurchase} 
              disabled={product.stock === 0}
            >
              Comprar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
