import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Constants from 'expo-constants';
import AuthStorage from '../lib/supabase/auth';

interface CheckoutSessionParams {
  priceId: string;
  mode: 'payment' | 'subscription';
  successUrl: string;
  cancelUrl: string;
}

export function useStripeCheckout() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCheckoutSession = async ({ priceId, mode, successUrl, cancelUrl }: CheckoutSessionParams) => {
    try {
      setIsLoading(true);
      setError(null);

      // Get the stored JWT token
      const token = await AuthStorage.getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Call the Stripe Checkout Edge Function
      const response = await fetch(
        `${process.env?.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/stripe-checkout`, 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            price_id: priceId,
            mode,
            success_url: successUrl,
            cancel_url: cancelUrl,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const { sessionId, url } = await response.json();
      console.log(url);
      
      // Initialize Stripe
      const stripe = await loadStripe(
        process.env?.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ''
      );

      if (!stripe) {
        throw new Error('Failed to initialize Stripe');
      }

      // Redirect to Stripe Checkout
      await stripe.redirectToCheckout({ sessionId });
      
      // Redirect to Stripe Checkout
      //window.location.href = url;

    } catch (err: any) {
      console.error('Stripe Checkout Error:', err);
      setError(err.message || 'An unexpected error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createCheckoutSession,
    isLoading,
    error,
  };
}