<script lang="ts" setup>
  import { useProjectStore } from '~/stores/projectStore';
  import ProjectsList from '~/components/project/ProjectsList.vue';
  import { useRouter } from 'vue-router';

  const store = useProjectStore();
  await store.fetchProjects(); 
  const router = useRouter();

  const items = ref<Array<{ text: string; value: string }>>([
    { text: 'Ordem alfabética', value: 'alphabetical' },
    { text: 'Projetos iniciados mais recentemente', value: 'startDate' },
    { text: 'Projetos próximos à finalização', value: 'endDate' }
  ]);
</script>

<template>
  <div class="title-nav flex align-center justify-between px-5 my-6">
    <div>
      <div v-if="store.isSearching" @click="store.toggleSearchMode(false)" class="flex align-center hover:opacity-80 cursor-pointer mb-3 w-20">
        <v-icon class="mr-2" width="16" color="primary">mdi-arrow-left</v-icon>
        <div class="text-primary">Voltar</div>
      </div>
      <div class="d-flex align-center text-title">
        <h1 class="mr-1 text-xl">{{ store.isSearching? 'Resultado da busca' : 'Projetos' }}</h1>
        <div class="text-base">({{ store.filteredProjects.length }})</div>
      </div>
    </div>
    <div v-if="!store.isSearching" class="title-options flex align-center">
      <label class="switch inline-flex items-center cursor-pointer h-full min-w-48">
        <input v-model="store.filters.showFavorites" type="checkbox" id="favoriteFilter" class="sr-only peer">
        <div class="relative w-11 h-6 bg-gray-200 rounded-full peer 
                    peer-checked:bg-accent peer-checked:after:translate-x-full 
                    rtl:peer-checked:after:-translate-x-full 
                    peer-checked:after:border-white 
                    after:content-[''] after:absolute after:top-[2px] 
                    after:start-[2px] after:bg-white after:border-gray-300 
                    after:border after:rounded-full after:h-5 after:w-5 
                    after:transition-all ">
        </div>
        <span class="ml-2 text-base text-text2">Apenas Favoritos</span>
      </label>
      <select v-model="store.filters.sortOrder"
        class="md:mx-4 cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
        <option v-for="item in items" :key="item.value" :value="item.value" class="cursor-pointer">{{ item.text }}</option>
      </select>
      <v-btn 
        variant="outlined"
        color="primary"
        rounded="xl"
        prepend-icon="mdi-plus"
        @click="() => router.push('/projects/new')"
      >
        Novo projeto
      </v-btn>
    </div>
  </div>
  <div v-if="store.filteredProjects.length < 1" class="w-full text-center py-10">Nenhum projeto encontrado...</div>
  <ProjectsList v-else/>
</template>

<style lang="scss">
  @media (max-width: 991px) {
    .title-nav {
      display: block;

      .title-options {
        display: block;
      }

      .switch {
        margin-top: 12px;
      }

      select {
        margin: 12px 0;
        max-width: 300px;
      }
    }
  }
</style>
