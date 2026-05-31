export const style = `
  @import url('https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
  @import url('https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css');

  :root {
    --primary:        #001e40;
    --primary-dark:   #003366;
    --secondary:      #515f74;
    --bg:             #f7f9fb;
    --surface:        #ffffff;
    --surface-low:    #f2f4f6;
    --surface-mid:    #eceef0;
    --surface-high:   #e6e8ea;
    --on-surface:     #191c1e;
    --on-surface-var: #43474f;
    --outline:        #737780;
    --outline-var:    #c3c6d1;
    --error:          #ba1a1a;
    --error-container:#ffdad6;
    --on-error-cont:  #93000a;
  }

  body {
    font-family: 'Inter', sans-serif;
    background: var(--bg);
    color: var(--on-surface);
    min-height: 100vh;
  }

  h1, .brand { font-family: 'Public Sans', sans-serif; }

  /* ── Filter panel ── */
  .sl-filter-panel {
    background: var(--surface-low);
    border-radius: 12px;
    padding: 1.5rem;
  }

  .sl-filter-label {
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--secondary);
    margin-bottom: 0.5rem;
    display: block;
  }

  .search-icon-wrap { position: relative; }

  .search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--outline);
    font-size: 1.1rem;
    z-index: 1;
    pointer-events: none;
  }

  /* MODIFIÉ : padding-left augmenté pour laisser place à l'icône search */
  .sl-input {
    width: 100%;
    background: var(--surface) !important;
    border: none !important;
    border-radius: 8px !important;
    padding: 0.95rem 1rem 0.95rem 2.75rem !important;
    box-shadow: 0 1px 4px rgba(0,0,0,0.07) !important;
    color: var(--on-surface) !important;
    font-family: 'Inter', sans-serif;
    transition: box-shadow 0.2s !important;
  }
  .sl-input:focus {
    box-shadow: 0 0 0 2px var(--primary) !important;
    outline: none !important;
  }

  .sl-select select {
    background: var(--surface) !important;
    border: none !important;
    border-radius: 8px !important;
    padding: 0.95rem 1rem !important;
    box-shadow: 0 1px 4px rgba(0,0,0,0.07) !important;
    color: var(--on-surface) !important;
    font-family: 'Inter', sans-serif;
    width: 100%;
  }
  .sl-select::after { border-color: var(--secondary) !important; }

  .sl-btn-filter {
    background: linear-gradient(135deg, #001e40 0%, #003366 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    padding: 0 2rem;
    height: 54px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: opacity 0.2s;
    font-family: 'Inter', sans-serif;
    white-space: nowrap;
  }
  .sl-btn-filter:hover { opacity: 0.88; }

  /* ── Ledger ── */
  .ledger-header {
    display: grid;
    grid-template-columns: 3fr 1.5fr 1.5fr 1.5fr 1.5fr;
    padding: 0.75rem 2rem;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--secondary);
  }
  .ledger-header .col-actions { text-align: right; }
  .ledger-header .col-status  { text-align: center; }

  .ledger-row {
    display: grid;
    grid-template-columns: 3fr 1.5fr 1.5fr 1.5fr 1.5fr;
    align-items: center;
    background: var(--surface);
    padding: 1.25rem 2rem;
    border-radius: 12px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.06);
    transition: box-shadow 0.2s;
    margin-bottom: 0.75rem;
  }
  .ledger-row:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.10); }
  .ledger-row:hover .client-name { color: var(--primary); }

  .sl-avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 0.875rem;
    flex-shrink: 0;
  }

  .client-name {
    font-weight: 700;
    color: var(--on-surface);
    transition: color 0.15s;
    font-family: 'Public Sans', sans-serif;
  }
  .client-email { font-size: 0.75rem; color: var(--secondary); }

  .dossier-num {
    font-family: 'Courier New', monospace;
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--on-surface-var);
  }

  .col-status { display: flex; justify-content: center; }

  .sl-tag {
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 0.3rem 0.75rem;
    border-radius: 99px;
    display: inline-block;
  }
  .sl-tag.en-cours { background: #d5e3fc; color: #3a485b; }
  .sl-tag.action   { background: #592300; color: #ffb690; }
  .sl-tag.attente  { background: var(--surface-high); color: var(--on-surface-var); }
  .sl-tag.approuve { background: var(--primary); color: white; }

  .last-activity { font-size: 0.875rem; color: var(--secondary); }

  .col-actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0.5rem;
  }

  .btn-edit {
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--secondary);
    padding: 0.4rem;
    border-radius: 8px;
    transition: background 0.15s, color 0.15s;
    display: flex;
    align-items: center;
    font-size: 1rem;
  }
  .btn-edit:hover { background: var(--surface-low); color: var(--primary); }

  /* AJOUTÉ : bouton supprimer (rouge) — nouveau par rapport à la v1 */
  .btn-delete {
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--error);
    padding: 0.4rem;
    border-radius: 8px;
    transition: background 0.15s, color 0.15s;
    display: flex;
    align-items: center;
    font-size: 1rem;
  }
  .btn-delete:hover {
    background: var(--error-container);
    color: var(--on-error-cont);
  }

  .btn-voir {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    background: var(--surface-high);
    color: var(--on-surface);
    border: none;
    border-radius: 6px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: background 0.15s;
    font-family: 'Inter', sans-serif;
  }
  .btn-voir:hover { background: var(--outline-var); }

  /* ── Bouton Nouveau Client — AJOUTÉ par rapport à la v1 ── */
  .btn-new-client {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    height: 56px;
    padding: 0 2rem;
    background: var(--primary);
    color: #fff;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.95rem;
    font-family: 'Inter', sans-serif;
    cursor: pointer;
    white-space: nowrap;
    box-shadow: 0 2px 6px rgba(0,0,0,0.15);
    transition: opacity 0.2s;
    flex-shrink: 0;
  }
  .btn-new-client:hover { opacity: 0.88; }

  /* ── Pagination ── */
  .pagination-area {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 0;
  }
  .pagination-info {
    font-size: 0.7rem;
    color: var(--secondary);
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }
  .pag-btn {
    width: 40px; height: 40px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    background: var(--surface);
    color: var(--on-surface);
    font-weight: 600;
    transition: background 0.15s;
  }
  .pag-btn:hover   { background: var(--surface-high); }
  .pag-btn.is-current { background: var(--primary); color: white; }
  .pag-btn.arrow   { background: var(--surface-high); color: var(--secondary); }

  @media (max-width: 768px) {
    .ledger-header { display: none; }
    .ledger-row {
      grid-template-columns: 1fr;
      gap: 0.75rem;
    }
    .col-actions { justify-content: flex-start; }
    .col-status  { justify-content: flex-start; }
  }
  /* Debug helper: force modal above other elements to allow interaction */
  .modal { z-index: 10000 !important; }
  .modal-background { z-index: 9999 !important; pointer-events: auto !important; }
  .modal-card { z-index: 10001 !important; pointer-events: auto !important; }
`;