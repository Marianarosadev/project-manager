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
    } as Filters,
  }),
  getters: {
    filteredProjects: (state) => {
      let filtered = state._projects;

      if (state.filters.showFavorites) {
        filtered = filtered.filter(project => project.favorite);
      }

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
