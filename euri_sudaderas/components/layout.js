import Navigation from "./navigation";

export default function Layout({ children }) {
  return (
    <main>
      <Navigation />
      {children}
    </main>
  );
}
