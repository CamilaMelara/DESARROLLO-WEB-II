import {useState} from "react"

const CounterApp=()=>{
    const [counter, setCounter]=useState(0);

    return(
        <>
        <h1>{counter}</h1>
        <button onClick={handleAdd}>+1</button>
        <button>-1</button>
        <button>Reset</button>
        </>

    )
}

export default CounterApp; 