import { Navbar, Nav } from "react-bootstrap";

function NavMenu() {
    return <Navbar className="" bg="secondary">
          <Nav className="d-flex">
            <Nav.Link className="text-white p-3" href="/">Home</Nav.Link>
            <Nav.Link className="text-white p-3" href="/settings">Account Settings</Nav.Link>
            <Nav.Link className="text-white p-3" href="/reports">Reports</Nav.Link>
            <Nav.Link className="text-white p-3" href="/login">Log Out</Nav.Link>
          </Nav>
    </Navbar>
}
export default NavMenu;