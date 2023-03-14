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
export function parserHTMLtoJSON(HTML:string, tags:{tag: string, value: string}[] ): any {
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
export function parserJSONtoMD(JSON:object) {

}