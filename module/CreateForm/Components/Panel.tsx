import Image from "next/image";
import styles from "../styles/form.module.sass";
import left from "images/createPost/left.png";
import center from "images/createPost/center.png";
import right from "images/createPost/right.png";
import justify from "images/createPost/justify.png";
import list from "images/createPost/list.png";
import { specify } from "module/Editor/helpers/text";

export default function Panel() {
    return (
        <div className={styles.panel}>
            <div className={styles.panelElements}>
                <button className="left" disabled>
                    <Image src={left} alt="align text by left" width="24"/>
                </button>
                <button className="center" disabled>
                    <Image src={center} alt="align text by center" width="24"/>
                </button>
                <button className="right" disabled>
                    <Image src={right} alt="align text by right" width="24"/>
                </button>
                <button className="justify" disabled>
                    <Image src={justify} alt="align text by justify" width="24"/>
                </button>
                <button className="list" disabled>
                    <Image src={list} alt="align text by list" width="24"/>
                </button>
                <button
                    className="bold"
                    onClick={() => specify("bold")}>
                    <b>B</b>
                </button>
                <button
                    className="italic"
                    onClick={() => specify("i")}>
                    <b><i>I</i></b>
                </button>
                <button className="table" disabled>
                    <b>T</b>
                </button>
                <button
                    className="sup"
                    onClick={() => specify("sup")}>
                    <b>A<sup>b</sup></b>
                </button>
                <button
                    className="sub"
                    onClick={() => specify("sub")}>
                    <b>A<sub>b</sub></b>
                </button>
                <button
                    className="strike"
                    onClick={() => specify("del")}>
                    <b><del>S</del></b>
                </button>
                <button
                    className="underline"
                    onClick={() => specify("u")}>
                    <b><u>U</u></b>
                </button>
                <button className="increase indent" disabled>
                    <b>-{">"}</b>
                </button>
                <button className="decrease indent" disabled>
                    <b>{"<"}-</b>
                </button>
                <button className="img" disabled>
                    <b>Img</b>
                </button>
            </div>
        </div>
    );
}