import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Avenir from "./pages/Movies/Avenir";
import LesMieuxNotés from "./pages/Movies/LesMieuxNotés";
import Populaires from "./pages/Movies/Populaires";
import DuMoment from "./pages/Movies/DuMoment";
import Acceuil from "./pages/Acceuil";
import ArtistesPopulaires from "./pages/Artistes/ArtistesPopulaires";
import SeriesLesMieuxNotees from "./pages/Series/SeriesLesMieuxNotees";
import SeriesPopulaire from "./pages/Series/SeriesPopulaire";
import MovieInfos from "./components/MovieInfos";
import SerieInfos from "./components/SerieInfos";
import ActorsInfos from "./components/ActorsInfos";
import AllSeries from "./pages/Series/AllSeries";
import MaListe from "./components/MaListe";
import MaListeSérie from "./components/MaListeSérie";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Acceuil />} />
        <Route path="/Populaires" exact element={<Populaires />} />
        <Route path="/Avenir" element={<Avenir />} />
        <Route path="/LesMieuxNotés" element={<LesMieuxNotés />} />
        <Route path="/DuMoment" element={<DuMoment />} />
        <Route path="/ArtistesPopulaires" element={<ArtistesPopulaires />} />
        <Route
          path="/SeriesLesMieuxNotees"
          element={<SeriesLesMieuxNotees />}
        />
        <Route path="/SeriesPopulaires" exact element={<SeriesPopulaire />} />
        <Route path="/AllSeries" exact element={<AllSeries />} />
        <Route path="/:id" element={<MovieInfos />} />
        <Route path="/SeriesPopulaires/:id" element={<SerieInfos />} />
        <Route path="/ActeursPopulaires/:id" element={<ActorsInfos />} />
        <Route path="/MaListe" element={<MaListe />} />
        <Route path="/MaListeSeries" element={<MaListeSérie />} />
        <Route path="*" element={<Acceuil />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
