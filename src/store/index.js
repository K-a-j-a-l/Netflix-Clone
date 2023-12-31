import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL, API_KEY } from "../Utils/Constants"
import axios from "axios";
const initialState = {
    movies: [],
    genresLoaded: false,
    genres: [],
};

export const getGenres = createAsyncThunk("netflix/genres", async() => {
    const { data: { genres }, } = await axios.get(
        `${API_URL}/genre/movie/list?api_key=${API_KEY}`
    );
    console.log(genres);
    return genres;
});


const getRawData = async(api, genres, paging = false) => {
        const moviesArray = [];
        for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
            const {
                data: { results },
            } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
      createArrayFromRawData(results, moviesArray, genres);
    }
    return moviesArray;
  };


const createArrayFromRawData = (array, moviesArray, genres) => {
    array.forEach((movie) => {
      const movieGenres = [];
      movie.genre_ids.forEach((genre) => {
        const name = genres.find(({ id }) => id === genre);
        if (name) movieGenres.push(name.name);
      });
      if (movie.backdrop_path)
        moviesArray.push({
          id: movie.id,
          name: movie?.original_name ? movie.original_name : movie.original_title,
          image: movie.backdrop_path,
          genres: movieGenres.slice(0, 3),
        });
    });
  };

export const fetchMovies = createAsyncThunk("netflix/trending", async({ type }, thunkApi) => {
    const { netflix: { genres }, } = thunkApi.getState();
    return getRawData(`${API_URL}/trending/${type}/week?api_key=${API_KEY}`, genres, true);
    //return getRawData(`${API_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`)
})


export const fetchDataByGenre = createAsyncThunk(
  "netflix/genre",
  async ({ genre, type }, thunkAPI) => {
    const {
      netflix: { genres },
    } = thunkAPI.getState();
    return getRawData(
      `${API_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,
      genres
    );
  }
);
export const removeMovieFromLiked = createAsyncThunk(
    "netflix/deleteLiked",
    async ({ movieId, email }) => {
      const {
        data: { movies },
      } = await axios.put("http://localhost:5000/api/user/remove", {
        email,
        movieId,
      });
      return movies;
    }
  );


export const getUserLikedMovies=createAsyncThunk("netflix/getLiked",async(email)=>{
  const {data: {movies}}=await axios.get(`http://localhost:5000/api/user/liked/${email}`)
  return movies;
});
const NetflixStore = createSlice({
    name: "Netflix",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getGenres.fulfilled, (state, action) => {
            state.genres = action.payload;
            state.genresLoaded = true;
        });
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
        });
        builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
          state.movies = action.payload;
        });
        builder.addCase(getUserLikedMovies.fulfilled, (state, action) => {
          state.movies = action.payload;
        });
        builder.addCase(removeMovieFromLiked.fulfilled, (state, action) => {
          state.movies = action.payload;
        });
    },
})

export const store = configureStore({
    reducer: {
        netflix: NetflixStore.reducer,
    },
});