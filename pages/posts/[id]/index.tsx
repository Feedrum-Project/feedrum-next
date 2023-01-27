import styles from '../../../styles/post.module.sass'
import Aside from 'components/Aside'
import { useRouter } from 'next/router'
import prisma from "@database"
import { GetServerSideProps } from 'next'

export default function Post({postContent}:any) {
  console.log(postContent)
  return (
    <div className={styles['main']}>
      <div className={styles['post']}>
        <h1 className={styles['title']}>{postContent.title}</h1>

        <div className={styles['content']}>{postContent.body}</div>

        <div className={styles["comments"]}>Comments</div>

      </div>
      <Aside/>
    </div>
  )
}






export const getServerSideProps:GetServerSideProps = async (context) => {
  const id = Number(context.query.id)
  const res = await prisma.post.getPostById(id)
  const result = JSON.parse(JSON.stringify(res))
  return {
    props: {
      postContent: result//result
    }
  }
}