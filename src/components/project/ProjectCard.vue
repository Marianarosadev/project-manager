<script lang="ts" setup>
import { useProjectStore } from '~/stores/projectStore';
import type { Project } from "@/types";
import { formatDate } from '~/utils/formatters'
import DialogDeletProject from '~/components/dialogs/DialogDeletProject.vue'
import IconStar from '~/components/icons/star.vue'
import defaultImage from "~/assets/images/default.svg";
import CalendarStart from '~/assets/icons/calendar-day-light.svg'
import CalendarEnd from '~/assets/icons/calendar-check-light.svg'

const store = useProjectStore();

const { project } = defineProps<{ project: Project }>();
const isDialogVisible = ref<boolean>(false);

const items = ref<{ title: string; action: string, icon: string }[]>([
  { title: 'Editar', action: 'edit', icon: 'mdi-square-edit-outline' },
  { title: 'Excluir', action: 'delete', icon: 'mdi-delete-outline' },
]);

const handleMenuAction = (action: string) => {
  if(action === 'delete')
    openDialogDeletProject();
};

const openDialogDeletProject = () => {
  isDialogVisible.value = true;
};

</script>

<template>
  <div class="max-w-xs bg-white shadow-lg rounded-[16px]">
    <div class="relative">
      <img :src="defaultImage" alt="Imagem do Projeto" class="w-full h-48 object-cover rounded-t-[16px]" />
      <div class="flex w-16 justify-between align-center absolute bottom-0 right-0 m-2">
        <div class="cursor-pointer hover:opacity-80"  @click="store.toggleFavorite(project.id)">
          <IconStar :isFavorite="project.favorite" />
        </div>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn class="btn-actions" color="white" v-bind="props" density="compact" icon="mdi-dots-horizontal"></v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in items" :key="index" :value="index" @click="handleMenuAction(item.action)" :prepend-icon="item.icon" base-color="primary">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
    <div class="p-4 rounded-b-[16px]">
      <h2 class="text-xl text-titleColor font-bold">{{ project.name }}</h2>
      <div class="mb-4 text-text">
        <span class="font-bold mr-1">Cliente:</span>
        <span>{{ project.client }}</span>
      </div>
      <hr>
      <div class="p-2">
        <div class="flex align-center mb-3">
          <img :src="CalendarStart" alt="Ícone calendário inicio do projeto" class="icon-calendar mr-3">
          <div class="text-text">{{ formatDate(project.startDate) }}</div>
        </div>
        <div class="flex align-center">
          <img :src="CalendarEnd" alt="Ícone calendário inicio do projeto" class="icon-calendar mr-3">
          <div class="text-text">{{ formatDate(project.endDate) }}</div>
        </div>
      </div>
    </div>

    <DialogDeletProject 
      :is-dialog-visible="isDialogVisible"
      :project-id="project.id"
      :project-name="project.name"
      @update:is-dialog-visible="val => isDialogVisible = val"
    />
  </div>
</template>

<style lang="scss">
  .icon-calendar {
    width: 24px;
    height: 24px;
  }

  .v-list {
    padding: 0 !important;
  }

  .v-list-item {
    border-bottom: 1px solid #F4F2FF !important;
    
    &__prepend {
      max-width: 33px;
    }
  }
</style>
