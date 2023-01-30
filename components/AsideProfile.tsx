import styles from 'styles/aside.module.sass'
import Button from './Button'
import Link from 'next/link'
import Image from 'next/image'
import avatar from 'images/avatar.svg'

export default function AsideProfile({userName, userId}:any) {
  return (
    <div className={styles.AsideProfile}>
      <div className={styles.left}>
        <Link className={styles.left} href={`/users/${userId}`} style={{textDecoration: 'none', color:"white"}}>
          <Image width="25" height="25" src={avatar} alt="Аватар"/>
          <span className={styles.left__text}>{userName}</span>
        </Link>
      </div>
      <div className="right">
        <Button Style={"purple"}>Підписатися</Button>
      </div>
    </div>
  )
}