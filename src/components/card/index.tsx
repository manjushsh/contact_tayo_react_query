import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { ContactState } from '../../redux/contactSlice'
import './styles.css'

export default function TayoCard(props: TayoCardProps) {
    return (
        <Card style={{ width: '18rem' }}>
            {props?.imageSrc && <Card.Img variant="top" src="holder.js/100px180" />}
            <Card.Body>
                <Card.Title>{props?.contact?.firstName || ""} {props?.contact?.lastName || ""}</Card.Title>
                <Card.Text>
                    Contact: {props?.contact?.firstName || ""} {props?.contact?.lastName || ""}
                </Card.Text>
                <Card.Text>
                    Status: {props?.contact?.status || ""}
                </Card.Text>
                {props?.cardActions || ""}
            </Card.Body>
        </Card>
    );
}

export interface TayoCardProps {
    imageSrc?: string
    cardActions?: JSX.Element | string | boolean
    contact: ContactState["newForm"]
}
