export type PlanType = 'free' | 'starter' | 'professional' | 'enterprise';

export interface PlanFeatures {
  maxPublications: number;
  maxPagesPerPublication: number;
  maxStorageMB: number;
  customDomain: boolean;
  removeWatermark: boolean;
  analytics: boolean;
  advancedAnalytics: boolean;
  prioritySupport: boolean;
  apiAccess: boolean;
  whiteLabel: boolean;
  teamMembers: number;
  exportPDF: boolean;
  exportMP4: boolean;
  mp4ExportsPerMonth: number;
  passwordProtection: boolean;
  leadCapture: boolean;
  customBranding: boolean;
  seoOptimization: boolean;
}

export interface Plan {
  id: PlanType;
  name: string;
  description: string;
  priceMonthly: number;
  priceYearly: number;
  stripePriceIdMonthly: string;
  stripePriceIdYearly: string;
  features: PlanFeatures;
  popular?: boolean;
}

export const PLANS: Record<PlanType, Plan> = {
  free: {
    id: 'free',
    name: 'Grátis',
    description: 'Perfeito para começar e testar a plataforma',
    priceMonthly: 0,
    priceYearly: 0,
    stripePriceIdMonthly: '',
    stripePriceIdYearly: '',
    features: {
      maxPublications: 3,
      maxPagesPerPublication: 15,
      maxStorageMB: 100,
      customDomain: false,
      removeWatermark: false,
      analytics: false,
      advancedAnalytics: false,
      prioritySupport: false,
      apiAccess: false,
      whiteLabel: false,
      teamMembers: 1,
      exportPDF: false,
      exportMP4: false,
      mp4ExportsPerMonth: 0,
      passwordProtection: false,
      leadCapture: false,
      customBranding: false,
      seoOptimization: false,
    },
  },
  starter: {
    id: 'starter',
    name: 'Starter',
    description: 'Ideal para profissionais e pequenos negócios',
    priceMonthly: 29,
    priceYearly: 290,
    stripePriceIdMonthly: 'price_starter_monthly',
    stripePriceIdYearly: 'price_starter_yearly',
    features: {
      maxPublications: 15,
      maxPagesPerPublication: 50,
      maxStorageMB: 1024,
      customDomain: false,
      removeWatermark: true,
      analytics: true,
      advancedAnalytics: false,
      prioritySupport: false,
      apiAccess: false,
      whiteLabel: false,
      teamMembers: 1,
      exportPDF: true,
      exportMP4: false,
      mp4ExportsPerMonth: 0,
      passwordProtection: true,
      leadCapture: false,
      customBranding: false,
      seoOptimization: true,
    },
  },
  professional: {
    id: 'professional',
    name: 'Professional',
    description: 'Para empresas que precisam de mais recursos',
    priceMonthly: 79,
    priceYearly: 790,
    stripePriceIdMonthly: 'price_professional_monthly',
    stripePriceIdYearly: 'price_professional_yearly',
    popular: true,
    features: {
      maxPublications: 100,
      maxPagesPerPublication: 200,
      maxStorageMB: 10240,
      customDomain: true,
      removeWatermark: true,
      analytics: true,
      advancedAnalytics: true,
      prioritySupport: true,
      apiAccess: true,
      whiteLabel: false,
      teamMembers: 5,
      exportPDF: true,
      exportMP4: true,
      mp4ExportsPerMonth: 10,
      passwordProtection: true,
      leadCapture: true,
      customBranding: true,
      seoOptimization: true,
    },
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Solução completa para grandes organizações',
    priceMonthly: 199,
    priceYearly: 1990,
    stripePriceIdMonthly: 'price_enterprise_monthly',
    stripePriceIdYearly: 'price_enterprise_yearly',
    features: {
      maxPublications: -1, // ilimitado
      maxPagesPerPublication: -1,
      maxStorageMB: 102400,
      customDomain: true,
      removeWatermark: true,
      analytics: true,
      advancedAnalytics: true,
      prioritySupport: true,
      apiAccess: true,
      whiteLabel: true,
      teamMembers: -1,
      exportPDF: true,
      exportMP4: true,
      mp4ExportsPerMonth: -1,
      passwordProtection: true,
      leadCapture: true,
      customBranding: true,
      seoOptimization: true,
    },
  },
};

export const PLAN_FEATURE_LABELS: Record<keyof PlanFeatures, string> = {
  maxPublications: 'Publicações',
  maxPagesPerPublication: 'Páginas por publicação',
  maxStorageMB: 'Armazenamento',
  customDomain: 'Domínio personalizado',
  removeWatermark: 'Sem marca d\'água',
  analytics: 'Analytics básico',
  advancedAnalytics: 'Analytics avançado',
  prioritySupport: 'Suporte prioritário',
  apiAccess: 'Acesso à API',
  whiteLabel: 'White label',
  teamMembers: 'Membros da equipe',
  exportPDF: 'Exportar PDF',
  exportMP4: 'Exportar MP4',
  mp4ExportsPerMonth: 'Exportações MP4/mês',
  passwordProtection: 'Proteção por senha',
  leadCapture: 'Captura de leads',
  customBranding: 'Branding personalizado',
  seoOptimization: 'Otimização SEO',
};

export function formatFeatureValue(key: keyof PlanFeatures, value: number | boolean): string {
  if (typeof value === 'boolean') {
    return value ? '✓' : '—';
  }
  
  if (value === -1) {
    return 'Ilimitado';
  }
  
  if (key === 'maxStorageMB') {
    if (value >= 1024) {
      return `${value / 1024} GB`;
    }
    return `${value} MB`;
  }
  
  return value.toString();
}

export function canUserPerformAction(
  userPlan: PlanType,
  action: keyof PlanFeatures,
  currentValue?: number
): boolean {
  const plan = PLANS[userPlan];
  const featureValue = plan.features[action];
  
  if (typeof featureValue === 'boolean') {
    return featureValue;
  }
  
  if (featureValue === -1) {
    return true;
  }
  
  if (currentValue !== undefined) {
    return currentValue < featureValue;
  }
  
  return featureValue > 0;
}
