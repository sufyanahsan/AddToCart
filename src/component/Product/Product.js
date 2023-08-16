import { useState } from "react";
import data from "../backend Data/data";
import { useNavigate } from "react-router-dom";
import "./Product.css";

function Product() {
  const goToCart = useNavigate();
  const { productItems } = data;
  const [myArray] = useState([]);

  function handleadd(productItem) {
    goToCart("/cart", {
      state: {
        item: {
          id: productItem.id,
          name: productItem.name,
          price: productItem.price,
          image: productItem.image,
        },
        myArray: myArray,
      },
    });
  }

  return (
    <>
      <div className="products">
        {productItems.map((items) => {
          return (
            <div className="card" key={items.id}>
              <img
                className="product-image"
                src={items.image}
                alt={items.name}
              />
              <h5>{items.name}</h5>
              <p>${items.price}</p>
              <button className="button" onClick={() => handleadd(items)}>
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Product;
