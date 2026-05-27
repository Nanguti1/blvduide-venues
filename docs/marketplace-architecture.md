# Venue Marketplace Architecture Blueprint

## 1) Bounded Contexts
- **Identity & Access**: auth, verification, Spatie roles/permissions, policies.
- **Catalog**: venues, categories, features, SEO slugs, media.
- **Geography**: normalized location hierarchy (country/county/city/locale).
- **Commerce**: packages, subscriptions, manual activation, future payments.
- **Engagement**: favorites, reviews, moderation.
- **Discovery**: full-text search + structured filters + future Scout adapters.
- **Operations**: approvals, audit activity log, reports.

## 2) Suggested Backend Structure
```
app/
  Actions/
    Venues/
    Subscriptions/
  DTOs/
    Venue/
    Subscription/
  Enums/
  Http/
    Controllers/
      Admin/
      Agent/
      Public/
    Requests/
    Resources/
  Models/
  Policies/
  Repositories/
    Contracts/
    Eloquent/
  Services/
    Search/
    Payments/
    Media/
```

## 3) Routing Strategy
- Public: `/venues`, `/venues/{slug}`, `/venues/{category:slug}`, `/venues/{locale:slug}`.
- Agent: guarded by `auth`, `verified`, `role:Agent|Super Admin`.
- Admin: guarded by `auth`, `verified`, `role:Super Admin`.
- Use granular policies (`VenuePolicy`, `SubscriptionPolicy`, `ReviewPolicy`).

## 4) Search & Filters
- Current: MySQL fulltext on `venues(title, description)` + structured where clauses.
- Build `VenueSearchService` behind `VenueSearchRepositoryInterface`.
- Future: swap adapter to Scout+Meilisearch/Algolia without controller changes.

## 5) Subscription Guardrails
- Before create venue, enforce active subscription.
- Enforce max listings, image limits, featured allowances.
- Expiration cron (`schedule:run`) deactivates expired subscriptions and venue visibility.

## 6) Media Strategy
- Spatie MediaLibrary collections:
  - `venue-cover` (single file)
  - `venue-gallery` (multi)
  - `venue-documents` (multi)
- Add conversions and queued optimization in phase 2.

## 7) Frontend (React + Inertia) Feature Folders
```
resources/js/
  pages/
    public/
      home.tsx
      venues/index.tsx
      venues/show.tsx
    agent/
      dashboard.tsx
      venues/
      subscription/
    admin/
      dashboard.tsx
      venues/
      packages/
      reviews/
  components/
    venue/
    search/
    dashboard/
    subscription/
```

## 8) Monetization Readiness
- `subscriptions.transaction_reference`, `payment_status`, `status` already normalized.
- Introduce future `payments` + `payment_attempts` tables with provider payload JSON.
- Payment gateway abstraction in `app/Services/Payments/*` (Mpesa/Stripe/Flutterwave adapters).

## 9) Moderation Workflow
- `approval_status`: draft/pending/published/rejected.
- Public queries only include `published` + non-expired + active subscription owner.
- Admin approvals logged with Spatie Activitylog.

## 10) Phase Delivery
1. Core catalog + auth + RBAC + dashboard.
2. Packages/subscriptions/limits/featured.
3. Reviews/favorites/notifications/advanced search.
4. Payments/invoices/renewals/analytics.
