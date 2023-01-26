import BestsPosts from "./BestsPosts"
import Sponsors from "./Sponsors"
import styles from '../styles/aside.module.css'

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