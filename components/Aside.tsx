import BestsPosts from "./BestsPosts"
import Sponsors from "./Sponsors"

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
  )
}