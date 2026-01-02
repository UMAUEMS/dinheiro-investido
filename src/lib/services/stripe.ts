import Stripe from 'stripe';
import { loadStripe, Stripe as StripeJS } from '@stripe/stripe-js';
import type { PlanType } from '@/lib/types/subscription';
import { PLANS } from '@/lib/types/subscription';

// Cliente Stripe para o servidor
// Usar chave de teste placeholder se não houver chave configurada
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder';
export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2025-12-15.clover',
});

// Cliente Stripe para o browser
let stripePromise: Promise<StripeJS | null>;
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');
  }
  return stripePromise;
};

// Criar sessão de checkout para assinatura
export async function createSubscriptionCheckout(
  userId: string,
  email: string,
  planId: PlanType,
  billingPeriod: 'monthly' | 'yearly'
): Promise<{ sessionId: string; url: string } | { error: string }> {
  try {
    const plan = PLANS[planId];
    if (!plan || planId === 'free') {
      return { error: 'Plano inválido' };
    }

    const priceId = billingPeriod === 'monthly' 
      ? plan.stripePriceIdMonthly 
      : plan.stripePriceIdYearly;

    if (!priceId) {
      return { error: 'Preço não configurado para este plano' };
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card', 'boleto'],
      customer_email: email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?upgrade=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/precos?upgrade=cancelled`,
      metadata: {
        userId,
        planId,
        billingPeriod,
      },
      subscription_data: {
        metadata: {
          userId,
          planId,
        },
      },
      allow_promotion_codes: true,
      billing_address_collection: 'required',
    });

    return { sessionId: session.id, url: session.url || '' };
  } catch (error) {
    console.error('Erro ao criar checkout:', error);
    return { error: 'Erro ao processar pagamento' };
  }
}

// Criar sessão de checkout para compra única (produtos da loja)
export async function createProductCheckout(
  userId: string,
  email: string,
  items: Array<{ productId: string; name: string; price: number; quantity: number }>
): Promise<{ sessionId: string; url: string } | { error: string }> {
  try {
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'brl',
        product_data: {
          name: item.name,
          metadata: {
            productId: item.productId,
          },
        },
        unit_amount: Math.round(item.price * 100), // Stripe usa centavos
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card', 'boleto', 'pix'],
      customer_email: email,
      line_items: lineItems,
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/compras?order=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/loja?order=cancelled`,
      metadata: {
        userId,
        type: 'product_purchase',
        items: JSON.stringify(items.map(i => ({ id: i.productId, qty: i.quantity }))),
      },
      allow_promotion_codes: true,
    });

    return { sessionId: session.id, url: session.url || '' };
  } catch (error) {
    console.error('Erro ao criar checkout de produto:', error);
    return { error: 'Erro ao processar pagamento' };
  }
}

// Criar sessão para exportação de MP4
export async function createMP4ExportCheckout(
  userId: string,
  email: string,
  publicationId: string,
  publicationTitle: string,
  quality: '720p' | '1080p' | '4k'
): Promise<{ sessionId: string; url: string } | { error: string }> {
  try {
    const prices = {
      '720p': 990, // R$ 9,90
      '1080p': 1990, // R$ 19,90
      '4k': 3990, // R$ 39,90
    };

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card', 'pix'],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: `Exportação MP4 (${quality}) - ${publicationTitle}`,
              description: `Vídeo em qualidade ${quality} da sua publicação`,
            },
            unit_amount: prices[quality],
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/publicacoes/${publicationId}?export=processing`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/publicacoes/${publicationId}?export=cancelled`,
      metadata: {
        userId,
        publicationId,
        type: 'mp4_export',
        quality,
      },
    });

    return { sessionId: session.id, url: session.url || '' };
  } catch (error) {
    console.error('Erro ao criar checkout de MP4:', error);
    return { error: 'Erro ao processar pagamento' };
  }
}

// Cancelar assinatura
export async function cancelSubscription(subscriptionId: string): Promise<{ success: boolean; error?: string }> {
  try {
    await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });
    return { success: true };
  } catch (error) {
    console.error('Erro ao cancelar assinatura:', error);
    return { success: false, error: 'Erro ao cancelar assinatura' };
  }
}

// Reativar assinatura
export async function reactivateSubscription(subscriptionId: string): Promise<{ success: boolean; error?: string }> {
  try {
    await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: false,
    });
    return { success: true };
  } catch (error) {
    console.error('Erro ao reativar assinatura:', error);
    return { success: false, error: 'Erro ao reativar assinatura' };
  }
}

// Criar portal de gerenciamento de assinatura
export async function createBillingPortal(
  customerId: string,
  returnUrl: string
): Promise<{ url: string } | { error: string }> {
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });
    return { url: session.url };
  } catch (error) {
    console.error('Erro ao criar portal de billing:', error);
    return { error: 'Erro ao acessar portal de pagamentos' };
  }
}

// Verificar status do webhook
export function constructWebhookEvent(
  payload: string | Buffer,
  signature: string,
  webhookSecret: string
): Stripe.Event {
  return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
}
