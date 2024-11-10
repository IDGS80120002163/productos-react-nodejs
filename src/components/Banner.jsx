import { Link } from "react-router-dom";

const Banner = ({ onInicio }) => {
  return (
    <div className="banner p-3 bg-primary text-white text-center">
      <h1>Bienvenido a la tienda de cosas</h1>

      <Link to="/sales" className="btn btn-info ms-3">
        Ir a las compras
      </Link>
      <Link
        to="/"
        className="btn btn-secondary"
        onClick={onInicio}
      >
        INICIO
      </Link>
    </div>
  );
};

export default Banner;
