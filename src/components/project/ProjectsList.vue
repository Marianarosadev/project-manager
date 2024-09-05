<script lang="ts" setup>
  import { useProjectStore } from '~/stores/projectStore';
  import ProjectCard from './ProjectCard.vue';

  const store = useProjectStore();
</script>

<template>
  <div class="px-5 flex flex-wrap gap-5 justify-start">
    <ProjectCard
      v-for="project in store.filteredProjects"
      :key="project.id"
      :project="project"
      class="transition-opacity duration-500 ease-in-out"
    />
  </div>
</template>