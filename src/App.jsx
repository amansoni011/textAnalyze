import './App.css'
import { useState } from 'react'
import toast from 'react-hot-toast';

function App() {
  const defaultTex = '';
  const [text, setText] = useState(defaultTex);
  const [findWord, setFindWord] = useState('');
  const [replaceWord, setReplaceWord] = useState('');


  // word count
  const getWordCount = (input) => {
    return input.trim().split(/\s+/).filter(Boolean).length;
  };

  // Reusable word limit checker
  const isWordLimitExceeded = () => {
    const count = getWordCount(text);
    if (count > 10) {
      toast.error("Maximum word limit is 10");
      return true;
    }
    return false;
  };

  //  On input change
  const handleChange = (e) => {
    const rawText = e.target.value;
    const wordCount = getWordCount(rawText);
    if (wordCount <= 10) {
      setText(rawText);
    } else {
      toast.error("Maximum word limit is 10");
    }
  };

  const uper = () => {
    if (isWordLimitExceeded()) return;
    setText(text.toUpperCase());
  };

  const lower = () => {
    if (isWordLimitExceeded()) return;
    setText(text.toLowerCase());
  };

  const trim = () => {
    if (isWordLimitExceeded()) return;
    setText(text.trim());
  };

  const clear = () => {
    setText(defaultTex);
  };

  const capitalFirst = () => {
    if (isWordLimitExceeded()) return;
    const capitalized = text
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
    setText(capitalized);
  };

  const copy = () => {
    if (isWordLimitExceeded()) return;
    navigator.clipboard.writeText(text);
    toast.success('Text copied Successfully');
  };

  const read = () => {
    if (isWordLimitExceeded()) return;
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
  };

  const handleReplace = () => {
    if (isWordLimitExceeded()) return;

    if (!findWord.trim()) {
      toast.error("Please enter the word to find.")
      return;
    }
    if (!text.includes(findWord)) {
    toast.error(`The word "${findWord}" was not found in the text.`);
    return;
  }
    const replacedText = text.replaceAll(findWord, replaceWord);
    setText(replacedText);
    
  };

  return (
    <div className="textAnalysis">
      <h1>Enter the text for analysis</h1>

      <input type="text" onChange={handleChange} value={text} />

      <p>Words: {getWordCount(text)} / 10</p>

      <div className="btn">
        <button onClick={uper}>Convert To UpperCase</button>
        <button onClick={lower}>Convert To LowerCase</button>
        <button onClick={trim}>Trim Spaces</button>
        <button onClick={clear}>Clear Text</button>
        <button onClick={capitalFirst}>Capitalize First Letters</button>
        <button onClick={read}>Read Text</button>
        <button onClick={copy}>Copy Text</button>
      </div>
      <div className="findReplace">
        <h3>Find and Replace</h3>
        <input
          type="text"
          placeholder="Word to find"
          value={findWord}
          onChange={(e) => setFindWord(e.target.value)}
        />
        <input
          type="text"
          placeholder="Replacement word"
          value={replaceWord}
          onChange={(e) => setReplaceWord(e.target.value)}
        />
        <button onClick={handleReplace}>Replace</button>
      </div>
    </div>

  );
}

export default App;
