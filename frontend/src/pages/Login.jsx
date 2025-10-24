import { Link, useNavigate } from 'react-router';
import '../styles/Login-Signup.css';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { axiosPrivate } from '../api/axios';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
     e.preventDefault();;

    if(!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setSubmitting(true);

    try {
      const res = await axiosPrivate.post('/auth/login', { email, password });

      const accessToken = res?.data?.accessToken;
      const id = res?.data?.id;
      const username = res?.data?.username;
      const role = res?.data?.role;

      setAuth({ user: { id, username, email, role }, accessToken });
      setEmail('');
      setPassword('');
      toast.success('Login successful!');

      if(role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/tasks', { replace: true });
      }
    } catch (err) {
      console.log(err);
      if (err?.response?.status === 400) {
        toast.error('Missing Email or Password');
      } else {
        toast.error('Login failed. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className='logInSignUp'>
    <div className="logInSignUp-container">
      <h1>Log In</h1>

      <form onSubmit={handleSubmit}>
        <div className="logInSignUp-fields">
            <input type="email" name="email" placeholder='Email Address' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}/>
            
            <input type="password" name="password" placeholder='Password' autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit">
              {submitting ? 'Logging in...' : 'Continue'}
            </button>
          </div>
      </form>

      <p className='logInSignUp-login'>
        Don't have an account?  <span><Link to="/signup">SignUp Here</Link></span>
      </p>
    </div>
  </div>
  )
}
export default Login