import { useContext, useState } from 'react';
import { getAuthenticatedUser, loginUser } from '../services/authServices';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext.Provider is missing!');
  }

  const { setUser } = authContext;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const loginResponse = await loginUser(email, password);

      if (!loginResponse || !loginResponse.access_token) {
        console.log('Invalid login credentials.');
        setError('Wrong username or password');
        return;
      }

      const token = loginResponse.access_token;
      const userData = await getAuthenticatedUser(token);

      if (userData) {
        setUser(userData);
      }
      alert('Log in successful');
      navigate('/products');
    } catch (error: any) {
      setError('Error');
      console.log(error);
    }
  };
  return (
    <div className="text-center items-center mx-auto mt-10">
      <form
        className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
        onSubmit={handleSubmit}
      >
        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-neutral mt-4" type="submit">
          Log in
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};
export default LoginPage;
