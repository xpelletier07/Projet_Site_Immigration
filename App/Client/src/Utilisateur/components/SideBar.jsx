import { logout } from "../../commun/commun.jsx";
import { useNavigate } from "react-router-dom";

export function Sidebar({ active, setActive }) {
  const navItems = [
    { label: "Dashboard", icon: "fa-table-columns" },
    { label: "Files", icon: "fa-folder" },
    { label: "Clients", icon: "fa-user" },
    { label: "Documents", icon: "fa-file-lines" },
  ];
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-title">ImmiPortail</div>
        <div className="brand-sub">Immigration Services</div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((n) => (
          <a
            key={n.label}
            className={`sidebar-item${active === n.label ? " is-active" : ""}`}
            onClick={() => setActive(n.label)}
          >
            <i className={`fas ${n.icon}`} />
            {n.label}
          </a>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="new-case-btn">Nouveau dossier</button>
        {/*<a className="sidebar-item"><i className="fas fa-gear" /> Paramètres</a>*/}
        <a className="sidebar-item"  onClick={() => {logout; navigate("/")}}><i className="fas fa-arrow-right-from-bracket"/>Deconnexion</a>
      </div>
    </aside>
  );
}