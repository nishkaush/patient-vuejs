<template>
<div class="col-sm-10 mx-auto clearfix">

  <usermainform v-if="currentView==='userMainForm'"></usermainform>

  <userdiag v-if="currentView==='userDiag'"></userdiag>

  <usermed v-if="currentView==='userMed'"></usermed>

  <usertest v-if="currentView==='userTest'"></usertest>

  <!-- <userfinal v-if="currentView==='userFinal'"></userfinal> -->

  <usersuccess v-if="currentView==='userSuccess'"></usersuccess>

</div>
</template>

<script>
import axios from 'axios'
import UserMainForm from './UserMainForm.vue'
import UserDiag from './UserDiag.vue'
import UserMed from './UserMed.vue'
import UserTest from './UserTest.vue'
import UserSuccess from './UserSuccess.vue'
export default {
  data() {
    return {
      // url: "http://localhost:3000/user",
      submitMessage: "",
      pass: ""
    }
  },
  computed: {
    currentView() {
      return this.$store.state.userMod.currentComp;
    }
  },
  components: {
    usermainform: UserMainForm,
    userdiag: UserDiag,
    usermed: UserMed,
    usertest: UserTest,
    // userfinal: UserFinal,
    usersuccess: UserSuccess
  },
  mounted() {
    this.$store.commit("userMod/showCurrentView", {
      value: "userMainForm"
    });
  },
}
</script>

<style scoped>
form {
  clear: both;
}

.input-group-addon {
  background: #ffc234;
}

input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 30px white inset;
}

.noValue {
  border: 1px solid red;
}

.passbg {
  padding-top: 1%;
  padding-bottom: 1%;
  outline: 2px solid green;
  font-family: avenir;
  color: green;
  text-align: center;
  font-size: 0.9em;
}

.failbg {
  padding-top: 1%;
  padding-bottom: 1%;
  outline: 2px solid #e35d6a;
  font-family: avenir;
  color: #e35d6a;
  text-align: center;
  font-size: 0.9em;
}

select:read-only {
  background: #dedede !important;
}

select:disabled {
  background: #dedede !important;
}

input:read-only {
  background: #dedede !important;
}

input[type="email"]:disabled {
  background: #dedede !important;
}

input[type="email"]:read-only {
  background: #dedede !important;
}
</style>
