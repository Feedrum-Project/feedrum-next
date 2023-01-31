import styles from 'styles/aside.module.sass'
import Button from '../Button/Button'
import Rank from './Rank'

interface AsideUserProps {
  userRank:string
}

export default function AsideUser({userRank}:AsideUserProps) {
  return (
    <div className={styles.asideUser}>
      <Button Style="purple">Підписатися</Button>
      <Rank userRank={userRank}/>
    </div>
  )
}