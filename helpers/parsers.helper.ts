import MarkdownIt from "markdown-it";
import TurndownService from "turndown";
import hljs from "highlight.js";

const md = new MarkdownIt({ linkify: true, html: true, typographer: true });
const html = new TurndownService();

export function hightlight(text: string) {
    if (!text) return "";
    let result = hljs.highlight(text, { language: "markdown" }).value;
    result = result.replaceAll("\n", "<br/>");
    return result;
}

/**
 * Transfer MarkDown to HTML, includes 1 extra-function.
 * @param {string} text - HTML
 * @returns 
 */
export function MDtoHTML(text: string) {
    if (!text) return "";
    const result = md.render(text).replaceAll("\n", "<br/>");

    /**
     * This function is !recursive!, create highlight above <code/>.
     * Actually it works only for JavaScript, yet.
     * @param {string} text - HTML text what includes <code/>
     * @param {number} position - position in text from where func shoud to parse. By default =0
     * @returns string
     */
    // function parser(text: string, position: number=0) {
    //     // parser for code.
    //     if(!text.slice(position).includes("<code>")) return text;

    //     const i = text.slice(position).indexOf("<code>");
    //     const iLast = text.slice(position).indexOf("</code>");
    //     const textBefore = text.slice(0, i);
    //     const textAfter = text.slice(iLast+7, -1)+">";
    //     const textMid = hljs.highlight(text.slice(i+6, iLast), { language: "javascript" }).value;

    //     const sourceHTML = textBefore+"<code>"+textMid+"</code>"+textAfter;
        
    //     return sourceHTML;
    // }
    // soon
    return result;
}
export function HTMLtoMD(text: string) {
    if (!text) return "";
    const res = html.turndown(text);
    return res;
}
const parser = {
    MDtoHTML,
    HTMLtoMD,
    hightlight,
};

export default parser;
