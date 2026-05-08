export function Topbar() {
  return (
    <div className="topbar">
      <span className="topbar-brand"></span>
      <div className="topbar-right">
        <div className="search-box">
          <i className="fas fa-magnifying-glass icon-btn" />
          <input placeholder="Search dossier..." />
        </div>
        <i className="fas fa-bell icon-btn" />
        <i className="fas fa-circle-question icon-btn" />
        <div className="avatar">OC</div>
      </div>
    </div>
  );
}