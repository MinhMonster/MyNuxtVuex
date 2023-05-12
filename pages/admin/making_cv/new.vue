<template>
  <client-only>
    <div class="making-cv">
      <h1>Making CV</h1>
      <draggable
        v-model="data.layouts"
        ghost-class="ghost"
        @change="changeByDrag"
        handle=".handle-layout"
        tag="div"
        v-if="data"
        class="cv-info"
      >
        <div
          v-for="(layout, index) in data.layouts"
          :key="index"
          class="layout"
        >
          <b-row
            v-for="(section, index) in layout.sections"
            :key="index"
            class="section"
          >
            <button class="handle-layout btn btn-primary">
              <i class="mdi mdi-cursor-move"></i>
            </button>
            <b-col cols="12" v-if="layout.cols == '111'">
              <b-row v-if="section.type == 'user'" class="user">
                <b-col cols="8">
                  <div class="user-name">
                    <b-form-input
                      v-model="section.title"
                      placeholder="Enter your name"
                    ></b-form-input>
                  </div>
                  <div class="user-role-apply">
                    <b-form-input
                      v-model="section.role_apply"
                      placeholder=" Enter your role apply"
                    ></b-form-input>
                  </div>
                  <div class="user-job-goals">
                    <b-form-textarea
                      v-model="section.job_goals"
                      rows="3"
                      max-rows="6"
                      placeholder=" Mục tiêu nghề nghiệp của bạn, bao gồm mục tiêu ngắn hạn và dài hạn"
                    ></b-form-textarea>
                  </div>
                </b-col>
                <b-col cols="4">
                  <div class="user-avatar">
                    <i class="mdi mdi-account-box"></i>
                  </div>
                </b-col>
              </b-row>

              <b-row
                v-if="section.type == 'work_experience'"
                class="work-experience"
              >
                <b-col cols="12">
                  <div class="work-experience-name">
                    <b-form-input
                      v-model="section.title"
                      placeholder="Enter your name"
                    ></b-form-input>
                  </div>
                  <draggable
                    v-model="section.attributes"
                    ghost-class="ghost"
                    @change="changeByDrag"
                    handle=".handle-attribute"
                    tag="div"
                    v-if="section.attributes.length"
                    class="attributes-info"
                  >
                    <div
                      v-for="(attribute, index) in section.attributes"
                      :key="index"
                      class="section-attribute"
                    >
                      <button class="handle-attribute btn btn-primary">
                        <i class="mdi mdi-cursor-move"></i>
                      </button>
                      <div class="attribute">
                        <b-row>
                          <b-col cols="2">
                            <b-form-input
                              v-model="attribute.start_at"
                              placeholder="Start At"
                            ></b-form-input>
                          </b-col>
                          <b-col cols="2">
                            <b-form-input
                              v-model="attribute.end_at"
                              placeholder="End At"
                            ></b-form-input>
                          </b-col>
                          <b-col cols="8">
                            <b-form-input
                              v-model="attribute.role"
                              placeholder="Role"
                            ></b-form-input>
                          </b-col>
                          <b-col cols="4">
                            <b-form-input
                              v-model="attribute.company"
                              placeholder="Company"
                            ></b-form-input>
                          </b-col>

                          <b-col cols="8">
                            <b-form-input
                              v-model="attribute.description"
                              placeholder="Description"
                            ></b-form-input>
                          </b-col>
                        </b-row>
                      </div>
                    </div>
                  </draggable>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </div>
      </draggable>
    </div>
  </client-only>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
import draggable from "vuedraggable";

export default {
  layout: "adminDev",
  components: { draggable },

  name: "MakingCv",
  data() {
    return {
      data: {
        id: "",
        name: "Name Template",
        job_goals: "",
        layout: "",
        style: "",
        layouts: [
          {
            cols: "111",
            sections: [
              {
                id: "",
                title: "User Name",
                role_apply: "",
                avatar: "",
                type: "user",
                style: "",
                layout: "1",
                template_id: "",
                position: "",
                attributes: [],
              },
            ],
          },
          {
            cols: "111",
            sections: [
              {
                id: "",
                title: "work experience",
                type: "work_experience",
                style: "",
                layout: "1",
                template_id: "",
                position: "",
                attributes: [
                  {
                    id: "",
                    type: "",
                    company: "company 1",
                    start_at: "",
                    end_at: "",
                    role: "",
                    description: "",
                    placeholder: "placeholder Att 1",
                    style: "",
                    section_id: "",
                    position: "",
                  },
                  {
                    id: "",
                    type: "",
                    company: "company 2",
                    start_at: "",
                    end_at: "",
                    role: "",
                    description: "",
                    placeholder: "placeholder Att 1",
                    style: "",
                    section_id: "",
                    position: "",
                  },
                ],
              },
            ],
          },
        ],
      },
    };
  },
  async mounted() {},
  computed: {
    ...mapFields("admin/game/ninjas", ["ninjas"]),
  },
  methods: {
    ...mapActions("admin/game/ninjas", ["fetchAccountNinjas"]),
    changeByDrag(event) {
      console.log(event);
    },
  },
};
</script>
<style lang="scss" scoped>
.making-cv {
  background: #a4a4a4;
  padding: 30px;
}
.cv-info {
  border: 1px solid #fff;
  padding: 20px;
  .user {
    .user-name input {
      font-size: 25px;
    }
    .user-avatar {
      display: flex;
      justify-content: center;
      align-items: center;
      .mdi-account-box::before {
        content: "\F0006";
        font-size: 150px;
        line-height: 150px;
        padding: 0px;
      }
    }
  }
  .work-experience {
    .work-experience-name input {
      font-size: 25px;
    }
  }
}
.layout,
.section-attribute {
  position: relative;
  border: 1px solid #fff;
  margin-bottom: 20px;
  padding: 5px;
}
.handle-layout,
.handle-attribute {
  position: absolute;
  height: 30px;
  width: 30px;
  top: -14px;
  right: -14px;
  border-radius: 5px;
  cursor: move;
  z-index: 2;
}
</style>