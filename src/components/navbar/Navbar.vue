<script setup lang="ts">
import Logo from '~/assets/images/logo.svg'
import SearchInput from './SearchInput.vue';
import { useProjectStore } from '~/stores/projectStore';

const store = useProjectStore();

</script>

<template>
  <div v-if="store.isSearching" key="search-bar" class="w-full min-h-5 h-20">
    <SearchInput ref="searchInputRef"/>
  </div>
  <nav v-else class="bg-secondary py-4 px-4">
    <div  key="navbar" class="flex items-center justify-between w-full ">
      <div class="flex-1"></div>
      <NuxtLink to="/"><img :src="Logo" alt="Logo" class="h-13"></NuxtLink>
      <div class="flex-1 text-right">
        <v-icon @click="store.toggleSearchMode(true)" class="hover:opacity-80"width="18" color="white">mdi-magnify</v-icon>
      </div>
    </div>
  </nav>
</template>

