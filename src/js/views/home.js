import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Home = ({ setFavorites, favorites }) => {
	const [data, setData] = useState({ people: [], planets: [], vehicles: [] });


	useEffect(() => {
		const fetchData = async () => {
			try {
				const [peopleRes, planetsRes, vehiclesRes] = await Promise.all([
					fetch("https://www.swapi.tech/api/people"),
					fetch("https://www.swapi.tech/api/planets"),
					fetch("https://www.swapi.tech/api/vehicles"),
				]);

				const [peopleData, planetsData, vehiclesData] = await Promise.all([
					peopleRes.json(),
					planetsRes.json(),
					vehiclesRes.json(),
				]);

				setData({
					people: peopleData.results,
					planets: planetsData.results,
					vehicles: vehiclesData.results,
				});
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	const handleFavorite = (item, type) => {
		const favorite = { ...item, type };
		if (!favorites.some((fav) => fav.uid === item.uid && fav.type === type)) {
			setFavorites([...favorites, favorite]);
		}
	};

	const renderCarousel = (title, items) => (
		<div className="carousel-container my-4">
			<h2>{title}</h2>
			<div className="carousel d-flex overflow-auto">
				{items.map((item) => (
					<div className="card mx-2" style={{ width: "18rem", flexShrink: 0 }} key={item.uid}>
						<img
							src="https://picsum.photos/500/325"
							className="card-img-top"
							alt={item.name}
						/>
						<div className="card-body d-flex flex-column justify-content-between">
							<h5 className="card-title">{item.name}</h5>
							<div className="mt-3">
								<button
									className="btn btn-primary w-100 mb-2"
									onClick={() => handleFavorite(item, title.toLowerCase())}
								>
									Add to Favorites
								</button>
								<Link to={`/info/${item.uid}`} className="btn btn-secondary w-100">
									Info
								</Link>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);

	return (
		<div className="container">
			{renderCarousel("Characters", data.people)}
			{renderCarousel("Planets", data.planets)}
			{renderCarousel("Vehicles", data.vehicles)}
		</div>
	);
};
