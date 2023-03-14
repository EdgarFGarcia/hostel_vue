import FoodComponent from '../FoodComponent.vue'

export default [
    {
        path: '/manage_food',
        name: '/manage_food',
        component: FoodComponent,
        meta: { layout: 'admin_dashboard' }
    }
]