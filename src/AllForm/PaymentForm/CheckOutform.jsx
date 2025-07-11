import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const CheckOutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const AxiosSecure = useAxiosSecure();
    const { bookingId } = useParams();

    const [error, setError] = useState('');
    const [processing, setProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);

    const { isPending, data: bookingInfo = {} } = useQuery({
        queryKey: ['booking', bookingId],
        queryFn: async () => {
            const res = await AxiosSecure.get(`/bookings/${bookingId}`);
            return res.data;
        }
    });

    if (isPending) return <div className='text-center mt-10'>Loading booking details...</div>;

    const { userEmail, courtType, timeSlots, totalPrice, bookingDate } = bookingInfo;
    const finalPrice = (totalPrice - (totalPrice * discount / 100)).toFixed(2);

   const handleApplyCoupon = async () => {
    if (!couponCode) {
        Swal.fire('Please enter a coupon code');
        return;
    }
    try {
        const res = await AxiosSecure.post('/validate-coupon', { couponCode });
        setDiscount(res.data.discountPercentage);
        Swal.fire('Coupon Applied', `Discount: ${res.data.discountPercentage}%`, 'success');
    } catch (err) {
        Swal.fire('Invalid Coupon', err.response?.data?.message || 'Invalid or expired coupon.', 'error');
        setDiscount(0);
    }
};


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const confirm = await Swal.fire({
            title: `Confirm Payment of $${finalPrice}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, Pay'
        });

        if (!confirm.isConfirmed) return;

        setProcessing(true);

        try {
            const { data } = await AxiosSecure.post('/create-payment-intent', {
                amountInCents: Math.round(finalPrice * 100),
                bookingId,
                userEmail,
            });

            const result = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: { email: userEmail }
                }
            });

            if (result.error) {
                setError(result.error.message);
            } else if (result.paymentIntent.status === 'succeeded') {
                await AxiosSecure.post('/payments', {
                    bookingId,
                    userEmail,
                    transactionId: result.paymentIntent.id,
                    price: finalPrice,
                    method: 'card',
                    status: 'paid',
                    couponCode: couponCode || null,
                });
                setPaymentSuccess(true);
                Swal.fire('Payment Successful', `You paid $${finalPrice}`, 'success');
            } else {
                setError('Payment failed.');
            }
        } catch (err) {
            console.log(err);
            Swal.fire('Payment Error', err.response?.data?.message || 'An error occurred while processing your payment.', 'error');
            setPaymentSuccess(false);
            setError('Payment failed. Please try again.');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            {paymentSuccess ? (
                <div className="text-center text-green-600">
                    <h2 className="text-2xl font-semibold mb-2">Payment Successful</h2>
                    <p>Your booking payment of ${finalPrice} is confirmed.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Enter Coupon Code"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            className="flex-1 border p-2 rounded"
                        />
                        <button
                            type="button"
                            onClick={handleApplyCoupon}
                            className="bg-green-600 text-white px-4 py-2 rounded"
                        >
                            Apply
                        </button>
                    </div>
                    {[{ label: 'Email', value: userEmail },
                      { label: 'Court Type', value: courtType },
                      { label: 'Slots', value: timeSlots.join(', ') },
                      { label: 'Date', value: new Date(bookingDate).toLocaleDateString() },
                      { label: 'Price', value: `$${finalPrice}` }].map((item, idx) => (
                        <input
                            key={idx}
                            type="text"
                            value={`${item.label}: ${item.value}`}
                            readOnly
                            className="w-full border p-2 rounded bg-gray-100"
                        />
                    ))}
                    <div className="p-3 border rounded bg-white">
                        <CardElement />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        disabled={!stripe || processing}
                        className="w-full bg-blue-600 text-white py-3 rounded"
                    >
                        {processing ? 'Processing...' : `Pay $${finalPrice}`}
                    </button>
                </form>
            )}
        </div>
    );
};

export default CheckOutForm;
