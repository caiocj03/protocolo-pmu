import { useState } from "react";

const SUPABASE_URL = "https://mjevjyahvnwkucmrkccz.supabase.co";
const SUPABASE_KEY = "sb_publishable_AmzVlXcinIMgGWO_BWT2YQ_dt6GoB3T";
const WHATSAPP_NUMBER = "5515936182932";
const LINK_CHECKOUT = "https://caio-cj06.hotmart.host/nova-pagina-6e91f809-3fd9-4e3d-8fbb-9cdde08f099c";

const perguntas = [
  {
    id: "q1",
    numero: "01",
    texto: "Como você descreveria sua presença no Instagram hoje?",
    alternativas: [
      { letra: "A", texto: "Posto com frequência, mas raramente alguém me procura por causa disso", peso: "instagram" },
      { letra: "B", texto: "Meu perfil está funcionando bem como canal de clientes", peso: null },
      { letra: "C", texto: "Não consigo manter uma linha visual consistente", peso: "instagram" },
    ],
  },
  {
    id: "q2",
    numero: "02",
    texto: "Quando uma cliente em potencial entra em contato, como costuma ser essa conversa?",
    alternativas: [
      { letra: "A", texto: "Consigo conduzir bem do primeiro contato até o agendamento", peso: null },
      { letra: "B", texto: "A conversa começa bem, mas trava quando o assunto é preço", peso: "atendimento" },
      { letra: "C", texto: "Cada atendimento é diferente, não sigo um padrão", peso: "atendimento" },
    ],
  },
  {
    id: "q3",
    numero: "03",
    texto: "Como está o ritmo da sua agenda nos últimos dois meses?",
    alternativas: [
      { letra: "A", texto: "Tem semanas cheias e semanas muito fracas, sem consistência", peso: "agenda" },
      { letra: "B", texto: "Clientes confirmam e às vezes somem no dia, isso acontece bastante", peso: "agenda" },
      { letra: "C", texto: "Minha agenda está estável, isso não é um problema pra mim", peso: null },
    ],
  },
  {
    id: "q4",
    numero: "04",
    texto: "Como as pessoas chegam até você hoje?",
    alternativas: [
      { letra: "A", texto: "Quase tudo por indicação, mas quero atrair clientes novas também", peso: "autoridade" },
      { letra: "B", texto: "Tenho uma boa mistura de indicação e clientes que me acham pelo digital", peso: null },
      { letra: "C", texto: "O digital não está me trazendo cliente nenhum de forma consistente", peso: "autoridade" },
    ],
  },
];

const neutros = { q1: "B", q2: "A", q3: "C", q4: "B" };

const diagnosticos = {
  instagram: {
    titulo: "Presença Digital que Não Converte",
    icone: "◈",
    modulo: "Módulo 1 — Perfil que Atrai e Vende",
    variantes: {
      instagram_autoridade: {
        subtitulo: "Você está invisível para quem ainda não te conhece",
        texto: "Suas clientes chegam por indicação porque quem já te conhece confia no seu trabalho. O problema é que seu perfil não está transmitindo essa mesma confiança para quem chega fria. Resultado: você depende de indicação para sempre — e isso tem um limite.",
      },
      instagram_atendimento: {
        subtitulo: "O problema começa antes do contato",
        texto: "Antes mesmo de uma cliente mandar mensagem, ela já decidiu se vai ou não entrar em contato — e essa decisão acontece no seu perfil. Com a estrutura certa, você atrai clientes mais qualificadas e a conversa de fechamento fica muito mais natural.",
      },
      default: {
        subtitulo: "Seu maior gargalo está na vitrine",
        texto: "O Instagram é sua primeira impressão. Quando ele não está estruturado para converter, você perde clientes que nunca vão te avisar que foram embora. A boa notícia é que esse é o gargalo mais rápido de resolver quando você sabe o que mudar.",
      },
    },
  },
  atendimento: {
    titulo: "Atendimento que Perde Clientes",
    icone: "◈",
    modulo: "Módulo 3 — Protocolo de Fechamento",
    variantes: {
      atendimento_agenda: {
        subtitulo: "Atendimento e agenda andam juntos",
        texto: "Uma agenda instável frequentemente tem raiz em um atendimento sem padrão. Quando não existe um processo claro de condução da cliente, o no-show e os furos aparecem como consequência. Os dois problemas têm a mesma solução.",
      },
      atendimento_autoridade: {
        subtitulo: "Você convence pelo trabalho, mas não pelo processo",
        texto: "Sua autoridade vem do resultado que você entrega, mas a conversa de venda não está acompanhando esse nível. Clientes que chegam com interesse acabam não agendando porque algo na comunicação gera insegurança ou demora demais.",
      },
      default: {
        subtitulo: "O gargalo está na conversa",
        texto: "A maioria das profissionais perde clientes não pelo trabalho, mas pelo que acontece entre o primeiro contato e o agendamento. Ter um protocolo de atendimento é a diferença entre converter 3 em 10 ou 8 em 10 clientes — com o mesmo número de interessadas.",
      },
    },
  },
  agenda: {
    titulo: "Agenda Sem Previsibilidade",
    icone: "◈",
    modulo: "Módulo 4 — Sistema de Agenda Cheia",
    variantes: {
      agenda_instagram: {
        subtitulo: "Você precisa de demanda constante, não só esporádica",
        texto: "O Instagram poderia estar alimentando sua agenda de forma contínua, mas sem a estrutura certa ele só gera interesse ocasional. Quando os dois sistemas funcionam juntos, a agenda se preenche de forma previsível — sem depender de sorte.",
      },
      agenda_autoridade: {
        subtitulo: "Você depende de indicação para encher a agenda",
        texto: "Indicação é o melhor cliente, mas não dá para construir um negócio previsível dependendo só disso. Quando você tem autoridade digital e um sistema de agenda funcionando, você para de torcer para o telefone tocar.",
      },
      default: {
        subtitulo: "Faturamento imprevisível tem solução sistemática",
        texto: "Uma agenda irregular não é questão de mercado nem de sorte. É questão de processo. Com o sistema certo, você sabe com antecedência como vai ser sua semana — e age antes que os buracos apareçam.",
      },
    },
  },
  autoridade: {
    titulo: "Autoridade que Não Aparece",
    icone: "◈",
    modulo: "Módulo 5 — Construção de Autoridade Digital",
    variantes: {
      autoridade_instagram: {
        subtitulo: "Você precisa ser vista como referência, não só como opção",
        texto: "Quando uma cliente pesquisa profissionais de PMU, ela compara. O que aparece no seu perfil precisa comunicar autoridade de forma imediata — e isso é construído com consistência estratégica, não com sorte ou volume de publicações.",
      },
      autoridade_atendimento: {
        subtitulo: "A confiança precisa começar antes da conversa",
        texto: "Clientes que já chegam convictas fecham mais rápido e sem objeção de preço. Isso acontece quando a autoridade já foi construída antes do contato. O atendimento fica muito mais fácil quando a decisão já foi 80% tomada.",
      },
      default: {
        subtitulo: "Seu trabalho merece ser visto",
        texto: "Autoridade digital não é sobre ter muitos seguidores. É sobre as pessoas certas enxergarem você como a profissional certa. Com a estrutura adequada, cada trabalho entregue se torna um ativo que atrai a próxima cliente.",
      },
    },
  },
};

function calcularResultado(respostas) {
  const dores = perguntas
    .filter((p) => respostas[p.id] && respostas[p.id] !== neutros[p.id])
    .map((p) => {
      const alt = p.alternativas.find((a) => a.letra === respostas[p.id]);
      return alt?.peso;
    })
    .filter(Boolean);

  const dorPrincipal = dores.length > 0 ? dores[0] : "instagram";
  const dorSecundaria = dores.length > 1 ? dores[1] : null;

  let varianteKey = "default";
  if (dorSecundaria) {
    const diag = diagnosticos[dorPrincipal].variantes;
    const chave = `${dorPrincipal}_${dorSecundaria}`;
    const chaveInversa = `${dorSecundaria}_${dorPrincipal}`;
    if (diag[chave]) varianteKey = chave;
    else if (diag[chaveInversa]) varianteKey = chaveInversa;
  }

  return { dorPrincipal, varianteKey, totalDores: dores.length };
}

async function salvarLead(dados) {
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify(dados),
    });
  } catch (e) {
    console.error("Erro ao salvar lead:", e);
  }
}

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

const estiloGlobal = {
  fontFamily: "'Georgia', 'Times New Roman', serif",
  background: C.bg,
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "24px 16px",
};

const estiloCard = {
  background: C.bgCard,
  borderRadius: "4px",
  padding: "52px 44px",
  maxWidth: "500px",
  width: "100%",
  border: `1px solid ${C.borda}`,
  boxShadow: "0 0 80px rgba(201,168,76,0.04), 0 32px 64px rgba(0,0,0,0.6)",
  position: "relative",
};

const estiloInput = {
  width: "100%",
  background: C.bgAlt,
  border: `1px solid ${C.borda}`,
  borderRadius: "2px",
  padding: "16px 20px",
  fontSize: "15px",
  color: C.texto,
  outline: "none",
  boxSizing: "border-box",
  marginBottom: "14px",
  fontFamily: "'Georgia', serif",
  letterSpacing: "0.3px",
  transition: "border-color 0.2s",
};

const estiloLinhaOuro = {
  width: "40px",
  height: "1px",
  background: `linear-gradient(90deg, transparent, ${C.ouro}, transparent)`,
  margin: "0 auto 24px",
};

const LinhaTop = () => (
  <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "60px", height: "1px", background: `linear-gradient(90deg, transparent, ${C.ouro}, transparent)` }} />
);

const LinhaBottom = () => (
  <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "60px", height: "1px", background: `linear-gradient(90deg, transparent, ${C.ouro}, transparent)` }} />
);

export default function QuizProtocoloPMU() {
  const [etapa, setEtapa] = useState("cadastro");
  const [cadastro, setCadastro] = useState({ nome: "", whatsapp: "", instagram: "" });
  const [respostas, setRespostas] = useState({});
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [resultado, setResultado] = useState(null);
  const [inputFocus, setInputFocus] = useState(null);
  const [hoverAlt, setHoverAlt] = useState(null);
  const [hoverBtn, setHoverBtn] = useState(false);

  const primeiroNome = cadastro.nome.trim().split(" ")[0];

  if (etapa === "cadastro") {
    return (
      <div style={estiloGlobal}>
        <div style={estiloCard}>
          <LinhaTop />
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <div style={{ fontSize: "10px", color: C.ouro, letterSpacing: "4px", marginBottom: "20px" }}>
              PROTOCOLO PMU
            </div>
            <div style={estiloLinhaOuro} />
            <h1 style={{ fontSize: "26px", fontWeight: "400", color: C.texto, margin: "0 0 16px", lineHeight: "1.4", letterSpacing: "0.5px" }}>
              Descubra seu maior<br />gargalo digital
            </h1>
            <p style={{ fontSize: "13px", color: C.textoSub, lineHeight: "1.9", margin: 0, letterSpacing: "0.5px" }}>
              4 perguntas. Diagnóstico personalizado.<br />Resultado na hora.
            </p>
          </div>

          {["nome", "whatsapp", "instagram"].map((campo) => (
            <input
              key={campo}
              style={{ ...estiloInput, borderColor: inputFocus === campo ? C.ouroEscuro : C.borda }}
              placeholder={campo === "nome" ? "Seu nome *" : campo === "whatsapp" ? "WhatsApp com DDD *" : "@ do Instagram (opcional)"}
              value={cadastro[campo]}
              onFocus={() => setInputFocus(campo)}
              onBlur={() => setInputFocus(null)}
              onChange={(e) => setCadastro({ ...cadastro, [campo]: e.target.value })}
            />
          ))}

          <button
            style={{
              width: "100%",
              padding: "18px",
              marginTop: "6px",
              background: hoverBtn && cadastro.nome && cadastro.whatsapp
                ? `linear-gradient(135deg, ${C.ouroClaro}, ${C.ouro})`
                : `linear-gradient(135deg, ${C.ouro}, ${C.ouroEscuro})`,
              border: "none",
              borderRadius: "2px",
              color: "#0E0B08",
              fontSize: "13px",
              fontWeight: "700",
              letterSpacing: "2px",
              cursor: cadastro.nome && cadastro.whatsapp ? "pointer" : "not-allowed",
              opacity: cadastro.nome && cadastro.whatsapp ? 1 : 0.4,
              fontFamily: "'Georgia', serif",
              transition: "all 0.2s",
            }}
            disabled={!cadastro.nome || !cadastro.whatsapp}
            onMouseEnter={() => setHoverBtn(true)}
            onMouseLeave={() => setHoverBtn(false)}
            onClick={() => setEtapa("quiz")}
          >
            INICIAR DIAGNÓSTICO
          </button>

          <p style={{ fontSize: "11px", color: C.ouroEscuro, textAlign: "center", marginTop: "20px", letterSpacing: "0.5px" }}>
            🔒 Seus dados não serão compartilhados.
          </p>
          <LinhaBottom />
        </div>
      </div>
    );
  }

  if (etapa === "quiz") {
    const p = perguntas[perguntaAtual];

    const responder = async (letra) => {
      const novasRespostas = { ...respostas, [p.id]: letra };
      setRespostas(novasRespostas);
      setHoverAlt(null);

      if (perguntaAtual < perguntas.length - 1) {
        setPerguntaAtual(perguntaAtual + 1);
      } else {
        setEtapa("processando");
        const calc = calcularResultado(novasRespostas);
        setResultado(calc);
        await salvarLead({
          nome: cadastro.nome,
          whatsapp: cadastro.whatsapp,
          instagram: cadastro.instagram || null,
          dor_principal: calc.dorPrincipal,
          variante_resultado: calc.varianteKey,
          total_gargalos: calc.totalDores,
          resposta_q1: novasRespostas.q1,
          resposta_q2: novasRespostas.q2,
          resposta_q3: novasRespostas.q3,
          resposta_q4: novasRespostas.q4,
          contatada: false,
        });
        setTimeout(() => setEtapa("resultado"), 3000);
      }
    };

    return (
      <div style={estiloGlobal}>
        <div style={estiloCard}>
          <LinhaTop />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
            <span style={{ fontSize: "10px", color: C.ouroEscuro, letterSpacing: "3px" }}>PROTOCOLO PMU</span>
            <span style={{ fontSize: "11px", color: C.textoSub, letterSpacing: "1px" }}>
              {perguntaAtual + 1} <span style={{ color: C.ouroEscuro }}>/ 4</span>
            </span>
          </div>

          <div style={{ height: "1px", background: C.borda, marginBottom: "40px", position: "relative" }}>
            <div style={{
              position: "absolute", top: 0, left: 0, height: "100%",
              width: `${(perguntaAtual / 4) * 100}%`,
              background: `linear-gradient(90deg, ${C.ouroEscuro}, ${C.ouro})`,
              transition: "width 0.4s ease",
            }} />
          </div>

          <div style={{ marginBottom: "8px" }}>
            <span style={{ fontSize: "48px", color: C.bordaOuro, lineHeight: 1 }}>{p.numero}</span>
          </div>

          <h2 style={{ fontSize: "20px", fontWeight: "400", color: C.texto, marginBottom: "8px", lineHeight: "1.5", letterSpacing: "0.3px" }}>
            {p.texto}
          </h2>
          <p style={{ fontSize: "12px", color: C.ouroEscuro, marginBottom: "28px", letterSpacing: "0.5px" }}>
            Escolha a que mais se aproxima da sua realidade{primeiroNome ? `, ${primeiroNome}` : ""}.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {p.alternativas.map((alt) => (
              <button
                key={alt.letra}
                onClick={() => responder(alt.letra)}
                onMouseEnter={() => setHoverAlt(alt.letra)}
                onMouseLeave={() => setHoverAlt(null)}
                style={{
                  background: hoverAlt === alt.letra ? C.bgAlt : "transparent",
                  border: `1px solid ${hoverAlt === alt.letra ? C.ouroEscuro : C.borda}`,
                  borderRadius: "2px",
                  padding: "18px 20px",
                  textAlign: "left",
                  cursor: "pointer",
                  fontSize: "14px",
                  color: hoverAlt === alt.letra ? C.texto : C.textoSub,
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  transition: "all 0.15s",
                  fontFamily: "'Georgia', serif",
                  letterSpacing: "0.3px",
                  lineHeight: "1.5",
                }}
              >
                <span style={{
                  minWidth: "28px",
                  height: "28px",
                  border: `1px solid ${hoverAlt === alt.letra ? C.ouro : C.borda}`,
                  borderRadius: "2px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "11px",
                  color: hoverAlt === alt.letra ? C.ouro : C.ouroEscuro,
                  letterSpacing: "1px",
                  transition: "all 0.15s",
                  flexShrink: 0,
                }}>
                  {alt.letra}
                </span>
                {alt.texto}
              </button>
            ))}
          </div>

          <LinhaBottom />
        </div>
      </div>
    );
  }

  if (etapa === "processando") {
    return (
      <div style={estiloGlobal}>
        <div style={{ ...estiloCard, textAlign: "center", padding: "72px 44px" }}>
          <div style={{ fontSize: "10px", color: C.ouro, letterSpacing: "4px", marginBottom: "32px" }}>
            PROTOCOLO PMU
          </div>
          <div style={estiloLinhaOuro} />
          <div style={{ fontSize: "32px", color: C.ouro, marginBottom: "24px", display: "inline-block", animation: "spin 2s linear infinite" }}>
            ◈
          </div>
          <h2 style={{ fontSize: "18px", fontWeight: "400", color: C.texto, marginBottom: "12px", letterSpacing: "0.5px" }}>
            Analisando seu perfil{primeiroNome ? `, ${primeiroNome}` : ""}
          </h2>
          <p style={{ fontSize: "13px", color: C.textoSub, letterSpacing: "0.5px" }}>
            Cruzando suas respostas com os padrões identificados...
          </p>
          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  if (etapa === "resultado" && resultado) {
    const { dorPrincipal, varianteKey, totalDores } = resultado;
    const d = diagnosticos[dorPrincipal];
    const v = d.variantes[varianteKey] || d.variantes.default;

    const textoGargalos =
      totalDores === 0
        ? "Seu negócio já está bem estruturado digitalmente."
        : totalDores === 1
        ? "Identificamos 1 gargalo principal no seu negócio."
        : `Identificamos ${totalDores} pontos de atenção no seu negócio.`;

    const msg = encodeURIComponent(
      `Olá! Acabei de concluir o diagnóstico do Protocolo PMU.\n\nMeu nome é ${cadastro.nome} e meu maior gargalo identificado foi: *${d.titulo}* — ${v.subtitulo}.\n\nGostaria de entender como resolver isso.`
    );

    return (
      <div style={estiloGlobal}>
        <div style={estiloCard}>
          <LinhaTop />

          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div style={{ fontSize: "10px", color: C.ouro, letterSpacing: "4px", marginBottom: "20px" }}>
              SEU DIAGNÓSTICO
            </div>
            <div style={estiloLinhaOuro} />
            <div style={{ fontSize: "11px", color: C.ouroEscuro, letterSpacing: "2px", marginBottom: "20px" }}>
              {textoGargalos}
            </div>
            <div style={{ fontSize: "28px", color: C.ouro, marginBottom: "12px" }}>{d.icone}</div>
            <h2 style={{ fontSize: "22px", fontWeight: "400", color: C.texto, margin: "0 0 8px", letterSpacing: "0.5px" }}>
              {d.titulo}
            </h2>
            <div style={{ fontSize: "13px", color: C.ouro, marginBottom: "20px", letterSpacing: "0.5px" }}>
              {v.subtitulo}
            </div>
            <p style={{ fontSize: "14px", color: C.textoSub, lineHeight: "1.9", margin: 0, letterSpacing: "0.3px" }}>
              {v.texto}
            </p>
          </div>

          <div style={{ border: `1px solid ${C.bordaOuro}`, borderRadius: "2px", padding: "20px 24px", marginBottom: "28px", background: C.bgAlt }}>
            <div style={{ fontSize: "9px", color: C.ouroEscuro, letterSpacing: "3px", marginBottom: "8px" }}>
              SOLUÇÃO RECOMENDADA
            </div>
            <div style={{ fontSize: "14px", color: C.ouro, letterSpacing: "0.3px" }}>{d.modulo}</div>
          </div>

          <p style={{ fontSize: "13px", color: C.textoSub, lineHeight: "1.9", marginBottom: "28px", letterSpacing: "0.3px" }}>
            O <span style={{ color: C.texto }}>Protocolo PMU</span> resolve esse gargalo — e os outros ao mesmo tempo. São cinco módulos com scripts prontos, calendário de conteúdo e tudo que você precisa para parar de improvisar.
          </p>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "block",
              textAlign: "center",
              padding: "18px",
              background: "#25D366",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "2px",
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "2px",
              marginBottom: "12px",
              fontFamily: "'Georgia', serif",
            }}
          >
            FALAR SOBRE MEU DIAGNÓSTICO
          </a>

          <a
            href={LINK_CHECKOUT}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "block",
              textAlign: "center",
              padding: "18px",
              background: `linear-gradient(135deg, ${C.ouro}, ${C.ouroEscuro})`,
              color: "#0E0B08",
              textDecoration: "none",
              borderRadius: "2px",
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "2px",
              fontFamily: "'Georgia', serif",
            }}
          >
            CONHECER O PROTOCOLO PMU
          </a>

          <LinhaBottom />
        </div>
      </div>
    );
  }

  return null;
}