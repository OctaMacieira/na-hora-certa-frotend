import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import RegisterRoom from '../views/RegisterRoom.vue'
import RoomDetails from '../views/RoomDetails.vue'
import EditRoom from '../views/EditRoom.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/quem-somos',
      name: 'about',
      component: About
    },
    {
      path: '/cadastrar-sala',
      name: 'register-room',
      component: RegisterRoom
    },
    {
      path: '/sala/:id',
      name: 'room-details',
      component: RoomDetails,
      props: true
    },
    {
      path: '/sala/:id/editar',
      name: 'edit-room',
      component: EditRoom,
      props: true
    }
  ]
})

export default router
