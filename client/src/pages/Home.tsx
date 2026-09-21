import { FormEvent, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Bot,
  Check,
  ChevronDown,
  FileText,
  Instagram,
  Link2,
  Menu,
  MessageCircle,
  Music2,
  Quote,
  Send,
  Star,
  Workflow,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

const logoSrc = "/manus-storage/buclementa-logo_eacf1ee9.jpeg";

const solutions = [
  {
    icon: MessageCircle,
    eyebrow: "Conversaciones",
    title: "WhatsApp que no deja conversaciones a medias.",
    text: "Responde consultas, entiende la necesidad, califica prospectos y puede dejar una reserva encaminada.",
    tone: "mint",
  },
  {
    icon: Workflow,
    eyebrow: "Prospectos y reservas",
    title: "Cada oportunidad encuentra su siguiente paso.",
    text: "Ordena el seguimiento y conecta la conversación con el flujo comercial que tu equipo ya conoce.",
    tone: "lime",
  },
  {
    icon: FileText,
    eyebrow: "Facturas y datos",
    title: "Menos digitación. Más datos listos para usar.",
    text: "Lee documentos que llegan por correo y extrae la información que tu operación necesita tener ordenada.",
    tone: "dark",
  },
  {
    icon: Star,
    eyebrow: "Reseñas",
    title: "Pedir opinión en el momento justo.",
    text: "Activa el mensaje después de una compra o atención para escuchar a tus clientes sin perseguir a nadie.",
    tone: "mint",
  },
  {
    icon: Link2,
    eyebrow: "Integración",
    title: "Una solución con el contexto de tu negocio.",
    text: "Conecta las herramientas que ya utilizas y suma solo lo que haga falta para que el flujo funcione.",
    tone: "lime",
  },
];

const steps = [
  {
    number: "01",
    title: "Encontramos el cuello de botella",
    text: "Revisamos dónde se van las horas: mensajes repetidos, reservas, facturas, datos o seguimiento.",
  },
  {
    number: "02",
    title: "Conectamos las piezas",
    text: "Armamos el flujo con las herramientas que tu negocio ya conoce y definimos cuándo debe intervenir una persona.",
  },
  {
    number: "03",
    title: "Lo operamos contigo",
    text: "Monitoreamos el funcionamiento, medimos el resultado y ajustamos el empleado digital a medida que tu negocio aprende.",
  },
];

const faqs = [
  {
    question: "¿Esto reemplaza a mi equipo?",
    answer:
      "No. Se hace cargo de lo repetitivo para que tu equipo pueda atender mejor, decidir con más información y dedicar tiempo a lo que requiere criterio humano.",
  },
  {
    question: "¿Tengo que cambiar todas mis herramientas?",
    answer:
      "No necesariamente. La idea es conectar lo que ya utilizas y sumar solo lo que haga falta para que el flujo funcione.",
  },
  {
    question: "¿Cómo se cobra?",
    answer:
      "Se separa la configuración inicial de una suscripción mensual por operación, soporte y ajustes. La propuesta depende del flujo y sus integraciones.",
  },
  {
    question: "¿Con qué tipo de negocio trabajan?",
    answer:
      "Partimos especialmente con clínicas, restaurantes, inmobiliarias y despachos de Chile, aunque el punto de partida siempre es la tarea concreta que quieres mejorar.",
  },
];

type FormState = {
  name: string;
  email: string;
  company: string;
  businessType: string;
  message: string;
  website: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  company: "",
  businessType: "",
  message: "",
  website: "",
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [form, setForm] = useState<FormState>(initialForm);
  const contactMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      toast.success("Recibimos tu solicitud. Te responderemos con una primera mirada.");
      setForm(initialForm);
    },
    onError: () => {
      toast.error("No pudimos enviar la solicitud. Intenta nuevamente en unos minutos.");
    },
  });

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    contactMutation.mutate(form);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="site-shell">
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="BucleMenta, volver al inicio" onClick={closeMenu}>
          <span className="brand-mark"><img src={logoSrc} alt="" /></span>
          <span className="brand-name">BucleMenta</span>
        </a>

        <button
          className="mobile-menu-button"
          type="button"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>

        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Navegación principal">
          <a href="#soluciones" onClick={closeMenu}>Soluciones</a>
          <a href="#como-funciona" onClick={closeMenu}>Cómo funciona</a>
          <a href="#preguntas" onClick={closeMenu}>Preguntas</a>
          <a className="nav-cta" href="#contacto" onClick={closeMenu}>Conversemos <ArrowUpRight size={15} /></a>
        </nav>
      </header>

      <section className="hero-section" id="inicio">
        <div className="hero-copy">
          <p className="kicker"><span className="kicker-dot" /> Automatización con IA · Chile</p>
          <h1>Que tu negocio <em>trabaje</em> para crecer.</h1>
          <p className="hero-lede">
            BucleMenta crea y opera empleados digitales que responden, agendan, ordenan y hacen seguimiento mientras tú te concentras en lo que mueve tu negocio.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#contacto">Cuéntanos qué repites <ArrowUpRight size={17} /></a>
            <a className="text-link" href="#soluciones">Ver soluciones <ArrowDown size={16} /></a>
          </div>
          <div className="hero-note"><span className="note-line" /> Implementación rápida. Operación y soporte continuo.</div>
        </div>

        <div className="hero-visual" aria-label="Ejemplo de operación conectada de BucleMenta">
          <div className="visual-glow" />
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <span className="orbit-dot dot-a" />
          <span className="orbit-dot dot-b" />
          <span className="orbit-dot dot-c" />
          <div className="visual-card visual-card-main">
            <div className="visual-card-top"><span className="status-pulse" /> Operación conectada <span className="visual-time">ahora</span></div>
            <div className="visual-logo-wrap"><img src={logoSrc} alt="Logo de BucleMenta" /></div>
            <p className="visual-title">Un empleado digital para cada tarea repetitiva.</p>
            <div className="visual-tags">
              <span>WhatsApp</span><span>Reservas</span><span>Datos</span>
            </div>
          </div>
          <div className="visual-float float-top"><Bot size={15} /> Responde</div>
          <div className="visual-float float-bottom"><Check size={15} /> Deja el flujo andando</div>
          <div className="visual-caption">Panel ilustrativo de automatizaciones de BucleMenta</div>
        </div>
      </section>

      <section className="statement-section section-wrap">
        <div className="statement-mark"><Quote size={23} /></div>
        <div>
          <p className="section-overline">El trabajo repetitivo</p>
          <h2>puede cambiar<br /><em>de manos.</em></h2>
        </div>
        <p className="statement-text">Conectamos las herramientas que ya usas para que la IA se haga cargo de las tareas mecánicas, con reglas claras y acompañamiento humano.</p>
      </section>

      <section className="solutions-section section-wrap" id="soluciones">
        <div className="section-heading-row">
          <div>
            <p className="section-overline">Lo que puede hacer por tu operación</p>
            <h2>Menos vueltas.<br /><em>Más continuidad.</em></h2>
          </div>
          <p className="heading-aside">Empleados digitales con IA, diseñados alrededor de tus procesos y de las herramientas que ya tienes.</p>
        </div>
        <div className="solutions-grid">
          {solutions.map((solution) => {
            const Icon = solution.icon;
            return (
              <article className={`solution-card tone-${solution.tone}`} key={solution.title}>
                <div className="card-icon"><Icon size={21} strokeWidth={1.8} /></div>
                <p className="card-eyebrow">{solution.eyebrow}</p>
                <h3>{solution.title}</h3>
                <p>{solution.text}</p>
                <span className="card-arrow"><ArrowUpRight size={17} /></span>
              </article>
            );
          })}
        </div>
      </section>

      <section className="audience-section">
        <div className="section-wrap audience-inner">
          <p className="section-overline">Especialmente para</p>
          <div className="audience-list" aria-label="Tipos de empresas a las que se dirige BucleMenta">
            <span>Clínicas</span><span>Restaurantes</span><span>Inmobiliarias</span><span>Despachos</span>
          </div>
          <p className="audience-note">Pymes de Chile que quieren recuperar tiempo sin perder el control de su operación.</p>
        </div>
      </section>

      <section className="process-section section-wrap" id="como-funciona">
        <div className="section-heading-row process-heading">
          <div>
            <p className="section-overline">Cómo se construye</p>
            <h2>Del trabajo manual<br /><em>a un flujo que respira.</em></h2>
          </div>
          <p className="heading-aside">Partimos de una tarea concreta y construimos alrededor de ella. El pago inicial cubre la configuración; la suscripción, la operación, el soporte y los ajustes.</p>
        </div>
        <div className="steps-grid">
          {steps.map((step) => (
            <article className="step-card" key={step.number}>
              <span className="step-number">{step.number}</span>
              <div className="step-rule" />
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="faq-section section-wrap" id="preguntas">
        <div className="faq-intro">
          <p className="section-overline">Lo importante, claro desde el inicio</p>
          <h2>Preguntas<br /><em>honestas.</em></h2>
          <p>La automatización funciona mejor cuando todos saben qué esperar.</p>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div className={`faq-item ${isOpen ? "is-open" : ""}`} key={faq.question}>
                <button type="button" onClick={() => setOpenFaq(isOpen ? null : index)} aria-expanded={isOpen}>
                  <span>{faq.question}</span><ChevronDown size={19} />
                </button>
                <div className="faq-answer"><p>{faq.answer}</p></div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="contact-section" id="contacto">
        <div className="section-wrap contact-inner">
          <div className="contact-copy">
            <p className="section-overline">Partamos por una tarea</p>
            <h2>Cuéntanos qué<br /><em>se repite.</em></h2>
            <p>Qué herramienta usas hoy, qué te gustaría recuperar y dónde sientes que el equipo pierde más tiempo. Te responderemos con una primera mirada concreta.</p>
            <div className="contact-quote"><span className="quote-line" /><span>Una conversación puede ser el primer bucle que dejamos andando.</span></div>
            <p className="contact-status">Correo y teléfono de contacto: por definir.</p>
          </div>
          <form className="contact-form" onSubmit={submitForm}>
            <div className="form-intro"><span>01</span><p>Cuéntanos sobre tu operación</p></div>
            <div className="form-grid">
              <label><span>Tu nombre</span><input required value={form.name} onChange={(event) => updateField("name", event.target.value)} placeholder="Nombre y apellido" /></label>
              <label><span>Correo de trabajo</span><input required type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} placeholder="nombre@empresa.cl" /></label>
            </div>
            <div className="form-grid">
              <label><span>Empresa</span><input required value={form.company} onChange={(event) => updateField("company", event.target.value)} placeholder="Nombre de tu empresa" /></label>
              <label><span>Tipo de negocio</span><select required value={form.businessType} onChange={(event) => updateField("businessType", event.target.value)}><option value="" disabled>Selecciona una opción</option><option value="Clínica">Clínica</option><option value="Restaurante">Restaurante</option><option value="Inmobiliaria">Inmobiliaria</option><option value="Despacho">Despacho</option><option value="Otro">Otro</option></select></label>
            </div>
            <label><span>¿Qué tarea se repite?</span><textarea required rows={5} value={form.message} onChange={(event) => updateField("message", event.target.value)} placeholder="Cuéntanos qué proceso te gustaría ordenar o automatizar..." /></label>
            <label className="honeypot" aria-hidden="true"><span>Sitio web</span><input tabIndex={-1} autoComplete="off" value={form.website} onChange={(event) => updateField("website", event.target.value)} /></label>
            <div className="form-footer"><p>Al enviar, recibiremos tu solicitud para revisarla contigo.</p><button className="button button-primary" type="submit" disabled={contactMutation.isPending}>{contactMutation.isPending ? "Enviando..." : "Enviar solicitud"} <Send size={16} /></button></div>
          </form>
        </div>
      </section>

      <footer className="site-footer">
        <div className="section-wrap footer-top">
          <a className="brand footer-brand" href="#inicio"><span className="brand-mark"><img src={logoSrc} alt="" /></span><span className="brand-name">BucleMenta</span></a>
          <p>Automatización con IA para clínicas, restaurantes, inmobiliarias y despachos de Chile.</p>
          <div className="social-links" aria-label="Redes sociales">
            <a href="https://instagram.com/bucle_menta" target="_blank" rel="noreferrer" aria-label="Instagram de BucleMenta"><Instagram size={18} /></a>
            <a href="https://x.com/bucle_menta" target="_blank" rel="noreferrer" aria-label="X de BucleMenta"><X size={18} /></a>
            <a href="https://www.tiktok.com/@bucle_menta" target="_blank" rel="noreferrer" aria-label="TikTok de BucleMenta"><Music2 size={18} /></a>
          </div>
        </div>
        <div className="section-wrap footer-bottom"><span>© BucleMenta. Automatización que devuelve tiempo.</span><a href="#contacto">Empleados digitales para pymes que quieren crecer <ArrowUpRight size={14} /></a></div>
      </footer>
    </main>
  );
}
