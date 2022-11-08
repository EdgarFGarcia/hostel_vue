import OrderComponent from '../OrderComponent.vue'
import OrderUserComponent from '../OrderUserComponent.vue'

export default [
    {
        path: '/orders',
        name: '/orders',
        component: OrderComponent,
        meta: { layout: 'admin_dashboard' }
    },
    {
        path: '/orders_user',
        name: '/orders_user',
        component: OrderUserComponent,
        meta: { layout: 'user_dashboard' }
    },
]