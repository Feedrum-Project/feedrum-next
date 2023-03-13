import styles from "./styles/form.module.sass";
import Panel from "./Components/Panel";
import createPost from "./fetch/createPost";
import { useSelector } from "react-redux";
import Link from "next/link";
import { Input } from "components/UI";
import { FormEvent} from "react";
import Editor from "module/Editor/Editor";

interface IBody {
    body: {
        title: string;
        body: string;
    };
    user: {
        id: number;
        email: string;
        name: string;
        iat: number;
        exp: number;
    }
}

export default function CreateForm() {
    const user = useSelector((state: any) => state.user);
    
    function prepare(event: FormEvent & { target: { body: { value: string }, Title: {value: string}}}) {
        event.preventDefault();

        if(!event.target || !event.target.body) return;

        const body: IBody = {
            body: {
                title: event.target.Title.value,
                body: event.target.body.value
            },
            user: user
        };
        createPost(body)
            .then(result => console.log(result));
    }

    if(user.id === -1) {
        return (
            <div>
                <h1 style={{color: "#fff"}}>
                    Ви маєте
                    <Link href="/login">увійти</Link>
                    або
                    <Link href="/registration">зареєструватися</Link>.
                </h1>
            </div>
        );
    }

    return (
        <>
            <h1 style={{color: "white"}}>Створити Пост</h1>
            <div className={styles.form}>
                <Panel/>
                <form onSubmit={(e: any) => prepare(e)}>
                    <div className="text">
                        <Input name="Title"/>
                        <Editor/>
                    </div>
                    <div className={styles.sectionSubmit}>
                        <div className={styles.centrilizer}></div>
                        <input className={styles.submit} type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        </>
    );
}