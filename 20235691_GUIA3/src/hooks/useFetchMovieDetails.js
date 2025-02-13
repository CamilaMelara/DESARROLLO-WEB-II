import { useEffect, useState } from "react";
import { API_KEY } from "./UseFetchMovies"; //iMPORTA LA CLAVE DE api DESDE EL OTRO HOOK

/**
 * Hook personzalidaod para obtener detalles de una pelicula con la API
 * @param {string} selectedId - id unico de la pelicula seleccionada
 * @returns {Object} - retorna un objeto con:
 * - movie: detalles de la pelicula
 * -isLoading: estado de carga de la solicitud
 * -error: Mensjae de error en caso de fallo
 */
export function useFetchMoviesDetails(selectedId){
    //Estado para almacenar los detalles de la pelicula
    const [movie, setMovie] = useState({});

    //Estado para indicar si la solicitud esta en curso
    const [isLoading, setIsLoading] = useState(false);

    //Estado para manejar errores
    const [error, setError] = useState("");

    useEffect(()=>{
        // si no hay un id seleccionado, limoair el estadi
        if (!selectedId){
            setMovie({});
            setError("");
            return;
        }
        /**
         * Funcion asincronica que obtiene los detalles de la pelicula
         * @param {string} selectedId -id unico de la pelicula a consultar.
         */
        async function fetchMoviesDetails(selectedId) {
            try{
                setIsLoading(true); //Activa el estadi de carga
                setError(null); // reinicia errores previos
                //Peticion a la API de OMDb con la clace de acceso y el id de la pelicula

                const response = await
                fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`);
                // verifica si la respuesta http es correcta
                if (!response.ok)
                    throw new Error("Error al cargar los detalles de la pelicula");
                const data = await response.json();
                //Guardar los detalles de la pelicula en el estado
                setMovie(data);
            } catch (err){
                //manejo de errores, guardar el mensjae y limpair el estado
                setError(err.message);
                setMovie({});
            }finally{
                setIsLoading(false); //finaliza el estado de carga
            }
            
        }

        //llamar a la funcion para obtener los datos
        fetchMoviesDetails(selectedId);
    },[selectedId]); // se ejecuta cada vez que camnia el id seleccionado

    //retornar los valores necesarios oara su uso en componentes
    return{movie, isLoading, error};
}