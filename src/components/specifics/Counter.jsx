//------------------------------------------------------------------------------
// Imports
//------------------------------------------------------------------------------
// Libraries
import { useState } from 'preact/hooks';

// CSS
import '../../styles/components/specifics/Counter.css';

// Components
import Button from '../generics/Button';

//------------------------------------------------------------------------------
// Component
//------------------------------------------------------------------------------
const Counter = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  // You can also pass a callback to the setter
  const decrement = () => setCount((currentCount) => currentCount - 1);

  return (
    <div className='counter'>
      <h3>A (p)reactive component</h3>
      <p>Count: {count}</p>
      <Button callback={increment}>Increment</Button>
      <Button callback={decrement}>Decrement</Button>
    </div>
  )
}

export default Counter;