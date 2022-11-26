<template>
  <q-page class="flex flex-center">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
      ref="BookForm"
    >
      <q-input v-model="title" type="text" label="Title" />
      <q-input v-model="author" type="text" label="Author" />
      <q-input v-model="year" type="number" label="Year" />
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
  data() {
    return {
      title: null,
      author: null,
      year: null,
      rows: [],
    };
  },
  methods: {
    onSubmit() {
      const data = {
        title: this.title,
        author: this.author,
        year: this.year,
      };
      this.$api
        .post("/create", data)
        .then((res) => {
          if (res.status == 200) {
            this.$refs.BookForm.reset();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onReset() {
      this.title = null;
      this.author = null;
      this.year = null;
    },
  },
});
</script>
