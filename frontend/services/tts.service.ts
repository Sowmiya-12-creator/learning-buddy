import api from "./api";


export const ttsService = {

    generateSpeech: async (
        narration: string
    ): Promise<Blob> => {

        const response = await api.post(
            "/tts/generate",
            {
                narration,
            },
            {
                responseType: "blob",
                timeout: 60_000,
            }
        );

        return response.data;
    },

};


export default ttsService;