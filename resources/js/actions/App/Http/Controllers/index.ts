import Public from './Public'
import DashboardController from './DashboardController'
import Settings from './Settings'
import Dashboard from './Dashboard'
const Controllers = {
    Public: Object.assign(Public, Public),
DashboardController: Object.assign(DashboardController, DashboardController),
Settings: Object.assign(Settings, Settings),
Dashboard: Object.assign(Dashboard, Dashboard),
}

export default Controllers