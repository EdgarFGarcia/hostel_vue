import AdminDashboard from '../DashboardComponent.vue'

export default [
    {
        path: '/admin_dashboard', 
        name: '/admin_dashboard', 
        component: AdminDashboard,
        meta: { layout: 'admin_dashboard' }
    }
]