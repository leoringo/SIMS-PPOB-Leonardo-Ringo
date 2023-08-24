import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Button,
    Text,
    Image
} from '@chakra-ui/react'
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
        <Card>
            <CardHeader>
                <Image src={service.service_icon} onClick={clickHandler}/>
            </CardHeader>
            <CardBody>
                <Text>{service.service_name}</Text>
            </CardBody>
            <CardFooter>
                <Button>View here</Button>
            </CardFooter>
        </Card>
    )
}

export default ServiceCard