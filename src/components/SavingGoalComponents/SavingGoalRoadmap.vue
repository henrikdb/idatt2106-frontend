<script lang="ts">
import {CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip} from 'chart.js'
import {Line} from 'vue-chartjs'
import type {ChallengeDTO, GoalDTO, MarkChallengeDTO} from "@/api";
import {GoalService} from '@/api'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)


export default {
  components: {
    Line
  },
  data() {
    return {
      image: 'https://th.bing.com/th/id/OIG3.NMbdxmKYKVnxYGLOa0Z0?w=1024&h=1024&rs=1&pid=ImgDetMain' as string,
      altImage: 'https://th.bing.com/th/id/OIG4.gVWUC.rwCb8faTNx31yU?w=1024&h=1024&rs=1&pid=ImgDetMain' as string,
      title: 'Spain trip' as string,
      bluePanelMaxHeight: 'auto' as string,
      roadmapSelected: true as boolean,
      statsSelected: false as boolean,
      chartData: {
        labels: [1, 2, 3, 4, 5, 6, '7'],
        datasets: [
          {
            label: this.selectedGoal.name,
            backgroundColor: '#003A58',
            data: [11, 24, 30, 47, 53, 62, 79]
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          y: {
            min: 0,
            max: this.selectedGoal.targetAmount
          }
        }
      },
      newPrice: 0,
      savedSoFar: 0 as number,
      currentChallengeIndex: 0,
    };
  },
  async mounted() {
    setTimeout(() => {
      this.findCurrentChallenge()
      this.disableAllChecksThatNotCurrent()
      this.togglePanel(this.selectedGoal.challenges[this.currentChallengeIndex])
      this.calculateSavedSoFar()
      this.onLoadDisableChecks(this.selectedGoal)
      this.onLoadAddDataToGraph(this.selectedGoal)
    }, 500);
  },
  computed: {
    computeImageFilter() {
      return (challenge: ChallengeDTO) => {
        return challenge ? 'none' : 'grayscale(100%)';
      };
    }
  },
  props: {
    selectedGoal: {
      type: Object,
      default: null,
    },
  },
  methods: {
    togglePanel(step: any) {
      if (step.showPanel) {
        step.showPanel = false;
      } else {
        this.selectedGoal.challenges.forEach((s: any) => (s.showPanel = false));
        step.showPanel = true;
        this.scrollToPanel(step);
      }
    },

    scrollToPanel(step: any) {
      if (step.showPanel) {
        this.$nextTick(() => {
          const panel = document.getElementById(`panel-${this.selectedGoal.challenges.indexOf(step)}`);
          if (panel) {
            panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        });
      }
    },

    changeDisplay() {
      if (this.roadmapSelected) {
        this.roadmapSelected = false
        this.statsSelected = true
      } else {
        this.roadmapSelected = true
        this.statsSelected = false
        setTimeout(() => {
          this.onLoadDisableChecks(this.selectedGoal)
          this.disableAllChecksThatNotCurrent()
        }, 100);
      }
    },

    convertTemplateTextToChallengeText(challenge: ChallengeDTO) {
      let challengeText: any
      challengeText = challenge.challengeTemplate?.text
      challengeText = challengeText.replace('{unit_amount}', challenge.challengeTemplate?.amount?.toString())
      challengeText = challengeText.replace('{checkDays}', challenge.checkDays?.toString())
      challengeText = challengeText.replace('{totalDays}', challenge.totalDays?.toString())
      let totalAmount: any
      if (challenge.checkDays !== undefined && challenge.amount !== undefined) {
        totalAmount = challenge.checkDays * challenge.amount;
      } else {
        // Handle the case when challenge.checkDays or challenge.amount is undefined
      }
      challengeText = challengeText.replace('{total_amount}', totalAmount.toString())
      challengeText = challengeText.replace('{amount}', challenge.amount?.toString())
      return challengeText
    },

    calculateTotalAmountFromChallenges() {
      let totalAmountFromChallenges = 0
      for (const challenge of this.selectedGoal.challenges) {
        totalAmountFromChallenges += challenge.amount
      }
      return totalAmountFromChallenges
    },

    async handleCheckboxClick(challenge: ChallengeDTO, index: number, amount: number) {

      this.lockCheckBox(challenge, index)
      const markChallengePayload: MarkChallengeDTO = {
        id: challenge.id,
        day: index,
        amount: amount,
      };

      try {
        await GoalService.updateChallenge({ requestBody: markChallengePayload });
        const today: Date = new Date();
        const dateString: string = today.toISOString().split('T')[0]; // Extract YYYY-MM-DD part

        if (challenge.progressList) {
          challenge.progressList.push({ day: index, amount: amount, completedAt: dateString })
        }

        this.addDataToChart(amount, dateString);
        this.calculateSavedSoFar();
      } catch (error: any) {
        console.log(error.message);
      }
    },

    lockCheckBox(challenge: ChallengeDTO, index: number) {
      const checkboxId = challenge.id + 'inlineCheckbox' + index
      const checkbox = document.getElementById(checkboxId) as HTMLInputElement | null;
      if (checkbox) {
        // Disable the checkbox
        checkbox.disabled = true;
      }
    },

    onLoadDisableChecks(goal: GoalDTO) {
      (goal.challenges || []).forEach((challenge: any) => {
        challenge.progressList.forEach((progress: any) => {
          // Assuming 'amount' is the property you want to add from progressList
          const checkBoxId = challenge.id + 'inlineCheckbox' + progress.day
          const checkbox = document.getElementById(checkBoxId) as HTMLInputElement | null;
          if (checkbox) {
            // Disable the checkbox
            checkbox.checked = true;
            checkbox.disabled = true;
          }
        });
      });
    },

    onLoadAddDataToGraph(goal: GoalDTO) {
      (goal.challenges || []).forEach((challenge: any) => {
        challenge.progressList.forEach((progress: any) => {
          this.addDataToChart(progress.amount, progress.completedAt);
        });
      });
    },

    addDataToChart(data: number, date: string) {
      // Find the last dataset
      const lastDataset = this.chartData.datasets[this.chartData.datasets.length - 1];

      // Calculate the new label based on the last label
      const newLabel = date.split('T')[0];

      // Calculate the new data point based on the last data point
      const lastDataPoint = lastDataset.data[lastDataset.data.length - 1];
      const newDataPoint = lastDataPoint + data;

      // Add the new label and data point to the chart data
      this.chartData.labels.push(newLabel);
      lastDataset.data.push(newDataPoint);
    },

    calculateSavedSoFar() {
      this.savedSoFar = 0; // Reset savedSoFar before calculating again
      this.selectedGoal.challenges.forEach((challenge: ChallengeDTO) => {
        // Check if progressList exists before accessing its elements
        if (challenge.progressList) {
          challenge.progressList.forEach((progress: any) => {
            // Assuming 'amount' is the property you want to add from progressList
            this.savedSoFar += progress.amount;
          });
        }
      });
    },

    findCurrentChallenge() {
      const today: Date = new Date();
      this.selectedGoal.challenges.forEach((challenge: ChallengeDTO, index: number) => {
        const startDate: Date = new Date(challenge.startDate as string);
        const endDate: Date = new Date(challenge.endDate as string);

        if (today >= startDate && today <= endDate) {
          this.currentChallengeIndex = index
        }
      })
    },

    disableAllChecksThatNotCurrent() {
      this.selectedGoal.challenges.forEach((challenge: ChallengeDTO, index: number) => {
        if (index !== this.currentChallengeIndex && challenge.checkDays !== undefined) {
          for (let i = 1; i < challenge.checkDays + 1; i++) {
            this.lockCheckBox(challenge, i)
          }
        }
      })
    }
  },
};
</script>

<template>
  <div class="col-lg-8">
    <div class="SavingGoalTitle text-center">
      {{selectedGoal.name}}
      <br>
      <p class="d-inline-flex gap-1">
        <button @click="changeDisplay" class="btn btn-primary" type="button" style="font-size: 25px;">
          <div v-if="roadmapSelected">
            Se statistikk
          </div>
          <div v-else>
            Se sparesti
          </div>
        </button>
      </p>
    </div>
    <div v-if="roadmapSelected">
      <ul class="timeline">
        <li v-for="(challenge, index) in selectedGoal.challenges" :key="index" :class="{ 'timeline-inverted': index % 2 !== 0 }">
          <div class="timeline-image z-1" @click="togglePanel(challenge)">
            <img class="circular-image" :src="challenge.showPanel ? altImage : image" :style="{ filter: computeImageFilter(challenge) }" alt="">
          </div>
          <div class="timeline-panel z-3" :id="'panel-' + index" v-show="challenge.showPanel">
            <div class="timeline-heading">
              <h4>Utfordring {{ index +1 }}</h4>
              <h4 class="subheading">{{convertTemplateTextToChallengeText(challenge)}}</h4>
            </div>
            <div class="timeline-body">
              <br>
              <p>
                Pris per enhet: {{challenge.challengeTemplate.amount}} kr <img src="../../assets/icons/edit-button.svg" alt="editIcon" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="exampleModal">
              </p>
              <br>
              <div class="collapse" id="collapseExample" style="background-color: white; padding: 12px; border-radius: 5px">
                <div class="card card-body">
                  <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Ny pris</span>
                    <input v-model="newPrice" type="number" class="form-control" placeholder="Pris i kr" aria-label="newPrice" aria-describedby="basic-addon1" required>
                  </div>
                </div>
                <br>
                <button class="btn btn-success">Bekreft endring</button>
              </div>
              <br>
              <div class="progress">
                <div class="progress-bar" role="progressbar" :style="{ width: challenge.percentFinished + '%' }" :aria-valuenow="challenge.percentFinished" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <br>
              <div class="checkbox-row">
                <div class="form-check form-check-inline" v-for="(day, index) in challenge.checkDays" :key="index">
                  <input class="form-check-input" @click="handleCheckboxClick(challenge, index+1, challenge.challengeTemplate.amount)" type="checkbox" :id="challenge.id + 'inlineCheckbox' + (index + 1)" :value="day" :disabled="day.checked">
                  <label class="form-check-label" style="color:white;" :for="'inlineCheckbox' + (index + 1)">{{ day }}</label>
                </div>
              </div>
            </div>
          </div>
          <div class="line" v-if="index < selectedGoal.challenges.length - 1"></div>
        </li>
      </ul>
    </div>
    <div v-else>
      <h3 style="font-weight: 600;">Du har så langt spart {{ savedSoFar }} kr</h3>
      <h3 style="font-weight: 600;">Ditt penge mål er: {{selectedGoal.targetAmount}} kr</h3>
      <h3 style="font-weight: 600;">Utfordringene i denne sparestien vil spare deg {{ calculateTotalAmountFromChallenges() }} kr</h3>
      <Line ref="chart" :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<style scoped>
.col-lg-8 {
  width: 58%;
  margin-bottom: 20px;
}

.SavingGoalTitle {
  font-weight: 600;
  font-size: 45px;
  margin-top: 20px;
  margin-bottom:40px;
  padding-bottom: 10px;
  color: white;
  border-radius: 1em;
  background-color: #003A58;
}

.timeline {
  position: relative;
  padding:4px 0 0 0;
  margin-top:22px;
  list-style: none;
}

.timeline>li:nth-child(even) {
  position: relative;
  margin-bottom: 50px;
  height: 100px;
  right:-100px;
}

.timeline>li:nth-child(odd) {
  position: relative;
  margin-bottom: 50px;
  height: 100px;
  left:-100px;
}

.timeline>li:before,
.timeline>li:after {
  content: " ";
  display: table;
}

.timeline>li:after {
  clear: both;
  min-height: 170px;
}

.timeline > li .timeline-panel {
  position: relative;
  float: left;
  width: 31%;
  padding: 0 20px 20px 30px;
  text-align: right;
  background-color: #003A58;
  border-radius: 1em;
  margin-left: 110px;
}

.timeline>li .timeline-panel:before {
  right: auto;
  left: -15px;
  border-right-width: 15px;
  border-left-width: 0;
}

.timeline>li .timeline-panel:after {
  right: auto;
  left: -14px;
  border-right-width: 14px;
  border-left-width: 0;
}

.timeline>li .timeline-image {
  z-index: 100;
  position: absolute;
  left: 50%;
  border: 7px solid #003A58;
  border-radius: 100%;
  background-color: #00ffff;
  box-shadow: 0 0 5px #00e1ff;
  width: 100px;
  height: 100px;
  margin-left: -50px;
  cursor:pointer;
}

.timeline>li .timeline-image h4 {
  margin-top: 12px;
  font-size: 10px;
  line-height: 14px;
}

.timeline>li.timeline-inverted>.timeline-panel {
  float: right;
  padding: 0 30px 20px 20px;
  text-align: left;
  margin-right: 110px;
}

.timeline>li.timeline-inverted>.timeline-panel:before {
  right: auto;
  left: -15px;
  border-right-width: 15px;
  border-left-width: 0;
}

.timeline>li.timeline-inverted>.timeline-panel:after {
  right: auto;
  left: -14px;
  border-right-width: 14px;
  border-left-width: 0;
}

.timeline>li:last-child {
  margin-bottom: 0;
}

.timeline .timeline-heading h4 {
  margin-top:22px;
  margin-bottom: 4px;
  padding:0;
  color: white;
  font-weight:600;
}

.timeline .timeline-heading h4.subheading {
  margin:0;
  padding:0;
  text-transform: none;
  font-size:18px;
  color:white;
}

.timeline .timeline-body>p,
.timeline .timeline-body>ul {
  margin-bottom: 0;
  color:white;
}
/*Style for even div.line*/
.timeline>li:nth-child(odd) .line:before {
  content: "";
  position: absolute;
  top: 30px;
  bottom: 0;
  left: 700px;
  width: 30px;
  height:320px;
  background-color: grey;
  -ms-transform: rotate(-44deg); /* IE 9 */
  -webkit-transform: rotate(-44deg); /* Safari */
  transform: rotate(-44deg);
  border: dotted white 3px;
  /**box-shadow: 0 0 5px #00FF00;**/
  display:none;
}
/*Style for odd div.line*/
.timeline>li:nth-child(even) .line:before  {
  content: "";
  position: absolute;
  top: 30px;
  bottom: 0;
  left: 480px;
  width: 30px;
  height:320px;
  background-color: grey;
  -ms-transform: rotate(44deg); /* IE 9 */
  -webkit-transform: rotate(44deg); /* Safari */
  transform: rotate(44deg);
  border: dotted white 3px;
  /*box-shadow: 0 0 5px #00FF00;*/
  display:none;
}
/* Medium Devices, .visible-md-* */
@media (min-width: 992px) and (max-width: 1199px) {
  .col-lg-8 {
    width: 100%;
  }

  .timeline > li:nth-child(even) {
    margin-bottom: 0;
    min-height: 0;
    right: 0;
  }
  .timeline > li:nth-child(odd) {
    margin-bottom: 0;
    min-height: 0;
    left: 0;
  }
  .timeline>li:nth-child(even) .timeline-image {
    left: 0;
    margin-left: 0;
  }
  .timeline>li:nth-child(odd) .timeline-image {
    left: 690px;
    margin-left: 0;
  }
  .timeline > li:nth-child(even) .timeline-panel {
    width: 76%;
    padding: 0 0 20px 0;
    text-align: left;
  }
  .timeline > li:nth-child(odd) .timeline-panel {
    width: 70%;
    padding: 0 0 20px 0;
    text-align: right;
  }
  .timeline > li .line {
    display: none;
  }
}
/* Small Devices, Tablets */
@media (min-width: 768px) and (max-width: 991px) {
  .timeline > li:nth-child(even) {
    margin-bottom: 0;
    min-height: 0;
    right: 0;
  }
  .timeline > li:nth-child(odd) {
    margin-bottom: 0;
    min-height: 0;
    left: 0;
  }
  .timeline>li:nth-child(even) .timeline-image {
    left: 0;
    margin-left: 0;
  }
  .timeline>li:nth-child(odd) .timeline-image {
    left: 520px;
    margin-left: 0;
  }
  .timeline > li:nth-child(even) .timeline-panel {
    width: 70%;
    padding: 0 0 20px 0;
    text-align: left;
  }
  .timeline > li:nth-child(odd) .timeline-panel {
    width: 70%;
    padding: 0 0 20px 0;
    text-align: right;
  }
  .timeline > li .line {
    display: none;
  }
}
/* Custom, iPhone Retina */
@media only screen and (max-width: 767px) {
  .timeline > li:nth-child(even) {
    margin-bottom: 0;
    min-height: 0;
    right: 0;
  }
  .timeline > li:nth-child(odd) {
    margin-bottom: 0;
    min-height: 0;
    left: 0;
  }
  .timeline>li .timeline-image {
    position: static;
    width: 150px;
    height: 150px;
    margin-bottom:0;
  }
  .timeline>li:nth-child(even) .timeline-image {
    left: 0;
    margin-left: 0;
  }
  .timeline>li:nth-child(odd) .timeline-image {
    float:right;
    left: 0;
    margin-left:0;
  }
  .timeline > li:nth-child(even) .timeline-panel {
    width: 100%;
    padding: 0 0 20px 14px;
  }
  .timeline > li:nth-child(odd) .timeline-panel {
    width: 100%;
    padding: 0 14px 20px 0;
  }
  .timeline > li .line {
    display: none;
  }
}

/* Additional styles for inverted timeline panels */
.timeline > li.timeline-inverted:nth-child(even) .timeline-panel {
  float: right;
  padding: 0 30px 20px 20px;
  text-align: left;
}

.timeline > li.timeline-inverted:nth-child(odd) .timeline-panel {
  float: left;
  padding: 0 20px 20px 30px;
  text-align: right;
}

.timeline > li.timeline-inverted:nth-child(even) .timeline-panel:before,
.timeline > li.timeline-inverted:nth-child(even) .timeline-panel:after {
  right: auto;
  left: -15px;
  border-right-width: 15px;
  border-left-width: 0;
}

.timeline > li.timeline-inverted:nth-child(odd) .timeline-panel:before,
.timeline > li.timeline-inverted:nth-child(odd) .timeline-panel:after {
  right: auto;
  left: -14px;
  border-right-width: 14px;
  border-left-width: 0;
}

.circular-image {
  border-radius: 50%;
  max-width: 100%;
  height: auto;
}

.checkbox-row {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 12px; /* Adjust as needed */
  text-align: left !important;
}

.form-check {
  flex: 0 0 calc(25% - 10px); /* 20% width for each checkbox, adjust margin accordingly */
  margin-right: 10px; /* Adjust as needed */
}
</style>