// painel-leads-pmu.jsx
import { useState, useEffect } from "react";

const SUPABASE_URL = "https://mjevjyahvnwkucmrkccz.supabase.co";
const SUPABASE_KEY = "sb_publishable_AmzVlXcinIMgGWO_BWT2YQ_dt6GoB3T";
const WHATSAPP_CAIO = "5515936182932";

const DORES = {
  instagram: { label: "Instagram", emoji: "📱", cor: "#C4956A" },
  atendimento: { label: "Atendimento", emoji: "💬", cor: "#8C6A4F" },
  agenda: { label: "Agenda", emoji: "📅", cor: "#B07D4F" },
  autoridade: { label: "Autoridade", emoji: "⭐", cor: "#9E7C5A" },
};

async function buscarLeads() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/leads?select=*&order=created_at.desc`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    }
  );
  return res.json();
}

async function marcarContatada(id, valor) {
  await fetch(`${SUPABASE_URL}/rest/v1/leads?id=eq.${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ contatada: valor }),
  });
}

function tempoRelativo(data) {
  const diff = Date.now() - new Date(data).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 60) return `${min}min atrás`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h}h atrás`;
  return `${Math.floor(h / 24)}d atrás`;
}

function exportarCSV(leads) {
  const header = ["nome", "whatsapp", "instagram", "dor_principal", "q1", "q2", "q3", "q4", "contatada", "data"];
  const linhas = leads.map((l) =>
    [l.nome, l.whatsapp, l.instagram || "", l.dor_principal, l.resposta_q1, l.resposta_q2, l.resposta_q3, l.resposta_q4, l.contatada ? "sim" : "não", l.created_at].join(",")
  );
  const blob = new Blob([[header, ...linhas].join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "leads-protocolo-pmu.csv";
  a.click();
}

export default function PainelLeadsPMU() {
  const [leads, setLeads] = useState([]);
  const [filtro, setFiltro] = useState("todos");
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);

  const cores = {
    bg: "#FDF8F5",
    card: "#FFFFFF",
    primary: "#C4956A",
    dark: "#3B2A1A",
    mid: "#8C6A4F",
    light: "#F5EDE4",
    border: "#E8D5C0",
  };

  useEffect(() => {
    buscarLeads().then((data) => {
      setLeads(Array.isArray(data) ? data : []);
      setCarregando(false);
    });
  }, []);

  const atualizar = async () => {
    setCarregando(true);
    const data = await buscarLeads();
    setLeads(Array.isArray(data) ? data : []);
    setCarregando(false);
  };

  const toggleContatada = async (lead) => {
    await marcarContatada(lead.id, !lead.contatada);
    setLeads((prev) =>
      prev.map((l) => (l.id === lead.id ? { ...l, contatada: !l.contatada } : l))
    );
  };

  const leadsVisiveis = leads.filter((l) => {
    const matchFiltro = filtro === "todos" || l.dor_principal === filtro;
    const matchBusca =
      !busca ||
      l.nome?.toLowerCase().includes(busca.toLowerCase()) ||
      l.whatsapp?.includes(busca) ||
      l.instagram?.toLowerCase().includes(busca.toLowerCase());
    return matchFiltro && matchBusca;
  });

  const stats = {
    total: leads.length,
    contatadas: leads.filter((l) => l.contatada).length,
    ...Object.fromEntries(Object.keys(DORES).map((d) => [d, leads.filter((l) => l.dor_principal === d).length])),
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: cores.bg, minHeight: "100vh", padding: "32px 16px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <div style={{ fontSize: "12px", color: cores.primary, fontWeight: "700", letterSpacing: "2px" }}>PROTOCOLO PMU</div>
            <h1 style={{ fontSize: "24px", fontWeight: "800", color: cores.dark, margin: "4px 0 0" }}>Painel de Leads</h1>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={atualizar} style={{ background: cores.light, border: `1px solid ${cores.border}`, borderRadius: "10px", padding: "10px 16px", fontSize: "14px", color: cores.dark, cursor: "pointer" }}>
              🔄 Atualizar
            </button>
            <button onClick={() => exportarCSV(leadsVisiveis)} style={{ background: cores.primary, border: "none", borderRadius: "10px", padding: "10px 16px", fontSize: "14px", color: "#fff", cursor: "pointer", fontWeight: "600" }}>
              ↓ Exportar CSV
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px", marginBottom: "24px" }}>
          {[
            { label: "Total de leads", valor: stats.total, emoji: "👥" },
            { label: "Contatadas", valor: stats.contatadas, emoji: "✅" },
            ...Object.entries(DORES).map(([key, d]) => ({ label: d.label, valor: stats[key] || 0, emoji: d.emoji })),
          ].map((s) => (
            <div key={s.label} style={{ background: cores.card, border: `1px solid ${cores.border}`, borderRadius: "14px", padding: "16px", textAlign: "center" }}>
              <div style={{ fontSize: "24px", marginBottom: "4px" }}>{s.emoji}</div>
              <div style={{ fontSize: "28px", fontWeight: "800", color: cores.dark }}>{s.valor}</div>
              <div style={{ fontSize: "12px", color: cores.mid }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filtros */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
          <input
            placeholder="Buscar por nome, WhatsApp ou @..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={{ flex: 1, minWidth: "200px", border: `1px solid ${cores.border}`, borderRadius: "10px", padding: "10px 14px", fontSize: "14px", background: cores.card, color: cores.dark, outline: "none" }}
          />
          {["todos", ...Object.keys(DORES)].map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              style={{ border: `1px solid ${filtro === f ? cores.primary : cores.border}`, borderRadius: "10px", padding: "10px 14px", fontSize: "13px", background: filtro === f ? cores.primary : cores.card, color: filtro === f ? "#fff" : cores.dark, cursor: "pointer", fontWeight: filtro === f ? "600" : "400" }}
            >
              {f === "todos" ? "Todos" : `${DORES[f].emoji} ${DORES[f].label}`}
            </button>
          ))}
        </div>

        {/* Lista */}
        {carregando ? (
          <div style={{ textAlign: "center", padding: "60px", color: cores.mid }}>Carregando leads...</div>
        ) : leadsVisiveis.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px", color: cores.mid }}>Nenhuma lead encontrada.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {leadsVisiveis.map((lead) => {
              const dInfo = DORES[lead.dor_principal] || {};
              return (
                <div
                  key={lead.id}
                  style={{ background: cores.card, border: `1px solid ${lead.contatada ? "#C8E6C9" : cores.border}`, borderRadius: "16px", padding: "20px", opacity: lead.contatada ? 0.7 : 1, transition: "all 0.2s" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                        <span style={{ fontSize: "17px", fontWeight: "700", color: cores.dark, textDecoration: lead.contatada ? "line-through" : "none" }}>
                          {lead.nome}
                        </span>
                        <span style={{ background: cores.light, border: `1px solid ${cores.border}`, borderRadius: "20px", padding: "2px 10px", fontSize: "12px", color: cores.mid, fontWeight: "600" }}>
                          {dInfo.emoji} {dInfo.label}
                        </span>
                      </div>
                      <div style={{ fontSize: "14px", color: cores.mid, marginBottom: "4px" }}>📱 {lead.whatsapp}</div>
                      {lead.instagram && <div style={{ fontSize: "14px", color: cores.mid, marginBottom: "4px" }}>@ {lead.instagram}</div>}
                      <div style={{ fontSize: "12px", color: cores.border, marginTop: "4px" }}>{tempoRelativo(lead.created_at)}</div>
                    </div>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      <a
                        href={`https://wa.me/${lead.whatsapp?.replace(/\D/g, "")}?text=${encodeURIComponent(`Oi ${lead.nome}! Vi que você fez o diagnóstico do Protocolo PMU e identificamos que seu maior gargalo é ${dInfo.label}. Posso te mostrar como resolver isso agora? 💛`)}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{ background: "#25D366", color: "#fff", border: "none", borderRadius: "10px", padding: "8px 14px", fontSize: "13px", fontWeight: "600", cursor: "pointer", textDecoration: "none" }}
                      >
                        WhatsApp →
                      </a>
                      <button
                        onClick={() => toggleContatada(lead)}
                        style={{ background: lead.contatada ? "#E8F5E9" : cores.light, color: lead.contatada ? "#2E7D32" : cores.mid, border: `1px solid ${lead.contatada ? "#A5D6A7" : cores.border}`, borderRadius: "10px", padding: "8px 14px", fontSize: "13px", cursor: "pointer" }}
                      >
                        {lead.contatada ? "✅ Contatada" : "Marcar contatada"}
                      </button>
                    </div>
                  </div>

                  {/* Respostas do quiz */}
                  <div style={{ display: "flex", gap: "8px", marginTop: "14px", flexWrap: "wrap" }}>
                    {[
                      { label: "Instagram", resp: lead.resposta_q1 },
                      { label: "Atendimento", resp: lead.resposta_q2 },
                      { label: "Agenda", resp: lead.resposta_q3 },
                      { label: "Autoridade", resp: lead.resposta_q4 },
                    ].map((r) => (
                      <span
                        key={r.label}
                        style={{ background: r.resp === "C" ? "#F1F8E9" : "#FFF3E0", border: `1px solid ${r.resp === "C" ? "#C5E1A5" : "#FFCC80"}`, borderRadius: "8px", padding: "4px 10px", fontSize: "12px", color: r.resp === "C" ? "#558B2F" : "#E65100" }}
                      >
                        {r.label}: {r.resp}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}