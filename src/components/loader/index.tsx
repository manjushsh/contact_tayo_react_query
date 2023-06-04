import { Spinner } from "react-bootstrap";
import './styles.css'

const styles = {
    centered: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "10rem",
        minWidth: "25rem"
    }
}
export default function LoadingScreen({ centered }: LoaderProps) {
    return <div className="loader-container" style={centered ? styles.centered : {}}>
        <Spinner animation="grow" variant="primary" />
        <Spinner animation="grow" variant="success" />
        <Spinner animation="grow" variant="warning" />
        <Spinner animation="grow" variant="danger" />
        <h3>Loading...</h3>
    </div>
}

export interface LoaderProps {
    centered: boolean
}