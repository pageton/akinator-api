import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { Akinator, Language } from "akinatorjs";

const app = new Hono();

type LanguageKey =
    | "en"
    | "ar"
    | "cn"
    | "de"
    | "es"
    | "fr"
    | "it"
    | "jp"
    | "kr"
    | "nl"
    | "pl"
    | "pt"
    | "ru"
    | "tr"
    | "id";

type Answer =
    | "Yes"
    | "No"
    | "IdontKnow"
    | "Probably"
    | "ProbablyNot"
    | "y"
    | "yes"
    | "n"
    | "no"
    | "idk"
    | "i don't know"
    | "p"
    | "probably"
    | "pn"
    | "probably not";

interface GameStartRequest {
    lang: LanguageKey;
    childMode?: string;
}

interface GameAnswerRequest {
    id: string;
    lang: LanguageKey;
    childMode?: string;
    answer: Answer;
}

const language = {
    en: Language.English,
    ar: Language.Arabic,
    cn: Language.Chinese,
    de: Language.Germany,
    es: Language.Spanish,
    fr: Language.French,
    it: Language.Italian,
    jp: Language.Japanese,
    kr: Language.Korean,
    nl: Language.Dutch,
    pl: Language.Polish,
    pt: Language.Portuguese,
    ru: Language.Russian,
    tr: Language.Turkish,
    id: Language.Indonesian
};

app.post("/start-game", async (c) => {
    const body = await c.req.json();
    const { lang, childMode } = body as GameStartRequest;
    if (!(lang in language)) {
        return c.json({ error: "Unsupported language" }, 400);
    }

    const childModeValue = childMode !== undefined ? childMode : "false";

    if (childModeValue !== "true" && childModeValue !== "false") {
        return c.json({ error: "Invalid childMode value" }, 400);
    }

    const childModeBoolean = childModeValue === "true";
    const akinator = new Akinator(language[lang], childModeBoolean);

    const result = await akinator.startGame();

    return c.json(result);
});

app.post("/answer", async (c) => {
    const body = await c.req.json();
    const { id, lang, childMode, answer } = body as GameAnswerRequest;
    if (!(lang in language)) {
        return c.json({ error: "Unsupported language" }, 400);
    }

    const childModeValue = childMode !== undefined ? childMode : "false";

    if (childModeValue !== "true" && childModeValue !== "false") {
        return c.json({ error: "Invalid childMode value" }, 400);
    }
    const childModeBoolean = childModeValue === "true";
    const akinator = new Akinator(language[lang], childModeBoolean);

    const result = await akinator.answerQuestion(answer, id);

    return c.json(result);
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
    fetch: app.fetch,
    port
});
