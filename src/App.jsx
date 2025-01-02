import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Arsenal } from "./pages/Arsenal";
import { Menu } from "./components/Menu/index";
import { Login } from "./pages/Login/index";
import { Add } from "./pages/Arsenal/Adicionar/index";
import { Edit } from "./pages/Arsenal/Edit";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="/arsenal" element={<Arsenal />}>
            <Route path="/arsenal/add" element={<Add />} />
            <Route path="/arsenal/edit/:id" element={<Edit />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
