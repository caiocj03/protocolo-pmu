import QuizProtocoloPMU from "./QuizProtocoloPMU";
import PainelLeadsPMU from "./PainelLeadsPMU";

const rota = window.location.pathname;

export default function App() {
  if (rota === "/painel" || rota === "/painel/") {
    return <PainelLeadsPMU />;
  }
  return <QuizProtocoloPMU />;
}