<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useProjectStore } from '~/stores/projectStore';
  import type { Project } from '~/types';

  const store = useProjectStore();
  const route = useRoute();
  const router = useRouter();
  const fileIsLoad = ref<boolean>(false)

  const isEdit = computed(() => route.params.id !== 'new');

  const projectForm = ref<Project>({
    id: '',
    name: '',
    client: '',
    startDate: '',
    endDate: '',
    cover: '',
    favorite: false,
  });

  if (isEdit.value) {
    const existingProject = await store.getProjectById(route.params.id as string);

    if (existingProject)
      projectForm.value = { ...existingProject };
  }

  const isFormValid = computed(() => {
    return projectForm.value.name.trim() !== '' &&
           projectForm.value.client.trim() !== '' &&
           projectForm.value.startDate !== '' &&
           projectForm.value.endDate !== '';
  });

  const handleProject = async () => {
    try {
      if (isEdit.value) {
        await store.updateProject(projectForm.value);
      } else {
        projectForm.value.id = generateId();
        await store.createProject(projectForm.value);
      }

      router.push('/');
    } catch (e) {
      console.error(e);
    }
  };

  const handleFileChange = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      projectForm.value.cover = URL.createObjectURL(file);
      fileIsLoad.value = true;
    }
  };

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer?.files?.[0];

    if (file) {
      projectForm.value.cover = URL.createObjectURL(file);
      fileIsLoad.value = true;
    }
  };

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
  };
</script>

<template>
<div class="p-4">
  <div @click="() => router.push('/')" class="flex align-center hover:opacity-80 cursor-pointer mb-3 w-20">
    <v-icon class="mr-2" width="16" color="primary">mdi-arrow-left</v-icon>
    <div class="text-primary">Voltar</div>
  </div>
  <h1 class="text-2xl mb-4">{{ isEdit ? 'Editar Projeto' : 'Novo Projeto' }}</h1>

  <div class="py-10 px-4 border w-full rounded-lg">
    <form @submit.prevent="handleProject" class="max-w-lg mx-auto">

      <div class="mb-4">
        <label for="name" class="block text-lg font-medium text-primary">Nome do projeto <span
            class="text-sm text-text">(Obrigatório)</span></label>
        <input v-model="projectForm.name" id="name" type="text"
          class="input-form mt-1 block w-full p-2 rounded-lg bg-white" required />
      </div>

      <div class="mb-4">
        <label for="client" class="block text-lg font-medium text-primary">Cliente <span
            class="text-sm text-text">(Obrigatório)</span></label>
        <input v-model="projectForm.client" id="client" type="text"
          class="input-form mt-1 block w-full p-2 rounded-lg bg-white" required />
      </div>

      <div class="md:flex justify-between">
        <div class="mb-4 md:mr-2 w-full">
          <label for="startDate" class="block text-lg font-medium text-primary">Data de Início <span
              class="text-sm text-text">(Obrigatório)</span></label>
          <input v-model="projectForm.startDate" id="startDate" type="date"
            class="input-form mt-1 block w-full p-2 rounded-lg bg-white" required />
        </div>
        <div class="mb-4 w-full">
          <label for="endDate" class="block text-lg font-medium text-primary">Data de Término <span
              class="text-sm text-text">(Obrigatório)</span></label>
          <input v-model="projectForm.endDate" id="endDate" type="date"
            class="input-form mt-1 block w-full p-2 rounded-lg bg-white" required />
        </div>
      </div>

      <div v-if="projectForm.cover">
        <div class="flex justify-end h-1">
          <v-btn class="relative top-[20px] right-[6px]" icon="mdi-delete-outline" width="32" height="32" @click="() => projectForm.cover = ''"></v-btn>
        </div>
        <div  class="mb-4">
          <p  class="mt-2 text-sm"> 
            <img :src="projectForm.cover" alt="Pré-visualização" class="h-full w-full object-cover" />
          </p>
        </div>
      </div>

      <div v-else class="mb-4">
        <label for="cover" class="block text-lg font-medium text-primary mb-4">Capa do Projeto</label>
        <div class="border border-dashed border-gray-100 rounded-lg p-4 text-center cursor-pointer" @drop="handleDrop" @dragover="handleDragOver">
          <div>
            <v-icon>mdi-tray-arrow-up</v-icon>
            <p class="my-5">Escolha uma imagem .jpg ou .png no seu dispositivo</p>
            <input 
              type="file" 
              id="file-upload" 
              class="upload-file" 
              data-label="Selecionar"
              @change="handleFileChange"
            />
          </div>
        </div>
      </div>
      <v-btn type="submit" :disabled="!isFormValid" color="primary" rounded="xl" block>
        Salvar Projeto
      </v-btn>
    </form>
  </div>
</div>
</template>

<style lang="scss">
  .input-form {
    border: 1px solid gray !important;
  }

  .upload-file {
    color: transparent;
    inline-size: 200px;

    &::-webkit-file-upload-button {
      visibility: hidden;
    }

    &::before {
      display: inline-block;
      padding: 10px;
      border-radius: 7px;
      block-size: 48px;
      color: rgb(var(--v-theme-primary));
      border: 1px solid rgb(var(--v-theme-primary));
      border-radius: 32px;
      content: '' attr(data-label) '';
      cursor: pointer;
      font-size: 16px;
      font-weight: 600;
      inline-size: 100%;
      text-align: center;
    }

    &:hover::before {
      opacity: .8;
    }
  }
</style>
