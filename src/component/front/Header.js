import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

function Header({ cartitems }) {
  // const length = cartitems?.reduce((length, item) => length + item.quantity, 0);
  return (
    <>
      <div className="header">
        <div>
          <h1>Shoping Center</h1>
        </div>
        <div>
          <Link to={"/"} state={{ cartitems: cartitems }}>
            <img src="./pics/home.png" alt="home" className="home-img" />
          </Link>
        </div>

        <div>
          {/* <div className="total">{length}</div> */}
          <Link to={"/cart"}>
            <img src="./pics/cart.png" alt="cart" className="img" />
          </Link>
        </div>
      </div>
    </>
  );
}

export default Header;