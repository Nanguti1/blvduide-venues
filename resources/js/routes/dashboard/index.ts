import venues from './venues'
import favorites from './favorites'
import reviews from './reviews'
import approvals from './approvals'
import admin from './admin'
import packages from './packages'
import subscriptions from './subscriptions'
const dashboard = {
    venues: Object.assign(venues, venues),
favorites: Object.assign(favorites, favorites),
reviews: Object.assign(reviews, reviews),
approvals: Object.assign(approvals, approvals),
admin: Object.assign(admin, admin),
packages: Object.assign(packages, packages),
subscriptions: Object.assign(subscriptions, subscriptions),
}

export default dashboard