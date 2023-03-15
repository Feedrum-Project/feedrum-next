// Parser HTML to JSON

/*
parserHTMLtoJSON,
params:
  HTML its innterHTML childs and
    text inside possible paragraph. Childs
    mustn't to have childs, in another way
    will be mistakes.
  tags:
    it's an array with tag,value: string.
    Just specify empty array.

use it for parse HTML content to JSON.
*/

enum eMD {
  "h1"="# ",
  "h2"="## ",
  "h3"="### ",
  "h4"="#### ",
  "h5"="##### ",
  "h6"="###### ",
  "p"="",
  "pre"="> "
}

export function parserHTMLtoJSON(HTML:string, tags:{tag: string, value: string}[] ): {tag: string, value: string}[] {
    const tag = HTML.slice(1,HTML.indexOf(" "));
    const index1 = HTML.slice(HTML.indexOf(">")+1);
    const index2 = index1.slice(0, index1.indexOf("<"));
    const next = HTML.slice(HTML.indexOf("</"+tag+">")+tag.length+3);
    tags.push({tag: tag, value: index2});

    if(!next) return tags;
    parserHTMLtoJSON(next, tags);
    return tags;
}

// Parser JSON to MarkDown
export function parserJSONtoMD(JSON:object): string {
    const list: {tag: string, value: string}[] = Object.values(JSON);
    let result: string = "";

    list.forEach((e: {tag: string, value: string}) => {
        result += eMD[e.tag as keyof typeof eMD]+e.value + "\n";
    });
    return result;
}

export function MDtoHTML(MD:string, count: number=0): string {
    const prolog = MD.slice(0, MD.indexOf(" "));
    const piece = MD.slice(0, MD.indexOf("\n"));
    let result: string = "";

    if(!piece) return result;
    if(MD === undefined) return result;
    const next = MD.slice(MD.indexOf("\n"));
    console.log(next);

    if(prolog.endsWith("")) {
        count+=1;
        MDtoHTML(piece, count);
        switch(prolog) {
        case "":
            return "<p id=\""+count+"\">"+piece+"</p>";
        case "#":
            return "<h1 id=\""+count+"\">"+MD.slice(2, MD.indexOf("\n"))+"</h1>";
        default:
            return "<p id=\""+count+"\">"+piece+"</p>";
        }
    };
    return prolog;
}