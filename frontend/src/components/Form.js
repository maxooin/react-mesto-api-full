function Form(props) {

  return(
    <form className="form"
          onSubmit={props.onSubmit}>
      <h2 className="form__title">{props.title}</h2>
      {props.children}
      <button className="form__button">{props.textbtn}</button>
    </form>
  )
}

export default Form;
