<script lang="ts">
interface Step {
  title: string;
  showPanel: boolean;
  description: string;
  percentFinished: number;
  unFinished: boolean;
}
export default {
  data() {
    return {
      image: 'https://th.bing.com/th/id/OIG3.NMbdxmKYKVnxYGLOa0Z0?w=1024&h=1024&rs=1&pid=ImgDetMain' as string,
      altImage: 'https://th.bing.com/th/id/OIG4.gVWUC.rwCb8faTNx31yU?w=1024&h=1024&rs=1&pid=ImgDetMain' as string,
      title: 'Spain trip' as string,
      //This will be changed to info gathered from backend
      steps: [
        { title: 'Challenge 1', showPanel: false, description: 'Save 50kr on coffee in 3 days', percentFinished: 22, unFinished: false },
        { title: 'Challenge 2', showPanel: false, description: 'Save 500kr on food in 7 days', percentFinished: 73, unFinished: false },
        { title: 'Challenge 3', showPanel: false, description: 'Save 350kr on clothes in 5 days', percentFinished: 50, unFinished: true },
        { title: 'Challenge 4', showPanel: false, description: 'Save 150kr on coffee in 4 days', percentFinished: 10, unFinished: true },
        { title: 'Challenge 5', showPanel: false, description: 'Save 50kr on coffee in 3 days', percentFinished: 90, unFinished: true }
      ]
      ,
      bluePanelMaxHeight: 'auto' as string
    };
  },
  mounted() {
    setTimeout(() => {
      this.togglePanel(this.steps[2]);
    }, 500);
    
  },
  computed: {
    computeImageFilter() {
      return (step: Step) => {
        return step.unFinished ? 'none' : 'grayscale(100%)';
      };
    }
  },
  methods: {
    togglePanel(step: Step) {
      if (step.showPanel) {
        step.showPanel = false;
      } else {
        this.steps.forEach((s) => (s.showPanel = false));
        step.showPanel = true;
        this.scrollToPanel(step);
      }
    },
    scrollToPanel(step: Step) {
      if (step.showPanel) {
        this.$nextTick(() => {
          const panel = document.getElementById(`panel-${this.steps.indexOf(step)}`);
          if (panel) {
            panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        });
      }
    },
  },
};
</script>

<template>
  <div class="col-lg-8">
    <div class="SavingGoalTitle text-center">
      {{title}}
      <br>
      <p class="d-inline-flex gap-1">
        <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" style="font-size: 25px;">
          See more info
        </button>
      </p>
      <div class="collapse" id="collapseExample">
        <div class="card card-body bg-primary mx-auto" style="width: 80%;">
          Total saved: 20kr
        </div>
      </div>
    </div>
    <ul class="timeline">
      <li v-for="(step, index) in steps" :key="index" :class="{ 'timeline-inverted': index % 2 !== 0 }">
          <div class="timeline-image z-1" @click="togglePanel(step)">
            <img class="circular-image" :src="step.showPanel ? altImage : image" :style="{ filter: computeImageFilter(step) }" alt="">
          </div>
        <div class="timeline-panel z-3" :id="'panel-' + index" v-show="step.showPanel">
          <div class="timeline-heading">
            <h4>{{ step.title }}</h4>
            <h4 class="subheading">{{step.description}}</h4>
          </div>
          <div class="timeline-body">
            <br>
            <p class="">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <br>
            <div class="progress">
              <div class="progress-bar" role="progressbar" :style="{ width: step.percentFinished + '%' }" :aria-valuenow="step.percentFinished" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <br>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">
              <label class="form-check-label" style="color:white;" for="inlineCheckbox1">Day 1</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2">
              <label class="form-check-label" style="color:white;" for="inlineCheckbox1">Day 2</label>
            </div>
          </div>
        </div>
        <div class="line" v-if="index < steps.length - 1"></div>
      </li>
    </ul>
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
  background-color: #0A58CA;
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
  width: 41%;
  padding: 0 20px 20px 30px;
  text-align: right;
  background-color: #0A58CA;
  border-radius: 1em;
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
  border: 7px solid #001664;
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
</style>