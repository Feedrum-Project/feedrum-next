import { IPost } from "types/Post";
import AsideComponents from "./Components/Components";

interface IAside {
    AsideProfile?: boolean;
    AsideUser?: boolean;
    BestPosts?: IPost[];
    Rank?: boolean;
    SimilarPosts?: boolean;
    Sponsors?: boolean;
}

export default function Aside(asideComponents: IAside) {
    return (
        <aside>
            {
                <>
                    {asideComponents.BestPosts !== undefined ? (
                        <AsideComponents.BestPosts
                            posts={asideComponents.BestPosts}
                        />
                    ) : null}
                    {asideComponents.Sponsors ? (
                        <AsideComponents.Sponsors />
                    ) : null}
                </>
            }
        </aside>
    );
}
