import { useState, useEffect } from 'react';
import logo from '../assets/logo.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react'; // or use any cart icon

export default function Home() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="bg-zinc-900 text-white min-h-screen font-sans">
      {/* Navbar */}
      <nav className="flex items-center justify-between flex-wrap px-6 py-4 bg-zinc-950 shadow-md">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Shriji Logo" className="h-10 w-10 object-cover rounded-full" />
          <span className="text-2xl font-bold tracking-wide">SHRIJI STORE</span>
        </div>

        <div className="flex items-center gap-8 text-lg font-semibold hidden md:flex">
          <Link to="/category/men" className="hover:text-gray-300 transition-colors">Men</Link>
          <Link to="/category/women" className="hover:text-gray-300 transition-colors">Women</Link>
          <Link to="/category/kids" className="hover:text-gray-300 transition-colors">Kids</Link>
        </div>

        <div className="flex items-center gap-4 text-base font-medium hidden md:flex">
          {/* Cart Icon */}
          <button onClick={() => navigate('/cart')} className="relative group">
            <ShoppingCart className="w-6 h-6 hover:text-gray-300 transition-colors" />
          </button>

          {!user ? (
            <>
              <Link to="/login" className="hover:text-gray-300 transition-colors">Login</Link>
              <Link to="/register" className="hover:text-gray-300 transition-colors">Sign Up</Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="hover:text-gray-300 transition-colors">Profile</Link>
              <button onClick={handleLogout} className="hover:text-gray-300 transition-colors">Logout</button>
            </>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white focus:outline-none">
            {menuOpen ? '✖' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="px-6 py-4 bg-zinc-950 flex flex-col gap-4 text-base font-medium md:hidden">
          <Link to="/category/men" className="hover:text-gray-300 transition-colors">Men</Link>
          <Link to="/category/women" className="hover:text-gray-300 transition-colors">Women</Link>
          <Link to="/category/kids" className="hover:text-gray-300 transition-colors">Kids</Link>
          <button onClick={() => navigate('/cart')} className="text-left hover:text-gray-300 transition-colors">Cart</button>
          {!user ? (
            <>
              <Link to="/login" className="hover:text-gray-300 transition-colors">Login</Link>
              <Link to="/register" className="hover:text-gray-300 transition-colors">Sign Up</Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="hover:text-gray-300 transition-colors">Profile</Link>
              <button onClick={handleLogout} className="hover:text-gray-300 transition-colors">Logout</button>
            </>
          )}
        </div>
      )}

      {/* Hero Section */}
      <header className="relative h-[80vh] w-full">
        <img
          src="/banner.jpg"
          alt="Shriji Banner"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to SHRIJI STORE</h1>
          <p className="text-lg md:text-2xl mb-6">Explore the latest fashion for Men, Women & Kids</p>
          <button onClick={() => navigate('/all')} className="bg-white text-black font-medium px-8 py-3 rounded-full shadow hover:bg-gray-200 transition-all duration-300 hover:scale-105">
            Shop Now
          </button>
        </div>
      </header>

      {/* Latest Collection */}
      <section className="py-12 px-6">
        <h2 className="text-3xl font-semibold mb-8 text-center">Latest Collection</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {["/first.jpg", "/second.jpg", "/kids.jpg", "/women2.jpg", "/women.jpg", "/men2.jpg", "/men1.jpg", "/mixer.jpg"].map((src, i) => (
            <img key={i} src={src} alt={`item-${i}`} className="rounded-xl shadow hover:scale-105 transition-transform duration-300" />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-zinc-800 py-20 px-6 text-center">
        <h3 className="text-3xl font-bold mb-4 text-white">Subscribe to Our Newsletter</h3>
        <p className="text-lg text-gray-300 mb-8">
          Be the first to know about new arrivals, exclusive deals, and seasonal trends.
        </p>
        <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-6 py-3 rounded-md text-white text-base w-full sm:w-80 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="bg-white text-black text-base font-medium px-6 py-3 rounded-md hover:bg-gray-200 transition-all shadow-md">
            Subscribe
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 text-gray-400 py-8 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div>
            <h4 className="text-lg font-bold text-white mb-2">SHRIJI STORE</h4>
            <p className="text-sm">Bringing the latest fashion trends to your doorstep.</p>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-2">Quick Links</h4>
            <ul className="text-sm space-y-1">
              <li><Link to="#" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-2">Follow Us</h4>
            <div className="flex justify-center sm:justify-start gap-4">
              <Link to="#" className="hover:text-white transition-colors">Facebook</Link>
              <Link to="#" className="hover:text-white transition-colors">Instagram</Link>
              <Link to="#" className="hover:text-white transition-colors">Twitter</Link>
            </div>
          </div>
        </div>

        <div className="text-center text-sm mt-6 border-t border-zinc-800 pt-4">
          &copy; {new Date().getFullYear()} SHRIJI STORE. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
