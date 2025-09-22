# Domain Nameserver Fix - strivetech.ai

## Issue Summary
- **Problem**: Iframe errors and domain showing old commits instead of latest deployment
- **Root Cause**: Domain using Cloudflare nameservers instead of Vercel nameservers
- **Impact**: Cross-origin issues with chatbot subdomain, outdated content serving

## Current Status
- ✅ Latest code deployed to: `https://strive-website-lgbe9iwl6-strive-1a6c4879.vercel.app`
- ✅ Git commit `7b17e812` (error-fix) is live on Vercel
- ❌ Domain nameservers misconfigured

## Nameserver Configuration

### Current (Incorrect)
```
dion.ns.cloudflare.com
teresa.ns.cloudflare.com
```

### Required (Correct)
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

## Fix Steps
1. Login to domain registrar (where strivetech.ai was purchased)
2. Navigate to DNS/Nameserver settings
3. Replace Cloudflare nameservers with Vercel nameservers
4. Save changes
5. Wait 24-48 hours for DNS propagation

## Timeline
- **Domain created**: September 11, 2025 (11 days ago)
- **Issue identified**: September 22, 2025
- **Latest deployment**: September 22, 2025

## Expected Results After Fix
- strivetech.ai will show latest deployment
- www.strivetech.ai will work properly
- chatbot.strivetech.ai iframe connections will resolve
- Cross-origin issues will be fixed

## Verification Commands
```bash
# Check domain status
npx vercel domains inspect strivetech.ai

# Check recent deployments
npx vercel ls

# Deploy latest code
npx vercel --prod
```