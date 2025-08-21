import { useEffect } from "react";
import { getResponse } from "../commands/getResponse";
import type { History } from "../types/history";

function HistoryCommands({ history }: { history: History[] }) {
  useEffect(() => {
    if (history.length === 0) return;

    const lastIndex = history.length - 1;
    const codeblock = history[lastIndex];
    const itemResponse = getResponse(codeblock.command);

    // console.log("Item Response: ", itemResponse);

    const container = document.getElementById(`response-${lastIndex}`);
    if (container) container.innerHTML = ""; 

    itemResponse.forEach((item, idx) => {
      setTimeout(() => {
        const container = document.getElementById(`response-${lastIndex}`);
        if (!container) return;
        const p = document.createElement("p");
        item
        p.innerHTML = item;
        container.appendChild(p);
      }, 40 * idx);
    });
  }, [history]); 

  return (
    <div>
      {history.map((codeblock, index) => (
        <div key={index}>
          <span id="prompt">
            sanidhya<span id="user"></span>@<span id="host">ubuntu</span>:$ ~{" "}
          </span>
          <span className="text-green-400">{codeblock.command}</span>
          <br />
          <div
            className="text-green-300 font-mono text-sm m-10"
            id={`response-${index}`}
          />
        </div>
      ))}
    </div>
  );
}

export default HistoryCommands;

