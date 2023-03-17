import AsideComponents from "./Components/Components";

interface IAside {
    AsideProfile?: boolean;
    AsideUser?: boolean;
    BestsPosts?: boolean;
    Rank?: boolean;
    SimilarPosts?: boolean;
    Sponsors?: boolean;
}

export default function Aside(asideComponents: IAside) {

    return (
        <aside>
            {
                <>
                    { asideComponents.BestsPosts ? <AsideComponents.BestPosts/> : null }
                    { asideComponents.Sponsors ? <AsideComponents.Sponsors/> : null }
                </>
            }
        </aside>
    );
}