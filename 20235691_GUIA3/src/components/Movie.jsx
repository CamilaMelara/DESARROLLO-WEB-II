/**
 * componente que muestra una lista de peliculas
 * @param {Object[]} movies - Lista de pelicu;as para renderizar.
 * @param {Function} onSelectMovie - funcion que se ejecuta al seleccionar una pelicula
 */
export const MovieList = ({movies, onSelectMovie}) =>{
    return(
        <ul className="list list-movies">
            {movies?.map((movie)=>(
                <Movie
                key={movie.imdbID}
                movies={movie}
                onSelectMovie={onSelectMovie}
                />

            ))}

        </ul>
    );
};
/**
 * componente que muestra los detalles basicos de una pelicula
 * @param {Object} movie - Datos de la pelicula
 * @param {Function} onSelectMovie - FUNCION que se ejecuta al hacer clic en la pelicula
 */
export const Movie =({movie, onSelectMovie}) =>{
    return(
        <li onClick={() => onSelectMovie(movie.imdbID)}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>📒</span>
                    <span>{movie.Year}</span>
                </p>
            </div>
        </li>
    );
};