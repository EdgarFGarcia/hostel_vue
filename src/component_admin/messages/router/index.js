import MessagesComponent from '../MessagesComponent.vue'

export default [
    {
        path: '/messages',
        name: '/messages',
        component: MessagesComponent,
        meta: { layout: 'admin_dashboard' }
    }
]