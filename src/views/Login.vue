<template>
    <main class="bg-primary container-fluid min-vh-100 d-flex flex-column justify-content-center align-items-center  text-white py-5">

        <div class="col-lg-4 col-xl-3 p-5 bg-light text-dark rounded shadow">
            <h2 class="mb-5 text-center">
                Member Login
            </h2>
            <form @submit.prevent="login(usuario)">
                <div class="mb-4">
                    <label for="emailInput" class="form-label">Email address</label>
                    <input type="email" class="form-control" placeholder="Email" id="emailInput" v-model="usuario.email">
                </div>
                <div class="mb-4">
                    <label for="passInput" class="form-label">Password</label>
                    <input type="password"  class="form-control" placeholder="Ingrese contraseña" id="passInput" v-model="usuario.password">
                </div>
                <div class="d-grid gap-2 mx-auto">
                    <button class="btn btn-lg btn-success" type="submit">Login</button>
                </div>
            </form>
        </div>
    </main>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  data() {
    return {
      usuario: {
        email: 'prueba3@prueba.com',
        password: '123123'
      }
    }
  },
  methods: {
    ...mapActions(['login'])
  }
}
</script>