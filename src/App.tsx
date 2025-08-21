import { useEffect, useRef, useState } from "react";
import "./App.css";
import UserInput from "./components/Input";
import type { History } from "./types/history";
import { BANNER } from "./commands/banner"; // array of strings (with spaces or &nbsp;)
import HistoryCommands from "./components/History";

function toHtml(line: string) {
  return line.includes("&nbsp;") ? line : line.replace(/ /g, "&nbsp;");
}

export default function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const [history, setHistory] = useState<History[]>([]);
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    inputRef.current?.focus();

    const handleClick = (e: MouseEvent) => {
      if (inputRef.current && e.target !== inputRef.current) {
        inputRef.current.focus();
      }
    };
    document.addEventListener("click", handleClick);

    BANNER.forEach((line, idx) => {
      setTimeout(() => {
        setLines((prev) => [...prev, toHtml(line)]);
      }, 40 * idx);
    });

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="parent">
      <div id="terminal" className="terminal">
        <div id="only-terminal">
          <span id="prompt">
            sanidhya<span id="user"></span>@<span id="host">ubuntu</span>:$ ~
          </span>

          <div className="m-10">
            <div id="write-lines" className="text-green-300 font-mono whitespace-pre leading-tight">
              {lines.map((line, i) => (
                <pre
                  key={i}
                  className="font-mono"
                  dangerouslySetInnerHTML={{ __html: line }}
                />
              ))}
            </div>
          </div>
        </div>

        <HistoryCommands history={history} />

        <div id="input-command">
          <UserInput
            inputRef={inputRef}
            history={history}
            setHistory={setHistory}
            bottomRef={bottomRef}
          />
        </div>

        <div ref={bottomRef} />
      </div>
    </div>
    
  );
}
