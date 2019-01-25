declare module "emojilib" {
    /** 📒 Object containing emoji definitions */
    export const lib: { [name: string]: Emoji };
    /** 🔠 Emoji keywords ordered alphabetically */
    export const ordered: string[];
    /**
     * 🏻 🏼 🏽 🏾 🏿
     *
     * Emoji Modifiers (Fitzpatrick Types)
     */
    export const fitzpatrick_scale_modifiers: string[];

    interface Emojilib {
        /** 📒 Emoji definitions */
        lib: { [name: string]: Emoji },
        /** 🔠 Emoji keywords ordered alphabetically */
        ordered: string[],
        /**
         * 🏻 🏼 🏽 🏾 🏿
         * 
         * Fitzpatrick scale (skin type) modifiers
         */
        fitzpatrick_scale_modifiers: string[]
    }
    /** 📖 Emoji keyword library */
    const emojilib: Emojilib;
    export default emojilib;

    /** ✨ Emoji metadata */
    export interface Emoji {
        /** 🔎 Alternate keywords matching this emoji */
        keywords: string[],
        /** 💎 Literal character representing this emoji */
        char: string,
        /** 
         * 🏻 🏼 🏽 🏾 🏿 
         * 
         * Indicates support for Fitzpatrick scale (skin type) modifiers
         */
        fitzpatrick_scale: boolean,
        /** 🗂 The general category of this emoji */
        category: Category
    }

    export type Category = "people"
        | "animals_and_nature"
        | "food_and_drink"
        | "activity"
        | "travel_and_places"
        | "objects"
        | "symbols"
        | "flags";
}