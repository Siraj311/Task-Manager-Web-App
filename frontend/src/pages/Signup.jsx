import { Link, useNavigate } from 'react-router';
import '../styles/Login-Signup.css';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { axiosPrivate } from '../api/axios';

const Signup = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setSubmitting(true);

    try {
      const res = await axiosPrivate.post('/auth/signup',
          { username, email, password }
      );

      console.log(JSON.stringify(res?.data));

      setUsername('');
      setEmail('');
      setPassword('');
      toast.success('Signup successful!');

      navigate('/', { replace: true });
    } catch (err) {
      console.error(err);
      if (!err?.response) {
          toast.error('No Server Response');
      } else if (err.response?.status === 409) {
          toast.error('User Email Taken');
      } else {
          toast.error('Registration Failed')
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='logInSignUp'>
    <div className="logInSignUp-container">
      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit}>
        <div className="logInSignUp-fields">
          <input type="text" name="name" placeholder='Username' 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}/>

          <input type="email" name="email" placeholder='Email Address' 
          value={email}
          onChange={(e) => setEmail(e.target.value)}/>

          <input type="password" name="password" placeholder='Password' autoComplete="off" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>

          <button disabled={submitting} type="submit">
            {submitting ? 'Signing up...' : 'Continue'}
          </button>
        </div>
      </form>

      <p className='logInSignUp-login'>
        Already have an account? <span><Link to="/">Log In Here</Link></span>
      </p>
    </div>
  </div>
  )
}

export default Signup;