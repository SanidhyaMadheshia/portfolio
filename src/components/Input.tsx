import { useEffect, useState } from "react";
import { COMMANDS } from "../commands/getResponse";
import type { History } from "../types/history";
export const UserInput= ({
  inputRef, 
  history , 
  setHistory,
  bottomRef
}: {
  inputRef: React.RefObject<HTMLInputElement | null>;
    history: History[];
    setHistory : (
                    history : History[]
                  )=> void;
  bottomRef: React.RefObject<HTMLDivElement  | null>;
}) => {
    

    const [value, setValue] = useState<string>("");
    // const [isTyping, setIsTyping] = useState(false);
    const [count , setCount ]= useState(0);
    const [, setShowCursor] = useState(true);
    function executeCommand(command : string) {
      console.log("Executing command:", command);
      setValue("");
    }
    function completionHandler(command : string ) {
      COMMANDS.forEach((cmd) => {
        if (cmd.startsWith(command)) {
          setValue(cmd);
        }
      });
    }
    useEffect(() => {
      const interval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500);
      return () => clearInterval(interval);
    }, []);
    function  handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
      // console.log(e.key);

        if(e.key === "Enter") {
          if(value=== "clear") {
            setHistory([]);
            const onlyTerminal= document.getElementById("only-terminal");
            if(onlyTerminal)
            onlyTerminal.innerHTML="";
            setValue("");
            return;
          }
          setHistory([...history,{
            id: history.length + 1,
            command: value,
          } ]);
          setCount(history.length + 1);

          setTimeout(() => {
            bottomRef.current?.scrollIntoView({
                behavior: "smooth",
              block : "end"
              });
          }, 0);
        }   
        switch (e.key) { 
          case "Enter": 
            executeCommand(value);
            setCount(history.length);

            setValue("");
            break;
          case "Tab" : 
            e.preventDefault(); 
            completionHandler(value);
            break;
          case "ArrowUp":
            e.preventDefault();
            if (count > 0) {
              const temp = count - 1;
              setCount(temp);
              setValue(history[temp].command);
            }
            break;

          case "ArrowDown":
            e.preventDefault();
            if (count < history.length) {
              const temp = count + 1;
              setCount(temp);
              if (temp === history.length){
                setValue(""); 
              }else{
                setValue(history[temp].command);
              }
            }
            break;



        }
    }
        return (
            <>
            <br />
            <div className="flex flex-col text-green-300 font-sans">
            </div>
            <br />
              <div>
                        <span id="prompt">sanidhya<span id="user"></span>@<span id="host">ubuntu</span>:$ ~ </span>
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => setValue(e.target.value)}
                          // autoFocus
                          ref={inputRef}
                          className={`
                            px-4 py-2 rounded-lg 
                            bg-${"#1e1e1e"} text-white  
                            outline-none transition-all 
                            border-2 
                            border-transparent
                            terminal-input
                          `}
                          onKeyDown={(e) => {
                            handleKeyDown(e);
                          }}
                        />     
            </div>
            </>
        )
}
export default UserInput;


