import { MutableRefObject } from "react";

function createParagragh(ref: MutableRefObject<HTMLDivElement | null>) {
    if(ref === null) return;

    const current = ref.current;
    if(!current) return;

    const p = document.createElement("p");
    p.textContent = "Новий параграф";
    p.contentEditable = "true";
    p.style.outline = "none";
    
    let id;
    if(current.children.length <= 0) {
        id = 0;
    } else {
        id = Number(Object.entries(current.children)[current.children.length-1][1].id) + 1;
    }
    p.id = id.toString();

    current.append(p);
}

function createTitle(ref: MutableRefObject<HTMLDivElement | null>) {
    if(ref === null) return;

    const current = ref.current;
    if(!current) return;

    const h1 = document.createElement("h1");
    h1.textContent = "Новий заголовочний текст";
    h1.contentEditable = "true";
    h1.style.outline = "none";

    if(!current.children) return;
    let id;
    if(current.children.length <= 0) {
        id = 0;
    } else {
        id = Number(Object.entries(current.children)[current.children.length-1][1].id) + 1;
    }
    h1.id = id.toString();

    current.append(h1);
}

function createMono(ref: MutableRefObject<HTMLDivElement | null>) {
    if(ref === null) return;

    const current = ref.current;
    if(!current) return;

    const pre = document.createElement("pre");
    pre.textContent = "Моноширний текст";
    pre.contentEditable = "true";
    pre.style.outline = "none";
    
    if(!current.children) return;
    let id;
    if(current.children.length <= 0) {
        id = 0;
    } else {
        id = Number(Object.entries(current.children)[current.children.length-1][1].id) + 1;
    }
    pre.id = id.toString();

    current.append(pre);
}

export {createParagragh, createTitle, createMono};