import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState([]);
  const [cartitems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [arr, setArr] = useState(state?.myArray);

  const length = cartitems?.reduce(
    (length, item) => length + item?.quantity,
    0
  );

  const totalPrice = cartitems?.reduce(
    (price, item) => price + item?.quantity * item?.price,
    0
  );

  useEffect(() => {
    const obj = state.item;
    if (obj) {
      let ar = [...arr];
      ar.push(obj);
      setArr(ar);
    }
  }, []);

  function goToHome() {
    navigate("/", {
      state: {
        arr: arr,
      },
    });
  }

  function handleadd(product) {
    const ProductExit = cartitems.find((item) => item?.id === product?.id);
    if (ProductExit) {
      setCartItems(
        cartitems.map((item) =>
          item?.id === product?.id
            ? { ...ProductExit, quantity: ProductExit?.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartitems, { ...product, quantity: 1 }]);
    }
  }

  function handleremove(product) {
    const ProductExit = cartitems.find((item) => item?.id === product?.id);
    if (ProductExit.quantity === 1) {
      setCartItems(cartitems.filter((item) => item?.id !== product?.id));
    } else {
      setCartItems(
        cartitems.map((item) =>
          item?.id === product?.id
            ? { ...ProductExit, quantity: ProductExit?.quantity - 1 }
            : item
        )
      );
    }
  }

  function handleClick() {
    setAddress([...address, name]);
    setName("");
  }

  function handleSubmit() {
    setCartItems([]);
  }

  return (
    <>
      <div className="cart-items">
        <div className="cart-items-quantity">
          <button className="home-btn" onClick={goToHome}>
            Back To Home
          </button>
          <button
            className="home-btn"
            onClick={() => {
              handleSubmit();
              goToHome();
            }}
          >
            Order Cancel
          </button>
        </div>
        <div className="cart-items-header">
          <h2>Cart Items</h2>
        </div>
        <div className="cart-items-quantity">
          <h3 className="length">{length}</h3>
        </div>
        <div className="cart-items-header">
          {length === 0 && <p>For Shoping Please Click on + Button</p>}
        </div>

        {arr.map((item) => (
          <div className="cart" key={item.id}>
            <div className="cart-item-list">
              <img className="cart-items-image" src={item.image} alt="" />
              <div className="heading">
                <h5>Name : {item.name}</h5>
                <h5>Price : ${item.price}</h5>
                <h5>Quantity : {length}</h5>
              </div>
              <div>
                <button
                  className="cart-items-add"
                  onClick={() => handleadd(item)}
                >
                  +
                </button>
                <button
                  className="cart-items-remove"
                  onClick={() => handleremove(item)}
                  disabled={length < 1}
                >
                  -
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="cart-total">
          <h4>Total Bill = ${totalPrice}</h4>
        </div>

        <div className="cart-input">
          <input
            className="input"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Enter Address"
          />
          <button
            className="input-btn"
            onClick={handleClick}
            disabled={!length}
          >
            Submit
          </button>
        </div>

        <div className="cart-total-button">
          <div className="container mt-3">
            <button
              type="button"
              className="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#myModal"
              onClick={handleSubmit}
              disabled={!length}
            >
              Order Now
            </button>
          </div>
        </div>

        <div className="modal" id="myModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <img src="./pics/tick.png" alt="tick" className="tick-img" />
              </div>

              <div className="modal-body">
                {address.map((item, ind) => {
                  return (
                    <>
                      <p key={ind}>Address : {item}</p>
                    </>
                  );
                })}
                <h6>Thanks for Shoping</h6>
                <p>your order is Book now.</p>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="footer-btn"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    setAddress([]);
                    goToHome();
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
