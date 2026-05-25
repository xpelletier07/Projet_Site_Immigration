export const globalStyles = `
  @import url('https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css');

  :root {
    --sidebar-bg: #1a1f36;
    --sidebar-hover: #252c4a;
    --accent-blue: #1e3a8a;
    --brand-blue: #1d3461;
    --light-bg: #f4f6fb;
    --card-border: #e8ecf4;
  }

  * { box-sizing: border-box; }
  body { margin: 0; font-family: 'Segoe UI', sans-serif; background: var(--light-bg); }

  /* ── Sidebar ── */
  .sidebar {
    width: 210px; min-height: 100vh; background: var(--sidebar-bg);
    display: flex; flex-direction: column; position: fixed; left: 0; top: 0; z-index: 10;
  }
  .sidebar-brand { padding: 22px 20px 16px; border-bottom: 1px solid #2e3a5c; }
  .brand-title { color: #fff; font-weight: 700; font-size: 0.95rem; line-height: 1.2; }
  .brand-sub { color: #8899bb; font-size: 0.65rem; letter-spacing: 0.12em; text-transform: uppercase; }
  .sidebar-nav { flex: 1; padding: 16px 0; }
  .sidebar-item {
    display: flex; align-items: center; gap: 12px;
    padding: 11px 22px; color: #a0aec8; font-size: 0.9rem;
    cursor: pointer; transition: background 0.15s, color 0.15s; text-decoration: none;
  }
  .sidebar-item:hover { background: var(--sidebar-hover); color: #fff; }
  .sidebar-item.is-active { background: var(--sidebar-hover); color: #fff; border-left: 3px solid #4f8ef7; }
  .sidebar-item i { width: 18px; text-align: center; font-size: 0.95rem; }
  .sidebar-footer { padding: 16px 0 8px; border-top: 1px solid #2e3a5c; }
  .new-case-btn {
    margin: 0 16px 12px; display: block; background: var(--accent-blue);
    color: #fff; text-align: center; padding: 10px; border-radius: 6px;
    font-weight: 600; font-size: 0.88rem; cursor: pointer; border: none;
    width: calc(100% - 32px); transition: background 0.15s;
  }
  .new-case-btn:hover { background: #1e40af; }

  /* ── Main ── */
  .main-content { margin-left: 210px; min-height: 100vh; }

  /* ── Topbar ── */
  .topbar {
    background: #fff; border-bottom: 1px solid var(--card-border);
    padding: 0 28px; height: 58px; display: flex; align-items: center;
    justify-content: space-between; position: sticky; top: 0; z-index: 5;
  }
  .topbar-brand { color: var(--brand-blue); font-weight: 800; font-size: 1.1rem; letter-spacing: -0.01em; }
  .topbar-right { display: flex; align-items: center; gap: 16px; }
  .search-box {
    display: flex; align-items: center; gap: 8px;
    background: #f1f4fb; border: 1px solid #dde3f0; border-radius: 8px;
    padding: 7px 14px; color: #8899bb; font-size: 0.85rem;
  }
  .search-box input { background: none; border: none; outline: none; color: #555; font-size: 0.85rem; width: 160px; }
  .avatar { width: 34px; height: 34px; border-radius: 50%; background: #c7d2fe; display: flex; align-items: center; justify-content: center; color: var(--accent-blue); font-weight: 700; font-size: 0.8rem; }
  .icon-btn { color: #8899bb; font-size: 1rem; cursor: pointer; }
  .icon-btn:hover { color: #333; }

  /* ── Page body ── */
  .page-body { padding: 30px 28px; }
  .page-title { font-size: 1.7rem; font-weight: 800; color: #1a1f36; margin-bottom: 4px; }
  .page-sub { color: #8899bb; font-size: 0.9rem; margin-bottom: 24px; }

  /* ── Stat cards ── */
  .stat-card {
    background: #fff; border: 1px solid var(--card-border); border-radius: 12px;
    padding: 20px 22px 18px; position: relative; overflow: hidden;
  }
  .card-label { color: #8899bb; font-size: 0.82rem; margin-bottom: 6px; }
  .card-value { font-size: 2rem; font-weight: 800; color: #1a1f36; line-height: 1; }
  .card-sub { color: #8899bb; font-size: 0.78rem; margin-top: 8px; }
  .card-growth { color: #22c55e; font-size: 0.78rem; margin-top: 8px; }
  .badge-tag { position: absolute; top: 14px; right: 14px; padding: 3px 10px; border-radius: 20px; font-size: 0.7rem; font-weight: 700; }
  .badge-global { background: #e0e9ff; color: #1e3a8a; }
  .badge-urgent { background: #fff0e0; color: #c2680a; }
  .card-icon { font-size: 1.3rem; color: #8899bb; margin-bottom: 10px; }

  /* ── Section card / table ── */
  .section-card { background: #fff; border: 1px solid var(--card-border); border-radius: 12px; overflow: hidden; }
  .section-header { display: flex; justify-content: space-between; align-items: center; padding: 18px 22px 14px; border-bottom: 1px solid var(--card-border); }
  .section-header h2 { font-size: 1rem; font-weight: 700; color: #1a1f36; margin: 0; }
  .view-all { color: #3b82f6; font-size: 0.83rem; cursor: pointer; text-decoration: none; display: flex; align-items: center; gap: 4px; }
  .dossier-table { width: 100%; border-collapse: collapse; }
  .dossier-table th { text-transform: uppercase; font-size: 0.68rem; letter-spacing: 0.08em; color: #8899bb; font-weight: 600; padding: 10px 16px; border-bottom: 1px solid var(--card-border); background: #f8fafd; text-align: left; }
  .dossier-table td { padding: 13px 16px; border-bottom: 1px solid #f0f3fa; vertical-align: middle; font-size: 0.87rem; color: #1a1f36; }
  .dossier-table tr:last-child td { border-bottom: none; }
  .dossier-table tr:hover td { background: #f8fafd; }
  .client-cell { display: flex; align-items: center; gap: 10px; }
  .avatar-sm { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.72rem; font-weight: 700; flex-shrink: 0; }
  .id-cell { color: #8899bb; font-size: 0.78rem; font-family: monospace; }

  /* ── Status badges ── */
  .status-badge { padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; display: inline-flex; align-items: center; gap: 5px; }
  .status-badge::before { content: ''; width: 7px; height: 7px; border-radius: 50%; display: inline-block; }
  .status-inprogress { background: #eff6ff; color: #2563eb; }
  .status-inprogress::before { background: #2563eb; }
  .status-pending { background: #fffbeb; color: #b45309; }
  .status-pending::before { background: #f59e0b; }
  .status-approved { background: #f0fdf4; color: #16a34a; }
  .status-approved::before { background: #16a34a; }
  .action-dots { color: #aab4cc; cursor: pointer; font-size: 1rem; }
  .action-dots:hover { color: #555; }

  /* ── Activity ── */
  .activity-item { display: flex; gap: 14px; padding: 14px 0; border-bottom: 1px solid #f0f3fa; }
  .activity-item:last-child { border-bottom: none; }
  .activity-icon { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 0.85rem; }
  .act-upload   { background: #1a1f36; color: #fff; }
  .act-approved { background: #f0fdf4; color: #16a34a; }
  .act-warning  { background: #fffbeb; color: #f59e0b; }
  .activity-title { font-weight: 700; font-size: 0.87rem; color: #1a1f36; margin-bottom: 2px; }
  .activity-desc  { font-size: 0.8rem; color: #8899bb; margin-bottom: 3px; }
  .activity-time  { font-size: 0.72rem; color: #b0bcd0; text-transform: uppercase; letter-spacing: 0.05em; }

  /* ── Legal card ── */
  .legal-card { background: #1a1f36; border-radius: 12px; padding: 20px 22px; margin-top: 16px; position: relative; overflow: hidden; }
  .legal-card h3 { color: #fff; font-weight: 700; font-size: 1rem; margin-bottom: 8px; }
  .legal-card p  { color: #a0aec8; font-size: 0.82rem; line-height: 1.5; margin-bottom: 16px; }
  .read-btn { background: #fff; color: #1a1f36; padding: 8px 18px; font-size: 0.8rem; font-weight: 700; border-radius: 6px; border: none; cursor: pointer; text-transform: uppercase; letter-spacing: 0.05em; }
  .read-btn:hover { background: #e8ecf4; }
  .legal-watermark { position: absolute; right: -10px; bottom: -10px; font-size: 6rem; color: rgba(255,255,255,0.05); pointer-events: none; font-weight: 900; }
`;
