import ReviewController from './ReviewController'
import FavoriteController from './FavoriteController'
import VenueController from './VenueController'
import VenueApprovalController from './VenueApprovalController'
import ReviewModerationController from './ReviewModerationController'
import PackageController from './PackageController'
import SubscriptionController from './SubscriptionController'
const Dashboard = {
    ReviewController: Object.assign(ReviewController, ReviewController),
FavoriteController: Object.assign(FavoriteController, FavoriteController),
VenueController: Object.assign(VenueController, VenueController),
VenueApprovalController: Object.assign(VenueApprovalController, VenueApprovalController),
ReviewModerationController: Object.assign(ReviewModerationController, ReviewModerationController),
PackageController: Object.assign(PackageController, PackageController),
SubscriptionController: Object.assign(SubscriptionController, SubscriptionController),
}

export default Dashboard