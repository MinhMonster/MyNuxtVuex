<template>
  <client-only>
    <div>
      <div id="body-admin">
        <form @submit.prevent="edit()">
          <TopicForm v-if="topic" label="Sửa bài viết"></TopicForm>
          <br />
          <div class="d-flex">
            <v-btn @click="onDelete()" color="red"> Xóa</v-btn>
            <v-spacer />
            <div class="text-right">
              <v-btn type="submit" color="" to="/admin/topics"> Trở Về </v-btn>
              <v-btn type="submit" color="primary"> Sửa </v-btn>
            </div>
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
  name: "EditTopic",
  props: {},
  computed: {
    ...mapState("admin/topics", ["topic"]),

    topicId() {
      return this.$route.params.id;
    },
  },
  async mounted() {
    await this.fetchTopic(this.topicId);
  },
  methods: {
    ...mapActions("admin/topics", ["fetchTopic", "updateTopic"]),
    async edit() {
      try {
        console.log("edit");
        await this.updateTopic(this.topicId);
      } catch (e) {
        console.log(e);
      }
    },

    async onDelete() {
      this.$swal
        .fire({
          title: `Bạn muốn xóa ID: ${this.topicId} ?`,
          text: "",
          icon: "question",
          type: "warning",
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Xóa",
          cancelButtonText: "Hủy",
          timer: 5000,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            try {
              const res =
                await this.$repositories.adminGameNinjas.destroyAccountNinja({
                  params: {
                    id: this.topicId,
                  },
                });
              if (res.data.code === 200) {
                this.$toasted.success(res.data.message);
                this.$router.push(`/admin/topics`);
              }
            } catch (e) {
              console.log(e);
            }
          }
        });
    },
  },
};
</script>
