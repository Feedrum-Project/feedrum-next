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

export function MDtoHTML(text: string) {
    if (!text) return "";
    let result;
    result = md.render(text);
    return result;
}
export function HTMLtoMD(text: string) {
    if (!text) return "";
    return html.turndown(text);
}
const parser = {
    MDtoHTML,
    HTMLtoMD,
    hightlight,
};

export default parser;
