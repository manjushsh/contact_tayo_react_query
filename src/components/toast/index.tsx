import { Toast } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import ToastContainer, { ToastPosition } from 'react-bootstrap/ToastContainer'
import { RootState } from '../../redux/store'
import { setShowToast } from '../../redux/toastSlice'
import './styles.css'

const positions: ToastPosition[] = [
    'top-start',
    'top-center',
    'top-end',
    'middle-start',
    'middle-center',
    'middle-end',
    'bottom-start',
    'bottom-center',
    'bottom-end',
];

const toastConfig = {
    delay: 8000,
    autohide: true,
}

export default function TyoToast(props: TyoToastProps) {

    const dispatch = useDispatch()
    const showToast = useSelector((state: RootState) => state?.toast?.showToast)
    const hideToast = () => dispatch(setShowToast({ ...showToast, status: false }))

    return <>
        <ToastContainer
            className="p-3"
            position={positions[positions.length - 1]}
            style={{ zIndex: 1 }}
        >
            <Toast
                bg={props?.toastVariant || "success"}
                onClose={hideToast}
                show={showToast?.status}
                delay={toastConfig.delay}
                autohide={toastConfig.autohide}>
                <Toast.Header>
                    {props?.toastImgUrl && <img
                        src={props?.toastImgUrl || "holder.js/20x20?text=%20"}
                        className="rounded me-2"
                        alt=""
                    />}
                    <strong className="me-auto">{props?.toastTitle}</strong>
                </Toast.Header>
                <Toast.Body>{props?.toastBody}</Toast.Body>
            </Toast>
        </ToastContainer>
    </>
}

export interface TyoToastProps {
    toastImgUrl?: string
    toastTitle: string
    toastBody: string
    toastVariant?: string
}
