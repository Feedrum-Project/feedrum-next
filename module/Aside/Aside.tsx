import { IPost } from "types/Post";
import AsideComponents from "./Components/Components";

interface IAside {
    AsideProfile?: boolean;
    AsideUser?: boolean;
    BestsPosts?: IPost[];
    Rank?: boolean;
    SimilarPosts?: boolean;
    Sponsors?: boolean;
}

export default function Aside(asideComponents: IAside) {

    return (
        <aside>
            {
                <>
                    {
                        asideComponents.BestsPosts !== undefined ?
                            <AsideComponents.BestPosts
                                posts={asideComponents.BestsPosts}
                            />
                            : null
                    }
                    { asideComponents.Sponsors ? <AsideComponents.Sponsors/> : null }
                </>
            }
        </aside>
    );
}