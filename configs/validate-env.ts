const fs = require('fs');
const path = require('path');

const requiredVars = [
  'NODE_ENV',
  'VITE_APP_URL',
  'VITE_API_BASE_URL'
];

const optionalVars = [
  'VITE_MOCK_ENABLED',
  'VITE_DEBUG_MODE',
  'DATABASE_URL',
  'REDIS_URL'
];

function validateEnvironment() {
  console.log('🔍 Validating environment variables...');

  const missing: string[] = [];
  const warnings: string[] = [];

  // Check required variables
  requiredVars.forEach(varName => {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  });

  // Check optional but recommended variables
  optionalVars.forEach(varName => {
    if (!process.env[varName]) {
      warnings.push(varName);
    }
  });

  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(varName => console.error(`  - ${varName}`));
    process.exit(1);
  }

  if (warnings.length > 0) {
    console.warn('⚠️  Optional environment variables not set:');
    warnings.forEach(varName => console.warn(`  - ${varName}`));
  }

  console.log('✅ Environment validation passed!');
}

validateEnvironment();
