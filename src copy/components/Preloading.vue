<template>
<div class="col-12 row q-col-gutter-md">
  <q-card v-for="n in 4" flat class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
    <q-item>
      <q-item-section avatar>
        <q-skeleton type="QAvatar" animation="fade" />
      </q-item-section>

      <q-item-section>
        <q-item-label>
          <q-skeleton type="text" animation="fade" />
        </q-item-label>
        <q-item-label caption>
          <q-skeleton type="text" animation="fade" />
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-skeleton height="200px" square animation="fade" />

    <q-card-section>
      <q-skeleton type="text" class="text-subtitle2" animation="fade" />
      <q-skeleton type="text" width="50%" class="text-subtitle2" animation="fade" />
    </q-card-section>
  </q-card>
</div>

</template>
