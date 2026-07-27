import api from "./api";


// ============================================================
// Flashcard Types
// ============================================================

export interface Flashcard {
    front: string;
    back: string;
}


export interface FlashcardResponse {
    topic: string;
    flashcards: Flashcard[];
}


// ============================================================
// Flashcard Service
// ============================================================

export const flashcardService = {

    // --------------------------------------------------------
    // Generate personalized flashcards
    // --------------------------------------------------------

    generate: async (
        topic: string,
        numberOfCards: number
    ): Promise<FlashcardResponse> => {

        const { data } =
            await api.post<FlashcardResponse>(
                "/flashcards/generate",
                {
                    topic,
                    number_of_cards: numberOfCards,
                }
            );

        return data;
    },

};


export default flashcardService;