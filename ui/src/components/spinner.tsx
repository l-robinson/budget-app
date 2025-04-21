import { HourglassFull } from "@mui/icons-material"
import { CircularProgress, Fade } from "@mui/material"

export function Spinner({show, wait,}: {
    show?: boolean
    wait?: `${number}ms`
}) {
    return (
        <Fade
          in={show}
          style={{
            transitionDelay: show ? (wait ? wait : '300ms') : '0ms',
          }}
          unmountOnExit
        >
            <CircularProgress />
        </Fade>
    )
}