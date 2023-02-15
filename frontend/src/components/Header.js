import logo from "../image/logo/logo.svg";
import {Link, Route, Routes} from "react-router-dom";

function Header(props) {

  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo"/>
      {props.loggedIn && (
        <nav className="header__nav">
          <span className="header__email">{props.email}</span>
          <button className="header__button" onClick={props.onLogOut}>Выйти</button>
        </nav>
      )}
      {!props.loggedIn && (
        <Routes>
          <Route path='/singin' element={<Link className="header__link" to='/singup'>Регистрация</Link>}/>
          <Route path='/singup' element={<Link className="header__link" to='/singin'>Войти</Link>}/>
        </Routes>
      )}
    </header>
  )
}

export default Header;
