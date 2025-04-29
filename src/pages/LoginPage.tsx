import { useState } from 'react';
import { loginUser } from '../services/authServices';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const fetchUser = async () => {
    try {
      const data = await loginUser(email, password);
      console.log(data);
    } catch (error) {}
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUser();
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
          Login
        </button>
      </form>
    </div>
  );
};
export default LoginPage;
