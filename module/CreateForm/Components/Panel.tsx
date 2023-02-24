import Image from "next/image"
import styles from "../styles/form.module.sass"

import left from "images/createPost/left.png"
import center from "images/createPost/center.png"
import right from "images/createPost/right.png"
import justify from "images/createPost/justify.png"
import list from "images/createPost/list.png"

export default function Panel() {
    return (
        <div className={styles.panel}>
            <div className={styles.panelElements}>
                <div className="left">
                    <Image src={left} alt="align text by left" width="24"/>
                </div>
                <div className="center">
                    <Image src={center} alt="align text by center" width="24"/>
                </div>
                <div className="right">
                    <Image src={right} alt="align text by right" width="24"/>
                </div>
                <div className="justify">
                    <Image src={justify} alt="align text by justify" width="24"/>
                </div>
                <div className="list">
                    <Image src={list} alt="align text by list" width="24"/>
                </div>
                <div className="bold">
                    <b>B</b>
                </div>
                <div className="italic">
                    <b><i>I</i></b>
                </div>
                <div className="table">
                    <b>T</b>
                </div>
                <div className="sup">
                    <b>A<sup>b</sup></b>
                </div>
                <div className="sub">
                    <b>A<sub>b</sub></b>
                </div>
                <div className="strike">
                    <b><del>S</del></b>
                </div>
                <div className="underline">
                    <b><u>U</u></b>
                </div>
                <div className="increase indent">
                    <b>-{">"}</b>
                </div>
                <div className="sub">
                    <b>{"<"}-</b>
                </div>
                <div className="sub">
                    <b>Img</b>
                </div>
            </div>
        </div>
    )
}