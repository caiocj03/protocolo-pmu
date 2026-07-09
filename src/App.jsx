import QuizProtocoloPMU from "./QuizProtocoloPMU";
import PainelLeadsPMU from "./PainelLeadsPMU";

export default function App() {
  const rota = window.location.pathname;
  if (rota === "/painel") return <PainelLeadsPMU />;
  return <QuizProtocoloPMU />;
}