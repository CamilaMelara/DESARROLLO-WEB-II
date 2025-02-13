import { useEffect, useState } from "react";
import { useFetchMoviesDetails } from "../hooks/useFetchMovieDetails";
import StarRating from "./StarRating";
/**
 * Componentes que muestra los detalles de una pelicula y permite al usuarii calificarla y agregarla a su lista de vistas
 * @param {Object} props 
 * @param {string} props.selectedId  - id de la pelicula seleccionada
 * @param {Function} props.onCloseMovie 
 * @param {Function} props.onAddWatched 
 * @param {Array} props.watched 
 */
export const MovieDetails = ({selectedId,onCloseMovie, onAddWatched, watched}) => {
    //Hook personalizado para obtener los detalles de la pelicula
    const {movie, error, isLoading} = useFetchMoviesDetails(selectedId);

    //Extraemos la informacion de la pelicula
    const{
        Title: title,
        Year: year, 
        Poster: poster,
        RunTime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre
    } = movie;

    //estado para la calificacion del usuario
    const [userRating, setUserRating] = useState('');

    // verifica si la pelicula ya esra en la lista de vistas
    const isWatched = watched.some(movie => movie.imdbID === selectedId);

    //obtiene la calificacion previa del usuario si ya la ha visto
    const watchedUserRating = watched.find(movie => movie.imdbID === selectedId)?.userRating;
    /**
     * maneja la adicion de una pelicula a la lista de vistas
     */
    function handleAdd(){
        const newMovie ={
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(" ")[0]), //estrae solo el nuemro de mins
            userRating
        };
        onAddWatched(newMovie);
        onCloseMovie(); //cierra los detalles despues de agregar
    }
    return(
        <div className="details">
            {isLoading? (
                <p className="loader"> Cargando...</p>
            ) : (
                <>
                <header>
                    <button className="btn-back" onClick={onCloseMovie}>
                        &larr;
                    </button>
                    <img src={poster} alt={`Poster de ${title}`} />
                    <div className="details-overview">
                        <h2>{title}</h2>
                        <p> {released} $bull; {runtime}</p>
                        <p>{genre}</p>
                        <p><span>⭐</span>{imdbRating} IMDB rating</p>
                    </div>
                </header>
                <section>
                    <div className="rating">
                        {!isWatched ?(
                            <>
                            {/*Calificacion con estrellas */}
                            <StarRating maxRating={10} size={18} onSetRating={setUserRating}/>
                            {userRating > 0 && (
                                <button className="btn-add" onClick={handleAdd}>
                                    + Agregar a la lista
                                </button>
                            )}
                            </>
                        ):(
                            <P> Has calificado esta pelicula con {watchedUserRating}⭐</P>
                        )}
                    </div>
                    <p><em>{plot}</em></p>
                    <p><b>Elenco:</b>{actors}</p>
                    <p><b>Director:</b>{director}</p>
                </section>
                </> 
            )}
        </div>
    );
};