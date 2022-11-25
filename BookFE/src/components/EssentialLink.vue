<template>
  <q-item
    clickable
    tag="a"
    target="_self"
    :href="link"
  >
    <q-item-section
      v-if="icon"
      avatar
      style="text-align: center;"
    >
      <q-icon :name="icon" />
      <q-item-label>{{ name }}</q-item-label>
    </q-item-section>

  </q-item>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EssentialLink',
  props: {
    name: {
      type: String,
      required: true
    },

    icon: {
      type: String,
      default: ''
    },
    
    link: {
      type: String,
      default: '#'
    },
  }
})
</script>
