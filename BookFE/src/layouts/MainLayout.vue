<template>
  <q-layout>
    <q-footer bordered>
      <q-toolbar>
        <q-tabs class="col-12">
          <EssentialLink
            v-for="link in navBar"
            :key="link.title"
            :name="link.name"
            :icon="link.icon"
            :link="link.link"
          />
        </q-tabs>
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import EssentialLink from '../components/EssentialLink.vue'

const navBar = [
  {
    name: 'Home',
    icon: 'home',
    link: '/'
  },
  {
    name: 'List',
    icon: 'list',
    link: '/list'
  },
  
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },
  data(){
    return{
      navBar,
    }
  }
})
</script>
