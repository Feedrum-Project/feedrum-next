import createPost from "./fetch/createPost";
import Panel from "./Components/Panel";
import { useSelector } from "react-redux";
import Link from "next/link";
import { FormEvent} from "react";
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
            <Panel/>
        </>
    );
}