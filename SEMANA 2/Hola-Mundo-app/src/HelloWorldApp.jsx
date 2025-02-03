const name = 'Camila'
const departamentos = ["San Salvador", "La Libertad", "Morazan", "La paz"]
const personalData={
    firstName: "Camila",
    lastName: "Melara"
}

export const HelloWorldApp=()=>{
    return (
        <>
        <div>
            <h1>Hola {name}</h1>

            <h2>{personalData.lastName}</h2>
        </div>
        <div>
            <h2>{departamentos}</h2>
        </div>
        </>
    )
}