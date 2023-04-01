import ManageUsers from '../ManageUsers.vue'

export default [
    {
        path: '/manage_users',
        name: '/manage_users',
        component: ManageUsers,
        meta: { layout: 'admin_dashboard' }
    }
]