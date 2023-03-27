import Image from "next/image";
import styles from "../styles/form.module.sass";

import left from "images/createPost/left.png";
import center from "images/createPost/center.png";
import right from "images/createPost/right.png";
import justify from "images/createPost/justify.png";
import list from "images/createPost/list.png";

export default function Panel() {
    return (
        <div className={styles.panel}>
            <div className={styles.panelElements}>
                <button className="left">
                    <Image src={left} alt="align text by left" width="24"/>
                </button>
                <button className="center">
                    <Image src={center} alt="align text by center" width="24"/>
                </button>
                <button className="right">
                    <Image src={right} alt="align text by right" width="24"/>
                </button>
                <button className="justify">
                    <Image src={justify} alt="align text by justify" width="24"/>
                </button>
                <button className="list">
                    <Image src={list} alt="align text by list" width="24"/>
                </button>
                <button
                    className="bold"
                    onClick={() => {
                        const elem = window.getSelection()?.anchorNode?.parentNode as HTMLElement;
                        console.log(elem);
                        const [start, end] = [window.getSelection()?.focusOffset, window.getSelection()?.anchorOffset];
                        if(!elem) return;
                        let text = elem.innerHTML;
                        text = text.slice(0, start) + "<b>" + text.slice(start, end) + "</b>" + text.slice(end);
                        console.log(text);
                        // elem.innerHTML = text;
                    }}>
                    <b>B</b>
                </button>
                <button className="italic">
                    <b><i>I</i></b>
                </button>
                <button className="table">
                    <b>T</b>
                </button>
                <button className="sup">
                    <b>A<sup>b</sup></b>
                </button>
                <button className="sub">
                    <b>A<sub>b</sub></b>
                </button>
                <button className="strike">
                    <b><del>S</del></b>
                </button>
                <button className="underline">
                    <b><u>U</u></b>
                </button>
                <button className="increase indent">
                    <b>-{">"}</b>
                </button>
                <button className="sub">
                    <b>{"<"}-</b>
                </button>
                <button className="sub">
                    <b>Img</b>
                </button>
            </div>
        </div>
    );
}