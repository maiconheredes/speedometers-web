import PaymentState from './payment.state';


const ServiceState = {
    id: null,
    name: null,
    cpf: null,
    address: null,
    description: null,
    payment: {
        ...PaymentState,
    },
    createdAt: null,
    updatedAt: null,
};

export default ServiceState;
