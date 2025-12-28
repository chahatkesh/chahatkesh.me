# Analytics & Verification Setup

This guide explains how to set up Google Analytics, Microsoft Clarity, and Google Search Console verification for your portfolio.

## 🎯 Implemented Features

- ✅ Google Analytics 4 (GA4) integration
- ✅ Microsoft Clarity (alternative analytics)
- ✅ Vercel Analytics (built-in)
- ✅ Vercel Speed Insights
- ✅ Google Search Console verification
- ✅ Automatic page view tracking
- ✅ Custom event tracking support

## 📊 Google Analytics Setup

### 1. Create Google Analytics Account

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click "Start measuring" or "Admin" → "Create Property"
4. Set up your property:
   - Property name: "Chahat Kesharwani Portfolio"
   - Reporting time zone: Your timezone
   - Currency: Your currency
5. Click "Next" and configure data stream:
   - Choose "Web"
   - Enter your website URL: `https://chahatkesh.me`
   - Stream name: "Portfolio Website"
6. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

### 2. Add to Environment Variables

Create or update `.env.local`:

```bash
# Google Analytics (GA4)
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
```

### 3. Verify Installation

1. Deploy your site or run locally with production mode
2. Visit your website
3. Go to Google Analytics → Reports → Realtime
4. You should see your visit in real-time

## 🔍 Google Search Console Setup

### 1. Add Property

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click "Add Property"
3. Choose "URL prefix" method
4. Enter: `https://chahatkesh.me`

### 2. Verify Ownership

**Method 1: Meta Tag (Recommended)**

1. In Search Console, select "HTML tag" verification method
2. Copy the verification code (format: `abcdefghijklmnopqrstuvwxyz123456`)
3. Add to `.env.local`:

```bash
# Google Search Console Verification
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION="your-verification-code-here"
```

4. The code is automatically added to your site's `<head>` section
5. Click "Verify" in Search Console

**Method 2: HTML File**

If you prefer file verification:
1. Download the HTML file from Search Console
2. Place it in `/public` folder
3. Deploy and verify

### 3. Submit Sitemap

1. After verification, go to "Sitemaps" in the left menu
2. Add new sitemap: `https://chahatkesh.me/sitemap.xml`
3. Click "Submit"

## 📈 Microsoft Clarity Setup (Optional)

Microsoft Clarity provides heatmaps, session recordings, and insights.

### 1. Create Clarity Account

1. Go to [Microsoft Clarity](https://clarity.microsoft.com/)
2. Sign in with Microsoft account
3. Click "Add new project"
4. Enter project details:
   - Name: "Chahat Kesharwani Portfolio"
   - Website URL: `https://chahatkesh.me`
5. Copy your **Project ID**

### 2. Add to Environment Variables

```bash
# Microsoft Clarity
NEXT_PUBLIC_CLARITY_PROJECT_ID="your-clarity-project-id"
```

## 🎪 Vercel Analytics

Vercel Analytics is automatically enabled if you're deploying on Vercel.

### Setup

1. Go to your Vercel project dashboard
2. Navigate to "Analytics" tab
3. Enable Analytics (it's free for all plans)
4. No additional configuration needed - already integrated!

## 📊 Custom Event Tracking

Track custom events anywhere in your application:

```typescript
import { trackEvent } from "~/components/analytics";

// Track button clicks
trackEvent("click", "button", "Contact Form Submit");

// Track downloads
trackEvent("download", "file", "Resume PDF", 1);

// Track navigation
trackEvent("navigation", "menu", "Projects Page");
```

## 🔄 Page View Tracking

Page views are automatically tracked on route changes. The implementation:

- Uses Next.js App Router's `usePathname` and `useSearchParams`
- Tracks both pathname and query parameters
- Only active in production environment
- Integrated in the root providers

## ⚙️ Environment Variables Summary

Create a `.env.local` file in your project root:

```bash
# Database
MONGODB_URI="your-mongodb-connection-string"

# Google Analytics (GA4)
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"

# Google Search Console Verification
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION="your-verification-code"

# Microsoft Clarity (Optional)
NEXT_PUBLIC_CLARITY_PROJECT_ID="your-clarity-project-id"
```

## 🚀 Production Checklist

Before deploying:

- [ ] Add all environment variables to Vercel/deployment platform
- [ ] Verify Google Analytics is tracking in real-time
- [ ] Complete Google Search Console verification
- [ ] Submit sitemap to Search Console
- [ ] Enable Vercel Analytics in dashboard
- [ ] Test custom event tracking (if used)
- [ ] Check that analytics load only in production

## 📱 What's Being Tracked

### Google Analytics
- Page views
- User sessions
- Traffic sources
- Device types
- Geographic location
- Custom events (if implemented)

### Microsoft Clarity
- Session recordings
- Heatmaps
- Click patterns
- Scroll depth
- Rage clicks
- Dead clicks

### Vercel Analytics
- Page views
- Performance metrics
- Web Vitals (CLS, FID, LCP)
- User flows

## 🔒 Privacy & GDPR

All analytics:
- Only load in production environment
- Don't track personal information
- Respect Do Not Track settings (GA4)
- Anonymous by default

Consider adding a cookie consent banner if targeting EU users.

## 🐛 Troubleshooting

**Analytics not showing data:**
- Verify environment variables are set correctly
- Check browser console for errors
- Ensure you're testing in production mode
- Wait 24-48 hours for data to appear in some reports

**Search Console verification failed:**
- Clear cache and hard refresh
- Verify the meta tag is in `<head>` section
- Check View Source to confirm tag presence
- Try alternative verification method

**Events not tracking:**
- Check that GA measurement ID is correct
- Verify `window.gtag` is available
- Test in production environment only
- Check browser console for errors

## 📚 Additional Resources

- [Google Analytics Documentation](https://developers.google.com/analytics)
- [Google Search Console Help](https://support.google.com/webmasters)
- [Microsoft Clarity Documentation](https://docs.microsoft.com/en-us/clarity/)
- [Vercel Analytics](https://vercel.com/docs/concepts/analytics)

## 🎉 Success Metrics

Once set up, monitor:
- Daily active users
- Top performing pages
- Traffic sources
- User engagement time
- Bounce rate
- Conversion goals (contact form, etc.)
