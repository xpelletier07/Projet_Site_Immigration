export function StatCards() {
  return (
    <div className="columns mb-5">
      <div className="column">
        <div className="stat-card">
          <span className="badge-tag badge-global">GLOBAL</span>
          <div className="card-icon"><i className="fas fa-address-card" /></div>
          <div className="card-label">Active Dossiers</div>
          <div className="card-value">1,284</div>
          <div className="card-growth"><i className="fas fa-arrow-trend-up" /> +12% from last month</div>
        </div>
      </div>

      <div className="column">
        <div className="stat-card">
          <span className="badge-tag badge-urgent">URGENT</span>
          <div className="card-icon"><i className="fas fa-clock" /></div>
          <div className="card-label">Pending Reviews</div>
          <div className="card-value">42</div>
          <div className="card-sub">Avg. wait time: 4.2 days</div>
        </div>
      </div>

      <div className="column">
        <div className="stat-card">
          <div className="card-icon"><i className="fas fa-calendar-days" /></div>
          <div className="card-label">Appointments</div>
          <div className="card-value">08</div>
          <div className="card-sub">Scheduled for today</div>
        </div>
      </div>
    </div>
  );
}