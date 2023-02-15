import {useState} from "react";
import Form from '../components/Form'
import {Link} from "react-router-dom";


function Register(props) {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handelePwdChange(evt) {
    setPwd(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onSingUp(email, pwd)
  }

  return (
    <section className="singup">
      <Form title="Регистрация"
            textbtn="Зарегистрироваться"
            onSubmit={handleSubmit}>
        <input className="singup__input"
               name="email"
               type="email"
               value={email || ''}
               minLength={2}
               maxLength={50}
               onChange={handleEmailChange}
               placeholder="Email"
               required/>
        <input className="singup__input"
               name="pwd"
               type="password"
               value={pwd || ''}
               minLength={6}
               maxLength={20}
               onChange={handelePwdChange}
               placeholder="Пароль"
               required/>
      </Form>
      <p className="singup__text">Уже зарегистрированы?
        <Link className="singup__link" to="/singin"> Войти</Link>
      </p>
    </section>
  )
}

export default Register;
