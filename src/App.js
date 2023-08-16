import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./component/Product/Product";
import Cart from "./component/front/Cart/Cart";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Product />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;