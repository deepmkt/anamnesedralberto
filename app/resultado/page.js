"use client";

import { useEffect, useRef, useState } from "react";
import {
  profiles,
  bonus,
  depoimentos,
  faq,
  CHECKOUT_URL,
} from "@/lib/quiz-data";
import { fbTrack, fbTrackCustom, checkoutUrl } from "@/lib/track";

const AUTORIDADE = [
  "Único médico brasileiro certificado pelo Instituto Michel Odent (Lyon, França)",
  "Autor de 2 livros sobre parto humanizado",
  "Mestre pela UNIFESP e docente universitário",
  "+3.000 partos acompanhados em 30 anos de carreira",
  "Atende nos hospitais Einstein, Pro Matre e Santa Joana",
];

const PILARES = [
  {
    t: "Intimidade e Sexo na Gestação",
    d: "Quebre tabus e mantenha a conexão com seu parceiro sem medo de machucar o bebê.",
  },
  {
    t: "Defesa Contra Violência Obstétrica",
    d: "Saiba exatamente o que dizer e como agir para garantir que seus direitos sejam respeitados.",
  },
  {
    t: "O Papel Real do Acompanhante",
    d: "Transforme seu parceiro de espectador assustado em seu maior guardião.",
  },
];

const DEADLINE_H = 72;

export default function Resultado() {
  const [nome, setNome] = useState("");
  const [perfil, setPerfil] = useState("A");
  const [left, setLeft] = useState(null);
  const [expired, setExpired] = useState(false);
  const fired = useRef({ s50: false, s90: false });

  useEffect(() => {
    let p = "A";
    let n = "";
    try {
      const raw = localStorage.getItem("psm_result");
      if (raw) {
        const r = JSON.parse(raw);
        p = r.perfil || "A";
        n = r.nome || "";
      }
    } catch {}
    setPerfil(p);
    setNome(n);
    fbTrack("CompleteRegistration", { perfil: p });

    // Timer honesto: 72h a partir da conclusão, persistido.
    let start;
    try {
      start = Number(localStorage.getItem("psm_deadline"));
      if (!start) {
        start = Date.now();
        localStorage.setItem("psm_deadline", String(start));
      }
    } catch {
      start = Date.now();
    }
    const end = start + DEADLINE_H * 3600 * 1000;
    const tick = () => {
      const ms = end - Date.now();
      if (ms <= 0) {
        setExpired(true);
        setLeft(null);
      } else setLeft(ms);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const pct =
        (window.scrollY + window.innerHeight) / document.body.scrollHeight;
      if (pct > 0.5 && !fired.current.s50) {
        fired.current.s50 = true;
        fbTrackCustom("result_scroll_50", { perfil });
      }
      if (pct > 0.9 && !fired.current.s90) {
        fired.current.s90 = true;
        fbTrackCustom("result_scroll_90", { perfil });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [perfil]);

  function buy() {
    fbTrack("InitiateCheckout", {
      value: 497,
      currency: "BRL",
      content_name: "parto_sem_medo",
      perfil,
    });
    window.location.href = checkoutUrl(CHECKOUT_URL, perfil);
  }

  const p = profiles[perfil];

  return (
    <main className="min-h-[100dvh] pb-24">
      {!expired && left !== null && <TimerBar ms={left} />}

      <div className="max-w-[640px] mx-auto px-5 pt-8">
        <div className="text-center">
          <span className="inline-block text-xs font-semibold bg-[#E8F3E4] text-[#3E8C4A] rounded-full px-3.5 py-1.5">
            ✓ ANÁLISE 100% CONCLUÍDA
          </span>
          <h1 className="font-serif text-[28px] leading-tight font-bold mt-5">
            {nome ? `${nome}, ` : ""}
            <span className="text-rose">{p.title}</span>
          </h1>
        </div>

        {/* Diagnóstico */}
        <div className="mt-7 bg-white rounded-2xl p-6 border-l-4 border-rose shadow-sm">
          <h2 className="font-serif text-lg font-bold mb-2">{p.boxTitle}</h2>
          <p className="text-[15px] leading-relaxed text-black/65">{p.text}</p>
          <p className="mt-4 text-[15px]">
            Mas a boa notícia é:{" "}
            <strong>isso tem solução e ela é mais simples do que você imagina.</strong>
          </p>
        </div>

        {/* Autoridade */}
        <section className="mt-10">
          <h3 className="font-serif text-center text-xl font-bold mb-5">
            Quem vai te guiar
          </h3>
          <div className="space-y-2.5">
            {AUTORIDADE.map((a, i) => (
              <div
                key={i}
                className="flex gap-3 items-start bg-white rounded-xl px-4 py-3 shadow-sm"
              >
                <span className="text-rose mt-0.5 shrink-0">✦</span>
                <span className="text-sm text-black/70 leading-snug">{a}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-4 text-sm text-black/50">
            ★★★★★ <strong className="text-black/70">4.9/5.0</strong> · centenas de
            avaliações reais
          </div>
        </section>

        {/* Protagonista */}
        <section className="mt-12">
          <h3 className="font-serif text-2xl font-bold text-center leading-tight">
            Você precisa ser a <span className="text-rose">Protagonista</span>
          </h3>
          <p className="text-center text-[15px] text-black/60 mt-3 mb-6">
            Ter um médico não é suficiente. No momento decisivo, é o{" "}
            <strong>seu corpo</strong> e a <strong>sua mente</strong> que comandam
            o espetáculo.
          </p>
          <div className="space-y-3">
            {PILARES.map((x, i) => (
              <div key={i} className="card p-5">
                <h4 className="font-serif font-bold mb-1">{x.t}</h4>
                <p className="text-sm text-black/60 leading-snug">{x.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Depoimentos */}
        <section className="mt-12">
          <h3 className="font-serif text-xl font-bold text-center mb-5">
            O que dizem quem já passou por isso
          </h3>
          <div className="space-y-3">
            {depoimentos.map((d, i) => (
              <div key={i} className="card p-5">
                <div className="text-amber-400 text-sm mb-2">★★★★★</div>
                <p className="text-sm italic text-black/65 leading-relaxed">
                  &ldquo;{d.texto}&rdquo;
                </p>
                <p className="text-sm font-semibold mt-3">— {d.autor}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bônus */}
        <section className="mt-12 card p-6">
          <h3 className="font-serif text-xl font-bold text-center mb-6">
            O que você recebe hoje
          </h3>
          <div className="space-y-4">
            {bonus.map((b, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-rose text-lg shrink-0">🎁</span>
                <div className="flex-1">
                  <div className="flex justify-between items-baseline gap-2">
                    <h4 className="font-serif font-bold text-[15px]">{b.title}</h4>
                    <span className="text-xs text-black/35 line-through shrink-0">
                      {b.value}
                    </span>
                  </div>
                  <p className="text-sm text-black/55 leading-snug">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-5 border-t border-black/5 text-center">
            <p className="text-sm text-black/50">
              Valor total dos bônus:{" "}
              <span className="line-through">R$ 658</span>
            </p>
            <p className="font-bold text-[#3E8C4A] mt-0.5">
              Hoje: INCLUSOS no seu acesso
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-12">
          <h3 className="font-serif text-xl font-bold text-center mb-5">
            Perguntas Frequentes
          </h3>
          <div className="space-y-2">
            {faq.map((f, i) => (
              <Faq key={i} q={f.q} a={f.a} />
            ))}
          </div>
        </section>

        {/* Oferta */}
        <section className="mt-12">
          <div className="bg-rose/[0.07] rounded-3xl p-7 text-center">
            {!expired && (
              <p className="text-black/40 line-through text-lg">De R$ 997,00</p>
            )}
            <p className="font-serif text-[42px] leading-none font-bold text-rose my-2">
              12x <span className="text-[46px]">R$ 57,97</span>
            </p>
            <p className="text-sm text-black/55">ou R$ 497,00 à vista</p>
            <p className="inline-block mt-3 text-xs bg-[#E8F3E4] text-[#3E8C4A] rounded-full px-3 py-1.5 font-medium">
              Menos de R$ 1,70 por dia para garantir sua segurança
            </p>
            {expired && (
              <p className="mt-4 text-xs text-black/45">
                Sua condição especial expirou. Este é o valor vigente.
              </p>
            )}
          </div>

          <button onClick={buy} className="btn-buy mt-5">
            QUERO MEU PARTO SEM MEDO →
          </button>

          <div className="flex justify-center gap-6 mt-4 text-xs text-black/45">
            <span>🔒 Compra Segura</span>
            <span>✓ Garantia de 30 Dias</span>
          </div>
        </section>

        <footer className="text-center text-xs text-black/30 mt-14">
          © 2026 Parto Sem Medo · Dr. Alberto Guimarães · CRM-SP 66026 | RQE-SP 14176
        </footer>
      </div>
    </main>
  );
}

function TimerBar({ ms }) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const pad = (n) => String(n).padStart(2, "0");
  return (
    <div className="sticky top-0 z-40 bg-rose text-white text-center py-2.5 text-sm">
      Sua condição especial expira em{" "}
      <strong className="tabular-nums">
        {pad(h)}:{pad(m)}:{pad(s)}
      </strong>
    </div>
  );
}

function Faq({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-xl overflow-hidden">
      <button
        onClick={() => {
          const next = !open;
          setOpen(next);
          if (next) fbTrackCustom("faq_open", { question: q });
        }}
        className="w-full flex justify-between items-center gap-3 px-5 py-4 text-left"
      >
        <span className="font-serif text-[15px] font-semibold">{q}</span>
        <span
          className={`text-black/30 transition-transform shrink-0 ${
            open ? "rotate-180" : ""
          }`}
        >
          ⌄
        </span>
      </button>
      {open && (
        <p className="px-5 pb-4 text-sm text-black/60 leading-relaxed">{a}</p>
      )}
    </div>
  );
}
