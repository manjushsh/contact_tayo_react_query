import {
  Routes,
  Route,
  Link
} from "react-router-dom";
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

export default function App() {
  return (
    <section className="App">
      <aside className="sidebar-container">
        {routes?.map(route => <Link className="sidebar-element" to={route.path}>{<route.navbar />}</Link>)}
      </aside>
      <Routes>
        {routes?.map(route => <Route path={route.path} element={<route.content />} />)}
      </Routes>
    </section>
  );
}
