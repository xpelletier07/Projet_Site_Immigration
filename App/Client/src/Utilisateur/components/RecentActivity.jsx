export function RecentActivity() {
  return (
    <div className="section-card">
      <div className="section-header">
        <h2 style={{ textTransform: "uppercase", fontSize: "0.72rem", letterSpacing: "0.1em", color: "#8899bb" }}>
          Recent Activity
        </h2>
      </div>
      <div style={{ padding: "0 18px" }}>
        {/* Modele de la div

        activities.map((a, i) => (
          <div className="activity-item" key={i}>
            <div className={`activity-icon ${a.cls}`}>
              <i className={`fas ${a.icon}`} />
            </div>
            <div>
              <div className="activity-title">{a.title}</div>
              <div className="activity-desc">{a.desc}</div>
              <div className="activity-time">{a.time}</div>
            </div>
          </div>
        ))
        */}
      </div>
    </div>
  );
}