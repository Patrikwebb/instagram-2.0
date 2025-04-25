import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, Alert } from 'react-native';
import { theme } from '@/constants/theme';
import { STRIPE_PRODUCTS } from '@/src/stripe-config';
import { useStripeCheckout } from '@/hooks/useStripeCheckout';
import { Sparkles } from 'lucide-react-native';
import { createClient } from '@supabase/supabase-js';
import AuthStorage from '../../lib/supabase/auth';
import Constants from 'expo-constants';

// Initialize Supabase client
const supabase = createClient(
  process.env?.EXPO_PUBLIC_SUPABASE_URL ?? '', 
  process.env?.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? ''
);

export default function SubscribeScreen() {
  const { createCheckoutSession, isLoading } = useStripeCheckout();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status
  const checkAuthStatus = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Save the JWT token to storage
        await AuthStorage.saveToken(session.access_token);
        setIsAuthenticated(true);
        return true;
      } else {
        // Prompt user to sign in
        Alert.alert(
          'Authentication Required', 
          'Please sign in to subscribe', 
          [{ text: 'OK' }]
        );
        setIsAuthenticated(false);
        return false;
      }
    } catch (error) {
      console.error('Authentication check error:', error);
      Alert.alert('Error', 'Failed to check authentication status');
      return false;
    }
  };

  const handleSubscribe = async () => {
    // First, check authentication
    const isAuth = await checkAuthStatus();
    
    if (!isAuth) return;

    try {
      await createCheckoutSession({
        priceId: STRIPE_PRODUCTS.AI_AGENT.priceId,
        mode: STRIPE_PRODUCTS.AI_AGENT.mode,
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/subscribe`,
      });
    } catch (error) {
      console.error('Subscription error:', error);
      Alert.alert('Subscription Error', 'Failed to create checkout session');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Subscribe</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Sparkles size={24} color={theme.colors.brand.primary} />
            <Text style={styles.productName}>{STRIPE_PRODUCTS.AI_AGENT.name}</Text>
          </View>
          
          <Text style={styles.description}>
            {STRIPE_PRODUCTS.AI_AGENT.description}
          </Text>

          <View style={styles.pricingContainer}>
            <Text style={styles.price}>$10</Text>
            <Text style={styles.period}>/month</Text>
          </View>

          <TouchableOpacity 
            style={[styles.subscribeButton, isLoading && styles.subscribeButtonDisabled]}
            onPress={handleSubscribe}
            disabled={isLoading}
          >
            <Text style={styles.subscribeButtonText}>
              {isLoading ? 'Processing...' : 'Subscribe Now'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
  },
  headerTitle: {
    fontSize: theme.fontSize.lg,
    fontFamily: theme.fontFamily.bold,
    color: theme.colors.text.primary,
  },
  content: {
    flex: 1,
    padding: theme.spacing.md,
  },
  card: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  productName: {
    fontSize: theme.fontSize.xl,
    fontFamily: theme.fontFamily.bold,
    color: theme.colors.text.primary,
    marginLeft: theme.spacing.sm,
  },
  description: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xl,
    lineHeight: 24,
  },
  pricingContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: theme.spacing.xl,
  },
  price: {
    fontSize: 36,
    fontFamily: theme.fontFamily.bold,
    color: theme.colors.text.primary,
  },
  period: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.secondary,
    marginLeft: theme.spacing.xs,
  },
  subscribeButton: {
    backgroundColor: theme.colors.brand.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  subscribeButtonDisabled: {
    opacity: 0.7,
  },
  subscribeButtonText: {
    color: 'white',
    fontSize: theme.fontSize.md,
    fontFamily: theme.fontFamily.semiBold,
  },
});