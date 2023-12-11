import { Routes, Route, Link } from "react-router-dom";
import MainPage from "pages/MainPage";
import HFractalPage from "pages/HFractalPage";
import JuliaFractalPage from "pages/JuliaFractalPage";
import ColorModelsPage from "pages/ColorModelsPage";
import AffinePage from "pages/AffinePage";

import LearnFractalsPage from "pages/LearnFractalsPage";
import LearnColorsPage from "pages/LearnColorsPage";
import LearnAffinePage from "pages/LearnAffinePage";

import NotFoundPage from "pages/NotFoundPage";

function MyRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/pages/MainPage" element={<MainPage />} />
        <Route path="/pages/HFractalPage" element={<HFractalPage />} />
        <Route path="/pages/JuliaFractalPage" element={<JuliaFractalPage/>}/>
        <Route path="/pages/ColorModelsPage" element={<ColorModelsPage />} />
        <Route path="/pages/AffinePage" element={<AffinePage />} />
        <Route path="/pages/LearnFractalsPage" element={<LearnFractalsPage />} />
        <Route path="/pages/LearnColorsPage" element={<LearnColorsPage />} />
        <Route path="/pages/LearnAffinePage" element={<LearnAffinePage />} />


        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default MyRoutes;
