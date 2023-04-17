import MarkdownIt from "markdown-it";
import TurndownService from "turndown";
import hljs from "highlight.js";

const md = new MarkdownIt();
const html = new TurndownService();

export function hightlight(text: string) {
    if(!text) return "";
    let result = hljs.highlight(text, {language: "markdown"}).value;
    result = result.replaceAll("\n", "<br/>");
    result = result.replaceAll("hljs-strong", "strong")
        .replaceAll("hljs-emphasis", "italic")
        .replaceAll("hljs-meta", "meta")
        .replaceAll("hljs-string", "string")
        .replaceAll("hljs-link", "link")
        .replaceAll("hljs-bullet", "bullet")
        .replaceAll("hljs-quote", "quote")
        .replaceAll("hljs-code", "code")
        .replaceAll("hljs-symbol", "symbol")
        .replaceAll("hljs-attr", "attr")
        .replaceAll("hljs-section", "meta");
    return result;
}

export function MDtoHTML(text: string, isEditable:boolean=true) {
    if(!text) return "";
    let result;
    if(isEditable) {
        let rendered: (string | undefined)[] = md.render(text).split(">");
        rendered = rendered.splice(0, rendered.length-1);
        rendered = rendered.map((e, i) => {
            let res;
            i%2 ?
                res = e+">"
                :
                res = e+" style=\"outline: none;\" contenteditable=\"true\">";
            return res;
        });
        result = rendered.join("");
    } else {
        result = md.render(text);
    }
    return result;
};
export function HTMLtoMD(text: string) {
    if(!text) return "";
    return html.turndown(text);
};
const parser = {
    MDtoHTML,
    HTMLtoMD,
    hightlight
};

export default parser;