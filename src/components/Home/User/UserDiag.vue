<template>
<div class="">
  <div class="clearfix heading-div mt-5">
    <span class="h4 float-left pt-3 pb-3 pl-3">Diagnosis</span>
    <span class="h4 float-right pt-3 pb-3 pr-3">Step 2 of 4</span>
  </div>

  <form class="mt-3 col-sm-12 mx-auto">
    <div class="form-row">
      <div class="form-group col-md-12">
        <textarea id="diagnosis" name="name" rows="10" cols="80" class="form-control" placeholder="Enter Patient Diagnosis" v-model="diagData"></textarea>
      </div>
    </div>
  </form>

  <div class="buttons-div">

    <button @click.prevent="showMainForm" class="btn btn-sm float-left"><i class="fa fa-angle-double-left fa-lg" aria-hidden="true"></i>&nbsp;Back</button>

    <button @click.prevent="showMed" class="btn btn-sm float-right">Next&nbsp;<i class="fa fa-angle-double-right fa-lg" aria-hidden="true"></i></button>

    <button class="btn btn-sm quitbtn" @click.prevent="quitProcess">Quit Adding This User&nbsp;<i class="fa fa-times fa-lg" aria-hidden="true"></i></button>

  </div>

</div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    showMed() {
      this.$store.commit("userMod/showCurrentView", {
        value: "userMed",
        diagData: this.diagData //no need to send this since computed prop is good
      });
    },
    showMainForm() {
      this.$store.commit("userMod/showCurrentView", {
        value: "userMainForm",
        diagData: this.diagData //no need to send this since computed prop is good
      });
    },
    quitProcess() {
      this.$store.commit("userMod/setDefaultVuex");
    }
  },
  computed: {
    // v-model will use "get" to get the value and "set" to set the value
    diagData: {
      get() {
        return this.$store.state.userMod.diagData;
      },
      set() {
        this.$store.commit("userMod/setDiagData", {
          value: document.getElementById("diagnosis").value
        });
      }
    }
  }
}
</script>

<style scoped>
.heading-div {
  background: #e166e1;
}

.buttons-div button {
  letter-spacing: 1px;
  font-family: avenir;
  padding: 1% 5%;
  margin-top: 3%;
  font-weight: bold;
  cursor: pointer;
  background: #e166e1;
  text-transform: uppercase;
}

.quitbtn {
  margin-left: 15%;
}
</style>
