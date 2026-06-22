export const OTP_LENGTH = 6;
export const USE_IS_VERIFIED_USER_INTERVAL = 10 * 60 * 1000; // 10 minutes in milliseconds
export const TIME_TO_WAIT_BEFORE_EXPIRY = 60 * 1000; // 1 minute in milliseconds
export const REFRESH_TIMEOUT_MS = 10_000;
export const TOKEN_ERROR_STATUSES = new Set([401, 403]);
export const TOAST_AUTO_CLOSE_DURATION = 4000; // 4 seconds

// Username check delays
export const USERNAME_CHECK_DEBOUNCE_MS = 2000; // 2 seconds
export const USERNAME_CHECK_DELAY_MS = 1500; // 1.5 seconds

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/v1/auth/login',
    REGISTER: '/api/v1/auth/register',
    LOGOUT: '/api/v1/auth/logout',
    VERIFY: '/api/v1/auth/verify',
    RESEND_OTP: '/api/v1/auth/resend-otp',
    TOKEN_REFRESH: '/api/v1/auth/token/refresh',
    ACCOUNT_UPDATE: '/api/v1/auth/account/update',
    PROFILE_UPDATE: '/api/v1/auth/profile/update',
    CHECK_USERNAME: '/api/v1/check-username',
  },
  USER: {
    IS_USER: '/api/v1/is-user',
  },
  SUBSCRIPTION: {
    BUY: '/api/v1/subscription/create-order',
    VERIFY_PAYMENT: '/api/v1/subscription/verify-payment',
  },
  APIKEY: {
    CREATE: '/api/v1/api-keys/create/apikey',
    LIST: '/api/v1/api-keys/list/apikeys',
    REVOKE: '/api/v1/api-keys/revoke/:id',
    UPDATE_NAME:'/api/v1/api-keys/update/name',
    UPDATE_SCOPES:'/api/v1/api-keys/update/scopes',
    UPDATE_IPS:'/api/v1/api-keys/update/ips',
    DELETE: '/api/v1/api-keys/delete/:id',
  },
  STATS: {
    DASHBOARD: '/api/v1/stats/dashboard',
  }
};

// Username validation
export const USERNAME_REGEX = /^[A-Za-z][A-Za-z0-9_-]{4,29}$/;
export const USERNAME_MIN_LENGTH = 5;
export const USERNAME_MAX_LENGTH = 30;

// Bio character limit
export const BIO_MAX_LENGTH = 500;

// File upload
export const AVATAR_MAX_SIZE_MB = 5;
export const AVATAR_ACCEPTED_FORMATS = ['image/png', 'image/jpeg', 'image/gif'];

// Avatar fallback
export const DICEBEAR_AVATAR_API = 'https://api.dicebear.com/7.x/avataaars/svg';

// Razorpay
export const RAZORPAY_SCRIPT_URL = 'https://checkout.razorpay.com/v1/checkout.js';

// App branding
export const APP_NAME = 'TaskAPI';
export const PRIMARY_COLOR = '#00685f';

// Timeouts
export const COPIED_FEEDBACK_DURATION = 2000; // 2 seconds

// Subscription plans
export const PRICING_PLANS = [
  {
    title: 'Free',
    price: '$0',
    icon: 'Key',
    buttonText: 'Get Started',
    isFeatured: false,
    features: [
      'Up to 1,000 active sessions',
      'Basic email support',
      'Standard response latency'
    ]
  },
  {
    title: 'Basic',
    price: '$5',
    icon: 'RefreshCw',
    buttonText: 'Buy Now',
    isFeatured: false,
    features: [
      'Up to 50,000 active sessions',
      'Priority developer support',
      '100ms global response guarantee',
      'Webhooks integration'
    ]
  },
  {
    title: 'Pro',
    price: '$15',
    icon: 'Zap',
    buttonText: 'Buy Pro Now',
    isFeatured: true,
    features: [
      'Unlimited active sessions',
      '24/7 dedicated phone support',
      '15ms ultra-low latency guarantee',
      'Custom domains & SSL',
      'Advanced analytics dashboard'
    ]
  }
];

export const DEFAULT_PLAN = {
  name: 'Basic',
  price: 5,
  features: [
    'Up to 10,000 MAU',
    'Passkey Support',
    'OAuth Providers',
    'Email Support',
    'Standard Infrastructure',
    'Basic Analytics'
  ]
};

// Mock data (to be replaced with backend)
export const MOCK_API_KEY = 'tk_live_492x82abc123def456';