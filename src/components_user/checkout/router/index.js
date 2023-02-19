import Checkout from '../CheckoutComponent.vue'

export default [
    {
        path: '/checkout',
        name: '/checkout',
        component: Checkout,
        meta: { layout: 'user_dashboard' }
    },
]