import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from "primevue/config"
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
    locale: {
        accept: 'Aceptar',
        reject: 'Rechazar',
        startsWith: 'Comienza con',
        contains: 'Contiene',
        notContains: 'No contiene',
        endsWith: 'Termina con',
        equals: 'Igual',
        notEquals: 'No igual',
        noFilter: 'Sin filtro',
        lt: 'Menor que',
        lte: 'Menor o igual que',
        gt: 'Mayor que',
        gte: 'Mayor o igual que',
        dateIs: 'La fecha es',
        dateIsNot: 'La fecha no es',
        dateBefore: 'La fecha es anterior',
        dateAfter: 'La fecha es posterior',
        clear: 'Limpiar',
        apply: 'Aplicar',
        matchAll: 'Coincidir todos',
        matchAny: 'Coincidir cualquier',
        addRule: 'Añadir regla',
        removeRule: 'Eliminar regla',
        acceptLabel: 'Aceptar',
        rejectLabel: 'Rechazar',
        choose: 'Elegir',
        upload: 'Subir',
        cancel: 'Cancelar',
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        today: 'Hoy',
        weekHeader: 'Semana'
    }
})

app.mount('#app')
