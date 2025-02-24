import './App.css';
import { VerifyEmail } from './components/VerifyEmail';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user, isAuthenticated } = useAuth();
  console.log(user, 'from user');
  return (
    <div className="h-[500px] flex justify-center items-center">
      <div>
        {user && user?.email_verified ? (
          <div className="mb-20">
            <VerifyEmail />
          </div>
        ) : null}

        <h1 className="text-6xl font-bold">Welcome, Athentication System</h1>

        <h1 className="text-2xl mt-5 block font-bold text-gray-700">
          #{isAuthenticated ? user.username : 'Guest'}
        </h1>
      </div>
    </div>
  );
}

export default App;
