import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Dil bilgilerini taşıyan bir TypeScript tipi tanımlıyorum.
interface Language {
    id: number | null;
    rid: number;
    name: string;
}

// Redux state'i için gerekli başlangıç değerlerini tanımlıyorum.
interface LanguageState {
    languages: Language[];
    selectedLanguage: number;
}

// Başlangıç durumu
const initialState: LanguageState = {
    languages: [],
    selectedLanguage: 1,
};

// Slice tanımı
const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        // Burada PayloadAction, action.payload ile gelen verinin tip güvenliğini sağlar.
        setLanguages: (state, action: PayloadAction<Language[]>) => {
            state.languages = action.payload;
        },
        setSelectedLanguage: (state, action: PayloadAction<number>) => {
            state.selectedLanguage = action.payload;
        },
    },
});

// Reducer ve actions'ı dışa aktar
export const { setLanguages, setSelectedLanguage } = languageSlice.actions;
export default languageSlice.reducer;
