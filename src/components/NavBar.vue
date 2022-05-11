<template>
    <nav class="navbar fixed-top navbar-dark navbar-expand-lg bg-primary">
        <div class="container-fluid  text-white">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <a class="navbar-brand" href="#">
                   <img class="img-thumbnail rounded-circle"  src="../assets/argo_logo_md.png" alt="" width="30" height="24">
               Argoitz
            </a>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <!-- <a class="nav-link" aria-current="page" href="#"> Login </a> -->
                        <router-link class="nav-link" to="/">Home</router-link>
                    </li>
                    <li  v-if="token" class="nav-item">
                        <!-- <a class="nav-link" href="#">Register </a> -->
                        <router-link class="nav-link" to="/about">Dashboard</router-link>
                    </li>
                    <li v-if="!token" class="nav-item">
                        <router-link class="nav-link" to="/login">Login</router-link>
                    </li>

                    <li v-if="token" class="nav-item">
                        <button @click="logout">Cerrar Sesion</button>
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown button
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a class="dropdown-item" href="#">Action</a></li>
                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                <li><a class="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>


<script>
import {mapActions, mapState} from 'vuex'
export default {
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