import { Link } from 'react-router-dom';
import { Rocket } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="glass" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000, padding: '1rem 0' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', fontWeight: 700 }}>
          <Rocket className="text-glow" style={{ color: 'var(--color-accent-1)' }} />
          <span>Unity Space</span>
        </Link>
        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link to="/" style={{ fontWeight: 500, transition: 'color var(--transition-normal)' }} onMouseOver={(e) => e.target.style.color = 'var(--color-accent-1)'} onMouseOut={(e) => e.target.style.color = 'inherit'}>Home</Link>
          <Link to="/projects" style={{ fontWeight: 500, transition: 'color var(--transition-normal)' }} onMouseOver={(e) => e.target.style.color = 'var(--color-accent-1)'} onMouseOut={(e) => e.target.style.color = 'inherit'}>Projects</Link>
          <Link to="/blogs" style={{ fontWeight: 500, transition: 'color var(--transition-normal)' }} onMouseOver={(e) => e.target.style.color = 'var(--color-accent-1)'} onMouseOut={(e) => e.target.style.color = 'inherit'}>Blogs</Link>
          <Link to="/sponsorship" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>Sponsorship</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
