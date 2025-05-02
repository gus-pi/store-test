import { useState } from 'react';
import { useNavigate } from 'react-router';

import { createUser } from '../services/userServices';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newUserData = await createUser(name, email, password, avatar);

      if (!newUserData) {
        console.log('error creating user');
      }
      navigate('/auth/login');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="text-center items-center mx-auto mt-10">
      <form
        className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
        onSubmit={handleSubmit}
      >
        <label className="label">Name</label>
        <input
          type="text"
          className="input"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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

        <label className="label">Avatar URL</label>
        <input
          type="text"
          className="input"
          placeholder="Avatar"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />

        <button className="btn btn-neutral mt-4" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
