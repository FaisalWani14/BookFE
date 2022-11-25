<template>
  <q-page padding>
    <div v-if="dataReady">
        <q-table
            title="Book List"
            :rows="rows"
            :columns="columns"
            row-key="id"
        />
    </div>
    <div v-else class="flex flex-center">
      <!-- display circular progress -->
      <q-circular-progress
        indeterminate
        size="90px"
        color="lime"
        center-color="grey-8"
        track-color="transparent"
        class="q-ma-md"
      />
    </div>
  </q-page>
</template>

<script>

export default {
    name: 'BookList',
    data(){
        return{
            dataReady: false,
            rows: [],
            columns: [
                {
                name: "id",
                label: "ID",
                align: "center",
                field: "id",
                sortable: true,
                },
                {
                name: "title",
                label: "Title",
                align: "left",
                field: "title",
                sortable: true,
                },
                {
                name: "author",
                label: "Author",
                align: "left",
                field: "author",
                sortable: true,
                },
                {
                name: "year",
                label: "Year",
                align: "left",
                field: "year",
                },
            ],
        }
    },
    methods:{
        getBookList(){
            this.$api
            .get("/all")
            .then((res) => {
              if (res.status == 200) {
                this.rows = res.data;          
              }
            })
            .catch((err) => {
              Notify.create({
                  type: "negative",
                  message: "Unauthorized",
              });
            });
        }
    },
    async mounted() {
        await this.getBookList();
        this.dataReady = true;
    },
}
</script>

<style>

</style>