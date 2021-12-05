<template>
  <div class="landing">
    <AnimalCreationComponent />
  </div>
</template>

<script>
import AnimalCreationComponent from "../components/AnimalCreationComponent.vue";

export default {
  name: "AnimalCreationView",
  components: {
    AnimalCreationComponent,
  },
};
</script>
