<template>
  <main v-if="types" class="bg-light container-fluid min-vh-100 d-flex flex-column justify-content-center align-items-center py-5">
    <h1 class="text-dark mb-5">Request form</h1>
    
    <div v-if="requestSuccess" class="alert alert-success" role="alert">
      {{requestSuccess}}
    </div>
    <form v-if="!requestSuccess"
      @submit.prevent="checkForm(formData)" 
      method="post" class="row col-md-10 g-3">
      <div class="col-md-6">
        <label for="inputName" class="form-label">*Name</label>
        <input name="name" v-model="formData.name" type="text" class="form-control" :class="{'is-invalid': errors.find(e => e.field === 'name')}" id="inputName">
        <div class="text-danger" v-if="errors.find(e => e.field === 'name')">Name field is mandatory.</div>
      </div>
      <div class="col-md-6">
        <label for="inputSurname" class="form-label">Surname</label>
        <input name="surname" v-model="formData.surname" type="text" class="form-control" id="inputSurname">
      </div>
      <div class="col-md-12">
        <label for="inputEmail" class="form-label">*Email</label>
        <input name="email" v-model="formData.email" type="email" class="form-control" :class="{'is-invalid': errors.find(e => e.field === 'email')}" id="inputEmail">
        <div class="text-danger" v-if="errors.find(e => e.field === 'email')">Email field is mandatory.</div>
      </div>
      <div class="col-md-6">
        <label for="inputPhone" class="form-label">Phone</label>
        <input name="phone" v-model="formData.phone" type="text" class="form-control" id="inputPhone">
      </div>
      <div class="col-6">
        <label for="birthInput" class="form-label">Birth date</label>
        <input name="birth" v-model="formData.birth"  type="date" class="form-control" id="birthInput" placeholder="2001/21/09">
      </div>
      <div class="col-md-4">
        <label for="inputSex" class="form-label">Sex</label>
        <select name="sex" v-model="formData.sex" id="inputSex" class="form-select">
          <option hidden selected>Choose...</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div class="col-md-4">
        <label for="inputType" class="form-label">*Request Type</label>
        <select name="type" v-model="formData.type" id="inputType" class="form-select"  :class="{'is-invalid': errors.find(e => e.field === 'type')}" @change="onTypeChange()">
          <option hidden selected>Choose...</option>
          <option v-for="type in types" :value="type.name" :key="type._id">{{type.name}}</option>
        </select>
        <div class="text-danger" v-if="errors.find(e => e.field === 'type')">Please select a request type.</div>
      </div>

      <div class="col-md-4">
        <label for="inputSubtype" class="form-label">*Request Subtype</label>
        <select name="subtype" v-model="formData.subtype" id="inputSubtype" class="form-select"  :class="{'is-invalid': errors.find(e => e.field === 'subtype')}" :disabled="!subtypes">
          <option hidden selected>Choose...</option>
          <option v-for="subtype in subtypes" :value="subtype.name" :key="subtype._id">{{subtype.name}}</option>
        </select>
        <div class="text-danger" v-if="errors.find(e => e.field === 'subtype')">Please select a request subtype.</div>
      </div>

      <div class="col-md-12">
        <label for="messageTextarea" class="form-label">Message</label>
        <textarea name="message" v-model="formData.message" class="form-control" id="messageTextarea" rows="3"></textarea>
      </div>
      <div class="col-12">
        <div class="form-check">
          <input name="terms" v-model="formData.terms" class="form-check-input" type="checkbox" id="termsCheck">
          <label class="form-check-label" for="termsCheck">
            I agree with the terms and conditions
          </label>
          <div class="text-danger" v-if="errors.find(e => e.field === 'terms')">Please accept the terms and conditions before submitting the request.</div>
        </div>
      </div>
    
      <div v-if="requestError" class="alert alert-danger" role="alert">
        {{requestError}}
      </div>

      <div class="col-12">
        <button type="submit" class="btn btn-primary btn-lg">Send</button>
      </div>
    </form>
    
  </main>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  data(){
    return {
      formData:{
        name: "test",
        surname: "Test test",
        email: "test@test.com",
        phone: 666555444,
        birth: "1987-11-15",
        sex: "male",
        type: null,
        subtype: null,
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
        terms: null,
      },
      types: null,
      subtypes: null,
      errors: [],
      requestError: null,
      requestSuccess: null
    }
  },
  created(){
    this.getFormData()
  },
  computed: {
    ...mapState(['token'])
  },
  methods: {
    async getFormData(){
      try {
        const res = await fetch('http://localhost:3001/api/dashboard/request-form', {
          headers: {
            'Content-Type': 'application/json',
            'auth-token': this.token
          },
        })
        const resDB = await res.json()
        if(resDB.error){
          console.log(resDB.error);
        } else{
          this.types = resDB.types;
        }
      } catch (error) {
        console.log(error)
      }
    },

    onTypeChange(){
      const selected = this.types.find(t => t.name === this.formData.type);
      this.subtypes = selected.subtypes.length ? selected.subtypes : null;
      this.formData.subtype = null;
    },

    checkForm: function (data) {
      this.errors = [];
      if (!this.formData.name) {
        this.errors.push({field: 'name'});
      }
      if (!this.formData.email) {
        this.errors.push({field: 'email'});
      }
      if (!this.formData.type) {
        this.errors.push({field:'type'});
      }
      if (!this.formData.subtype) {
        const selected = this.types.find(t => t.name === this.formData.type);
        if(selected){
          if(selected.subtypes.length)
            this.errors.push({field: 'subtype'});
        } 
      }

      if(!this.formData.terms) {
        this.errors.push({field:'terms'});
      }

      this.subbmitForm(data);
    },
    async subbmitForm(formData) {
      this.requestError = null;
      const res = await fetch(
        "http://localhost:3001/api/dashboard/request-form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": this.token,
          },
          body: JSON.stringify(formData),
        }
      );
      
      const response = await res.json();
      if(response.error) this.requestError = response.error;
      if(response.message) this.requestSuccess = response.message;


    }


  }
}
</script>