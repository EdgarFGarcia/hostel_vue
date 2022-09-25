import ReservationComponent from '../ReservationComponent.vue'

export default [
    {
        path: '/admin_reservations', 
        name: '/admin_reservations', 
        component: ReservationComponent,
        meta: { layout: 'admin_dashboard' }
    }
]