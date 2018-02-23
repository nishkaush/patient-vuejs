<template>
<div class="">
  <div class="clearfix heading-div mt-5">
    <span class="h4 float-left pt-3 pb-3 pl-3">Tests</span>
    <span class="h4 float-right pt-3 pb-3 pr-3">Step 4 of 4</span>
  </div>

  <form class="mt-5 col-sm-12 mx-auto">
    <p class="h6 failmsg text-center" v-if="pass===false"> -- Please fill in the required fields --</p>
    <div class="form-row">
      <div class="form-group col-md-5">
        <select id="testList" class="form-control myfields" v-model="testName">
          <option value="">Choose Tests</option>
          <option :value="test.name" v-for="test in allTestList" :key="test._id">{{test.name}}</option>
        </select>
      </div>
      <div class="form-group col-md-3">
        <input type="number" class="form-control myfields" id="testQty" placeholder="Quantity" required v-model.number="testQty">
      </div>
      <div class="form-group col-md-4">
        <input class="btn btn-primary btn-md form-control" @click.prevent="addTest" value="Add To List" type="submit">
      </div>
    </div>

    <div class="form-row mt-4 testListBox">
      <!-- <label for="medList">Medicines Added</label> -->
      <div class="form-group col-md-12" id="medList">
        <span v-for="(test,i) in testData" class="test" :data-id="i" :key="i">
          <span>{{test.name}} - {{test.qty}} </span>
        <i class="fa fa-times" aria-hidden="true" @click="removeTest"></i>
        </span>
      </div>
    </div>

  </form>

  <div class="buttons-div d-none d-lg-block">
    <button @click.prevent="showMed" class="btn btn-sm float-left"><i class="fa fa-angle-double-left fa-lg" aria-hidden="true"></i>&nbsp;Back</button>

    <button @click.prevent="showFinal" class="btn btn-sm float-right">Finish&nbsp;<i class="fa fa-angle-double-right fa-lg" aria-hidden="true"></i></button>

    <button class="btn btn-sm quitbtn" @click.prevent="quitProcess">Quit Adding This User&nbsp;<i class="fa fa-times fa-lg" aria-hidden="true"></i></button>
  </div>

  <div class="buttons-div-second d-block d-lg-none">
    <button @click.prevent="showMed" class="btn btn-block"><i class="fa fa-angle-double-left fa-lg" aria-hidden="true"></i>&nbsp;Back</button>

    <button @click.prevent="showFinal" class="btn btn-block">Finish&nbsp;<i class="fa fa-angle-double-right fa-lg" aria-hidden="true"></i></button>

    <button class="btn btn-block" @click.prevent="quitProcess">Quit Adding This User&nbsp;<i class="fa fa-times fa-lg" aria-hidden="true"></i></button>
  </div>

</div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      pass: true,
      testName: "",
      testQty: "",
      allTestList: []
    }
  },
  methods: {
    addTest() {
      let counter = true;
      const entry = {
        name: this.testName,
        qty: this.testQty
      };
      let inputs = [].slice.call(document.querySelectorAll(".myfields"));

      inputs.forEach((e) => {
        if (!e.value) {
          e.className += " fail";
          counter = false;
          this.pass = false;
        }
      });
      if (counter) {
        this.testData.push(entry);
        this.testName = "";
        this.testQty = "";
        document.querySelector(".testListBox").scrollTop = document.querySelector(".testListBox").scrollHeight;
      }

    },
    removeTest(event) {
      this.testData.splice(event.target.parentElement.dataset.id, 1);
    },
    showMed() {
      this.$store.commit("userMod/showCurrentView", {
        value: 'userMed',
        testData: this.testData
      });
    },
    showFinal() {
      //take current data from Tests section and send it over to Vuex
      this.$store.commit("userMod/showCurrentView", {
        value: 'userSuccess',
        testData: this.testData
      });
      this.$store.dispatch("userMod/submitToDatabase");
      // Dispatch an action here which will be Axios POST request posting details to NodeJS.
      // Once response comes back from Node, show the final page with a special Patient Number
    },
    quitProcess() {
      this.$store.commit("userMod/setDefaultVuex");
    }
  },
  computed: {
    testData() {
      return this.$store.state.userMod.testData;
    }
  },
  mounted() {
    axios.get(`${this.$store.state.myUrl}/stock/getAllTests`).then((res) => {
      if (res.data.status === "success") {
        return this.allTestList = res.data.allTestList;
      }
    });
  }
}
</script>

<style scoped>
.heading-div {
  background: #4c8bff;
}

.btn-md {
  background: #4c8bff;
  border: 1px solid #4c8bff;
  color: black;
  cursor: pointer;
}

.testListBox {
  border: 1px solid #dedede;
  color: #939393;
  height: 200px;
  overflow: scroll;
}

i {
  cursor: pointer;
}

i:hover {
  color: white;
}

.test {
  display: inline-block;
  background: #4c8bff;
  padding: 1%;
  margin: 1% 1% 0% 0% !important;
  color: black;
}

.buttons-div button {
  letter-spacing: 1px;
  font-family: avenir;
  padding: 1% 5%;
  margin-top: 2%;
  font-weight: bold;
  cursor: pointer;
  background: #4c8bff;
  text-transform: uppercase;
}

.quitbtn {
  margin-left: 15%;
}

.fail {
  outline: 1px solid red;
  font-family: avenir;
  color: #e35d6a;
  font-size: 0.9em;
}

.failmsg {
  font-family: avenir;
  color: #e35d6a;
  font-size: 0.9em;
}

.btn-block {
  background: #4c8bff;
  padding: 1.5%;
  font-weight: bold;
  /*text-transform: uppercase;*/
  letter-spacing: 1px;
}
</style>
