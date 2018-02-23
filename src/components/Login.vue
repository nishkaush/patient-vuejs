<template>
<div class="container">
  <div class="row">
    <h1 class="text-center w-100">Patient Management System</h1>

    <div class="col-md-8 col-lg-6 mx-auto">

      <!-- Login Signup Tabs -->
      <div class="tabs w-100 d-flex justify-content-center">
        <div @click="isVisible=true;errorMessage=false" :class="{buttonActive:isVisible}" class="login w-50 text-center">
          Login
        </div>
        <div @click="isVisible=false;errorMessage=false" :class="{buttonActive:!isVisible}" class="signup w-50 text-center">
          Signup
        </div>
      </div>


      <p class="h5 text-center w-100" v-show="errorMessage">{{errorMessage}}</p>

      <!-- Login Form -->
      <form v-if="isVisible" ref="lform">
        <div class="form-group pt-2">
          <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Email" v-model="loginData.email">
        </div>
        <div class="form-group pt-2">
          <input type="password" class="form-control" placeholder="Password" v-model="loginData.password">
        </div>
        <button @click.prevent="loginSubmit" type="submit" class="btn login-btn btn-block">Log In <i class="fa fa-spinner fa-fw fa-lg" aria-hidden="true" v-if="loginSpinner===true"></i></button>
      </form>

      <!-- Signup Form -->
      <form v-else ref="sform">
        <div class="form-group pt-2">
          <input type="email" height="100" class="form-control" aria-describedby="emailHelp" placeholder="Enter Email" v-model="signupData.email">
        </div>
        <div class="form-group pt-2">
          <input type="password" class="form-control" placeholder="Enter Password" v-model="signupData.password">
        </div>
        <button @click.prevent="signupSubmit" type="submit" class="btn signup-btn btn-block">Sign Up <i class="fa fa-spinner fa-fw fa-lg" aria-hidden="true" v-if="signupSpinner===true"></i></button>
      </form>

    </div>
  </div>

</div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      loginSpinner: false,
      signupSpinner: false,
      isVisible: true,
      errorMessage: "",
      // url: "https://intense-castle-52320.herokuapp.com",
      // url: "http://localhost:3000",
      loginData: {
        email: "",
        password: ""
      },
      signupData: {
        email: "",
        password: ""
      }
    }
  },
  methods: {
    loginSubmit() {
      let vm = this;
      vm.loginSpinner = true;
      axios.post(`${this.$store.state.myUrl}/login`, {
        data: this.loginData
      }).then((res) => {
        if (res.data.token) {
          sessionStorage.setItem("token", res.data.token);
          axios.defaults.headers.common['Authorization'] = res.data.token;
          return this.$router.push({
            path: "home"
          });
        }
        vm.loginSpinner = false;
        this.errorMessage = "Provide correct credentials or signup";
      });
    },
    signupSubmit() {
      let vm = this;
      vm.signupSpinner = true;
      axios.post(`${vm.$store.state.myUrl}/signup`, {
        data: vm.signupData
      }).then((res) => {
        vm.$refs.sform.reset();
        sessionStorage.setItem("token", res.data.token);
        axios.defaults.headers.common['Authorization'] = res.data.token;
        this.$router.push({
          path: "home"
        });
      }).catch((e) => {
        vm.signupSpinner = false;
        this.errorMessage = "Issues signing up, try again.";
      });
    }
  },
  created() {
    sessionStorage.removeItem("token");
  }
}
</script>

<style scoped>
button {
  letter-spacing: 1px;
  cursor: pointer;
  color: white;
}

h1 {
  letter-spacing: 3px;
  padding: 8% 5% 0% 5%;
  color: forestgreen;
  font-family: open-sans;
  font-size: 2em;
  font-weight: 600;
  text-transform: uppercase;
}

.h5 {
  color: blue;
}

.col-lg-6 {
  margin-top: 4%;
}

.login,
.signup {
  padding: 4%;
  letter-spacing: 2px;
  font-size: 1.1em;
  cursor: pointer;
  text-transform: uppercase;
  background: #939393;
  opacity: 0.7;
}

form {
  padding: 8%;
  border-top: none;
  background: rgba(75, 158, 50, 0.3);
}

form input {
  height: 50px;
  border-radius: 50px;
  background: transparent;
  border: none;
  border-bottom: 1px solid white;
  border-width: 5px;
  color: white;
}

form input:focus {
  border: none;
  border-bottom: 1px solid white;
  border-width: 5px;
  background: transparent;
  color: white;
}

form input::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: white;
}

form input::-moz-placeholder {
  /* Firefox 19+ */
  color: white;
}

form input:-ms-input-placeholder {
  /* IE 10+ */
  color: white;
}

form input:-moz-placeholder {
  /* Firefox 18- */
  color: white;
}

form button {
  margin: 5% auto;
  width: 70%;
  padding: 3%;
  font-size: 1.1em;
  background: #4b9e32;
}

.buttonActive {
  background: #4b9e32;
  opacity: 1;
  color: white;
}
</style>
