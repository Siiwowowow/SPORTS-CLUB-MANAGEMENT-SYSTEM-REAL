import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckOutform from './CheckOutform';
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);

const PaymentForm = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckOutform />
        </Elements>
    );
};

export default PaymentForm;