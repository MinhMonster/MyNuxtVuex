<template>
  <client-only>
    <div>
      <div id="body-admin">
        <v-card-title>Bài viết mới</v-card-title>
        <form @submit.prevent="edit()">
          <TopicForm v-if="topic"></TopicForm>
          <br />
          <div class="d-flex">
            <v-btn @click="onDelete()" color="red"> Xóa</v-btn>
            <v-spacer />
            <div class="text-right">
              <v-btn type="submit" color="" to="/admin/game/ninjas">
                Trở Về
              </v-btn>
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
    topicForm() {
      if (this.topic) {
        return cloneDeep(this.topic);
      } else {
        this.$router.push("/admin/topics");
      }
    },
  },
  async mounted() {
    await this.fetchTopic(this.topicId);
  },
  methods: {
    ...mapActions("admin/topics", ["fetchTopic", "updateTopic"]),
    async edit() {
      try {
        console.log("edit")
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
          // closeOnConfirm: false,
          // closeOnCancel: false
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
                this.$router.push(`/admin/game/ninjas`);
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
