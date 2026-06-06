import HomeController from './HomeController'
import VenueController from './VenueController'
import PageController from './PageController'
const Public = {
    HomeController: Object.assign(HomeController, HomeController),
VenueController: Object.assign(VenueController, VenueController),
PageController: Object.assign(PageController, PageController),
}

export default Public