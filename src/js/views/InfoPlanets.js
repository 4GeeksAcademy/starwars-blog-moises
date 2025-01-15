import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const InfoPlanets = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      setError(null);
      setItem(null);

      try {
        const response = await fetch(`https://www.swapi.tech/api/planets/${id}`);
        const data = await response.json();

        if (response.ok && data.result && data.result.properties) {
          setItem(data.result.properties);
        } else {
          setError("Item not found. Please try a different item.");
        }
      } catch (error) {
        console.error("Error fetching item data:", error);
        setError(`Error loading data: ${error.message}`);
      }
    };

    fetchItem();
  }, [id]);

  if (error) {
    return (
      <div className="container my-4">
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="container my-4">
        <div className="alert alert-info text-center" role="alert">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h1 className="text-center">{item.name || "Details"}</h1>
      <div className="card mx-auto" style={{ maxWidth: "600px" }}>
        <img
          src="https://picsum.photos/600/400"
          className="card-img-top"
          alt={item.name}
        />
        <div className="card-body">
          <h5 className="card-title">Type: Planets</h5>
          <p><strong>Rotation Period: </strong>{item.rotation_period || 'N/A'}</p>
          <p><strong>Orbital Period: </strong>{item.orbital_period || 'N/A'}</p>
          <p><strong>Diameter: </strong>{item.diameter || 'N/A'}</p>
          <p><strong>Climate: </strong>{item.climate || 'N/A'}</p>
          <p><strong>Gravity: </strong>{item.gravity || 'N/A'}</p>
          <p><strong>Terrain: </strong>{item.terrain || 'N/A'}</p>
          <p><strong>Surface Water: </strong>{item.surface_water || 'N/A'}</p>
          <p><strong>Population: </strong>{item.population || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};
