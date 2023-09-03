import Comment from "components/Comment/Comment";
import Post from "components/Post/Post";
import { Button, Checkbox, Input, Select } from "components/UI";
import Box from "components/UI/Box/Box";
import RankButton from "components/UI/RankButton/RankButton";
import Star from "components/UI/Star/Star";
import Textarea from "components/UI/Textarea/Textarea";
import User from "components/User/User";
import Editor from "module/CreateForm/Components/Editor";
import Footer from "module/Footer/Footer";
import Header from "module/Header/Header";
import LoginForm from "module/LoginForm/LoginForm";
import React, { useState } from "react";

export default function UI() {
  const editorSet = useState({title: "", content: ""});

  return (
    <article style={{ color: "white" }}>
      <h1>Це пісочниця для UI компонентів</h1>
      <br />
      <div
        style={{
          width: "75%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr"
        }}
      >
        <div
          id="button"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
        >
          <Button Style="standart">standart</Button>
          <Button Style="secondary">secondary</Button>
          <Button Style="purple">purple</Button>
          <Button Style="danger">danger</Button>
          <Button Style="more_danger">more_danger</Button>
        </div>
        <div id="box">
          <Box title="Box template">Box</Box>
        </div>
        <div id="Checkbox">
          <Checkbox>Продати душу дияволу</Checkbox>
          <Checkbox>Чи попасти до раю</Checkbox>
        </div>
        <div id="input">
          <Input Name="Текст" />
          <Input Name="Пароль" type="password" />
          <Input Name="Відключена" disabled />
        </div>
        <div id="rank">
          <RankButton rank={250} />
        </div>
        <div id="select">
          <Select
            name="Обери країну"
            values={["Україна", "Німеччина", "Словаччина"]}
          />
        </div>
        <div id="star">
          <Star reputation={5} />
          <br />
          <Star reputation={-0} />
          <br />
          <Star reputation={-250} />
        </div>
        <div id="textarea">
          <Textarea name="text" Name="текст" maxCount={250} />
        </div>
      </div>
      <h1>Великі компоненти</h1>
      <br />
      <div
        style={{
          width: "75%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr"
        }}
      >
        <div id="comment">
          <Comment
            comment={{
              id: 1,
              body: "Привіт, світе!",
              rank: 25,
              createdAt: new Date(120412040140),
              User: { id: 1, name: "admin", rank: 2 } as any,
              Post: {
                id: 1
              } as any
            }}
          />
          <Comment
            comment={{
              id: 1,
              body: "Привіт, світе!",
              rank: -1,
              createdAt: new Date(120412040140),
              User: { id: 2, name: "moderator", rank: -7 } as any,
              Post: {
                id: 2
              } as any
            }}
          />
        </div>
        <div id="post">
          <Post
            postData={{
              id: 1,
              body: " Про що ця стаття... ",
              title: "Крута стаття",
              rank: 25,
              createdAt: new Date(),
              User: { id: 1, name: "admin", rank: 25 } as any,
              _count: {
                Comments: 12
              }
            }}
          />
          <Post
            postData={{
              id: 1,
              body: " Про що ця стаття... ",
              title: "Крута стаття",
              rank: -14,
              createdAt: new Date(),
              User: { id: 1, name: "admin", rank: -4 } as any,
              _count: {
                Comments: -2
              }
            }}
          />
        </div>
        <div id="user">
          <User
            user={
              {
                id: 1,
                name: "admin",
                rank: 2,
                createdAt: new Date(),
                isVerified: true
              } as any
            }
          />
          <User
            user={
              {
                id: 1,
                name: "admin",
                rank: 2,
                createdAt: new Date(),
                isVerified: true,
                description: "Трохи про себе...",
                subscribers: 254
              } as any
            }
          />
        </div>
      </div>
      <h1>Тяжкі модулі</h1>
      <br />
      <div
        style={{
          width: "75%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr"
        }}
      >
        <div id="editor">
          <Editor articleSet={editorSet} />
        </div>
        <div id="header">
          <Header/>
        </div>
        <div id="footer">
          <Footer/>
        </div>
        <div id="login">
          <LoginForm/>
        </div>
      </div>
    </article>
  );
}