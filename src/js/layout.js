import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./views/home";
import { Info } from "./views/info";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";

const Layout = () => {
  const basename = process.env.BASENAME || "";
  const [favorites, setFavorites] = useState([]);

  const removeFavorite = (item) => {
    setFavorites(favorites.filter((fav) => fav.uid !== item.uid));
  };

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar favorites={favorites} removeFavorite={removeFavorite} />
          <Routes>
            <Route path="/" element={<Home setFavorites={setFavorites} favorites={favorites} />} />
            <Route path="/info/:id" element={<Info />} />
            <Route path="*" element={<h1>Not found!</h1>} />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
