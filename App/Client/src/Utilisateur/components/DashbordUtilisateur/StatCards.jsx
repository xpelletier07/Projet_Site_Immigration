import { useEffect, useState} from "react";
import { getAllDossiersActifs,  getClientDossier } from "../../services/utilisateur.service";
import { getToken } from "../../../commun/commun.jsx";

export function StatCards() {
  const [nbDossiers, setNbDossiers] = useState(0);
  const [clientS, setclientS] = useState(0);
  const [clientA, setclientA] = useState(0);
  const [clientC, setclientC] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = getToken();

        const actifs = await getAllDossiersActifs(token);

        const contenu = await  getClientDossier(token)

        const clientsSansDossier = contenu.a;

        const clientsAvecDossier = contenu.b-contenu.a;

        setNbDossiers(actifs);

        setclientS(clientsSansDossier);

        setclientA(clientsAvecDossier);

        setclientC(contenu.c)

      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="columns mb-5">
      <div className="column">
        <div className="stat-card">
          <span className="badge-tag badge-global">GLOBAL</span>
          <div className="card-icon">
            <i className="fas fa-address-card" />
          </div>
          <div className="card-label">Dossiers actifs</div>
          <div className="card-value">{nbDossiers}</div>
          <div className="card-growth">
            {/*<i className="fas fa-arrow-trend-up" />*/}
          </div>
        </div>
      </div>

      <div className="column">
        <div className="stat-card">
          <span className="badge-tag badge-urgent">URGENT</span>
          <div className="card-icon">
            <i className="fas fa-clock" />
          </div>
          <div className="card-label">Dossiers en attente</div>
          <div className="card-value">{clientS}</div>
          <div className="card-sub">
          </div>
        </div>
      </div>

      <div className="column">
        <div className="stat-card">
          <span className="badge-tag badge-urgent">COMPLETE</span>
          <div className="card-icon">
            <i className="fa fa-check-square" />
          </div>
          <div className="card-label">Dossiers complétés</div>
          <div className="card-value">{clientA}</div>
          <div className="card-sub">
          </div>
        </div>
      </div>

      <div className="column">
        <div className="stat-card">
          <span className="badge-tag badge-urgent">TOTAL</span>
          <div className="card-icon">
            <i className="fa fa-check-square" />
          </div>
          <div className="card-label">Total Dossiers</div>
          <div className="card-value">{clientC}</div>
          <div className="card-sub">
          </div>
        </div>
      </div>
    </div>
  );
}