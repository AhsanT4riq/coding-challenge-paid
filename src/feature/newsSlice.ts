import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type NewsAPIResponse = {
    status: string;
    totalResults: number;
    articles: News[];
    code?: string;
    message?: string;
};

export type News = {
    source: {
        id: string;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
};

export interface NewsState {
    news: News[];
    loading: boolean;
    searchTerm: string;
    searchHistory: string[];
    totalResults: number | null;
}

const initialState: NewsState = {
    news: [],
    loading: false,
    searchTerm: '',
    searchHistory: [],
    totalResults: null
}

export const getArticles = createAsyncThunk('getArticles', async (searchTerm: string) => {
    const apiResponse = await fetch(
        `https://newsapi.org/v2/everything?q=${searchTerm}&sortBy=popularity&apiKey=c069630adc5c4fd893156917b7da614d`,
    );
    const apiData: NewsAPIResponse = await apiResponse.json();
    return apiData;
})

export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        updateSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
        },
        clearState: (state) => {
            state.news = []
            state.totalResults = null
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getArticles.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getArticles.fulfilled, (state, action) => {
            const history = [...state.searchHistory];
            const index = history.findIndex(term => term.toLocaleLowerCase() === state.searchTerm.toLocaleLowerCase())
            if (history.length === 4 && index === -1 && state.searchTerm !== '') {
                history.pop();
                history.unshift(state.searchTerm);
            } else if (index === -1 && state.searchTerm !== '') {
                history.unshift(state.searchTerm);
            }
            state.searchHistory = history;
            state.loading = false;
            state.news = action.payload.articles;
            state.totalResults = action.payload.totalResults;


        })
        builder.addCase(getArticles.rejected, (state) => {
            state.loading = false;
        })
    }
})

// Action creators are generated for each case reducer function
export const { updateSearchTerm, clearState } = newsSlice.actions

export default newsSlice.reducer