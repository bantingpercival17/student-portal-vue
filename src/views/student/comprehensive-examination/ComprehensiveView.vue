<template>
  <div v-if="isLoading">
    <h3>LOADING</h3>
  </div>
  <div v-else>
    <p class="display-6 fw-bolder text-primary">CONFERMENT OF DEGREE</p>
    <div v-if="examinationData">
      <div v-if="checkSchedule(examinationData)" class="content-inner">
        <div class="card m-2" v-for="(item, index) in examinationList" :key="index">
          <router-link
            :to="{
              name: 'student-layout.comprehesive-examination-view',
              query: { v: encrypt(item.id) },
            }"
          >
            <div class="card-body p-3">
              <div class="float-end">
                <div v-html="resultStyle(item.examinee_result)"></div>
              </div>
              <p class="text-muted fw-bolder">
                {{ item.function }}
              </p>
              <p for="" class="fw-bolder text-primary h4">
                {{ item.competence_code }}: {{ item.competence_name }}
              </p>

              <div class="examination-status row">
                <div class="col-md">
                  <div class="content">
                    <small class="text-muted fw-bolder">REMAINING ATTEMPS : </small>
                    <span class="badge bg-primary">
                      {{ remainingAttemps(item.examinee_details) }}
                    </span>
                  </div>
                  <div class="content">
                    <small class="text-muted fw-bolder">GRADE REPORTED : </small>
                    <span class="badge bg-primary">
                      {{ resultCompetence(item.examinee_result) }}
                    </span>
                  </div>
                </div>
                <div class="col-md">
                  <small class="text-muted fw-bolder">ATTEMPS DETAILS: </small>
                  <div
                    class=""
                    v-for="(data, index) in item.examinee_details"
                    :key="index"
                  >
                    <span v-if="index != 0" class="badge bg-secondary">
                      {{ data.result }}
                    </span>
                    <span v-else class="badge bg-primary">
                      {{ data.result }}
                    </span>
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div v-else class="examination-date-details content-inner">
        <div class="card">
          <div class="card-body">
            <p class="fw-bolder text-primary">EXAMINATION SCHEDULED</p>
            <p>
              Your entrance examination is scheduled on
              <b>{{ scheduledFormat(examinationData) }}</b
              >.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="examination-date-details content-inner">
      <p class="text-info fw-bolder">FOR SCHEDULING OF COMPREHESIVE EXAMINATION</p>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import {
  GET_USER_TOKEN,
  IS_USER_AUTHENTICATE_GETTER,
  SHOW_LOADING_MUTATION,
} from "@/store/storeConstants";
import {
  SUCCESS_ALERT,
  INFO_ALERT,
  ERROR_ALERT,
  ENCRYPT_DATA,
} from "@/store/storeAlertConstants.js";
import { mapGetters, mapMutations, mapActions } from "vuex";
import axios from "axios";
export default {
  name: "Comprehensive",
  data() {
    return {
      isLoading: true,
      examinationList: [],
      examinationData: false,
    };
  },
  computed: {
    ...mapGetters("auth", {
      token: GET_USER_TOKEN,
      isAuth: IS_USER_AUTHENTICATE_GETTER,
    }),
  },
  mounted() {
    this.loadComprehensive();
  },
  methods: {
    ...mapActions("alert", {
      successAlert: SUCCESS_ALERT,
      infoAlert: INFO_ALERT,
      errorAlert: ERROR_ALERT,
      encrypt: ENCRYPT_DATA,
    }),
    ...mapMutations({
      showLoading: SHOW_LOADING_MUTATION,
    }),
    loadComprehensive() {
      axios
        .get("/student/comprehensive-examination", {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        })
        .then((response) => {
          this.isLoading = false;
          this.examinationList = response.data.examination;
          this.examinationData = response.data.comprehensive_details;
        })
        .catch((error) => {
          console.log(error);
          this.errorAlert(error);
          this.isLoading = false;
        });
    },
    encrypt(data) {
      return btoa(data);
    },
    checkSchedule(data) {
      const scheduled = data.examination_scheduled.scheduled + " 09:00:00";
      const currentDate = new Date(); // This gives you the current date and time.
      const examinationDate = new Date(scheduled); // Replace 'examinationDateFromDatabase' with your actual date.
      if (currentDate < examinationDate) {
        return false;
        // console.log("The examination is in the future.");
      } else if (currentDate === examinationDate) {
        return true;
      } else {
        return true;
      }
    },
    scheduledFormat(data) {
      const scheduled = data.examination_scheduled.scheduled + " 09:00:00";
      const date = new Date(scheduled);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };

      const formatter = new Intl.DateTimeFormat("en-US", options);
      return formatter.format(date);
      /* return this.formatDate(date) */
    },
    remainingAttemps(data) {
      const attemps = this.examinationData.examination_scheduled.attemps;
      const remaining = attemps - data.length;
      if (remaining !== 0) {
        return remaining + " more attemps";
      }
      return "no more attemps";
    },
    resultCompetence(data) {
      return data ? data.result : "no attemps";
    },
    resultStyle(data) {
      let htmlTag = "";
      if (data && data.result) {
        const numericValue = parseFloat(data.result.replace("%", ""));
        const result = numericValue / 100;
        console.log(numericValue);
        if (numericValue >= 60) {
          htmlTag = '<span class="badge bg-primary">PASSED</span>';
        } else {
          htmlTag = '<span class="badge bg-danger">FAILED</span>';
        }
      } else {
        htmlTag = '<span class="badge bg-info">TAKE EXAM</span>';
      }
      return htmlTag;
    },
  },
};
</script>
