import OrderComponent from '../OrderComponent.vue'

export default [
    {
        path: '/orders',
        name: '/orders',
        component: OrderComponent,
        meta: { layout: 'admin_dashboard' }
    }
]