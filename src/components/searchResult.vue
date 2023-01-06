<template>
  <div v-for="e in crawledData">
    <hr />
    <p>{{ e.url }}</p>
    <a class="biglink" :href="e.url">{{ e.title }}</a>
    <p>{{ e.description }}</p>
  </div>
</template>
<script setup lang="js">
import axios from "axios";
export default {

  data: function () {
    return {
      crawledData: [],
    };
  },
  methods: {
    getlist() {
      axios.get("http://localhost:5000/webpages").then((response) => {
        this.crawledData = response.data.results;
        console.log(response.data);
      });
    },
  },
  mounted() {
    this.timer = setInterval(() => {
      this.getlist();
    }, 1000);

    // this.getlist();

  },
};
</script>
<style>
a.biglink {
  font-size: xx-large;
  transition: 0.15s;
  font-family: sans-serif;
}
a.biglink:hover {
  color: green;
}
</style>
