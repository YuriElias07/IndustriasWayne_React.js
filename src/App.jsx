import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Arsenal } from "./pages/Arsenal";
import { Menu } from "./components/Menu/index";
import { Login } from "./pages/Login/index";
import { Add } from "./pages/Arsenal/Adicionar/index";
import { Edit } from "./pages/Arsenal/Edit";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />}>
          <Route path="/login" element={<Login />} />
        </Route>
        
        <Route 
          path="/arsenal" 
          element={
            <ProtectedRoute>
              <Arsenal />
            </ProtectedRoute>
          }
        >
          <Route 
            path="/arsenal/add" 
            element={
              <ProtectedRoute>
                <Add />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/arsenal/edit/:id" 
            element={
              <ProtectedRoute>
                <Edit />
              </ProtectedRoute>
            } 
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
