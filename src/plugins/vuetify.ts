import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      themes: {
        light: {
          dark: false,
          colors: {
            primary: '#695CCD',
            secondary: '#2C0063',
            accent: '#FFB23D',
            error: '#F44336',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FF9800',
            background: '#F4F2FF',
            text: '#717171'
          }
        },
      },
    },
  })
  
  app.vueApp.use(vuetify)
})