import { IPost } from "types/Post";
import AsideComponents from "./Components/Components";
import { ITagName } from "types/Tag";
import Box from "components/UI/Box/Box";
import TagElement from "components/UI/Tag/TagElement";
import styles from "./styles/aside.module.sass";

interface IAside {
  BestPosts?: IPost[];
  BestTags?: ITagName[];
  Sponsors?: boolean;
}

export default function Aside(asideComponents: IAside) {
  return (
    <aside>
      {
        <>
          {asideComponents.BestPosts !== undefined ? (
            asideComponents.BestPosts.length ? (
              <AsideComponents.BestPosts posts={asideComponents.BestPosts} />
            ) : null
          ) : null}
          {asideComponents.Sponsors ? <AsideComponents.Sponsors /> : null}
          {asideComponents.BestTags ? (
            <>
              {asideComponents.BestTags ? (
                <Box title="Популярні теги">
                  {/* I'm thinking about switch on this kind of aside elements.
                It can save a lot place in bundler */}

                  <div className={styles.tags}>
                    {asideComponents.BestTags.map((tag) => {
                      return tag.name === null ? null : (
                        <TagElement name={tag.name} key={tag.id} />
                      );
                    })}
                  </div>
                </Box>
              ) : null}
            </>
          ) : null}
        </>
      }
    </aside>
  );
}
