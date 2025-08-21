import command from "../response.json" assert {
    type : "json"
}


export const about = (): string[]  => {
    // console.log("About command executed");

    const about: string[] = [];
    about.push("<br>");
    command.about.forEach((line)=> {
        about.push(line);
        about.push("<br>");
    })

    about.push("<br>");

    return about;  

}