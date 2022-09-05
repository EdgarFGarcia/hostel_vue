import UserDashboard from '../DashboardComponent.vue'

export default [
    {
        path: '/user_dashboard', 
        name: '/user_dashboard', 
        component: UserDashboard,
        meta: { layout: 'user_dashboard' }
    }
]