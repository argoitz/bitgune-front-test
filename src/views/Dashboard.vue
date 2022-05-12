<template>
  <main class="bg-light container-fluid min-vh-100 d-flex flex-column justify-content-center align-items-center py-5">
    <h1 class="text-dark">Protected Route</h1>
  </main>
</template>

<script>
import {mapState} from 'vuex'
export default {
  created(){
    this.ruta()
  },
  computed: {
    ...mapState(['token'])
  },
  methods: {
    async ruta(){
      try {
        const res = await fetch('http://localhost:3001/api/dashboard', {
          headers: {
            'Content-Type': 'application/json',
            'auth-token': this.token
          },
        })
        const resDB = await res.json()
        console.log(resDB)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>