import { defineStore } from 'pinia'
import axios from 'axios'
import type { Project, Filters } from '~/types'
import { useToast } from "vue-toastification"
import { generateId } from '~/utils/utils'

const toast = useToast();
const BASE_URL = 'http://localhost:5000'

const axiosIns = axios.create({
  baseURL: BASE_URL,
})

export const useProjectStore = defineStore('projectStore', {
  state: () => ({
    _projects: [] as Project[],
    filters: {
      searchQuery: '',
      showFavorites: false,
      sortOrder: 'alphabetical',
    } as Filters,
    searchHistory: [] as string[],
    isSearching: false as boolean
  }),
  getters: {
    filteredProjects: (state) => {
      let filtered = state._projects;

      if (state.filters.searchQuery.trim()) {
        filtered = filtered.filter(project =>
          project.name.toLowerCase().includes(state.filters.searchQuery.toLowerCase())
        );
      }

      if (state.filters.showFavorites) {
        filtered = filtered.filter(project => project.favorite);
      }

      switch (state.filters.sortOrder) {
        case 'startDate':
          filtered = filtered.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
          break;
        case 'endDate':
          filtered = filtered.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());
          break;
        case 'alphabetical':
        default:
          filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
      }

      return filtered;
    },
    recentSearches: (state) => state.searchHistory.slice(-5).reverse(),
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

    async toggleFavorite(projectId: string) {
      const project = this._projects.find(p => p.id === projectId);
      
      if (project) {
        project.favorite = !project.favorite;
        
        try {
          await axiosIns.put(`/projects/${projectId}`, {
            ...project,
            favorite: project.favorite,
          });
        } catch (e) {
          toast.error('Ocorreu um erro ao atualizar o projeto');
        }
      }
    },

    async getProjectById(projectId: string) {
      try {
        const response = await axiosIns.get(`/projects/${projectId}`);
        return response.data
      } catch (e) {
        toast.error('Ocorreu um erro ao procurar o projeto');
      }
    },

    async updateProject(project: Project) {
      try {
        await axiosIns.put(`/projects/${project.id}`, {
          ...project,
        });
        toast.success('Projeto atualizado com sucesso');
      } catch (e) {
        toast.error('Ocorreu um erro ao atualizar o projeto');
      }
    },

    async createProject(project: Project) {
      try {
        await axios.post('http://localhost:5000/projects', project);
        toast.success('Projeto criado com sucesso');
      } catch (e) {
        toast.error('Ocorreu um erro ao criar o projeto');
      }
    },

    async deleteProject(projectId: string) {
      try {
        await axiosIns.delete(`/projects/${projectId}`);
        this.fetchProjects()

        toast.success('Projeto excluído com sucesso');
      } catch (e) {
        toast.error('Ocorreu um erro ao atualizar o projeto');
      }
    },

    toggleSearchMode(isSearchActive: boolean) {
      this.clearFilters();
      this.isSearching = isSearchActive;
    },

    setSearchQuery(query: string) {
      this.filters.searchQuery = query;
    },

    addToSearchHistory(query: string) {
      if (query && !this.searchHistory.includes(query)) {
        this.searchHistory.push(query);
        if (this.searchHistory.length > 5) {
          this.searchHistory.shift();
        }
      }
    },

    removeFromSearchHistory(query: string) {
      this.searchHistory = this.searchHistory.filter(search => search !== query);
    },

    clearFilters() {
      this.filters = {
        searchQuery: '',
        showFavorites: false,
        sortOrder: 'alphabetical',
      };
    },
  },
});
