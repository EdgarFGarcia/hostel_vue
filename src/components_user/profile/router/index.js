import ProfileComponent from '../ProfileComponent.vue'

export default [
    {
        path: '/profile', 
        name: '/profile', 
        component: ProfileComponent,
        meta: { layout: 'user_dashboard' }
    }
]