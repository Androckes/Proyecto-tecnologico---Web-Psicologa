import { useEffect, useMemo, useState } from "react";
import profileImage from "../assets/cinthya-profile.jpg";

const navigationLinks = [
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#enfoque", label: "Enfoque" },
  { href: "#servicios", label: "Servicios" },
  { href: "#solicitud", label: "Solicitud" },
  { href: "#proceso", label: "Proceso" },
  { href: "#contacto", label: "Contacto" },
];

const services = [
  {
    title: "Terapia para adolescentes",
    description:
      "Un espacio terapéutico para acompañar emociones, cambios, dudas, autoestima, relaciones y desafíos propios de esta etapa.",
    meta: [
      "Dirigido a adolescentes",
      "Modalidad virtual o presencial",
      "Atención individual",
    ],
    details: [
      "Puede ayudar en: ansiedad, regulación emocional, vínculos, identidad, autoestima y momentos de cambio.",
      "Modalidad: virtual o presencial, según disponibilidad.",
      "Duración referencial: aproximadamente 50 minutos por sesión.",
    ],
  },
  {
    title: "Acompañamiento a familias",
    description:
      "Un espacio de orientación y escucha para madres, padres o cuidadores que desean comprender mejor lo que está viviendo el adolescente.",
    meta: [
      "Dirigido a familias",
      "Enfoque vincular y comprensivo",
      "Orientación y contención",
    ],
    details: [
      "Puede ayudar en: comunicación familiar, acompañamiento emocional, límites, comprensión del proceso adolescente y fortalecimiento del entorno.",
      "Modalidad: virtual o presencial.",
      "Duración referencial: aproximadamente 50 a 60 minutos.",
    ],
  },
  {
    title: "Orientación vocacional",
    description:
      "Un proceso para descubrir intereses, habilidades y dirección personal, y así tomar decisiones con mayor claridad y confianza.",
    meta: [
      "Orientado a jóvenes y adolescentes",
      "Atención individual o grupal",
      "Puede complementarse con terapia",
    ],
    details: [
      "Puede ayudar en: elección vocacional, autoconocimiento, identificación de fortalezas, toma de decisiones y proyección académica o personal.",
      "Modalidad: virtual, presencial, individual o para equipos y grupos.",
      "Duración referencial: sesiones de aproximadamente 50 minutos.",
    ],
  },
];

const processSteps = [
  {
    number: "01",
    title: "Explora la landing",
    description:
      "La persona conoce el perfil profesional, el enfoque terapéutico y los servicios disponibles.",
  },
  {
    number: "02",
    title: "Solicita la cita",
    description:
      "Completa el formulario con sus datos, servicio, fecha preferida y comentarios opcionales.",
  },
  {
    number: "03",
    title: "Recibe confirmación inicial",
    description:
      "La plataforma confirma visualmente la solicitud y deja lista la futura notificación a la psicóloga.",
  },
];

const initialFormState = {
  name: "",
  phone: "",
  email: "",
  service: "",
  mode: "",
  date: "",
  timeRange: "",
  message: "",
};

function getLocalDateString(date = new Date()) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  const [formData, setFormData] = useState(initialFormState);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const minDate = useMemo(() => getLocalDateString(), []);

  const closeMenu = () => setMenuOpen(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    if (feedback.message) {
      setFeedback({ type: "", message: "" });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const requiredFields = [
      "name",
      "phone",
      "service",
      "mode",
      "date",
      "timeRange",
    ];

    const hasMissingFields = requiredFields.some((field) => !formData[field].trim());

    if (hasMissingFields) {
      setFeedback({
        type: "error",
        message:
          "Por favor revisa los campos obligatorios para poder enviar tu solicitud con tranquilidad.",
      });
      return;
    }

    const selectedDate = new Date(`${formData.date}T00:00:00`);
    if (selectedDate.getDay() === 0) {
      setFeedback({
        type: "error",
        message: "Por favor elige una fecha distinta a domingo.",
      });
      return;
    }

    if (formData.date < minDate) {
      setFeedback({
        type: "error",
        message: "Por favor elige una fecha válida a partir de hoy.",
      });
      return;
    }

    setFeedback({
      type: "success",
      message:
        "Tu solicitud fue recibida correctamente. Gracias por dar este primer paso. Cinthya se pondrá en contacto contigo para continuar la coordinación.",
    });
    setFormData(initialFormState);
  };

  return (
    <div className="page-shell">
      <Header
        links={navigationLinks}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((current) => !current)}
        onNavigate={closeMenu}
      />

      <main id="inicio">
        <Hero />
        <IntroBand />
        <AboutSection />
        <ApproachSection />
        <ServicesSection />
        <RequestSection
          formData={formData}
          feedback={feedback}
          minDate={minDate}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
        <ProcessSection />
        <ContactSection />
      </main>

      <Footer year={year} />
      <a className="floating-cta" href="#solicitud">
        Agendar consulta
      </a>
    </div>
  );
}

function Header({ links, menuOpen, onToggleMenu, onNavigate }) {
  return (
    <header className="site-header">
      <div className="container nav">
        <a className="brand" href="#inicio" onClick={onNavigate}>
          <span className="brand-mark">C</span>
          <span>
            <strong>Cinthya Fuentes Vargas</strong>
            <small>Psicoterapia gestáltica</small>
          </span>
        </a>

        <nav
          className={`menu${menuOpen ? " is-open" : ""}`}
          id="main-menu"
          aria-label="Navegación principal"
        >
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={onNavigate}>
              {link.label}
            </a>
          ))}
        </nav>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="main-menu"
          aria-label="Abrir menú"
          onClick={onToggleMenu}
        >
          <span></span>
          <span></span>
        </button>

        <a className="button button-soft" href="#solicitud" onClick={onNavigate}>
          Reservar consulta
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy reveal is-visible">
          <div className="hero-kicker">
            <span className="status-dot"></span>
            <span>Atención virtual y presencial · Solicitud de citas abierta</span>
          </div>
          <p className="eyebrow">Psicoterapia gestáltica para adolescentes y familias</p>
          <h1>
            Un espacio de confianza para adolescentes que buscan comprenderse,
            proponerse metas y avanzar con seguridad.
          </h1>
          <p className="hero-text">
            Soy Cinthya Fuentes Vargas, psicóloga colegiada por la Universidad Ricardo
            Palma. Acompaño procesos emocionales, orientación vocacional y desarrollo
            personal con una mirada serena, humana y profundamente empática.
          </p>

          <p className="hero-support">
            Si hoy hay dudas, presión académica, necesidad de orientación o búsqueda de
            mayor confianza personal, este puede ser un buen primer paso.
          </p>

          <div className="hero-actions">
            <a className="button" href="#solicitud">
              Agenda tu cita
            </a>
            <a className="button button-ghost" href="#servicios">
              Ver servicios
            </a>
          </div>

          <div className="social-proof">
            <a
              className="social-link"
              href="https://www.instagram.com/psicologa.cinthyafuentes/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram profesional: @psicologa.cinthyafuentes · Citas 953027806
            </a>
          </div>

          <ul className="hero-points" aria-label="Beneficios principales">
            <li>Atención a adolescentes y familias</li>
            <li>Especialista en orientación vocacional</li>
            <li>Modalidad virtual y presencial</li>
          </ul>

          <div className="trust-strip reveal is-visible">
            <div>
              <strong>15+ años de experiencia</strong>
              <span>
                Trayectoria acompañando procesos emocionales, formativos y vocacionales.
              </span>
            </div>
            <div>
              <strong>Confianza y cercanía</strong>
              <span>
                Un acompañamiento que busca que el adolescente se sienta escuchado y
                seguro.
              </span>
            </div>
            <div>
              <strong>Liderazgo y metas personales</strong>
              <span>
                Trabajo sostenido para ayudar a descubrir fortalezas, objetivos y
                dirección.
              </span>
            </div>
          </div>

          <div className="micro-proof reveal is-visible">
            <p>
              Acompañar también es ayudar a que cada persona reconozca sus recursos y
              avance con mayor coherencia, calma y confianza.
            </p>
          </div>
        </div>

        <aside className="hero-card reveal is-visible">
          <figure className="profile-portrait">
            <img
              className="profile-image"
              src={profileImage}
              alt="Fotografía de la psicóloga Cinthya Fuentes Vargas"
            />
          </figure>
          <div className="card-badge">Perfil profesional</div>
          <h2>
            Una práctica que integra escucha, orientación vocacional y
            acompañamiento para fortalecer la confianza personal.
          </h2>
          <p>
            Actualmente también se desempeña como Directora del Programa de Liderazgo
            para Adolescentes de Life Perú, integrando experiencia clínica, procesos
            formativos y acompañamiento a familias.
          </p>

          <div className="profile-highlights">
            <div>
              <strong>Especialista en</strong>
              <span>Atención psicológica para adolescentes</span>
            </div>
            <div>
              <strong>Servicio destacado</strong>
              <span>Orientación vocacional individual y grupal</span>
            </div>
          </div>

          <div className="card-panel">
            <span>Áreas principales</span>
            <ul>
              <li>Terapia para adolescentes</li>
              <li>Orientación vocacional individual y grupal</li>
              <li>Acompañamiento emocional familiar</li>
              <li>Desarrollo personal y liderazgo</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}

function IntroBand() {
  return (
    <section className="section intro-band reveal is-visible">
      <div className="container intro-grid">
        <p>
          Esta primera versión está pensada para que un potencial paciente pueda
          conocer el perfil profesional de Cinthya, comprender su enfoque y solicitar
          una cita desde un canal digital más claro que WhatsApp.
        </p>
        <p>
          El objetivo del MVP es validar confianza, interés en los servicios y
          disposición a iniciar el proceso de atención a través de una solicitud web.
        </p>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="section" id="sobre-mi">
      <div className="container section-grid">
        <div className="section-heading reveal is-visible">
          <p className="eyebrow">Sobre mí</p>
          <h2>
            Un acompañamiento profesional construido desde la calma, la empatía y la
            confianza en el potencial de cada persona.
          </h2>
        </div>

        <div className="content-card reveal is-visible">
          <p>
            Cinthya Fuentes Vargas es psicóloga colegiada por la Universidad Ricardo
            Palma y especialista en terapia gestáltica orientada a adolescentes y sus
            familias.
          </p>
          <p>
            Cuenta con más de 15 años de experiencia en procesos de transformación
            personal, desarrollo socioemocional y liderazgo adolescente. Su práctica
            combina atención psicoterapéutica individual, facilitación de talleres,
            orientación vocacional y acompañamiento emocional, ayudando a adolescentes y
            familias a avanzar con más claridad, seguridad y propósito.
          </p>
          <div className="credential-list">
            <div>
              <strong>Formación</strong>
              <span>Psicóloga colegiada · Universidad Ricardo Palma</span>
            </div>
            <div>
              <strong>Especialidad</strong>
              <span>
                Terapia gestáltica con foco en adolescentes, familias y orientación
                vocacional
              </span>
            </div>
            <div>
              <strong>Experiencia adicional</strong>
              <span>
                Dirección del Programa de Liderazgo para Adolescentes en Life Perú
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ApproachSection() {
  return (
    <section className="section alt-section" id="enfoque">
      <div className="container section-grid approach-grid">
        <div className="section-heading reveal is-visible">
          <p className="eyebrow">Enfoque terapéutico</p>
          <h2>
            Una forma de trabajo que acompaña con empatía, promueve confianza y ayuda a
            reconciliarse con uno mismo.
          </h2>
        </div>

        <div className="content-card reveal is-visible">
          <p>
            El enfoque gestáltico acompaña a la persona a comprender lo que vive en el
            presente, reconocer sus emociones, identificar patrones y desarrollar mayor
            conciencia sobre sí misma y sus vínculos. El proceso terapéutico busca que
            la persona conecte consigo, se reconcilie con lo que vive y descubra nuevas
            maneras de avanzar.
          </p>
          <p>
            En esta propuesta, la atención a adolescentes y familias se sostiene en una
            escucha cercana, un trato respetuoso y una mirada que alienta metas,
            liderazgo personal y crecimiento coherente con lo que cada uno desea
            construir.
          </p>
          <div className="approach-points">
            <div>
              <strong>Presencia y escucha</strong>
              <span>
                Un espacio cuidado para expresar lo que se vive con libertad, calma y sin
                juicio.
              </span>
            </div>
            <div>
              <strong>Cambio y autoconocimiento</strong>
              <span>
                Comprender y abrazar los cambios ayuda a descubrir quién eres sin
                aferrarte a definiciones rígidas.
              </span>
            </div>
            <div>
              <strong>Metas, coherencia y liderazgo personal</strong>
              <span>
                Fortalecer objetivos, habilidades blandas y confianza para avanzar con
                mayor equilibrio.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="section" id="servicios">
      <div className="container">
        <div className="section-heading centered reveal is-visible">
          <p className="eyebrow">Servicios</p>
          <h2>
            Servicios pensados para acompañar distintas necesidades emocionales y
            momentos de vida.
          </h2>
          <p>
            Esta sección busca ayudar a que cada persona identifique con mayor claridad
            qué tipo de atención necesita antes de solicitar una cita.
          </p>
        </div>

        <div className="cards-grid">
          {services.map((service) => (
            <article key={service.title} className="info-card reveal is-visible">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul className="service-meta">
                {service.meta.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="service-detail">
                {service.details.map((detail) => (
                  <p key={detail}>
                    {detail.includes(":") ? (
                      <>
                        <strong>{detail.split(":")[0]}:</strong>
                        {detail.slice(detail.indexOf(":") + 1)}
                      </>
                    ) : (
                      detail
                    )}
                  </p>
                ))}
                <a className="service-link" href="#solicitud">
                  Solicitar este servicio
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function RequestSection({ formData, feedback, minDate, onChange, onSubmit }) {
  return (
    <section className="section alt-section" id="solicitud">
      <div className="container booking-layout request-layout">
        <div className="section-heading reveal is-visible">
          <p className="eyebrow">Solicitud de cita</p>
          <h2>Un primer paso simple, claro y cuidado para solicitar una cita.</h2>
          <p>
            Si deseas iniciar un proceso de acompañamiento, puedes dejar aquí tus datos y
            una breve referencia de lo que estás buscando. Luego Cinthya se pondrá en
            contacto contigo para continuar la coordinación.
          </p>

          <div className="booking-points reveal is-visible">
            <div>
              <strong>Un primer contacto cuidado</strong>
              <span>
                La información compartida permite iniciar la coordinación de manera más
                ordenada y humana.
              </span>
            </div>
            <div>
              <strong>Coordinación más clara</strong>
              <span>
                Tu preferencia de fecha y horario ayuda a facilitar el siguiente paso.
              </span>
            </div>
            <div>
              <strong>Privacidad y respeto</strong>
              <span>
                Los datos compartidos se utilizan únicamente para coordinar la atención.
              </span>
            </div>
          </div>
        </div>

        <form className="booking-card reveal is-visible" id="booking-form" noValidate onSubmit={onSubmit}>
          <div className="form-intro">
            <strong>Antes de comenzar</strong>
            <p>
              Completar este formulario no te obliga a tomar una cita de inmediato. Es
              una manera de iniciar la conversación y ayudarte a encontrar la atención
              más adecuada para ti o tu familia.
            </p>
          </div>

          <div className="form-grid">
            <label>
              Nombre y apellido
              <input
                type="text"
                name="name"
                placeholder="Tu nombre completo"
                required
                value={formData.name}
                onChange={onChange}
              />
            </label>

            <label>
              Teléfono o WhatsApp
              <input
                type="tel"
                name="phone"
                placeholder="Tu número de contacto"
                required
                value={formData.phone}
                onChange={onChange}
              />
            </label>

            <label>
              Correo electrónico
              <input
                type="email"
                name="email"
                placeholder="nombre@correo.com"
                value={formData.email}
                onChange={onChange}
              />
            </label>

            <label>
              Tipo de servicio
              <select name="service" required value={formData.service} onChange={onChange}>
                <option value="">Selecciona un servicio</option>
                <option value="Primera entrevista">Primera entrevista</option>
                <option value="Terapia para adolescentes">Terapia para adolescentes</option>
                <option value="Acompañamiento a familias">Acompañamiento a familias</option>
                <option value="Orientación vocacional">Orientación vocacional</option>
                <option value="Desarrollo personal">Desarrollo personal</option>
              </select>
            </label>

            <label>
              Modalidad preferida
              <select name="mode" required value={formData.mode} onChange={onChange}>
                <option value="">Selecciona una modalidad</option>
                <option value="Virtual">Virtual</option>
                <option value="Presencial">Presencial</option>
              </select>
            </label>

            <label>
              Fecha preferida
              <input
                type="date"
                name="date"
                min={minDate}
                required
                value={formData.date}
                onChange={onChange}
              />
            </label>

            <label>
              Franja horaria preferida
              <select
                name="timeRange"
                required
                value={formData.timeRange}
                onChange={onChange}
              >
                <option value="">Selecciona una franja</option>
                <option value="Mañana">Mañana</option>
                <option value="Tarde">Tarde</option>
              </select>
            </label>

            <label className="form-full">
              Si deseas, cuéntanos brevemente qué tipo de acompañamiento estás buscando
              <textarea
                name="message"
                rows="4"
                placeholder="Por ejemplo: orientación vocacional, apoyo emocional para adolescente, acompañamiento familiar o dudas sobre el proceso."
                value={formData.message}
                onChange={onChange}
              ></textarea>
            </label>
          </div>

          <div className="booking-actions">
            <button className="button" type="submit">
              Solicitar cita
            </button>
            <p>Recibirás una confirmación visual aquí mismo y luego el contacto para coordinar.</p>
          </div>

          <p className="form-note">
            Los campos obligatorios deben completarse antes de enviar. No se permiten
            fechas pasadas ni domingos.
          </p>

          <p className="privacy-note">
            La información que compartas será utilizada únicamente para coordinar la
            atención psicológica solicitada.
          </p>

          {feedback.message ? (
            <div className={`form-feedback${feedback.type === "error" ? " is-error" : ""}`}>
              {feedback.message}
            </div>
          ) : null}
        </form>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="section" id="proceso">
      <div className="container">
        <div className="section-heading reveal is-visible">
          <p className="eyebrow">Proceso</p>
          <h2>
            Un flujo sencillo para validar la interacción digital del usuario con la
            plataforma.
          </h2>
        </div>

        <div className="steps">
          {processSteps.map((step) => (
            <article key={step.number} className="step reveal is-visible">
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="section contact-section" id="contacto">
      <div className="container contact-grid">
        <div className="section-heading reveal is-visible">
          <p className="eyebrow">Contacto</p>
          <h2>
            Canales complementarios para acompañar la captación, sin reemplazar el flujo
            principal del MVP.
          </h2>
          <p>
            En esta etapa, el foco sigue siendo la solicitud de cita desde la web. Estos
            canales sirven como respaldo y validación de confianza.
          </p>
        </div>

        <div className="contact-card reveal is-visible">
          <a
            href="https://www.instagram.com/psicologa.cinthyafuentes/"
            target="_blank"
            rel="noreferrer"
          >
            @psicologa.cinthyafuentes
          </a>
          <a href="mailto:contacto@cinthya.com">contacto@cinthya.com</a>
          <p>Lima, Perú · Atención virtual y presencial</p>
          <a className="button" href="#solicitud">
            Ir al formulario de cita
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer({ year }) {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <p>
          © {year} Cinthya Fuentes Vargas. Plataforma web para gestión de citas
          psicológicas.
        </p>
        <p>Base React lista para evolucionar hacia la reserva transaccional.</p>
      </div>
    </footer>
  );
}
