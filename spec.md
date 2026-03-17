# Gemora Global

## Current State
Admin panel exists with 7 sidebar sections: Dashboard, Products, Leads, Catalogue, Content, Analytics, Contacts. The sidebar and all admin pages use a navy/teal/gold luxury theme. Routes live at /admin/* with TanStack Router.

## Requested Changes (Diff)

### Add
- New sidebar sections: Categories, Media (Library), Orders (Export Orders), Customers/Buyers, Enquiries, WhatsApp Leads, Website Settings, System Settings
- Categories page: list of jewelry categories (Necklaces, Earrings, Bracelets, Rings, Bridal, Minimal) with add/edit/delete
- Media Library page: drag & drop upload for photos and videos, grid gallery view
- Orders page: table with Order ID, Buyer, Country, Amount, Status (Pending/Processing/Shipped/Delivered), status badge
- Customers/Buyers page: table with Name, Country, Email, WhatsApp, Business Type, Hot/Cold Lead toggle badge
- Enquiries page: all website enquiries with Name, Country, Message, Product Interest, Reply/Send Catalogue/WhatsApp Chat buttons
- WhatsApp Leads page: track incoming messages, auto replies, follow-ups tracking
- Website Settings page: homepage banner, logo upload, contact info, WhatsApp number, SEO settings
- System Settings page: admin users management, roles (Manager/Sales/Admin), email settings, notification control
- Dashboard enhancements: 4 metric cards (Total Orders, Export Countries, Total Products, New Enquiries), Monthly Orders chart (bar chart), Top Countries (France, UAE, USA), Most Viewed Products, Recent Enquiries table with Reply/WhatsApp buttons

### Modify
- Sidebar to include all 13 sections (Dashboard, Products, Categories, Media, Catalogue, Orders, Customers, Enquiries, WhatsApp Leads, Analytics, Website Settings, Settings, Logout)
- Update routeTree.gen.tsx to register all new routes under adminLayoutRoute
- Dashboard home: add 4 top metric cards, monthly orders bar chart, top countries section, most viewed products, recent enquiries table
- Leads page → keep but rename internally; add Enquiries as primary section
- Contacts page → keep but repurpose as Customers
- Content page → keep but rename as Website Settings

### Remove
- Nothing removed (existing routes stay for backward compat)

## Implementation Plan
1. Create new route files: categories.tsx, media.tsx, orders.tsx, customers.tsx, enquiries.tsx, whatsapp-leads.tsx, website-settings.tsx, settings.tsx
2. Update admin/index.tsx sidebar with all 13 nav items and new icons
3. Update admin/dashboard.tsx: 4 metric cards, bar chart, top countries, most viewed products, recent enquiries table
4. Update routeTree.gen.tsx: import and register all new routes
5. All new pages use same navy/gold design system with white cards, soft shadows, Poppins+Playfair fonts
