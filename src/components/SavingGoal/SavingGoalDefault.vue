<script setup lang="ts">

</script>

<template>
  <section id="hero" class="hero section">
    <div class="col-lg-8">
      <div class="container text-center">
        <div class="d-flex flex-column justify-content-center align-items-center">
          <h1 class="">Velkommen til <span>SpareSti</span></h1>
          <br>
          <p class="">Kom i økonomisk form: Ta på deg våre spareutfordringer!<br></p>
          <img src="../../assets/savingPigRun.png" alt="SpareSti-logo">
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.col-lg-8 {
  width: 100%;
  margin-top: 50px;
  padding-right: 56px;
  padding-bottom: 28px;
}

.hero {
  width: 63%;
  min-height: 70vh;
  overflow: hidden;
}

.hero img {
  inset: 0;
  display: block;
  width: 60%;
  height: 60%;
  object-fit: cover;
  z-index: 1;
}

.hero .container {
  position: relative;
  z-index: 3;
}

.hero h1 {
  margin: 0;
  font-size: 56px;
  font-weight: 700;
  line-height: 56px;
}

.hero h1 span {
  color: white;
  background-color: #003A58;
  padding: 4px 24px 14px 24px;
  border-radius: 6px;
}


.hero p {
  color: #003A58;
  margin: 5px 0 30px 0;
  font-size: 28px;
  font-weight: 400;
}

.hero .btn-watch-video i {
  color: #003A58;
  font-size: 32px;
  transition: 0.3s;
  line-height: 0;
  margin-right: 8px;
}

.hero .btn-watch-video:hover i {
  color: #003A58;
}

@media (max-width: 640px) {
  .hero h1 {
    font-size: 28px;
    line-height: 36px;
  }

  .hero p {
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 30px;
  }

  .hero img {
    inset: 0;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
  }
}
</style>