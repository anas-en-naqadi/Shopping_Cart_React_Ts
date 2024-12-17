import { Navbar as NavbarBs, Container, Nav, Button } from "react-bootstrap";
import shoppingIcon from "../assets/shopping-cart-outline-svgrepo-com.svg";
import { NavLink } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";

function Navbar() {
  const {openCart,closeCart,cartCount} = useShoppingCart();
  return (
    <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
      <Container>
        <Nav className="me-auto">
          <Nav.Link to="/" as={NavLink}>
            Home
          </Nav.Link>
          <Nav.Link to="/store" as={NavLink}>
            Store
          </Nav.Link>

          <Nav.Link to="/about" as={NavLink}>
            About
          </Nav.Link>
        </Nav>
        <Button
        onClick={openCart}
          style={{ width: "3rem", height: "3rem", position: "relative" }}
          variant="outline-primary"
          className="rounded-circle"
        >
          <img
            src={shoppingIcon}
            alt="Shopping Cart"
            style={{ width: "24px", height: "24px" }}
          />{" "}
        </Button>

        <div
          className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
          style={{
            color: "white",
            width: "1.5rem",
            height: "1.5rem",
            position: "absolute",
            bottom: 0,
            right: 0,
            transform: "translate(25%,25%)",
          }}
        >{cartCount}</div>
      </Container>
    </NavbarBs>
  );
}

export default Navbar;
