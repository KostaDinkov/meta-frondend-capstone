export default function FormErrorField({ display, message }) {
    return(
        <div hidden={!display}>{message}</div>
    )
}
