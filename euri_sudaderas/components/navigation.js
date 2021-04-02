import Link from "next/link";

export default function Navigation() {
  return (
    <div className="nav-container">
      <div className="nav-logo">
        <img scr="/logo_euri.png" />
      </div>
      <div className="nav-item">
        <Link href="/productos">Productos</Link>
      </div>
      <div className="nav-item">
        <Link href="/productos">Productos</Link>
      </div>
      <div className="nav-item">
        <Link href="/about">Conócenos</Link>
      </div>
      <div className="nav-item">
        <Link href="mailto:sudaderas@eurielec.etsit.upm.es">Contacta</Link>
      </div>
      <div className="nav-item">
        <Link href="/faq">FAQ</Link>
      </div>
    </div>
  );
}
