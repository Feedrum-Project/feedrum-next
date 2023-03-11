import styles from "./styles/form.module.sass";
import Panel from "./Components/Panel";
import createPost from "./fetch/createPost";
import { useSelector } from "react-redux";
import Link from "next/link";

export default function CreateForm() {

    const user = useSelector((state: any) => state.user);
    
    function prepare(event:any) {
        event.preventDefault();
        const body = {
            body: event["body"],
            author: "someone"
        };
        createPost(body);
    }

    if(user.id === -1) {
        return (
            <div>
                <h1 style={{color: "#fff"}}>
                    You have to <Link href="/login">sign in</Link> or <Link href="/registration">sign up</Link>.
                </h1>
            </div>
        );
    }

    return (
        <>
            <form onClick={(e:any) => prepare(e)}>
                <h1 style={{color: "white"}}>Створити Пост</h1>
                <div className={styles.form}>
                    <Panel/>
                    <div className="text">
                        <textarea name="body" className={styles.textarea}></textarea>
                    </div>
                    <div className={styles.sectionSubmit}>
                        <div className={styles.centrilizer}></div>
                        <input className={styles.submit} type="submit" value="Submit" />
                    </div>
                </div>
            </form>
        </>
    );
}