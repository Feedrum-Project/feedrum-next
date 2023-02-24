import styles from "./styles/form.module.sass"
import Panel from "./Components/Panel"
import createPost from "./fetch/createPost"

export default function CreateForm() {
    function prepare(event:any) {
        event.preventDefault()
        const body = {
            body: event["body"],
            author: "someone"
        }
        createPost(body)
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
    )
}