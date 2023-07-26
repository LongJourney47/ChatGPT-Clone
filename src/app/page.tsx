"use client";

// import { useState  } from "react";
// import axios from "axios";
// // import { NextPage } from "next";
// import Head from "next/head";
// import homePage from "@/app/styles/homePage.module.css";

// export default function home () {
//   return(
//     <>
//    <div className={homePage.container}>
//       <aside className={homePage['aside-column']}>
//         {/* Content of the aside column */}
//       </aside>

//       <div className={homePage['centered-container']}>
//         <input type="text" className={homePage['centered-input']} placeholder="Enter text here" />
//       </div>
//     </div>

//     </>
//   )
// }

import { useState } from "react";
import axios from "axios";
import { NextPage } from "next";
import Head from "next/head";
import homePage from "@/app/styles/homePage.module.css";

interface Message {
  role?: string;
  type: string;
  content: string;
}

const Home: NextPage = () => {
  const [textareaValue, setTextareaValue] = useState<string>("");

  const [messages, setMessages] = useState([
    { type: "system", content: "however i’m prompt tuning model" },
    { type: "user", content: "Whatever the user types in as their prompt?" },
  ]);

  const handleTextareaChange = (e: any) => {
    setTextareaValue(e.target.value);
    // console.log("handleTextareaChange ", e.target.value);
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const userInput = form.message.value.trim();
    if (!userInput) return;

    axios
      .post(
        "/api/chatgpt",
        { product: userInput },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("response ", response);

        const userMessage: Message = { type: "user", content: userInput };
        console.log(userMessage);
        const assistantMessage: Message = {
          type: "assistant",
          content: response.data.item,
        };
        console.log(assistantMessage);
        setMessages((prevMessages) => [
          ...prevMessages,
          userMessage,
          assistantMessage,
        ]);

        form["message"].value = "";
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }

  return (
    <>
      <Head>
        <title>ChatGPT Clone</title>
        <meta name="description" content="ChatGPT Clone with Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={homePage["chat-container"]}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${homePage.message} ${
              message.type === "user"
                ? homePage["user-message"]
                : homePage["assistant-message"]
            }`}
          >
            {message.content}
          </div>
        ))}
      </div>

      <aside className={homePage["aside-column"]}>
        {/* Content of the aside column */}
      </aside>

      <form onSubmit={onSubmit} className={homePage["centered-container"]}>
        <textarea
          className={homePage["centered-input"]}
          name="message"
          value={textareaValue}
          onChange={handleTextareaChange}
        />
        <button
          type="submit"
          className={homePage["send-button"]}
          disabled={!textareaValue}
        >
          Send
        </button>
      </form>
    </>
  );
};

export default Home;
