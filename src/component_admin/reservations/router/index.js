import ReservationComponent from '../ReservationComponent.vue'
import HousekeepingComponent from '../HousekeepingComponent.vue'
import RequestComponent from '../RequestComponent.vue'

export default [
    {
        path: '/admin_reservations', 
        name: '/admin_reservations', 
        component: ReservationComponent,
        meta: { layout: 'admin_dashboard' }
    },
    {
        path: '/housekeeping',
        name: '/housekeeping',
        component: HousekeepingComponent,
        meta: { layout: 'admin_dashboard' }
    },
    {
        path: '/housekeeping_request',
        name: '/housekeeping_request',
        component: RequestComponent,
        meta: { layout: 'admin_dashboard' }
    },
]