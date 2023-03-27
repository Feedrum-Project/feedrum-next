import styles from "./styles/form.module.sass";
import Panel from "./Components/Panel";
import createPost from "./fetch/createPost";
import { useSelector } from "react-redux";
import Link from "next/link";
import { Input } from "components/UI";
import { FormEvent} from "react";
import Editor from "module/Editor/Editor";
import { IUser } from "types/User";

interface IBody {
    body: {
        title: string;
        body: string;
    };
    user: IUser;
}
type IForm = FormEvent<HTMLFormElement> & { target: { body: { value: string }, "Назва": {value: string}} & HTMLElement};

export default function CreateForm() {
    const user = useSelector((state: any) => state.user);
    
    function prepare(event: IForm) {
        event.preventDefault();

        if(!event.target || !event.target.body) return;
        
        const body: IBody = {
            body: {
                title: event.target["Назва"].value,
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
                    Ви маєте&nbsp;
                    <Link href="/login">увійти</Link>&nbsp;
                    або&nbsp;
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
                <form onSubmit={(e: IForm) => prepare(e)}>
                    <div className="text">
                        <Input name="Назва" placeholder="Назва статті"/>
                        <Editor/>
                    </div>
                    <div className={styles.sectionSubmit}>
                        <div className={styles.centrilizer}></div>
                        <input className={styles.submit} type="submit" value="Прийняти" />
                    </div>
                </form>
            </div>
        </>
    );
}