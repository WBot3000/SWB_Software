import { Navbar, Nav, Container } from "react-bootstrap";

function NavMenu() {
    return <Navbar>
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
    </Navbar>
}
export default NavMenu;