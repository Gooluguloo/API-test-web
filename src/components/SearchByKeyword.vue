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
      data_offset: 0,
      data_per_page: 10,
      total_count: 0,
      processedstr: ""

    };
  },
  components:{
    "resultVue": searchResultVue,
  },
  methods: {
    getlist(key, init_index, data_per_page) {
      axios.get("http://localhost:5000/search/" + key + "%SPL" + init_index +  "%SPL" + data_per_page ).then((response) => {
        this.crawledData = response.data.results;
        this.total_count = response.data.total_count;
        console.log(this.crawledData);
        console.log(this.total_count);
        this.$forceUpdate();
      });
    },
    search() {
      var input = document.getElementById("searchbox");
      this.processedstr = input.value.replace(/ /g, "&").replace(/\//g, "%WANG");
      console.log(this.processedstr);
      this.getlist(this.processedstr, 0, this.data_per_page)
    },
    prev_page(){
      if(this.data_offset <= 0){

        return
      }
      this.data_offset -= this.data_per_page
      this.getlist(this.processedstr, this.data_offset, this.data_per_page)
    },
    next_page(){
      if(this.data_offset >= this.total_count){
        return
      }
      if(this.data_offset + this.data_per_page > this.total_count)  {
        this.getlist(this.processedstr, this.data_offset  , this.total_count - this.data_offset)
        return
      }
      this.data_offset += this.data_per_page
      this.getlist(this.processedstr, this.data_offset, this.data_per_page)
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      axios.get("http://localhost:5000/crawl-next");
    }, 500);

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
    <button v-on:click="search()" class="gooluguloo">gooluguloo</button>
  </div>
  <button v-if="data_offset > 0" v-on:click="prev_page()">prev</button>
  <button v-if="data_offset + data_per_page <= total_count" v-on:click="next_page()">
    next
  </button>

  <div v-for="e in crawledData">
    <hr />
    <p>{{ e.url }}</p>
    <a class="biglink" :href="e.url">{{ e.title }}</a>
    <p>{{ e.description }}</p>
  </div>
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
