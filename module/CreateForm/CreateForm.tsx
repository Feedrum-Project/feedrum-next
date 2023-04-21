import styles from "./styles/form.module.sass";
import Panel from "./Components/Panel";
import Editor from "./Components/Editor";
import { Button } from "components/UI";
import { useEffect, useState } from "react";

interface ISelects {
    header?: boolean;
    italic?: boolean;
    link?: boolean;
    bold?: boolean;
}

export default function CreateForm({texts: [texts, setText]}: any) {
    const selects = useState<ISelects>({header: false});

    return (
        <>
            <Panel selects={selects}/>
            <Editor selects={selects} text={[texts, setText]}/>
            <div className={styles.buttons}>
                <Button type="submit" Style="purple">Оприлюднити</Button>
                <Button Style="standart">Зберегти як чорнетка</Button>
            </div>
        </>
    );
}