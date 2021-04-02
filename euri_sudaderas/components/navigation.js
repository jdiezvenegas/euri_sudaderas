import Link from "next/link";
import Image from "next/image";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import GoToCartButton from './cart/goto';

export default function Navigation() {
  return (
    <div className="nav-container">
      <Navbar expand="lg" fixed="top">
        <Link href="/">
          <Navbar.Brand as="a" href="/">
            <div className="nav-logo">
              <Image
                src="/logo_euri.png"
                alt="Picture of the author"
                height={40}
                width={172}
              />
            </div>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Item>
              <Link href="/products">
                <Nav.Link as="a" href="/products">
                  Productos
                </Nav.Link>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link href="/about">
                <Nav.Link as="a" href="/about">
                  Conócenos
                </Nav.Link>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link href="mailto:sudaderas@eurielec.etsit.upm.es">
                <Nav.Link as="a" href="mailto:sudaderas@eurielec.etsit.upm.es">
                  Contacta
                </Nav.Link>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link href="/faq">
                <Nav.Link as="a" href="/faq">
                  FAQ
                </Nav.Link>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link href="/faq">
                <Nav.Link as="a" href="/faq">
                  <GoToCartButton />
                </Nav.Link>
              </Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
