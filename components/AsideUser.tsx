import styles from 'styles/aside.module.sass'
import Button from './Button'
import Rank from './Rank'

export default function AsideUser({userRank}:any) {
  return (
    <div className={styles.asideUser}>
      <Button Style="purple">Підписатися</Button>
      <Rank userRank={userRank}/>
    </div>
  )
}