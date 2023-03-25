import { Navbar, Nav } from "react-bootstrap";

function NavMenu() {
    return <Navbar bg="secondary">
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/settings">Account Settings</Nav.Link>
            <Nav.Link href="/reports">Reports</Nav.Link>
            <Nav.Link href="/login">Log Out</Nav.Link>
          </Nav>
    </Navbar>
}
export default NavMenu;