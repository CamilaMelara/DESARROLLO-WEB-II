import { useState } from "react";

// Estilos generales del contenedor de estrellas
const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "16px"
};

// Estilos del contenedor de estrellas individuales
const starContainerStyle = {
    display: "flex",
    gap: "4px"
};

/**
 * Componente que muestra el sistema de calificación con estrellas interactivas.
 * @param {Object} props
 * @param {number} props.maxRating - Número máximo de estrellas (por defecto 5).
 * @param {string} props.color - Color de las estrellas.
 * @param {number} props.size - Tamaño de las estrellas en píxeles.
 * @param {number} props.defaultRating - Calificación inicial seleccionada por defecto (0).
 * @param {Function} props.onSetRating - Función que se ejecuta al seleccionar una calificación.
 */
export default function StarRating({
    maxRating = 5,
    color = "#fcc419",
    size = 30,
    defaultRating = 0,
    onSetRating
}) {
    // Estilos del texto de calificación
    const textStyle = {
        lineHeight: "1",
        margin: "0",
        color,
        fontSize: `${size}px`
    };

    // Estado para almacenar la calificación seleccionada
    const [rating, setRating] = useState(defaultRating);

    // Estado temporal para manejar la calificación al pasar el mouse
    const [tempRating, setTempRating] = useState(0);

    /**
     * Maneja el evento de selección de una calificación.
     * @param {number} rating - Calificación seleccionada.
     */
    function handleRating(rating) {
        setRating(rating);
        onSetRating?.(rating); // Llama a la función de callback si está definida
    }

    return (
        <div style={containerStyle}>
            {/* Contenedor de estrellas */}
            <div style={starContainerStyle}>
                {Array.from({ length: maxRating }, (_, i) => (
                    <Star
                        key={i}
                        full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
                        onRate={() => handleRating(i + 1)}
                        onHoverIn={() => setTempRating(i + 1)}
                        onHoverOut={() => setTempRating(0)}
                        color={color}
                        size={size}
                    />
                ))}
            </div>
            {/* Muestra la calificación seleccionada o temporal */}
            <p style={textStyle}>{tempRating || rating || ""}</p>
        </div>
    );
}

/**
 * Componente que representa una estrella individual en el sistema de calificación.
 * @param {Object} props
 * @param {boolean} props.full - Indica si la estrella está llena o vacía.
 * @param {Function} props.onRate - Función para manejar la calificación.
 * @param {Function} props.onHoverIn - Función para manejar el hover in.
 * @param {Function} props.onHoverOut - Función para manejar el hover out.
 * @param {string} props.color - Color de la estrella.
 * @param {number} props.size - Tamaño de la estrella.
 */
function Star({ full, onRate, onHoverIn, onHoverOut, color, size }) {
    // Estilos de la estrella
    const starStyle = {
        width: `${size}px`,
        height: `${size}px`,
        display: "block",
        cursor: "pointer"
    };

    return (
        <span
            role="button"
            style={starStyle}
            onClick={onRate}
            onMouseEnter={onHoverIn}
            onMouseLeave={onHoverOut}
        >
            {full ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill={color}
                    stroke={color}
                >
                    <path d="M10 1.5l2.56 5.19 5.73.83-4.14 4.04.98 5.71L10 14.77l-5.14 2.7.98-5.71-4.14-4.04 5.73-.83L10 1.5z" />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke={color}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 1.5l2.56 5.19 5.73.83-4.14 4.04.98 5.71L10 14.77l-5.14 2.7.98-5.71-4.14-4.04 5.73-.83L10 1.5z"
                    />
                </svg>
            )}
        </span>
    );
}
