<template>
<div class="">

  <searchbar v-if="currentView==='searchbar'"></searchbar>
  <useredit v-if="currentView==='useredit'"></useredit>
</div>
</template>

<script>
import SearchBar from './SearchBar.vue'
import UserEdit from './UserEdit.vue'
export default {
  computed: {
    currentView() {
      return this.$store.state.userSearchMod.currentView;
    }
  },
  components: {
    searchbar: SearchBar,
    useredit: UserEdit
  }
}
</script>

<style scoped>
</style>
