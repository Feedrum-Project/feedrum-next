import BestsPosts from "./Components/BestsPosts";
import Sponsors from "./Components/Sponsors";

export default function Aside() {

    return (
        <aside>
            {
                <>
                    <BestsPosts/>
                    <Sponsors/>
                </>
            }
        </aside>
    );
}