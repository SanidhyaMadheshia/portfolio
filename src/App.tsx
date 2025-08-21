import { useEffect, useRef, useState } from 'react'
import './App.css'
import UserInput from './components/Input'
import type { History } from './types/history';
import { BANNER } from './commands/banner';
import HistoryCommands from './components/History';

function initEventListners() {
  console.log("Initializing event listeners...");
  window.addEventListener("load", () => {
    writeLines(BANNER);
  })
}
function writeLines(message: string[]) {
  message.forEach((item, idx) => {
    displayText(item, idx)
  })
}
export function displayText(item: string, idx: number) {
  setTimeout(() => {
    const mutWriteLines = document.getElementById('write-lines'); // <-- grab fresh
    if (!mutWriteLines) return;
    console.log("item ::", item);
    const p = document.createElement('p');
    p.innerHTML += item;
    mutWriteLines.parentNode!.insertBefore(p, mutWriteLines);
  }, 40 * idx);
}
function App() {
  // const [value, setValue] = useState<string>("")
  const inputRef = useRef<HTMLInputElement>(null);
  const [history, setHistory] = useState<History[]>([]);
  const [, setLines] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    initEventListners();
    inputRef.current?.focus();
    const handleClick = (e: MouseEvent) => {
      console.log("Clicked outside input");
      if (inputRef.current && e.target !== inputRef.current) {
        console.log("Input ", inputRef.current);
        inputRef.current.focus();
      }
    };
    document.addEventListener("click", handleClick);
    BANNER.forEach((line, idx) => {
      setTimeout(() => {
        setLines(prev => [...prev, line]);
      }, 40 * idx);
    });
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      <div className='parent'>
        <div id="terminal" className='terminal'>
          <div id="only-terminal">
            <span id="prompt">sanidhya<span id="user"></span>@<span id="host">ubuntu</span>:$ ~ </span>
            <div className=' m-10 ' >
              <div id="write-lines" className='text-green-300 font-mono '>
              </div>
            </div>
          </div>
          <HistoryCommands history={history} />
          <div id='input-command'>
            <UserInput inputRef={inputRef} history={history} setHistory={setHistory} bottomRef={bottomRef} />
            <div>
            </div>
          </div>
          <div className=' '>
          </div>
          <div ref={bottomRef}></div>
        </div>
      </div>
    </>
  )
}

export default App
