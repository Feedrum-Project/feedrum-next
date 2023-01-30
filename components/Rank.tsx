import styles from 'styles/rank.module.sass'
import Image from 'next/image'
import arrowTop from 'images/arrow-top.svg'
import arrowBottom from 'images/arrow-bottom.svg'

export default function Rank({userRank=0}:any) {
  return (
    <div className={styles.rank}>
      <button className={styles.growReputation}>
        <Image src={arrowTop} alt="Підняти репутацію"/>
      </button>
      <div
      className="rankCount"
      style={{color: userRank > 0 ? '#6AEA3D' : userRank < 0 ? '#F36A6A' : '#BEBEBE'}}
      >
        {userRank > 0 ? '+' : null}{userRank}
        </div>
      <button className={styles.reduceReputation}>
        <Image src={arrowBottom} alt="Знизити репутацію"/>
      </button>
    </div>
  )
}