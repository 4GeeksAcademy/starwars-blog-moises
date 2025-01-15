import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const InfoPeople = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      setError(null);
      setItem(null);

      try {
        const response = await fetch(`https://www.swapi.tech/api/people/${id}`);
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
          <h5 className="card-title">Type: People</h5>
          <p><strong>Height: </strong>{item.height || 'N/A'}</p>
          <p><strong>Mass: </strong>{item.mass || 'N/A'}</p>
          <p><strong>Hair Color: </strong>{item.hair_color || 'N/A'}</p>
          <p><strong>Skin Color: </strong>{item.skin_color || 'N/A'}</p>
          <p><strong>Eye Color: </strong>{item.eye_color || 'N/A'}</p>
          <p><strong>Birth Year: </strong>{item.birth_year || 'N/A'}</p>
          <p><strong>Gender: </strong>{item.gender || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};
