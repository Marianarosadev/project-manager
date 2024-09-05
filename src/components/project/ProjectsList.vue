<script lang="ts" setup>
  import type { Project } from '@/types';
  import ProjectCard from './ProjectCard.vue';

  const { projects } = defineProps<{ projects: Project[] }>();
</script>

<template>
  <div class="px-5 flex flex-wrap gap-5 justify-start">
    <ProjectCard
      v-for="project in projects"
      :key="project.id"
      :project="project"
      class="transition-opacity duration-500 ease-in-out"
    />
  </div>
</template>