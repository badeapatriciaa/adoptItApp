<template>
  <div class="landing">
    <AnimalUserListComponent />
  </div>
</template>

<script>
import AnimalUserListComponent from "../components/AnimalUserListComponent.vue";

export default {
  name: "AnimalUserListView",
  components: {
    AnimalUserListComponent,
  },
};
</script>
