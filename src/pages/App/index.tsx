import {
  Routes,
  Route,
  Link
} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Contacts from "../../pages/contact";
import ChartsAndMapMain from "../charts-maps";
import './App.css';

const routes = [
  {
    path: "/",
    exact: true,
    content: () => <Contacts />,
    navbar: () => <h5>Contact</h5>
  },
  {
    path: "/charts-maps",
    content: () => <ChartsAndMapMain />,
    navbar: () => <h5>Charts & Maps</h5>
  },
];

// Basic router file
export default function App() {
  return (
    <section className="App">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container className="sidebar-container-fl">
          <Navbar.Brand href={routes[0].path}>Contact</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href={routes[1].path}>Charts & Maps</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <aside className="sidebar-container">
        {routes?.map((route, key) => <Link key={key} className="sidebar-element" to={route.path}>{<route.navbar />}</Link>)}
      </aside> */}
      <Routes>
        {routes?.map((route, key) => <Route key={key} path={route.path} element={<route.content />} />)}
      </Routes>
    </section>
  );
}
