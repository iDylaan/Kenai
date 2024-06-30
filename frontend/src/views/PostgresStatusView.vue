<script setup>
import { ref, reactive, onMounted } from "vue";
import { getPGLData } from "@/api/pgl";

const isPGLOk = ref(true);
const loading = ref(true);
const errorMessage = ref("");
const pglData = ref(null);
const nodes = ref([]);

onMounted(async () => {
  try {
    pglData.value = await getPGLData();

    pglData.value.tables.forEach((table, tIndex) => {
      const node = {
        key: tIndex,
        data: {
          tabla: table["table_name"],
        },
        children: table["table_colums"].map((column, cIndex) => {
          return {
            key: `${tIndex}-${cIndex}`,
            data: {
              columna: column["column_name"],
              tipo: column["data_type"],
              nullable: column["is_nullable"],
              default: column["column_default"],
            },
          };
        }),
      };
      nodes.value.push(node);
    });

    isPGLOk.value = true;
  } catch (error) {
    isPGLOk.value = false;
    errorMessage.value = error.message;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div style="padding: 15px">
    <h1>Estatus de conexión con PostgreSQL</h1>

    <div v-if="loading">
      <ProgressSpinner aria-label="Loading" />
    </div>

    <div class="conection-successfully" v-if="isPGLOk && !loading">
      <InlineMessage severity="success">¡Conexión exitosa!</InlineMessage>
      <div style="display: flex">
        <p class="m-0">Version: {{ pglData.version }}</p>

        <Divider layout="vertical" />

        <p class="m-0">Fecha: {{ pglData.date_time.current_date }}</p>

        <Divider layout="vertical" />

        <p class="m-0">Hora: {{ pglData.date_time.current_time }}</p>
      </div>

      <div>
        <TreeTable :value="nodes">
          <Column field="tabla" header="Tabla" expander></Column>
          <Column field="columna" header="Columna"></Column>
          <Column field="tipo" header="Tipo"></Column>
          <Column field="nullable" header="Nullable"></Column>
          <Column field="default" header="Default"></Column>
        </TreeTable>
      </div>
    </div>

    <div class="conection-error" v-if="!isPGLOk && !loading">
      <InlineMessage severity="error" style="padding: 20px"
        ><span style="font-size: 1.3rem; font-weight: 600"
          >¡Conexión fallida!</span
        ></InlineMessage
      >
      <InlineMessage severity="secondary">
        <h3 style="margin: 0">Detalles del error</h3>
        {{ errorMessage }}
      </InlineMessage>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.conection-error {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 500px;
}
</style>
