import MarkdownIt from "markdown-it";
import TurndownService from "turndown";
import hljs from "highlight.js";

const md = new MarkdownIt({ linkify: true, html: true, typographer: true });
const html = new TurndownService();

export function hightlight(text: string) {
    if (!text) return "";
    let result = hljs.highlight(text, { language: "markdown" }).value;
    // result = result.replaceAll("\n", "<br/>");
    return result;
}

/**
 * Transfer MarkDown to HTML, includes 1 extra-function.
 * @param {string} text - HTML
 * @returns
 */
export function MDtoHTML(text: string) {
    if (!text) return "";
    let result = md
        .render(text)
        .replaceAll("\n", "<br/>")
        .replaceAll("</code></p><br/>", "</code></p>"); // KALLHOZ
    result += "<p><br/></p>";
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
