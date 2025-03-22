<!-- Please update value in the {}  -->

# Coding Sharing | devChallenges

   Solution for a challenge [Coding Sharing](https://devchallenges.io/challenge/code-shraing-app-note-code) from [devChallenges.io](http://devchallenges.io).

  **[Demo](https://code-sharing-frontend-two.vercel.app/)**
  |
  **[Solution](https://github.com/snigdha-sukun/code-sharing)**
  |
  **[Challenge](https://devchallenges.io/challenge/code-shraing-app-note-code)**

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Overview](#overview)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Built with](#built-with)
- [Features](#features)
- [Author](#author)

<!-- OVERVIEW -->

## Overview

![screenshot](screenshot.gif)

### What I learned

<!-- Use this section to recap over some of your major learnings while working through this project. Writing these out and providing code samples of areas you want to highlight is a great way to reinforce your own knowledge. -->

#### Backend

I learned how to setup a Node.js+Express application with mongoose, body parser & cors:

```ts
import { config } from "dotenv";
import express from "express";
import type { Express, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import createError from "http-errors";
import logger from "morgan";

import snippetRouter from "./routes/snippets";

const app: Express = express();

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());

app.use("/api/snippets", snippetRouter);

connectDB().catch((err) => console.log(err));

async function connectDB() {
 config();
 const MONGODB_URI = process.env.MONGODB_URI?.replace(
  "${MONGODB_PASSWORD}",
  process.env.MONGODB_PASSWORD ?? "",
 );
 if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined");
 }
 await mongoose.connect(MONGODB_URI);
}

app.use((req: Request, res: Response, next: NextFunction) => {
 next(createError(404));
});

interface Error {
 status?: number;
 message?: string;
}

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
 res.locals.message = err.message;
 res.locals.error = req.app.get("env") === "development" ? err : {};

 res.status(err.status ?? 500);
 res.json({ error: err.message });
});

export default app;
```

I learned how to create mongoose schema and use uuid as a type:

```ts
import { v4 as uuidv4 } from "uuid";
import { model, Schema } from "mongoose";

const snippetSchema = new Schema({
 id: { type: String, default: uuidv4, required: true },
 language: {
  type: String,
  required: true,
 },
 theme: {
  type: String,
  required: true,
  enum: ["vs", "vs-dark", "hc-black"],
  default: "vs",
 },
 code: { type: [String], required: true },
});

export const SnippetModel = model("Snippet", snippetSchema);
```

I learned how to setup GET & POST REST APIs using Express:

```ts
import express from "express";
import type { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { SnippetModel } from "../models/SnippetModel";

const router = express.Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
 const body = req.body;
 const uuid = uuidv4();
 const { language, theme, code } = body;
 if (!language || !theme || !code) {
  res.status(400).json({ error: "Invalid request" });
  return;
 }
 await SnippetModel.create({ id: uuid, language, theme, code });
 res.json({ id: uuid });
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
 const snippet = await SnippetModel.findOne({ id: req.params.id });
 if (!snippet) {
  res.status(404).json({ error: "Snippet not found" });
  return;
 }
 res.json(snippet);
});

export default router;
```

I learned the necessary variables to add for configuring Typescript in Node application:

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": [
    "src/**/*",
    "api/*.ts"
  ],
  "exclude": [
    "node_modules",
    "dist"
  ]
}
```

I learned how to deploy Node+Express application to vercel by rearranging files in their correct position and adding `public/.gitkeep` to keep the public folder need for vercel, moving local port to server.ts, adding an `api/index.ts` folder to export express `app`, modifying tsconfig to accomodate api folder and adding vercel.json:

```json
{
    "version": 2,
    "rewrites": [
        {
            "source": "/(.*)",
            "destination": "/api"
        }
    ]
}
```

```ts
import http from "node:http";

import app from "./app";
import { normalizePort, onError, onListening } from "./utils/server.util";

if (process.env.NODE_ENV !== "production") {
 const port = normalizePort(process.env.PORT ?? "3000");
 app.set("port", port);

 const server = http.createServer(app);
 server.listen(port, () => console.log(`Server is running on port ${port}`));
 server.on("error", (error) => onError(error, port));
 server.on("listening", () => onListening(server));
}
```

```ts
import app from "../src/app";

export default app;
```

#### Frontend

I learned how to fetch the pathname in React.js

```tsx
const id = window.location.pathname.split("/").pop();
```

I learned how to fetch base url to construct custom url & copy text to clipboard in React.js

```tsx
navigator.clipboard.writeText(`${window.location.origin}/${sharedId}`);
```

I learned how to create a POST request using axios & how to access `.env` variable in React.js+Vite application. Also, learned how to construct hooks to be able to call it inside a function.

```ts
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
export const useSaveSnippet = ({
 code,
 language,
 theme,
}: { code: string; language: string; theme: string }) => {
 const saveSnippet = async () => {
  const body = {
   language,
   theme,
   code: code.split("\n"),
  };
  const res = await axios.post(`${API_URL}/api/snippets`, body, {
   headers: {
    "Content-Type": "application/json",
   },
  });

  return res.data.id;
 };

 return saveSnippet;
};
```

```tsx
const saveSnippet = useSaveSnippet({
  code: editorValue,
  language: selectedLanguage,
  theme: selectedTheme,
 });

 async function handleShare() {
  const sharedId = await saveSnippet();
  if (sharedId) {
   setLink(sharedId);
   navigator.clipboard.writeText(`${window.location.origin}/${sharedId}`);
  }
 }
```

I learned how to setup Monaco Editor in my React.js appication:

```tsx
import MonacoEditor from "@monaco-editor/react";

const Editor = ({
 language,
 value,
 theme,
 setValue,
 setLink,
}: {
 language: string;
 value: string;
 theme: string;
 setValue: (val: string) => void;
 setLink: (val: string | undefined) => void;
}) => {
 const handleEditorChange = (value: string | undefined) => {
  if (value) {
   setValue(value);
            setLink(undefined);
  }
 };

 return (
  <MonacoEditor
   height="50vh" // Set the height of the editor
   width="80vw" // Set the height of the editor
   defaultLanguage={language} // Set the default language
   defaultValue={value} // Set the default value
   onChange={handleEditorChange} // Handle changes
   theme={theme} // Set the theme (optional)
   options={{
    wordWrap: "on",
    minimap: { enabled: true },
   }}
  />
 );
};

export default Editor;
```

I learned how to fetch list of languages supported by Monaco Editor:

```ts
import { languages } from "monaco-editor";

export const getLanguageList = () => {
 const languageList = languages.getLanguages();
 return languageList.map((language) => ({
  value: language.id,
  label: language.id.toUpperCase().replace(/\./g, " "),
 }));
};
```

I learne dhow to create a multiline string in Raact.js:

```ts
export const getDefaultValue = () => {
 const html = `<html>
  <head>
    <title>HTML Sample</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <style type="text/css">
      h1 {
        color: #cca3a3;
      }
    </style>
    <script type="text/javascript">
      alert("I am a sample... visit devChallengs.io for more projects");
    </script>
  </head>
  <body>
    <h1>Heading No.1</h1>
    <input disabled type="button" value="Click me" />
  </body>
</html>`;

 return { language: "html", value: html, theme: "vs" };
};
```

I learned how to deploy React application which uses `window.location.pathname` & `window.location.origin` by adding vercel.json:

```json
{
    "version": 2,
    "rewrites": [
        {
            "source": "/(.*)",
            "destination": "/"
        }
    ]
}
```

### Useful resources

- [React-redux get site base URL / window.location](https://stackoverflow.com/a/66899505) - This helped me in fetching the correct base URL to construct shared URL
- [Are multi-line strings allowed in JSON?](https://stackoverflow.com/a/7744658) - This gave me the idea to store the lines of code as an array of string breaking at new line and joining it at the UI side
- [How to use environment variables (.env) in react js app - VITE](https://youtu.be/EQ3Htw6Z0PY?si=lgk7VUqNtfHDK9Fz) - This video helped me setup & use `.env` variable in my React+Vite app
- [CSS Ellipsis Beginning of String](https://davidwalsh.name/css-ellipsis-left) - I leanred how to add ellipsis at the beginning of the string which was needed for link
- [In reactJS, how to copy text to clipboard?](https://stackoverflow.com/a/52033479) - I learned how to copy a text/link to clipboard
- [How to Make API Calls in React With Examples](https://builtin.com/software-engineering-perspectives/react-api) - I learned how to make API calls in React
- [Using UUIDs in mongoose for ObjectID references](https://stackoverflow.com/a/67701726) - I learned how to define uuid type in mongoose
- [How to Install MongoDB Using npm](https://www.mongodb.com/resources/languages/mongodb-and-npm-tutorial) - I learned how to add & use `.env` in Node.js+Express application
- [Creating a new Express project with Typescript](https://medium.com/layhill-l-tech/creating-a-new-express-project-with-typescript-7e023ed3feda) - This article helped me in setting up my Node.js+Express application with Typescript
- [Deploy an Express API to Vercel](https://www.youtube.com/watch?v=B-T69_VP2Ls) - This video helped me deploy my Express app in Vercel

### Built with

<!-- This section should list any major frameworks that you built your project using. Here are a few examples.-->

- Node.js
- [Express.js](https://expressjs.com/)
- MongoDB
- [Mongoose](https://mongoosejs.com/)
- [React](https://reactjs.org/)
- [Styled Components](https://styled-components.com/)
- [Axios](https://axios-http.com/)
- [Monaco Editor](https://microsoft.github.io/monaco-editor/)

## Features

<!-- List the features of your application or follow the template. Don't share the figma file here :) -->

This application/site was created as a submission to a [DevChallenges](https://devchallenges.io/challenges-dashboard) challenge.

## Author

- Website [Portfolio](https://snigdha-sukun-portfolio.vercel.app)
- GitHub [@snigdha-sukun](https://github.com/snigdha-sukun)
