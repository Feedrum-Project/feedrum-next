import styles from '../styles/aside.module.css'

const sponsors = [
  {id:1, name:"Oleža", moneys:"254$"},
  {id:2, name:"Autist", moneys:"60$"},
  {id:3, name:"Bebra", moneys:"10$"}
]
function Icon() {
  return (
  <svg className={styles["sponsor__nameIcon"]} width="21" height="21" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.13071 17.25L8.12303 17.2496C8.11239 17.2488 8.09394 17.247 8.07048 17.2431C8.0212 17.2349 7.96312 17.2194 7.91111 17.1934C7.86105 17.1684 7.8262 17.1387 7.80274 17.1035C7.78138 17.0715 7.75 17.0063 7.75 16.875C7.75 16.5659 7.91902 15.8193 8.58793 15.1504C9.24218 14.4962 10.4179 13.875 12.5 13.875C14.5821 13.875 15.7578 14.4962 16.4121 15.1504C17.081 15.8193 17.25 16.5659 17.25 16.875C17.25 17.0063 17.2186 17.0715 17.1973 17.1035C17.1738 17.1387 17.139 17.1684 17.0889 17.1934C17.0369 17.2194 16.9788 17.2349 16.9295 17.2431C16.9061 17.247 16.8876 17.2488 16.877 17.2496L16.8693 17.25H8.13071ZM8.13183 17.2501L8.13173 17.2501L8.13183 17.2501ZM14.0026 11.3776C13.6041 11.7761 13.0636 12 12.5 12C11.9364 12 11.3959 11.7761 10.9974 11.3776C10.5989 10.9791 10.375 10.4386 10.375 9.875C10.375 9.31141 10.5989 8.77091 10.9974 8.3724C11.3959 7.97388 11.9364 7.75 12.5 7.75C13.0636 7.75 13.6041 7.97388 14.0026 8.3724C14.4011 8.77091 14.625 9.31141 14.625 9.875C14.625 10.4386 14.4011 10.9791 14.0026 11.3776Z" stroke="#BEBEBE"/>
      <rect x="0.5" y="0.5" width="24" height="24" rx="12" stroke="#BEBEBE"/>
    </svg>
  )
}
const list = sponsors.map(e => (
  <div key={e.id} className={styles["sponsor"]}>
    <div className={styles["sponsor__name"]}><span className={styles["sponsor__number"]}>{e.id}</span>.
      <span className={styles["sponsor__name"]}>
        <Icon/>
      {e.name}
      </span>
    </div>
    <div className={styles["moneys"]}>{e.moneys}</div>
  </div>
))

export default function Sponsors() {
  return (
    <div className={styles["elem"]}>
      <div className={styles["elem__title"]}>Наші спонсори</div>
        <div className={styles["elem__body"]}>
          {list}
        </div>
      </div>
  )
}