import { useState, useEffect } from "react";

const SUPABASE_URL = "https://mjevjyahvnwkucmrkccz.supabase.co";
const SUPABASE_KEY = "sb_publishable_AmzVlXcinIMgGWO_BWT2YQ_dt6GoB3T";

const C = {
  bg: "#0E0B08",
  bgCard: "#161109",
  bgAlt: "#1C1610",
  ouro: "#C9A84C",
  ouroClaro: "#E8C97A",
  ouroEscuro: "#8B6D28",
  texto: "#F0E8D8",
  textoSub: "#9A8A6A",
  borda: "#2E2418",
  bordaOuro: "#3D2E14",
};

export default function PainelLeadsPMU() {
  const [leads, setLeads] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    buscarLeads();
  }, []);

  async function buscarLeads() {
    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/leads?select=*&order=created_at.desc`,
        {
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
          },
        }
      );
      const data = await res.json();
      setLeads(data);
    } catch (e) {
      setErro("Erro ao carregar leads.");
    } finally {
      setCarregando(false);
    }
  }

  const labels = {
    instagram: "Presença Digital",
    atendimento: "Atendimento",
    agenda: "Agenda",
    autoridade: "Autoridade",
  };

  return (
    <div style={{ background: C.bg, minHeight: "100vh", padding: "40px 24px", fontFamily: "'Georgia', serif" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ fontSize: "10px", color: C.ouro, letterSpacing: "4px", marginBottom: "12px" }}>
            PROTOCOLO PMU
          </div>
          <h1 style={{ fontSize: "24px", fontWeight: "400", color: C.texto, margin: "0 0 8px" }}>
            Painel de Leads
          </h1>
          <p style={{ fontSize: "13px", color: C.textoSub, margin: 0 }}>
            {leads.length} lead{leads.length !== 1 ? "s" : ""} capturado{leads.length !== 1 ? "s" : ""}
          </p>
        </div>

        {carregando && (
          <p style={{ color: C.textoSub, textAlign: "center" }}>Carregando...</p>
        )}

        {erro && (
          <p style={{ color: "#e55", textAlign: "center" }}>{erro}</p>
        )}

        {!carregando && leads.length === 0 && (
          <p style={{ color: C.textoSub, textAlign: "center" }}>Nenhum lead ainda.</p>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {leads.map((lead) => (
            <div
              key={lead.id}
              style={{
                background: C.bgCard,
                border: `1px solid ${C.borda}`,
                borderRadius: "4px",
                padding: "24px 28px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr auto",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <div>
                <div style={{ fontSize: "15px", color: C.texto, marginBottom: "4px" }}>{lead.nome}</div>
                <div style={{ fontSize: "12px", color: C.textoSub }}>{lead.whatsapp}</div>
                {lead.instagram && (
                  <div style={{ fontSize: "12px", color: C.ouroEscuro }}>@{lead.instagram}</div>
                )}
              </div>

              <div>
                <div style={{ fontSize: "9px", color: C.ouroEscuro, letterSpacing: "2px", marginBottom: "6px" }}>
                  GARGALO
                </div>
                <div style={{ fontSize: "13px", color: C.ouro }}>
                  {labels[lead.dor_principal] || lead.dor_principal || "—"}
                </div>
              </div>

              <div>
                <div style={{ fontSize: "9px", color: C.ouroEscuro, letterSpacing: "2px", marginBottom: "6px" }}>
                  DATA
                </div>
                <div style={{ fontSize: "13px", color: C.textoSub }}>
                  {new Date(lead.created_at).toLocaleDateString("pt-BR")}
                </div>
              </div>

              <a
                href={`https://wa.me/${lead.whatsapp?.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: "10px 16px",
                  background: "#25D366",
                  color: "#fff",
                  textDecoration: "none",
                  borderRadius: "2px",
                  fontSize: "11px",
                  fontWeight: "700",
                  letterSpacing: "1px",
                  whiteSpace: "nowrap",
                }}
              >
                CONTATAR
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}