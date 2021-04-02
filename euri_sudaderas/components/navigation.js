import Link from "next/link";
import Image from "next/image";

export default function Navigation() {
  return (
    <div className="nav-container">
      <div className="nav-logo">
        <Image
          src="/logo_euri.png"
          alt="Picture of the author"
          height={40}
          width={172}
        />
      </div>
      <div className="nav-item">
        <Link href="/products">Productos</Link>
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
