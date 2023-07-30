<template>
  <client-only>
    <div>
      <v-card-title>Bài viết mới</v-card-title>
      <div id="body-admin">
        <form @submit.prevent="create()">
          <TopicForm label="Bài viết mới"></TopicForm>
          <div class="text-right">
            <v-btn type="submit" color="" to="/admin/topics"> Trở Về </v-btn>
            <v-btn type="submit" color="primary"> Thêm mới </v-btn>
          </div>
        </form>
      </div>
    </div>
  </client-only>
</template>

<script>
import { mapActions, mapState } from "vuex";
import TopicForm from "@/components/pages/admin/topics/form/TopicForm.vue";

export default {
  components: { TopicForm },
  layout: "adminDev",

  data() {
    return {
      input: {},
    };
  },

  mounted() {
    this.newTopic();
  },
  methods: {
    ...mapActions("admin/topics", ["createTopic", "newTopic"]),

    async create() {
      try {
        console.log("create");
        await this.createTopic();
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
