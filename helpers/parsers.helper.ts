import MarkdownIt from "markdown-it";
import { render } from "react-dom";
import TurndownService from "turndown";
const md = new MarkdownIt();
const html = new TurndownService();

export function MDtoHTML(text: string) {
    // let rendered: (string | undefined)[] = md.render(text).split(">");
    // rendered = rendered.map((e, i) => {
    //     if(i === rendered.length-1){
    //     } else {
    //         if(i%2) {
    //             return e+">";
    //         } else {
    //             return e+" contenteditable\"true\">";
    //         }
    //     }
    // });
    // const result: string = rendered.join("");
    // console.log(result);

    // its works, but need convert &gt; &lt; to > <
    return md.render(text);
};
export function HTMLtoMD(text: string) {
    return html.turndown(text);
};
const parser = {
    MDtoHTML,
    HTMLtoMD
};

export default parser;