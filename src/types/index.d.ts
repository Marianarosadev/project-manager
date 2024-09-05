export interface Project {
  id: string;
  name: string;
  client: string;
  startDate: string;
  endDate: string;
  cover: string;
  favorite: boolean;
}

export interface Filters {
  searchQuery: sring,
  showFavorites: boolean;
  sortOrder: string;
}

export interface searchHistory {
  showFavorites: boolean;
  sortOrder: string;
}