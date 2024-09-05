<script lang="ts" setup>
  import { useProjectStore } from '~/stores/projectStore';
  import ProjectsList from '~/components/project/ProjectsList.vue';

  const store = useProjectStore();
  const router = useRouter();

  await store.fetchProjects();

  const showFavorites = ref<boolean>(false);
  const select = ref<string>('alphabetical');

  const items = ref<Array<{ text: string; value: string }>>([
    { text: 'Ordem alfabética', value: 'alphabetical' },
    { text: 'Projetos iniciados mais recentemente', value: 'recently_started' },
    { text: 'Projetos próximos à finalização', value: 'near_completion' }
  ]);

  const handleShowFavorites = () => {
    console.log('showFavorites', showFavorites.value);
  };
</script>

<template>
  <div class="flex align-center justify-between px-5 my-6">
    <div class="d-flex align-center text-title">
      <h1 class="mr-1 text-xl">Projetos</h1>
      <div class="text-base">(2)</div>
    </div>
    <div class="d-flex align-center">
      <label class="inline-flex items-center cursor-pointer h-full min-w-48">
        <input v-model="showFavorites" type="checkbox" value="" class="sr-only peer" @input="handleShowFavorites">
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
      <select v-model="select"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
        <option v-for="item in items" :key="item.value" :value="item.value">{{ item.text }}</option>
      </select>
    </div>
  </div>

  <ProjectsList :projects="store.filteredProjects" />
</template>
