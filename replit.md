# THYNE — Personalised Jewellery Website

## Overview
THYNE is a luxury jewellery lifestyle brand offering ultra-personalisation through three tiers:
1. **Stock Collection** ("Curated Elegance") — Ready-to-wear pieces with white gold plating and Swarovski stones
2. **Modified Stock** ("Your Vision, Refined") — Customise stone colors, metal plating, and other attributes
3. **AI Custom** ("Imagination, Manufactured") — Describe your vision to AI, we manufacture it

This website (thynejewels.com) serves as the SEO-optimised organic landing page and wholesale inquiry portal. The main application is at thyne.ai.

## Project Structure
```
/
├── index.html          # Main page with ring customizer & product tiers
├── about.html          # Brand story, philosophy, and contact
├── wholesale.html      # B2B wholesale program information
├── articles.html       # Journal with styling guides and insights
├── css/
│   └── styles.css      # Luxury design system with glass morphism
├── js/
│   └── main.js         # Ring customizer, animations, interactions
└── assets/
    └── renders/        # 120+ PNG renders of ring combinations
```

## Technology Stack
- **Frontend**: Pure HTML5, CSS3, JavaScript (no frameworks)
- **Design System**: 
  - Luxury glass morphism UI
  - EB Garamond (serif) + Lato (sans-serif) typography
  - Emerald/Gold/Ivory color palette
  - Scroll-triggered animations with Intersection Observer
- **Assets**: Pre-rendered PNG images for ring customisation

## Running in Development
The site runs via Python's built-in HTTP server:
```bash
python3 -m http.server 5000 --bind 0.0.0.0
```

## Deployment
- Static site deployment configured
- Public directory: `.` (root)
- No build step required

## Key Features
- **Ring Customizer**: Circular swatch selectors for metals and stones
- **Product Tiers**: Stock → Modified → AI Custom journey
- **Scroll Animations**: Fade-in reveals triggered by Intersection Observer
- **Glass UI**: Refined glass morphism with subtle borders and shadows
- **Responsive**: Mobile, tablet, and desktop optimised

## External Links
- Main Platform: https://thyne.ai
- All CTAs direct users to thyne.ai for full functionality

## Recent Changes
- **2024-12-28**: Imported to Replit environment
  - Configured Python HTTP server for development
  - Set up static site deployment
