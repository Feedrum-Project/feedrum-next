import { ElementType, MutableRefObject } from "react";

const ElementType = {
    p: "p",
    bold: "strong",
    b: "strong",
    strong: "strong",
    italic: "i",
    i: "i",
    sup: "sup",
    sub: "sub",
    del: "del",
    strike: "del",
    u: "u",
    h1: "h1",
    h2: "h2",
    mono: "pre",
    a: "a"
};

export function specify(element: string) {
    const selection = window.getSelection();

    const spec = document.createElement(ElementType[element as keyof ElementType]);
    selection?.getRangeAt(0).surroundContents(spec);
}

export function createElement(ref: MutableRefObject<HTMLDivElement | null>, type: string) {
    if(ref === null) return;

    const current = ref.current;
    if(!current) return;

    const elem: HTMLElement = document.createElement(ElementType[type as keyof ElementType]);
    elem.textContent = "Новий елемент";
    elem.contentEditable = "true";
    elem.style.outline = "none";
    
    let id;
    if(current.children.length <= 0) {
        id = 0;
    } else {
        id = Number(Object.entries(current.children)[current.children.length-1][1].id) + 1;
    }
    elem.id = id.toString();

    current.append(elem);
}

const text = {createElement, specify};
export default text;