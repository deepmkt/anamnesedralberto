"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { questions, getProfile } from "@/lib/quiz-data";
import {
  fbTrack,
  fbTrackCustom,
  fbAdvancedMatching,
  saveLead,
  getUtms,
} from "@/lib/track";

const STORAGE = "psm_quiz_state";
const NAME_AFTER = 3; // captura o nome depois da pergunta 3

/* ---------- Etapas ---------- */
const STEP = {
  QUESTION: "question",
  FEEDBACK: "feedback",
  NAME: "name",
  PROCESSING: "processing",
  COMMIT: "commit",
  FORM: "form",
};

export default function Quiz() {
  const router = useRouter();
  const [step, setStep] = useState(STEP.QUESTION);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");
  const [resumed, setResumed] = useState(false);
  const [exitShown, setExitShown] = useState(false);
  const [showExit, setShowExit] = useState(false);
  const startedRef = useRef(false);

  /* ViewContent + retomada de progresso */
  useEffect(() => {
    fbTrack("ViewContent", {
      content_name: "quiz_parto_sem_medo",
      content_category: "quiz",
    });
    try {
      const raw = localStorage.getItem(STORAGE);
      if (raw) {
        const s = JSON.parse(raw);
        const fresh = Date.now() - (s.ts || 0) < 7 * 24 * 60 * 60 * 1000;
        if (fresh && s.qIndex > 0) {
          setAnswers(s.answers || {});
          setName(s.name || "");
          setQIndex(s.qIndex);
          setResumed(true);
          startedRef.current = true;
        }
      }
    } catch {}
  }, []);

  /* Persistência */
  useEffect(() => {
    if (qIndex === 0 && !name) return;
    try {
      localStorage.setItem(
        STORAGE,
        JSON.stringify({ answers, name, qIndex, ts: Date.now() })
      );
    } catch {}
  }, [answers, name, qIndex]);

  /* Exit intent (mobile: aba escondida | desktop: mouse sai pelo topo) */
  useEffect(() => {
    if (exitShown || step === STEP.FORM || step === STEP.PROCESSING) return;
    const onLeave = (e) => {
      if (e.clientY <= 0 && startedRef.current) trigger();
    };
    const onHide = () => {
      if (document.visibilityState === "hidden" && startedRef.current) {
        fbTrackCustom("quiz_abandon", { last_question: qIndex + 1 });
      }
    };
    const trigger = () => {
      setShowExit(true);
      setExitShown(true);
    };
    document.addEventListener("mouseout", onLeave);
    document.addEventListener("visibilitychange", onHide);
    return () => {
      document.removeEventListener("mouseout", onLeave);
      document.removeEventListener("visibilitychange", onHide);
    };
  }, [exitShown, step, qIndex]);

  const q = questions[qIndex];
  const progress = Math.round(((qIndex + (step === STEP.QUESTION ? 0 : 1)) / questions.length) * 100);

  function answer(opt) {
    if (!startedRef.current) {
      startedRef.current = true;
      fbTrackCustom("quiz_start");
    }
    const next = { ...answers, [q.key]: opt.value };
    setAnswers(next);
    fbTrackCustom("quiz_question_answered", {
      question_number: q.id,
      answer: opt.value,
    });
    setFeedback(opt.feedback);
    setStep(STEP.FEEDBACK);
  }

  function afterFeedback() {
    if (qIndex + 1 === NAME_AFTER && !name) {
      setStep(STEP.NAME);
      return;
    }
    advance();
  }

  function advance() {
    if (qIndex + 1 < questions.length) {
      setQIndex(qIndex + 1);
      setStep(STEP.QUESTION);
    } else {
      fbTrackCustom("quiz_complete", { perfil: getProfile(answers) });
      setStep(STEP.PROCESSING);
    }
  }

  function submitName(v) {
    setName(v);
    fbTrackCustom("name_captured");
    advance();
  }

  return (
    <main className="min-h-[100dvh] flex flex-col">
      <Header />

      {step !== STEP.PROCESSING && (
        <Progress value={step === STEP.FORM || step === STEP.COMMIT ? 100 : progress} />
      )}

      <div className="flex-1 flex items-start justify-center px-4 pb-10">
        <div className="w-full max-w-[520px]">
          {resumed && step === STEP.QUESTION && (
            <div className="mb-4 text-center text-sm bg-rose/10 text-rose rounded-xl py-2.5 px-4 fade-up">
              Que bom que você voltou! Suas respostas estão salvas. 💛
            </div>
          )}

          {step === STEP.QUESTION && (
            <Question q={q} name={name} onAnswer={answer} />
          )}
          {step === STEP.FEEDBACK && (
            <Feedback text={feedback} onNext={afterFeedback} />
          )}
          {step === STEP.NAME && <NameCapture onSubmit={submitName} />}
          {step === STEP.PROCESSING && (
            <Processing onDone={() => setStep(STEP.COMMIT)} />
          )}
          {step === STEP.COMMIT && (
            <Commit name={name} onNext={() => setStep(STEP.FORM)} />
          )}
          {step === STEP.FORM && (
            <LeadForm name={name} answers={answers} router={router} />
          )}
        </div>
      </div>

      {showExit && (
        <ExitModal
          name={name}
          onStay={() => setShowExit(false)}
        />
      )}

      <footer className="text-center text-xs text-black/35 pb-6 px-4">
        © 2026 Parto Sem Medo · Dr. Alberto Guimarães · CRM-SP 66026
      </footer>
    </main>
  );
}

/* ---------------- Componentes ---------------- */

function Header() {
  return (
    <header className="pt-6 pb-4 text-center px-4">
      <div className="inline-flex items-center gap-2 font-serif font-bold text-lg">
        <span className="w-7 h-7 rounded-full bg-rose text-white grid place-items-center text-sm">
          P
        </span>
        Parto Sem Medo
      </div>
    </header>
  );
}

function Progress({ value }) {
  return (
    <div className="px-4 max-w-[520px] mx-auto w-full mb-5">
      <div className="flex justify-between text-xs text-black/40 mb-1.5">
        <span>{value}% concluído</span>
        <span>
          {value < 40 ? "Ótimo começo!" : value < 80 ? "Falta pouco!" : "Quase lá!"}
        </span>
      </div>
      <div className="h-1.5 bg-black/[0.06] rounded-full overflow-hidden">
        <div
          className="h-full bg-rose rounded-full transition-all duration-500 ease-out"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function Question({ q, name, onAnswer }) {
  const [sel, setSel] = useState(null);
  const title = name ? `${name}, ${lower(q.title)}` : q.title;

  function pick(opt, i) {
    setSel(i);
    setTimeout(() => onAnswer(opt), 140);
  }

  return (
    <div className="slide-in" key={q.id}>
      {q.id === 1 && (
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-2 text-xs bg-white rounded-full px-3.5 py-1.5 shadow-sm mb-4">
            <span className="text-rose">★</span>
            <span className="text-black/60">+5.000 gestantes já fizeram</span>
          </div>
          <h1 className="font-serif text-[26px] leading-tight font-bold mb-1.5">
            Descubra Seu Nível de{" "}
            <span className="text-rose">Preparo para o Parto</span>
          </h1>
          <p className="text-sm text-black/50">
            Criado pelo Dr. Alberto Guimarães, obstetra com +3.000 partos
          </p>
        </div>
      )}

      <div className="card p-5">
        <h2 className="font-serif text-xl font-bold text-center leading-snug mb-1.5">
          {title}
        </h2>
        {q.subtitle && (
          <p className="text-center text-sm text-black/45 mb-5">{q.subtitle}</p>
        )}
        {!q.subtitle && <div className="mb-5" />}

        <div className="space-y-3">
          {q.options.map((o, i) => (
            <button
              key={i}
              onClick={() => pick(o, i)}
              className={`opt ${sel === i ? "opt-active" : ""}`}
            >
              {o.emoji && <span className="text-xl">{o.emoji}</span>}
              <span className="flex-1 text-[15px] leading-snug">{o.text}</span>
              <span
                className={`w-5 h-5 rounded-full border-2 shrink-0 ${
                  sel === i ? "border-rose bg-rose" : "border-black/15"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {q.id === 1 && (
        <p className="text-center text-xs text-black/40 mt-4">
          ⏱️ 2 minutos · Resultado na hora · 100% gratuito
        </p>
      )}
    </div>
  );
}

function Feedback({ text, onNext }) {
  useEffect(() => {
    const t = setTimeout(onNext, 2800);
    return () => clearTimeout(t);
  }, [onNext]);

  return (
    <div className="card p-7 text-center fade-up">
      <div className="w-14 h-14 rounded-full bg-[#E8F3E4] grid place-items-center mx-auto mb-4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 12.5l5 5L20 6.5"
            stroke="#5FBF6C"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <p className="text-[15px] leading-relaxed text-black/70">{text}</p>
      <button
        onClick={onNext}
        className="mt-6 text-rose font-semibold text-sm"
      >
        Continuar →
      </button>
    </div>
  );
}

function NameCapture({ onSubmit }) {
  const [v, setV] = useState("");
  const ok = v.trim().length >= 2;
  return (
    <div className="card p-6 fade-up">
      <h2 className="font-serif text-xl font-bold text-center mb-2">
        Antes de continuar...
      </h2>
      <p className="text-center text-sm text-black/50 mb-6">
        Como você se chama? Vou personalizar sua análise.
      </p>
      <input
        autoFocus
        value={v}
        onChange={(e) => setV(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && ok && onSubmit(v.trim())}
        placeholder="Seu primeiro nome"
        className="w-full px-4 py-4 rounded-2xl border border-black/10 outline-none focus:border-rose text-center text-lg"
      />
      <button
        disabled={!ok}
        onClick={() => onSubmit(v.trim())}
        className="btn mt-4"
      >
        Continuar →
      </button>
    </div>
  );
}

function Processing({ onDone }) {
  const steps = [
    "Analisando suas respostas...",
    "Identificando seu perfil...",
    "Montando seu plano personalizado...",
  ];
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n >= steps.length) {
      const t = setTimeout(onDone, 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setN(n + 1), 900);
    return () => clearTimeout(t);
  }, [n, onDone, steps.length]);

  return (
    <div className="card p-8 mt-10">
      <div className="space-y-4">
        {steps.map((s, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 transition-opacity duration-500 ${
              i < n ? "opacity-100" : "opacity-25"
            }`}
          >
            <span
              className={`w-6 h-6 rounded-full grid place-items-center text-xs shrink-0 ${
                i < n ? "bg-[#5FBF6C] text-white" : "bg-black/10"
              }`}
            >
              {i < n ? "✓" : ""}
            </span>
            <span className="text-sm text-black/70">{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Commit({ name, onNext }) {
  return (
    <div className="card p-7 text-center fade-up">
      <h2 className="font-serif text-2xl font-bold mb-3">
        {name ? `${name}, sua` : "Sua"} análise está pronta.
      </h2>
      <p className="text-black/55 mb-7">Você quer recebê-la agora?</p>
      <button onClick={onNext} className="btn">
        SIM, QUERO MINHA ANÁLISE →
      </button>
    </div>
  );
}

function maskPhone(v) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function LeadForm({ name, answers, router }) {
  const [f, setF] = useState({ nome: name || "", email: "", whatsapp: "" });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fbTrackCustom("quiz_form_view");
  }, []);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email);
  const phoneOk = f.whatsapp.replace(/\D/g, "").length >= 10;
  const nameOk = f.nome.trim().length >= 2;
  const valid = emailOk && phoneOk && nameOk;

  async function submit() {
    if (!valid || sending) return;
    setSending(true);
    const perfil = getProfile(answers);

    fbAdvancedMatching({
      email: f.email,
      phone: f.whatsapp,
      firstName: f.nome,
    });
    fbTrack("Lead", { value: 0, currency: "BRL", content_name: "quiz_lead" });

    saveLead({
      nome: f.nome,
      email: f.email,
      whatsapp: f.whatsapp,
      perfil,
      respostas: answers,
      utms: getUtms(),
    });

    try {
      localStorage.setItem(
        "psm_result",
        JSON.stringify({ nome: f.nome, perfil, ts: Date.now() })
      );
      localStorage.removeItem(STORAGE);
    } catch {}

    router.push("/resultado");
  }

  return (
    <div className="card p-6 fade-up">
      <h2 className="font-serif text-xl font-bold text-center mb-1.5">
        Para onde envio seu resultado?
      </h2>
      <p className="text-center text-sm text-black/45 mb-6">
        Análise completa liberada na próxima tela.
      </p>

      <div className="space-y-3">
        <Field
          value={f.nome}
          onChange={(v) => setF({ ...f, nome: v })}
          placeholder="Seu nome"
          valid={nameOk}
        />
        <Field
          value={f.email}
          onChange={(v) => setF({ ...f, email: v })}
          placeholder="Seu melhor e-mail"
          type="email"
          valid={emailOk}
          error={f.email && !emailOk ? "E-mail inválido" : ""}
        />
        <Field
          value={f.whatsapp}
          onChange={(v) => setF({ ...f, whatsapp: maskPhone(v) })}
          placeholder="(00) 00000-0000"
          type="tel"
          valid={phoneOk}
          error={f.whatsapp && !phoneOk ? "Número incompleto" : ""}
        />
      </div>

      <button disabled={!valid || sending} onClick={submit} className="btn mt-5">
        {sending ? "Carregando..." : "VER MEU RESULTADO AGORA →"}
      </button>
      <p className="text-center text-xs text-black/40 mt-3">
        🔒 Seus dados estão seguros. Sem spam, prometido.
      </p>
    </div>
  );
}

function Field({ value, onChange, placeholder, type = "text", valid, error }) {
  return (
    <div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        inputMode={type === "tel" ? "numeric" : undefined}
        className={`w-full px-4 py-4 rounded-2xl border outline-none transition-colors
          ${
            error
              ? "border-red-400"
              : valid
              ? "border-[#5FBF6C]"
              : "border-black/10 focus:border-rose"
          }`}
      />
      {error && <p className="text-xs text-red-500 mt-1 px-1">{error}</p>}
    </div>
  );
}

function ExitModal({ name, onStay }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 grid place-items-center px-5">
      <div className="card p-7 max-w-sm w-full text-center fade-up">
        <h3 className="font-serif text-xl font-bold mb-2">
          {name ? `${name}, falta` : "Falta"} só 1 minuto!
        </h3>
        <p className="text-sm text-black/55 mb-6">
          Sua análise personalizada está quase pronta. Quer continuar?
        </p>
        <button onClick={onStay} className="btn">
          Continuar meu teste
        </button>
      </div>
    </div>
  );
}

function lower(s) {
  return s.charAt(0).toLowerCase() + s.slice(1);
}
