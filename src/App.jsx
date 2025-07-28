import { useState } from "react";
import NavBar from "./components/NavBar/Navbar";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import "./App.css";
import { products } from "./data/productsData";
import { categories } from "./data/categoriesData";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <Header>
        <NavBar />
      </Header>
      <Main categories={categories} products={products} />
    </div>
  );
}

export default App;
