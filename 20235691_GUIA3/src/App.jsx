import { useState } from "react";
import {Logo, Nav, NumResults, Search} from "./components/Nav";
import { Box } from "./components/Box";
import { MovieList } from "./components/Movie";
import { WatchedMoviesContainer, WatchedMoviesList, WatchedSummary } from "./components/WatchedMovie";
import { useFetchMovies } from "./hooks/UseFetchMovies";
import { MovieDetails } from "./components/MovieDetails";
/**
 * componente principal de la aplicacion 
 */
export default function App(){
    //Estado para la busqueda de peliculas
    const [query, setQuery] = useState("");

    //Obtiene peliculas basadas en la consulta
    const {movies, isLoading, error } = useFetchMovies(query);

    //Estado de peliculas vistas
    const [watched, setWatched] = useState(null);

    /**
     * Maneja la seleccion de una pelicula
     * @param {string} id -ID de la pelicula seleccionada
     */
    function handleSelectMovie(id){
        setSelectedId(id)
    }

    /**
     * Cierra los detalles de la pelicula
     */
    function handleCloseMovie(){
        setSelectedId(null);
    }
    /**
     * Agrega una pelicula a la lista de vistas
     * @param {Object} movie - pelicula a agregar
     */
    function handleAddWatched(movie) {
        setWatched((watched) => [...watched, movie]);
    }

    return(
        <>
        <nav>
            <Search query={query} setQuery={setQuery}/>
            <NumResults movies={movies}/>
        </nav>
        <main className="main">
            <Box>
                {isLoading && <p className="loader">Cargando...</p>}
                {error && <p className="error">🚫{error}</p>}
                <MovieList movies={movies} onSelectMovie ={handleSelectMovie} />
            </Box>

            <Box>
            <WatchedMoviesContainer>
  {selectedId ? (
    <MovieDetails
      selectedId={selectedId}
      onCloseMovie={handleCloseMovie}
      onAddWatched={handleAddWatched}
      watched={watched}
    />
  ) : (
    <WatchedMoviesContainer>
      {}
    </WatchedMoviesContainer>
  )}
</WatchedMoviesContainer>

            </Box>
        </main>
        </>
    );
}