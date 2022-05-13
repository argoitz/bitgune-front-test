<template>
  <main v-if="forms" class="bg-light container-fluid min-vh-100 d-flex flex-column justify-content-center align-items-center py-5">
    <h1 class="text-dark mb-5">Manage forms</h1>
    
    <div class="row col-11">

      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Surname</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Birth</th>
            <th scope="col">Sex</th>
            <th scope="col">Req Type</th>
            <th scope="col">Req Subtype</th>
            <th scope="col">Message</th>
            <th scope="col">Date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(form, index) in forms" :key="form._id">
            <th scope="row">{{index}}</th>
            <td>{{form.name}}</td>
            <td>{{form.surname}}</td>
            <td>{{form.email}}</td>
            <td>{{form.phone}}</td>
            <td>{{form.birth}}</td>
            <td>{{form.sex}}</td>
            <td>{{form.type}}</td>
            <td>{{form.subtype}}</td>
            <td>{{form.message}}</td>
            <td>{{form.date}}</td>
            <td class="row border-0">
              <button type="button" class="btn btn-primary btn-sm m-1 col">
                <font-awesome-icon :icon="['fas', 'pen']" />
              </button>
              <button type="button" class="btn btn-danger btn-sm m-1 col">
                <font-awesome-icon :icon="['fas', 'trash']" />
              </button>
            </td>
          </tr>
          
        </tbody>
      </table>
    </div>
    
  </main>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  data(){
    return {
      forms: null,
    }
  },
  created(){
    this.isAdminUser(),
    this.getFormData()
  },
  computed: {
    ...mapState(['token'])
  },
  methods: {
    ...mapActions(['isAdminUser']),
    async getFormData(){
      try {
        const res = await fetch('http://localhost:3001/api/dashboard/forms', {
          headers: {
            'Content-Type': 'application/json',
            'auth-token': this.token
          },
        })
        const resDB = await res.json()

        if(resDB.error){
          console.log(resDB.error);
        } else{
          this.forms = resDB.forms;
        }
      } catch (error) {
        console.log(error)
      }
    },


  }
}
</script>