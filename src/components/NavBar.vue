<template>
    <nav class="navbar fixed-top navbar-dark navbar-expand-lg bg-primary">
        <div class="container-fluid  text-white">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <router-link class="navbar-brand" to="/">
                <img class="img-thumbnail rounded-circle"  src="../assets/argo_logo_md.png" alt="" width="30" height="24">
                Argoitz
            </router-link>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">Home</router-link>
                    </li>

                    <li v-if="token" class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Dashboard
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <router-link class="dropdown-item" to="/request-form">Request form</router-link>
                            <li  v-if="token && userRole=='admin'"><hr class="dropdown-divider"></li>
                            <router-link  v-if="token && userRole=='admin'" class="dropdown-item" to="/manage-form">Manage Forms</router-link>
                        </ul>
                    </li>
                    <li v-if="!token" class="nav-item">
                        <router-link class="nav-link" to="/login">Login</router-link>
                    </li>
                    <li v-if="!token" class="nav-item">
                        <router-link class="nav-link" to="/register">Register</router-link>
                    </li>

                    <li v-if="token" class="nav-item">
                        <div class="dropdown">
                            <button class="btn btn-light rounded-circle dropdown-toggle p-2" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown"  data-bs-display="static" aria-expanded="false">
                                <font-awesome-icon :icon="['fas', 'user']" />
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                                <li>
                                    <a  @click="logout" class="dropdown-item" href="#">
                                        <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
                                        Log out
                                    </a>
                                </li>
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
    ...mapState(['token', 'userRole'])
  },
  methods:{
    ...mapActions(['getToken', 'getRole', 'logout'])
  },
  created(){
    //On page reload, if user logued in, set token
    this.getToken(),
    this.getRole()
  }
}

</script>