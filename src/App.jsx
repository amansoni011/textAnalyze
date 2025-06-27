import './App.css'
import { useState } from 'react'

function App() {
const defaultTex = '';  
const [text,setText]= useState(defaultTex);

const handleChange = (e)=>{
  let inputText = e.target.value.trim();
  if (inputText <=100){
  setText(inputText);
  }else {
    alert("Maximum limit 100 words");
  }
}
const uper = ()=>{
  let newTex = text.toUpperCase();
  setText(newTex);
  console.log(newTex);
}
const lower = () =>{
  setText(text.toLowerCase());
  // console.log(text);
}  
const trim = ()=> {
  setText(text.trim());
  // console.log(text);
}
const clear = () => {
  setText(defaultTex)
  // console.log(text);
}
const capitalFirst = () => {
  // setText(text.capitalFirst())
  // console.log(text);
}

  return (
    <div className="textAnalysis">
      <h1>Enter the text analysis</h1>
      <input type="text" onChange={handleChange}  value={text}/>
   <div className="btn">
       <button  onClick={uper}>Convert To UpperCase</button>
      <button onClick={lower}>Convert To LowerCase</button>
      <button onClick={trim}>trim Spaces</button>
      <button onClick={clear}>Clear text </button>
      <button onClick={capitalFirst}>Convert To UpperCase</button>
      <button onClick={read}>Read Text</button>
      <button onClick={copy}>Copy text</button>
   </div>
    </div>
  )
}

export default App
