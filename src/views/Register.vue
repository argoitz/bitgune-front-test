<template>
    <main class="bg-primary container-fluid min-vh-100 d-flex flex-column justify-content-center align-items-center py-5">
        <div v-if="!successRegistered" class="col-lg-4 col-xl-3 p-5 bg-light text-dark rounded shadow">
            <h2 class="mb-5 text-center">
                Register
            </h2>

            <p class="error text-danger mb-3" v-if="regError">{{regError}}</p>
            <form @submit.prevent="register(usuario)">
                <div class="mb-4">
                    <label for="nameInput" class="form-label">User Name</label>
                    <input type="text" class="form-control" placeholder="Name" id="nameInput" v-model="usuario.name">
                </div>
                <div class="mb-4">
                    <label for="emailInput" class="form-label">Email address</label>
                    <input type="email" class="form-control" placeholder="Email" id="emailInput" v-model="usuario.email">
                </div>
                <div class="mb-4">
                    <label for="passInput" class="form-label">Password</label>
                    <input type="password"  class="form-control" placeholder="Ingrese contraseña" id="passInput" v-model="usuario.password">
                </div>
                <div class="d-grid gap-2 mx-auto">
                    <button class="btn btn-lg btn-success" type="submit">Register</button>
                </div>
            </form>
        </div>

        <div v-if="successRegistered" class="col-lg-5 col-xl-4 p-5 bg-light text-dark rounded shadow text-center">
            <h1>
                <font-awesome-icon class="text-success" :icon="['fas', 'circle-check']" />
                Successfully registered
            </h1>
            <p>Now log in with your new accoun here:</p>
            <router-link class="btn btn-success btn-lg" to="/login">
                Login page
            </router-link>

        </div>
    </main>
</template>


<script>
import {mapActions, mapState, mapMutations} from 'vuex'
export default {
  data() {
    return {
      usuario: {
        name: 'prueba',
        email: 'prueba@prueba.com',
        password: '123123'
      }
    }
  },
  created(){
    this.resetErrors()
  },
  methods: {
    ...mapActions(['register', 'resetErrors']),
    ...mapMutations(['resetErrors'])
  },
  computed: {
      ...mapState(['regError', 'successRegistered'])
  }
}
</script>