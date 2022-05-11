<template>
  <NavBar/>
    <router-view/>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import NavBar from '@/components/NavBar.vue';
export default {
  components: {
    NavBar
  },
  computed: {
    ...mapState(['token'])
  },
  methods:{
    ...mapActions(['getToken', 'logout'])
  },
  created(){
    //On page reload, if user logued in, set token
    this.getToken()
  }
}

</script>