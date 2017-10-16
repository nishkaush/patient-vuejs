<template>
<div class="card">
  <div class="card-header" role="tab" id="headingThree">
    <h5 class="mb-0">
        <a class="collapsed" data-toggle="collapse" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          Medical History - {{myPatient.name.toUpperCase()}}
        </a>
      </h5>
  </div>
  <div id="collapseThree" class="collapse" role="tabpanel" aria-labelledby="headingThree" data-parent="#accordion">
    <div class="card-body col-sm-10 mx-auto">
      <div class="records" v-for="pres in medicalHistoryArr">
        <p><b>Diagnosis</b> -- {{pres.diagnosis}}</p>
        <hr>
        <div><b>Medicines</b> --
          <span v-for="med in pres.medicine">&nbsp;{{med.name}} - {{med.qty}},&nbsp;</span>
        </div>
        <div><b>Tests</b> --
          <span v-for="test in pres.tests">&nbsp;{{test.name}} - {{test.qty}},&nbsp;</span>
        </div>
        <p> <span><b>Issued By</b> -- {{pres.issuedBy}}</span>&nbsp;<span>on {{pres.issuedAt}}</span></p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import moment from 'moment'
export default {
  computed: {
    myPatient() {
      return this.$store.state.userSearchMod.patientToEdit;
    },
    medicalHistoryArr() {
      if (this.$store.state.userSearchMod.patientToEdit.medicalHistory.length !== 0) {
        return this.$store.state.userSearchMod.patientToEdit.medicalHistory;
      }
    }
  }
}
</script>

<style scoped>
#headingThree {
  background: #5d96ff;
}

.card-header h5 a {
  color: black;
}

#collapseThree .card-body {
  max-height: 20em;
  overflow-y: scroll;
}

.records {
  padding: 2%;
  margin-bottom: 3%;
  /*border: 1px solid #dedede;*/
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}
</style>
