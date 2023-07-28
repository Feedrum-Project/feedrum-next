import { MDtoHTML } from "helpers/parsers.helper";
import { Dispatch, SetStateAction, useState } from "react";
import styles from "styles/create.module.sass";

interface IView {
    articleSet: [
        article: {
            title: string;
            content: string;
        },
        setArticle: Dispatch<
        SetStateAction<{
            title: string;
            content: string;
        }>
    >
    ];
}
export default function View({articleSet}: IView) {
    const [article, setArticle] = articleSet;
    return (
        <div className={styles.view}>
            <input
                value={article.title}
                onChange={(e) => setArticle(pr => {return {...pr, title: e.target.value};})}
                className={styles.viewTitle}
                placeholder="Беззвісна стаття"
            />
            <p dangerouslySetInnerHTML={{__html: MDtoHTML(article.content)}}>
            </p>
        </div>
    );
}