<template>
  <q-page padding>
    <div v-if="dataReady">
      <q-table title="Book List" :rows="rows" :columns="columns" row-key="id">
        <template #body="props">
          <q-tr :props="props">
            <q-td key="id" :props="props">{{ props.row.id }}</q-td>
            <q-td key="title" :props="props">{{ props.row.title }}</q-td>
            <q-td key="author" :props="props">{{ props.row.author }}</q-td>
            <q-td key="year" :props="props">{{ props.row.year }}</q-td>
            <q-td key="actions" :props="props">
              <q-btn
                color="primary"
                icon="edit"
                flat
                round
                @click="editRecord(props.row)"
              />
              <q-btn
                color="primary"
                icon="delete"
                flat
                round
                @click="deleteRecord(props.row)"
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>
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

    <q-dialog v-model="form_edit" persistent>
      <q-card>
        <q-card-section class="text-h4"
          >Edit details of book {{ input.id }}</q-card-section
        >
        <q-card-section class="row items-center">
          <q-input v-model="input.title" type="text" label="Title" />
          <q-input v-model="input.author" type="text" label="Author" />
          <q-input v-model="input.year" type="text" label="Year" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn
            flat
            label="Update"
            color="primary"
            @click="submitEdit()"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="form_del" persistent>
      <q-card>
        <q-card-section class="text-h5"
          >Are you sure to DELETE book ID: {{ input.id }}</q-card-section
        >
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn
            flat
            label="Delete"
            color="primary"
            @click="submitDelete()"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { Notify } from "quasar";

export default {
  name: "BookList",
  data() {
    return {
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
        },
        {
          name: "author",
          label: "Author",
          align: "left",
          field: "author",
        },
        {
          name: "year",
          label: "Year",
          align: "left",
          field: "year",
        },
        {
          name: "actions",
          label: "Actions",
          align: "left",
          field: "actions",
        },
      ],
      input: [],
      form_edit: false,
      form_del: false,
    };
  },
  methods: {
    getBookList() {
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
    },
    editRecord(record) {
      this.input = record;
      this.form_edit = true;
    },
    submitEdit() {
      const data = {
        title: this.input.title,
        author: this.input.author,
        year: this.input.year,
      };
      this.$api
        .put("/update/" + this.input.id, data)
        .then((res) => {
          if (res.status == 200) {
            Notify.create({
              type: "positive",
              message: "Updated book ID: " + res.data.id,
            });
            console.log("Updated book ID: " + res.data.id);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteRecord(record) {
      this.input = record;
      this.form_del = true;
    },
    submitDelete() {
      this.$api
        .delete("/delete/" + this.input.id)
        .then((res) => {
          if (res.status == 200) {
            Notify.create({
              type: "positive",
              message: "Deleted user ID: " + res.data.id,
            });
            this.getBookList();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  async mounted() {
    await this.getBookList();
    this.dataReady = true;
  },
};
</script>

<style></style>
