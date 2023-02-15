import {useState} from "react";
import Form from "../components/Form"

function Login(props) {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handelePwdChange(evt) {
    setPwd(evt.target.value);
  }

  function handleLogIn(evt) {
    evt.preventDefault()
    props.onLogin(email, pwd)
  }

  return (
    <section className="login">
      <Form title="Вход"
      textbtn="Войти"
      onSubmit={handleLogIn}>
        <input className="login__input"
               name="email"
               type="email"
               value={email || ''}
               minLength={2}
               maxLength={50}
               onChange={handleEmailChange}
               placeholder="Email"
               required/>
        <input className="login__input"
               name="pwd"
               type="password"
               value={pwd || ''}
               minLength={6}
               maxLength={20}
               onChange={handelePwdChange}
               placeholder="Пароль"
               required/>
      </Form>
    </section>
  )
}

export default Login;
