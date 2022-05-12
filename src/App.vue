<template>
  <NavBar/>
  <router-view/>
  <Footer/>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import NavBar from '@/components/NavBar.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    NavBar,
    Footer
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