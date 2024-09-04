import { defineStore } from 'pinia';
import axios from 'axios';
import type { Project } from '~/types';
import { useToast } from "vue-toastification";

const toast = useToast();
const BASE_URL = 'http://localhost:5000'

const axiosIns = axios.create({
  baseURL: BASE_URL,
})

export const useProjectStore = defineStore('projectStore', {
  state: () => ({
    _projects: [] as Project[],
    _filters: {
      showFavorites: false as boolean,
    } as Object,
  }),
  getters: {
    filteredProjects: (state) => {
      let filtered = state._projects;

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
