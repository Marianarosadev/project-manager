import { defineStore } from 'pinia';
import axios from 'axios';
import type { Project, Filters } from '~/types';
import { useToast } from "vue-toastification";

const toast = useToast();
const BASE_URL = 'http://localhost:5000'

const axiosIns = axios.create({
  baseURL: BASE_URL,
})

export const useProjectStore = defineStore('projectStore', {
  state: () => ({
    _projects: [] as Project[],
    filters: {
      showFavorites: false,
      sortOrder: 'alphabetical',
    } as Filters,
  }),
  getters: {
    filteredProjects: (state) => {
      let filtered = state._projects;

      if (state.filters.showFavorites) {
        filtered = filtered.filter(project => project.favorite);
      }

      switch (state.filters.sortOrder) {
        case 'startDate':
          filtered = filtered.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
          break
        case 'endDate':
          filtered = filtered.sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime());
          break
        case 'alphabetical':
        default:
          filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
      }
      
      console.log('filtered', filtered)

      return filtered;
    },
  },
  actions: {
    async fetchProjects() {
      try {
        const response = await axiosIns.get('/projects');
        this._projects = response.data;
      } catch (e) {
        toast.error('Ocorreu um erro inesperado')
      }
    },
  },
});
