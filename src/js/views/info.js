import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Info = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [type, setType] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      setError(null);
      setItem(null);
      
      try {
        // Try each endpoint sequentially
        const endpoints = [
          { url: `https://www.swapi.tech/api/people/${id}`, type: 'people' },
          { url: `https://www.swapi.tech/api/planets/${id}`, type: 'planets' },
          { url: `https://www.swapi.tech/api/vehicles/${id}`, type: 'vehicles' }
        ];

        for (const endpoint of endpoints) {
          console.log(`Trying endpoint: ${endpoint.url}`);  // Debug log
          
          const response = await fetch(endpoint.url);
          const data = await response.json();
          
          console.log(`Response for ${endpoint.type}:`, data);  // Debug log

          if (response.ok && data.result && data.result.properties) {
            console.log(`Found valid data for ${endpoint.type}`);  // Debug log
            setType(endpoint.type);
            setItem(data.result.properties);
            return; // Exit the function once we find valid data
          }
        }

        // If we get here, no valid data was found
        setError("Item not found. Please try a different item.");
        
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

  const getDisplayProperties = () => {
    switch(type) {
      case 'people':
        return [
          { label: 'Height', value: item.height },
          { label: 'Mass', value: item.mass },
          { label: 'Hair Color', value: item.hair_color },
          { label: 'Skin Color', value: item.skin_color },
          { label: 'Eye Color', value: item.eye_color },
          { label: 'Birth Year', value: item.birth_year },
          { label: 'Gender', value: item.gender }
        ];
      case 'planets':
        return [
          { label: 'Rotation Period', value: item.rotation_period },
          { label: 'Orbital Period', value: item.orbital_period },
          { label: 'Diameter', value: item.diameter },
          { label: 'Climate', value: item.climate },
          { label: 'Gravity', value: item.gravity },
          { label: 'Terrain', value: item.terrain },
          { label: 'Surface Water', value: item.surface_water },
          { label: 'Population', value: item.population }
        ];
      case 'vehicles':
        return [
          { label: 'Model', value: item.model },
          { label: 'Vehicle Class', value: item.vehicle_class },
          { label: 'Manufacturer', value: item.manufacturer },
          { label: 'Cost in Credits', value: item.cost_in_credits },
          { label: 'Length', value: item.length },
          { label: 'Crew', value: item.crew },
          { label: 'Passengers', value: item.passengers },
          { label: 'Max Atmosphering Speed', value: item.max_atmosphering_speed },
          { label: 'Cargo Capacity', value: item.cargo_capacity }
        ];
      default:
        return [];
    }
  };

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
          <h5 className="card-title">Type: {type.charAt(0).toUpperCase() + type.slice(1)}</h5>
          {getDisplayProperties().map(({ label, value }, index) => (
            <p key={index}>
              <strong>{label}: </strong>
              {value || 'N/A'}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};