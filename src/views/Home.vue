<template>
  <main class="bg-primary container-fluid min-vh-100 d-flex flex-column justify-content-center align-items-center  text-white py-5">

        <img width="80" class="img-thumbnail" src="../assets/argo_logo_md.png" />
        <h1 class="mb-2 mt-2">Welcome to my project</h1>
        <h5 class="mb-5">You can start registering as a new user</h5>
        
        <router-link class="btn btn-outline-light btn-lg" to="/register">
          Register
        </router-link>

        <h5 class="mt-5">Later you can login as a superuser with this credentials:</h5>
        
        <div class="row col-12 ">
          <div class="col-6 text-end">User:</div>
          <div class="col-6 text-start">admin@admin.com</div>
        </div>
        <div class="row col-12 ">
          <div class="col-6 text-end">Password:</div>
          <div class="col-6 text-start">admin</div>
        </div>
  </main>
</template>
