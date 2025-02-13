import { useEffect, useState } from "react";

//Clavde de API para ingresar a Omdb
export const API_KEY = "COLOCA TU API KEY ACA";
/**
 * Hook personalizado para obtener peliculas deesde la API de OMDb
 * @param {string} query - termino de busqueda ingresado por el usuario
 * @returns {Object} - retorna un objeto con 
 * - movies: lista de peliculas encontradas
 * - isLoading: estado de carga de la solicitud
 * - error: Mensjae de error en caso de fallo
 */
export function useFetchMovies(query){

    // estado para almacenar las peliculas obtenidas
    const [movies, setMovies] = useState([]);

    //estado para indicar si la solicitad esta en curso
    const [isLoading, setIsLoading] = useState(false);

    //estado para manejar errores
    const [error, setError] = useState("");

    useEffect(()=>{
        // si la busqueda tiene menos de 3 caracteres, limpiar resultador y error
        if (query.length < 3){
            setMovies([]);
            setError([]);
            return;
        }
        /**
         * funcion asincronica que obtiene las peliculas de la API
         */
        async function fetchMovies() {
            try{
                setIsLoading(true); //inicia el estado de carga
                setError(null); // reinicia errores previos
                //Peticion a la API de OMDb con la clave de acceso y la consulta
                const response = await
                fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&S=${query}`);

                // VERIFICA SI LA RESPUESTA HTTP ES CORRECTA
                if (!response.ok)
                    throw new Error("Error al cargar peliculas");
                const data = await response.json();

                // Si la API responde con un error, lanzar excepcion
                if (data.Response === "False")
                    throw new Error ("No se encontraron resultados");

                // Guardar las peliculas obtenidas en el estado
                setMovies(data.Search);

            } catch(err){
                //manejo de errores: guarda el mensaje de error y limpia la lista de peliculas
                setError(err.message);
                setMovies([]);
            } finally{
                setIsLoading(false); //Finaliza el estado de carga
            }
            
        }
        //Llamar a la funciion para obtener los datos
        fetchMovies();
    },[query]) // se ejecuta cada vez que cambia la consulta(query)

    // Retornar los valores necesarios para su uso en componentes
    return {movies, isLoading, error};
}