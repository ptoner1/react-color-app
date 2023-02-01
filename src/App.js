import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Palette from './Palette';
import Home from './Home';
import seedColors from './seedColors';
import withRouter from './withRouterUtil';
import PaletteList from './PaletteList';
import Color from './Color';
import NewPaletteForm from './NewPaletteForm';
import DraggableColorList from './DraggableColorList';

function App() {
  const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
  const [paletteList, updatePaletteList] = useState(savedPalettes || seedColors);

  function syncLocalStorage() {
    window.localStorage.setItem('palettes', JSON.stringify(paletteList))
  }

  useEffect(() => {
    syncLocalStorage()
  })

  const navigate = useNavigate();

  return (
    <Routes>
      <Route exact path='/'
        element={<PaletteList
          palettes={paletteList}
          updatePaletteList={updatePaletteList}
          navigate={navigate} />}
      />
      <Route exact path='/palette/new'
        element={<NewPaletteForm
          drawerWidth={320}
          updatePaletteList={updatePaletteList}
          paletteList={paletteList}
          navigate={navigate}
          syncLocalStorage={syncLocalStorage} />}
      />
      <Route exact path='/palette/:id' element={withRouter(Palette)(paletteList)} />
      <Route exact path='/palette/:id/:colorId' element={withRouter(Color)()} />
      <Route path='/drag' element={<DraggableColorList colors={['red', 'blue', 'green']} />} />
    </Routes>
  );
}

export default App