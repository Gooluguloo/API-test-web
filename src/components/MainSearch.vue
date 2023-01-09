<script setup lang="js">
import { ref } from "vue";
import SearchIcon from "../components/icons/IconSearch.vue";
import searchResultVue from "./searchResult.vue";
import axios from 'axios'
export default {
  name: "mainsearch",
  data: function () {
    return {
      data: Boolean,
    };
  },
  components:{
    "resultVue": searchResultVue,
  },
  methods: {
    search() {
      var input = document.getElementById("searchbox");

      var processedstr = input.value.replace(/%/g, "%25").replace(/\//g, "%WANG");

      console.log(processedstr);
      axios.get("http://localhost:5000/crawl-next/" + processedstr);
      //   window.location.href = "https://google.com" + "/search?q=" + processedstr;
    },
  },
  mounted() {
    // axios.get("http://localhost:5000/webpages/cleardb");
    axios.get("http://localhost:5000/webpages");
  },
};

const text = ref("");
</script>

<template>
  <div class="wrapper"><img id="gooluguloo-pic" src="../assets/gooluguloo.png" /></div>
  <div class="wrapper">
    <input
      type="text"
      v-model="text"
      placeholder="Put things you want to search here"
      id="searchbox"
      class="searchbox"
    />
  </div>
  <div class="wrapper2">
    <!-- <span><SearchIcon  class="svg"/></span> -->
    <button v-on:click="search()" class="gooluguloo">gooluguloo</button>
    <!-- <span>{{text}}</span> -->
  </div>
  <resultVue></resultVue>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700;900&display=swap");

div {
  font-family: "Noto Sans", sans-serif !important;
}

.wrapper {
  justify-content: center;
  display: flex;
  margin: 0 auto;
}

.wrapper2 {
  justify-content: center;
  display: flex;
  margin: 0 auto;
}

input.searchbox {
  text-align: center;
  height: fit-content;
  width: 90vw;
  font-size: 30px;
  border-radius: 9999px;
  margin-top: 5vh;
}

.gooluguloo {
  border-radius: 9999px;
  border: 0;
  font-size: 20px;
  transition: 0.15s;
  font-weight: 900;
}

.gooluguloo:hover {
  color: white;
  background-color: black;
}

.svg {
  width: 3vw;
  height: 3vw;
  transition: 0.15s;
}

.svg:hover {
  fill: white;
}

span {
  border-radius: 9999px;
}

span:hover {
  background-color: black;
}

#gooluguloo-pic {
  display: flex;
  margin: 0 auto;
  border-radius: 10px;
  margin-top: 30vh;
}
</style>
