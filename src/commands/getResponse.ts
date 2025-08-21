import responses from "../response.json" assert {
    type : "json"
}
export const COMMANDS = ["whoami", "clear", "help", "about", "help", "socials"];
export const getResponse = (command: string): string[] => {
    switch (command.toLowerCase()) {
        case 'curl repo':
            return ["You can view my GitHub repository at    "];
        case 'whoami' : 
            return ["You are sanidhya, a web developer and designer.",
                
            ];
        case 'about':
            return responses.aboutme;
        case "socials" :
            return responses.socials;
        case 'help' : 
            return responses.help;
        default : 
            return ["oops !! this command wont exists . Enter  help to know commands"]
    }
}