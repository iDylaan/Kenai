<script setup lang="ts">

import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';

</script>


<template>
  <div class="example">
      <InputGroup>
          <InputGroupAddon>
              <i class="pi pi-user"></i>
          </InputGroupAddon>
          <InputText placeholder="Username" />
      </InputGroup>

      <InputGroup>
          <InputGroupAddon>$</InputGroupAddon>
          <InputNumber placeholder="Price" />
          <InputGroupAddon>.00</InputGroupAddon>
      </InputGroup>

      <InputGroup>
          <InputGroupAddon>www</InputGroupAddon>
          <InputText placeholder="Website" />
      </InputGroup>
  </div>
</template>

<style scoped lang="css">
.example {
  display: flex;
  gap: 20px;
  width: 80dvw;
}
</style>