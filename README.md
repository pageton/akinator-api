# Akinator API

This API allows you to interact with the Akinator game. It is built using the [Hono](https://hono.dev/) framework and the [akinatorjs](https://www.npmjs.com/package/akinatorjs) library.

## Endpoints

### Start a new game

**POST** `/start-game`

#### Request Body

```json
{
    "lang": "en",
    "childMode": "false"
}
```

-   `lang`: The language in which to start the game. Supported values are:
    -   "en"
    -   "ar"
    -   "cn"
    -   "de"
    -   "es"
    -   "fr"
    -   "it"
    -   "jp"
    -   "kr"
    -   "nl"
    -   "pl"
    -   "pt"
    -   "ru"
    -   "tr"
    -   "id"
-   `childMode` (optional): Whether to enable child mode. Supported values are "true" and "false".

#### Response

```json
{
    "id": "session_id",
    "question": "Is your character real?",
    ...
}
```

### Answer a question

**POST** `/answer`

#### Request Body

```json
{
    "id": "session_id",
    "lang": "en",
    "childMode": "false",
    "answer": "yes"
}
```

-   `id`: The session ID of the game.
-   `lang`: The language of the game.
-   `childMode` (optional): Whether to enable child mode. Supported values are "true" and "false".
-   `answer`: The answer to the current question. Supported values are:
    -   "Yes"
    -   "No"
    -   "IdontKnow"
    -   "Probably"
    -   "ProbablyNot"
    -   "y"
    -   "yes"
    -   "n"
    -   "no"
    -   "idk"
    -   "i don't know"
    -   "p"
    -   "probably"
    -   "pn"
    -   "probably not"

#### Response

```json
{
    "id": "session_id",
    "question": "Is your character from a TV show?",
    ...
}
```

## Built With

-   [Hono](https://hono.dev/)
-   [akinatorjs](https://www.npmjs.com/package/akinatorjs)

## How to Run

1. Clone the repository:

    ```bash
    git clone https://github.com/dev-rio/akinator-api.git
    cd akinator-api
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the server:

    ```bash
    npm run dev
    ```

4. The server will be running on `http://localhost:3000`.

## License

This project is licensed under the MIT License.
