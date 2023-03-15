/*
HTMLtoJSON,
params:
  HTML:
    its the innterHTML childs and
    text inside possible paragraph. Childs
    mustn't to have childs, in another way
    will be mistakes.
  tags:
    it's an array with tag,value: string.
    Just specify empty array.

use it for parse HTML content to JSON.
*/

/*
JSONtoMD
params:
  JSON:
    object. It mostly specified usually
    instantly from HTMLtoJSON.

use it for parse JSON object to MD
*/

/*
MDtoHTML:
params:
  MD:
    text in MarkDown format.
  count?:
    recommendly dont specify it field,
    used only for recursive.

and it, use for transform MD to HTML.
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

export function HTMLtoJSON(HTML:string, tags:{tag: string, value: string}[] ): {tag: string, value: string}[] {
    const tag = HTML.slice(1,HTML.indexOf(" "));
    const index1 = HTML.slice(HTML.indexOf(">")+1);
    const index2 = index1.slice(0, index1.indexOf("<"));
    const next = HTML.slice(HTML.indexOf("</"+tag+">")+tag.length+3);
    tags.push({tag: tag, value: index2});

    if(!next) return tags;
    HTMLtoJSON(next, tags);
    return tags;
}

export function JSONtoMD(JSON:object): string {
    const list: {tag: string, value: string}[] = Object.values(JSON);
    let result: string = "";

    list.forEach((e: {tag: string, value: string}) => {
        result += eMD[e.tag as keyof typeof eMD]+e.value + "\n";
    });
    return result;
}

export function MDtoHTML(MD:string, count: number=-1): string {

    if(count >= 10) return MD; // Its something like fuse :)

    const prolog = MD.slice(0, MD.indexOf(" "));
    let piece = MD.slice(0, MD.indexOf("\n"));
    
    let result: string = "";

    if(MD === undefined) return result;
    const next = MD.slice(MD.indexOf("\n")+1);

    if(prolog) {
        count++;
        switch(prolog) {
        case "":
            result += "<p id=\""+count+"\" style=\"outline: none\" contenteditable=\"true\">"+piece+"</p>"+MDtoHTML(next, count);
            return result;
        case "#":
            result += "<h1 id=\""+count+"\" style=\"outline: none\" contenteditable=\"true\">"+MD.slice(2, MD.indexOf("\n"))+"</h1>"+MDtoHTML(next, count);
            return result;
        case ">":
            result += "<pre id=\""+count+"\" style=\"outline: none\" contenteditable=\"true\">"+MD.slice(2, MD.indexOf("\n"))+"</pre>"+MDtoHTML(next, count);
            return result;
        default:
            result += "<p id=\""+count+"\" style=\"outline: none\" contenteditable=\"true\">"+piece+"</p>"+MDtoHTML(next, count);
            return result;
        }
    };
    return "";
}

const parser = {
    HTMLtoJSON: HTMLtoJSON,
    JSONtoMD: JSONtoMD,
    MDtoHTML: MDtoHTML
};

export default parser;