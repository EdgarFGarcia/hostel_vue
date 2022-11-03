import UserDashboard from '../DashboardComponent.vue'
import PaymentSuccessful from '../PaySuccessComponent.vue'

export default [
    {
        path: '/user_dashboard', 
        name: '/user_dashboard', 
        component: UserDashboard,
        meta: { layout: 'user_dashboard' }
    },
    {
        path: '/payment_successful',
        name: '/payment_successful',
        component: PaymentSuccessful,
        meta: { layout: 'user_dashboard' }
    }
]