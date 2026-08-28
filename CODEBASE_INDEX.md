# BLVD GUIDE - Codebase Index

## Project Overview
BLVD GUIDE is a venue marketplace application built with Laravel (PHP 8.3) and React with Inertia.js. It allows users to discover, list, and review venues with a subscription-based model for venue owners.

## Tech Stack

### Backend
- **Framework**: Laravel 13.7
- **PHP**: 8.3
- **Database**: SQLite (configurable)
- **Authentication**: Laravel Fortify with Passkeys support
- **Authorization**: Spatie Laravel Permission
- **Media Management**: Spatie Media Library
- **Activity Logging**: Spatie Activitylog
- **Frontend Bridge**: Inertia.js Laravel

### Frontend
- **Framework**: React 19.2
- **Build Tool**: Vite 8.0
- **Language**: TypeScript 5.7
- **Styling**: Tailwind CSS 4.0
- **UI Components**: Radix UI primitives
- **State Management**: React hooks + Inertia
- **Icons**: Lucide React
- **Toasts**: Sonner

## Directory Structure

```
├── app/
│   ├── Actions/           # Domain actions
│   ├── Console/           # Artisan commands
│   ├── Enums/             # PHP enums for status management
│   ├── Http/
│   │   ├── Controllers/    # Request handlers
│   │   ├── Middleware/    # HTTP middleware
│   │   └── Requests/      # Form request validation
│   ├── Models/            # Eloquent models
│   ├── Policies/          # Authorization policies
│   ├── Providers/         # Service providers
│   └── Services/          # Business logic services
├── config/                # Configuration files
├── database/
│   ├── migrations/        # Database migrations
│   ├── seeders/           # Database seeders
│   └── factories/         # Model factories
├── public/                # Public assets
├── resources/
│   ├── css/               # Stylesheets
│   ├── js/                # React application
│   └── views/             # Blade templates
├── routes/                # Route definitions
└── tests/                 # Test files
```

## Core Models & Relationships

### User
- **Fields**: name, email, phone, status, password
- **Relationships**:
  - `venues()` - HasMany venues owned by user
  - `subscriptions()` - HasMany subscriptions
  - `favoriteVenues()` - BelongsToMany favorited venues
  - `favorites()` - HasMany favorite records
  - `reviews()` - HasMany reviews
- **Methods**:
  - `activeSubscription()` - Get current active subscription
  - `hasActiveSubscription()` - Check if user has active subscription
  - `remainingListingAllowance()` - Calculate remaining venue listings
- **Traits**: HasRoles (Spatie Permission), PasskeyAuthenticatable, TwoFactorAuthenticatable

### Venue
- **Fields**: user_id, venue_category_id, location IDs, title, slug, description, operational_status, approval_status, featured, price, address, coordinates, contact info, website, capacity, published_at, expires_at, meta fields
- **Relationships**:
  - `user()` - BelongsTo owner
  - `category()` - BelongsTo VenueCategory
  - `features()` - BelongsToMany VenueFeatures
  - `reviews()` - HasMany reviews
  - `favorites()` - HasMany favorites
  - `country()`, `county()`, `city()`, `locale()` - Location hierarchy
- **Scopes**:
  - `published()` - Only published venues
  - `featured()` - Only featured venues
- **Media Collections**:
  - `venue-cover` - Single cover image
  - `venue-gallery` - Multiple gallery images
  - `venue-documents` - Document files
- **Traits**: SoftDeletes, InteractsWithMedia, LogsActivity

### Package
- **Fields**: name, price, duration_days, max_listings, max_images_per_listing, featured_listing_allowance, badge_color, support_features, is_active
- **Relationships**:
  - `subscriptions()` - HasMany subscriptions
- **Casts**: support_features (array), is_active (boolean), price (decimal)

### Subscription
- **Fields**: user_id, package_id, starts_at, expires_at, payment_status, transaction_reference, status
- **Relationships**:
  - `user()` - BelongsTo user
  - `package()` - BelongsTo package
- **Enums**: PaymentStatus, SubscriptionStatus
- **Traits**: LogsActivity

### Review
- **Fields**: user_id, venue_id, rating, comment, status
- **Relationships**:
  - `user()` - BelongsTo user
  - `venue()` - BelongsTo venue
- **Scopes**: `approved()`, `pending()`
- **Enum**: ReviewStatus

### Favorite
- **Fields**: user_id, venue_id
- **Relationships**: user(), venue()

### Geographic Models
- **Country** - Top-level location
- **County** - BelongsTo Country, HasMany Cities
- **City** - BelongsTo County, HasMany Locales and Venues
- **Locale** - BelongsTo City, HasMany Venues

### VenueCategory
- **Fields**: name, slug, icon
- **Relationships**: venues()

### VenueFeature
- **Fields**: name, slug
- **Relationships**: venues() (BelongsToMany)

### ContactInquiry
- **Fields**: full_name, email, phone, subject, message

## Enums

### VenueApprovalStatus
- `Draft` - Unpublished draft
- `Pending` - Submitted for approval
- `Published` - Approved and live
- `Rejected` - Rejected by admin

### VenueOperationalStatus
- (Defined in app/Enums/VenueOperationalStatus.php)

### SubscriptionStatus
- `Active` - Currently active
- `Expired` - Past expiration date
- `Cancelled` - Cancelled by user
- `Suspended` - Suspended by admin

### PaymentStatus
- (Defined in app/Enums/PaymentStatus.php)

### ReviewStatus
- `Pending` - Awaiting moderation
- `Approved` - Approved and visible
- `Rejected` - Rejected by moderator

## Key Services

### SubscriptionService
- **Location**: `app/Services/SubscriptionService.php`
- **Methods**:
  - `assignPackage()` - Create subscription for user with package
  - `refresh()` - Update expired subscriptions status

### VenueSearchService
- **Location**: `app/Services/Search/VenueSearchService.php`
- **Methods**:
  - `query()` - Build venue search query with filters
- **Filters**: q (fulltext), category, location hierarchy, featured, price range, capacity, features, min_rating

## Controllers

### Public Controllers
- **HomeController** - Landing page
- **VenueController** - Public venue browsing and details
- **PageController** - Static pages (about, contact)

### Dashboard Controllers
- **DashboardController** - Main dashboard
- **VenueController** - CRUD operations for user venues
- **FavoriteController** - Favorite management
- **ReviewController** - User review management
- **SubscriptionController** - Subscription management
- **PackageController** - Package management (admin)
- **VenueApprovalController** - Venue approval workflow (admin)
- **ReviewModerationController** - Review moderation (admin)
- **UserController** (Admin) - User management

## Authorization Policies

### VenuePolicy
- **Permissions**: venues.view-any, venues.view-own, venues.create, venues.update-own, venues.delete-own, venues.approve
- **Rules**: Super Admin bypass, subscription check for creation, ownership checks

### ReviewPolicy
- **Permissions**: reviews.moderate
- **Rules**: Super Admin bypass, authentication required for creation

### SubscriptionPolicy
- **Permissions**: subscriptions.manage
- **Rules**: Super Admin bypass, ownership check for viewing

## Routes

### Public Routes
- `/` - Home page
- `/venues` - Venue listing with filters
- `/venues/{slug}` - Single venue details
- `/venues/categories/{category:slug}` - Venues by category
- `/venues/locales/{locale:slug}` - Venues by location
- `/about` - About page
- `/contact` - Contact page

### Dashboard Routes (auth required)
- `/dashboard` - Main dashboard
- `/dashboard/venues` - Venue management
- `/dashboard/favorites` - User favorites
- `/dashboard/reviews` - User reviews
- `/dashboard/subscriptions` - Subscription management
- `/dashboard/approvals` - Venue approvals (admin)
- `/dashboard/admin/reviews` - Review moderation (admin)
- `/dashboard/packages` - Package management (admin)
- `/dashboard/admin/users` - User management (admin)

## Frontend Structure

### Pages
- **Public**: home.tsx, venues/index.tsx, venues/show.tsx, about.tsx, contact.tsx
- **Dashboard**: dashboard.tsx, venues/*, favorites/*, reviews/*, subscriptions/*, approvals/*, packages/*, admin/*
- **Settings**: profile.tsx, security.tsx, appearance.tsx
- **Auth**: login, register, password reset, etc.

### Components
- **UI Components**: Full Radix UI component set (button, dialog, dropdown, form inputs, etc.)
- **Layout Components**: app-layout, auth-layout, public-layout, root-layout
- **Feature Components**: venue-card, venue-form, venue-filters, filter-bar
- **Shared Components**: app-header, app-sidebar, pagination, navigation menus

### Hooks
- `use-appearance` - Theme management
- `use-clipboard` - Clipboard operations
- `use-current-url` - Current URL detection
- `use-flash-toast` - Toast notifications
- `use-initials` - Generate initials from names
- `use-mobile-navigation` - Mobile navigation
- `use-mobile` - Mobile detection
- `use-two-factor-auth` - 2FA management

### Layouts
- **RootLayout** - Base layout with providers
- **AppLayout** - Dashboard layout with sidebar
- **AuthLayout** - Authentication pages layout
- **PublicLayout** - Public pages layout with header
- **SettingsLayout** - Settings pages layout

## Key Features

### Venue Management
- Create, edit, delete venues
- Upload cover and gallery images
- Add venue features
- Geographic location hierarchy
- Approval workflow (draft → pending → published)
- Featured venue support
- SEO-friendly slugs

### Subscription System
- Package-based pricing tiers
- Listing limits per package
- Featured listing allowances
- Subscription expiration handling
- Manual activation by admin

### User Engagement
- Favorite venues
- Review system with moderation
- Rating calculations
- Contact inquiries

### Search & Discovery
- Full-text search on venue title/description
- Filter by category, location, price, capacity
- Filter by features and ratings
- Featured venue filtering
- Category and location browsing

### Administration
- User management
- Venue approval workflow
- Review moderation
- Package management
- Subscription management
- Activity logging

## Configuration Files

### Environment
- Database: SQLite by default
- Cache: Database
- Queue: Database
- Session: Database
- Mail: Log driver (configurable)

### Build Configuration
- **Vite**: React + Inertia + Tailwind
- **TypeScript**: Strict mode enabled
- **ESLint**: Custom configuration with React plugins
- **Prettier**: Tailwind CSS plugin
- **React Compiler**: Babel plugin enabled

## Development Scripts

### Composer Scripts
- `composer setup` - Full project setup
- `composer dev` - Start development server with hot reload
- `composer lint` - Run Pint (PHP linter)
- `composer test` - Run tests with linting

### NPM Scripts
- `npm run dev` - Start Vite dev server
- `npm run build` - Production build
- `npm run lint` - Run ESLint
- `npm run format` - Run Prettier
- `npm run types:check` - TypeScript type checking

## Security Features
- Laravel Fortify authentication
- Passkey support (WebAuthn)
- Two-factor authentication
- Role-based access control (Spatie Permission)
- Policy-based authorization
- CSRF protection
- Input validation
- SQL injection prevention (Eloquent ORM)

## Media Handling
- Spatie Media Library integration
- Separate collections for cover, gallery, documents
- Custom disk configuration (public_uploads)
- Future: Image conversions and optimization

## Database Schema
- Users with roles and permissions
- Venues with approval workflow
- Subscriptions with expiration handling
- Reviews with moderation
- Geographic location hierarchy
- Activity logging
- Media library tracking

## Future Enhments (per architecture doc)
- Payment gateway integration (Mpesa/Stripe/Flutterwave)
- Scout + Meilisearch/Algolia for advanced search
- Image conversions and queued optimization
- Notification system
- Analytics and reporting
- Invoice generation
- Subscription renewals

## Dependencies

### Key Laravel Packages
- `inertiajs/inertia-laravel` - Frontend bridge
- `laravel/fortify` - Authentication scaffolding
- `laravel/wayfinder` - Route discovery
- `spatie/laravel-permission` - Roles/permissions
- `spatie/laravel-medialibrary` - Media management
- `spatie/laravel-activitylog` - Audit logging

### Key Frontend Packages
- `@inertiajs/react` - Inertia React adapter
- `@headlessui/react` - Accessible UI components
- `@radix-ui/*` - UI primitives
- `lucide-react` - Icon library
- `sonner` - Toast notifications
- `class-variance-authority` - Component variants
- `tailwind-merge` - Tailwind class merging

## Testing
- PHPUnit for backend tests
- Configuration in phpunit.xml
- Test database support
- Factory definitions for all models

## Deployment Considerations
- Environment-based configuration
- Asset compilation via Vite
- Database migrations
- Queue worker for background jobs
- Scheduled tasks for subscription expiration
- File system configuration for media storage
