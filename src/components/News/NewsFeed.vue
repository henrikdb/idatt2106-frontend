<script lang="ts">

/**
 * Interface representing a news article.
 */
interface news {
  urlToImage: string;
  title: string;
  description: string;
  url: string;
}

/**
 * Component to fetch and display finance news.
 */
export default {
  data() {
    return {
      articles: [] as news[]
    };
  },
  mounted() {
    this.fetchFinanceNews();
    // Call fetchFinanceNews() every 5 minutes (300,000 milliseconds)
    // Done so the user does not need to refresh for news to be updated
    // Might remove for consistent reading
    setInterval(this.fetchFinanceNews, 300000);
  },
  methods: {
    /**
     * Fetches finance news articles from the NewsAPI.
     */
    async fetchFinanceNews() {
      try {
        const response = await fetch(
            'https://newsapi.org/v2/everything?q=saving%20money&pageSize=10&apiKey=f092756b3b6b41369b047cb7ae980db5'
        );
        const data = await response.json();

        //English articles, might want to translate to norwegian
        this.articles = data.articles;

      } catch (error) {
        console.error('Error fetching saving money news:', error);
      }
    }
  }
};
</script>


<template>
  <div class="center-box">
    <div class="box">
      <br>
      <h1>Nyheter</h1>
      <br>
      <div v-for="(article, index) in articles" :key="index" class="article-container">
        <div class="content">
          <h3>{{ article.title }}</h3>
          <p>{{ article.description }}</p>
          <a :href="article.url" target="_blank">Les mer</a>
        </div>
        <div class="image">
          <img :src="article.urlToImage" alt="Article Image"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.center-box {
  display: flex;
  justify-content: center;
  align-items: center;
}

.box {
  width:90%;
}

.article-container {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.image {
  flex: 1;
  text-align: center;
  padding: 0 20px;
}

.image img {
  max-width: 100%;
  border-radius: 1em;
}

.content {
  flex: 3;
  padding: 0 20px;
}

.content h3 {
  margin-top: 0;
}

.content a {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
}

.content a:hover {
  background-color: #0056b3;
}

</style>