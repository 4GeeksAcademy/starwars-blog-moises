import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const InfoVehicles = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      setError(null);
      setItem(null);

      try {
        const response = await fetch(`https://www.swapi.tech/api/vehicles/${id}`);
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
          <h5 className="card-title">Type: Vehicles</h5>
          <p><strong>Model: </strong>{item.model || 'N/A'}</p>
          <p><strong>Vehicle Class: </strong>{item.vehicle_class || 'N/A'}</p>
          <p><strong>Manufacturer: </strong>{item.manufacturer || 'N/A'}</p>
          <p><strong>Cost in Credits: </strong>{item.cost_in_credits || 'N/A'}</p>
          <p><strong>Length: </strong>{item.length || 'N/A'}</p>
          <p><strong>Crew: </strong>{item.crew || 'N/A'}</p>
          <p><strong>Passengers: </strong>{item.passengers || 'N/A'}</p>
          <p><strong>Max Atmosphering Speed: </strong>{item.max_atmosphering_speed || 'N/A'}</p>
          <p><strong>Cargo Capacity: </strong>{item.cargo_capacity || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};
