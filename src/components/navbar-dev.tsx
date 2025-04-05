import { UserAuth } from '@/context';
import { Link } from 'react-router';

const Navbar = () => {
  const { signInWithGoogle, signOut } = UserAuth();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex flex-col items-center space-y-4">
        {/* Buttons */}
        <div className="flex space-x-4">
          <button className="hover:text-gray-400" onClick={signInWithGoogle}>
            Login
          </button>
          <button className="hover:text-gray-400" onClick={signOut}>
            Logout
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col items-center space-y-2">
          <Link
            to="/login"
            className="text-lg font-semibold hover:text-gray-400"
          >
            Login
          </Link>
          <Link
            to="/restaurants"
            className="text-lg font-semibold hover:text-gray-400"
          >
            Restaurants
          </Link>
          <Link
            to="/about"
            className="text-lg font-semibold hover:text-gray-400"
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
