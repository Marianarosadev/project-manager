<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue';
import { useProjectStore } from '~/stores/projectStore';

const store = useProjectStore();

const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
  projectId: {
    type: String,
    required: true,
  },
  projectName: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['update:is-dialog-visible']);

const dialogVisibleUpdate = (val: boolean) => {
  emit('update:is-dialog-visible', val);
};

const handleDelete = () => {
  store.deleteProject(props.projectId)
};
</script>

<template>
  <v-dialog :model-value="isDialogVisible" max-width="500" @update:model-value="dialogVisibleUpdate">
    <template v-slot:default="{ isActive }">
      <div class="relative top-8 left-[45%] bg-primary flex align-center justify-center rounded-full w-16 h-16" >
        <v-icon>mdi-delete-outline</v-icon>
      </div>
      <div class="p-5 rounded-lg bg-white">
        <div class="border-b-2 w-full text-center py-5  flex flex-column justify-center align-center">
          <div class="text-primary font-bold text-xl">Remover projeto</div>
        </div>
        <div class="text-center py-6">
          <div class="text-text text-base">Essa ação removerá definitivamente o projeto:</div>
          <div class="text-text3 font-semibold text-2xl mt-3">{{ projectName }}</div>
        </div>
        <div class="flex align-center justify-center mx-5">
          <v-btn 
            class="mr-5 md:max-w-[200px]" 
            variant="outlined"
            color="primary"
            rounded="xl"
            @click="dialogVisibleUpdate(false)"
          >
            Cancelar
          </v-btn>
          <v-btn 
            color="primary" 
            rounded="xl"
            @click="handleDelete"
          >
            Confirmar
          </v-btn>
        </div>
      </div>
    </template>
  </v-dialog>
</template>