import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { serviceDetailPayload } from '../store/actions/actionCreator';

const ServiceCard = ({service, index}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const clickHandler = (event) => {
        event.preventDefault()
        dispatch(serviceDetailPayload(service))
        navigate('/payment')
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column',  alignItems: 'center', width: "5%", cursor: "pointer", flex: 1}} onClick={clickHandler}>
            <img src={service.service_icon} alt="image" width={"100%"}/>
            <p style={{fontSize: '12px', textAlign: 'center', fontWeight: 'bold'}}>{service.service_name}</p>
        </div>
    )
}

export default ServiceCard