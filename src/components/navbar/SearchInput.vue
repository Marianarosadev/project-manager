<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useProjectStore } from '~/stores/projectStore';

const store = useProjectStore();
const searchQuery = ref<string>('');
const isHistoryVisible = ref<boolean>(false);
const recentSearches = computed(() => store.recentSearches);

const processQuery = (query: string) => {
  const trimmedQuery = query.trim();
  return trimmedQuery.length >= 3 ? trimmedQuery : '';
};

watch(searchQuery, (newValue) => {
  const processedQuery = processQuery(newValue);

  if(processedQuery.length >= 3)
    store.setSearchQuery(processedQuery);
  else  
    store.setSearchQuery('')

}, { immediate: true });

const handleSearch = () => {
  const processedQuery = processQuery(searchQuery.value);
  store.setSearchQuery(processedQuery);
};

const saveSearchHistory = () => {
  const processedQuery = processQuery(searchQuery.value);
  if (processedQuery)
    store.addToSearchHistory(processedQuery);
};

const highlightText = (text: string): string => {
  const query = searchQuery.value.trim();
  if (!query) return text;

  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
};

const showHistory = () => {
  isHistoryVisible.value = true;
};

const hideHistory = () => {
  setTimeout(() => {
    isHistoryVisible.value = false;
    saveSearchHistory();
  }, 100);
};

const selectSearchQuery = (query: string) => {
  searchQuery.value = query;
  handleSearch();
  isHistoryVisible.value = false;
};

const removeFromHistory = (search: string) => {
  store.removeFromSearchHistory(search);
};
</script>

<template>
  <div class="relative flex flex-col w-full min-h-5 h-16 bg-white rounded-lg rounded-b-sm shadow-md text-text">
    <div class="d-flex text-text">
      <div class="h-full flex align-center py-5 px-3">
        <v-icon>mdi-magnify</v-icon>
      </div>
      <input v-model="searchQuery" type="text" placeholder="Digite o nome do projeto..."
        class="flex-1 p-2 border border-none w-full focus:outline-none bg-white text-lg min-h-5 text-text" 
        autofocus
        @focus="showHistory"
        @blur="hideHistory" 
      />
    </div>
    <div v-if="isHistoryVisible && recentSearches.length > 0" id="search-history" class="absolute inset-x-0 top-full bg-white border-white rounded-t-sm shadow-lg z-50 ">
      <div v-for="(search, index) in recentSearches" 
        :key="index" 
        class="px-4 py-2 cursor-pointer
          hover:bg-gray-200 flex justify-between text-text"
        >
        <div class="flex align-center w-full">
          <v-icon class="mr-3" size="20" color="text">mdi-history</v-icon>
          <div @click="selectSearchQuery(search)" v-html="highlightText(search)" class="w-full"></div>
        </div>
        <div 
          class="hover:bg-background flex align-center justify-center w-7 rounded-full"
          @click="removeFromHistory(search)"
        >
          <v-icon size="20" color="text">mdi-close</v-icon>
        </div>
      </div>
    </div>
  </div>
</template>