import { useEffect, useState } from "react";

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch("https://api-productos-29tq.onrender.com/api/sales");
        if (!response.ok) throw new Error("Error al obtener las ventas");

        const data = await response.json();
        setSales(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchSales();
  }, []);

  if (error) return <p>{error}</p>;
  if (!sales.length) return <p>No hay ventas registradas.</p>;

  return (
    <div>
      <h2>Ventas Realizadas</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Título</th>
            <th>Categoría</th>
            <th>Lote</th>
            <th>Fecha y Hora de Venta</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id}>
              <td>
                <img 
                  src={sale.image} 
                  alt={sale.title} 
                  style={{ width: "50px", height: "auto" }} 
                />
              </td>
              <td>{sale.title}</td>
              <td>{sale.category}</td>
              <td>{sale.lot}</td>
              <td>{new Date(sale.saleDate).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Sales;
