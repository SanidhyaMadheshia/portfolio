import commands from "../response.json"  assert {
    type : "json"
};
const banner = () : string[]=> {
    const banner : string[] = [];
    commands.about.map((line)=> {
        let bannerString = ''
        if(line === "<br/>") {
            banner.push('');
            return;
        }
        for (let i = 0; i < line.length; i++) {
            if (line[i] === ' ') {
                bannerString += '&nbsp;'
            } else {
                bannerString += line[i]
            }
        }
        let lineToPush = `<pre>${bannerString}</pre>`
        console.log("Line to push: ", lineToPush);
        banner.push(lineToPush);
    });
         banner.push('<br>')
        banner.push('Bonjour! Welcome to My Portfolio!')
        banner.push("Type <span class='command'>'help'</span> for a list of all available commands.")
        banner.push('<br>');
    return banner;
}
export const BANNER = banner();
console.log("Banner: ", BANNER);