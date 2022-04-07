//------------------------------------------------------------------------------
// Imports
//------------------------------------------------------------------------------
import { useState } from 'preact/hooks';
import '../../styles/components/generics/Button.css';

//------------------------------------------------------------------------------
// Component
//------------------------------------------------------------------------------
const Button = (props) => {
  // Props checking
  const callback = props.callback && typeof props.callback === 'function' ?
    props.callback : 
    () => {};

  return (
    <button onClick={callback}>
      {props.children}
    </button>
  )
}

export default Button;