import styles from "../assets/css/Landing.module.css";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <>
      {/* Header */}
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <img src="/CompuMax-blanco.png" alt="CompuMax-logo" />
          </div>
          <ul className={styles.navLinks}>
            <li><a href="#servicios">Servicios</a></li>
            <li><a href="#como-funciona">Cómo Funciona</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
          <Link to="/login" className={styles.ctaButton}>
            Iniciar Sesión
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Reparación Profesional de Equipos Tecnológicos</h1>
          <p>
            Servicio técnico especializado con sistema de turnos online. Rápido,
            confiable y transparente.
          </p>
          <div className={styles.heroButtons}>
            <a href="#" className={styles.btnPrimary}>
              Solicitar Turno
            </a>
            <a href="#servicios" className={styles.btnSecondary}>
              Ver Servicios
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.services} id="servicios">
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Nuestros Servicios</h2>
          <p className={styles.sectionSubtitle}>
            Soluciones completas para todos tus equipos electrónicos
          </p>

          <div className={styles.servicesGrid}>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <img src="/src/assets/img/icons/service-icon-reparacion.svg" alt="reparacion-de-computadoras" />
              </div>
              <h3>Reparación de Computadoras</h3>
              <p>Diagnóstico y reparación de PC y laptops. Hardware y software.</p>
            </div>

            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <img src="/src/assets/img/icons/service-icon-celulares.svg" alt="reparacion-de-celulares" />
              </div>
              <h3>Dispositivos Móviles</h3>
              <p>Reparación de smartphones y tablets. Pantallas, baterías y más.</p>
            </div>

            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <img src="/src/assets/img/icons/service-icon-mantenimiento.svg" alt="mantenimiento-preventivo" />
              </div>
              <h3>Mantenimiento Preventivo</h3>
              <p>Limpieza, optimización y actualización de sistemas.</p>
            </div>

            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <img src="/src/assets/img/icons/service-icon-diskette.svg" alt="recuperacion-de-datos" />
              </div>
              <h3>Recuperación de Datos</h3>
              <p>Recuperamos tu información de discos dañados.</p>
            </div>

            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <img src="/src/assets/img/icons/service-icon-candado.svg" alt="seguridad-informatica" />
              </div>
              <h3>Seguridad Informática</h3>
              <p>Protección contra virus, malware y amenazas digitales.</p>
            </div>

            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <img src="/src/assets/img/icons/service-icon-software.svg" alt="instalacion-de-software" />
              </div>
              <h3>Instalación de Software</h3>
              <p>Instalación y configuración de sistemas operativos y programas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>¿Por Qué Elegir CompuMax?</h2>

          <div className={styles.featuresGrid}>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <img src="/src/assets/img/icons/features-icon-tick.svg" alt="tick" />
              </div>
              <div className={styles.featureContent}>
                <h4>Técnicos Certificados</h4>
                <p>Personal capacitado y con experiencia comprobada</p>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <img src="/src/assets/img/icons/features-icon-clock.svg" alt="clock" />
              </div>
              <div className={styles.featureContent}>
                <h4>Sistema de Turnos</h4>
                <p>Reserva online sin esperas innecesarias</p>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <img src="/src/assets/img/icons/features-icon-shield.svg" alt="shield" />
              </div>
              <div className={styles.featureContent}>
                <h4>Garantía Incluida</h4>
                <p>Todos nuestros servicios tienen garantía de 90 días</p>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <img src="/src/assets/img/icons/features-icon-seguimiento.svg" alt="seguimiento" />
              </div>
              <div className={styles.featureContent}>
                <h4>Seguimiento Online</h4>
                <p>Verifica el estado de tu reparación en tiempo real</p>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <img src="/src/assets/img/icons/features-icon-money.svg" alt="money" />
              </div>
              <div className={styles.featureContent}>
                <h4>Precios Transparentes</h4>
                <p>Presupuestos claros sin costos ocultos</p>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <img src="/src/assets/img/icons/features-icon-thunder.svg" alt="thunder" />
              </div>
              <div className={styles.featureContent}>
                <h4>Servicio Rápido</h4>
                <p>La mayoría de reparaciones en 24-48 horas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className={styles.howItWorks} id="como-funciona">
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Cómo Funciona</h2>
          <p className={styles.sectionSubtitle}>Proceso simple en 4 pasos</p>

          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <h4>Regístrate</h4>
              <p>Crea tu cuenta en minutos de forma gratuita</p>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <h4>Solicita Turno</h4>
              <p>Elige fecha, horario y tipo de servicio</p>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <h4>Visita CompuMax</h4>
              <p>Trae tu equipo en el horario reservado</p>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>4</div>
              <h4>Recibe tu Equipo</h4>
              <p>Te notificamos cuando esté listo</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2>¿Listo para Reparar tu Equipo?</h2>
          <p>Reserva tu turno ahora y deja tu tecnología en manos expertas</p>
          <a href="#" className={styles.btnPrimary}>
            Solicitar Turno Ahora
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer} id="contacto">
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3>CompuMax</h3>
            <p>Servicio técnico profesional para todos tus equipos electrónicos.</p>
          </div>

          <div className={styles.footerSection}>
            <h3>Contacto</h3>
            <p className={styles.footerItem}>
              <img src="/src/assets/img/icons/footer-icon-mail.svg" alt="Email" className={styles.footerIcon} />
              compumax1411@gmail.com
            </p>
            <p className={styles.footerItem}>
              <img src="/src/assets/img/icons/footer-icon-telefono.svg" alt="Teléfono" className={styles.footerIcon} />
              +54 11 2733-4694
            </p>
            <p className={styles.footerItem}>
              <img src="/src/assets/img/icons/footer-icon-ubicacion.svg" alt="Ubicación" className={styles.footerIcon} />
              Buenos Aires, Argentina
            </p>
          </div>

          <div className={styles.footerSection}>
            <h3>Enlaces Rápidos</h3>
            <a href="#servicios">Servicios</a>
            <a href="#como-funciona">Cómo Funciona</a>
          </div>

          <div className={styles.footerSection}>
            <h3>Horarios</h3>
            <p>Lunes a Viernes</p>
            <p>9:00 - 18:00 hs</p>
            <p>Sábados</p>
            <p>9:00 - 13:00 hs</p>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>&copy; 2025 CompuMax. Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  );
}

export default LandingPage;