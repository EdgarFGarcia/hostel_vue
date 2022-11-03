import Landing from '../LandingComponent.vue'
import RoomComponent from '../components/RoomComponent.vue'
import ViewRoom from '../components/pages/ViewRoom.vue'

export default [
    {
        path: '/', 
        name: '/', 
        component: Landing,
        meta: { layout: 'default' }
    },
    {
        path: '/room-component',
        name: '/room-component',
        component: RoomComponent,
        meta: { layout: 'default' }
    },
    {
        path: '/view-room',
        name: '/view-room',
        component: ViewRoom,
        meta: { layout: 'default' }
    }
]