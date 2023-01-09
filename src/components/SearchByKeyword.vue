<script setup lang="js">
    import { ref } from "vue";
    import SearchIcon from "../components/icons/IconSearch.vue";
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
        // this.timer = setInterval(() => {
        //   axios.get("http://localhost:5000/crawl-next");
        // }, 500);

      },
    };

    const text = ref("");
</script>

<template>
  <div id="page-wrapper">
    <div class="wrapper">
          <img id="gooluguloo-pic" src="../assets/gooluguloo.png" />
      </div>
      <div class="wrapper">
        <input type="text" v-model="text" placeholder="Put things you want to search here" id="searchbox" class="searchbox"/>
      </div>
      <div class="wrapper2">
        <button v-on:click="search()" class="gooluguloo">Gooluguloo!</button>
      </div>
      <a v-if="data_offset > 0" v-on:click="prev_page()" id="btn-prev">
        <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m22 12.002c0-5.517-4.48-9.997-9.998-9.997-5.517 0-9.997 4.48-9.997 9.997 0 5.518 4.48 9.998 9.997 9.998 5.518 0 9.998-4.48 9.998-9.998zm-8.211-4.843c.141-.108.3-.157.456-.157.389 0 .755.306.755.749v8.501c0 .445-.367.75-.755.75-.157 0-.316-.05-.457-.159-1.554-1.203-4.199-3.252-5.498-4.258-.184-.142-.29-.36-.29-.592 0-.23.107-.449.291-.591z" fill-rule="nonzero" fill="white"/></svg>
    </a>
      <a v-if="data_offset + data_per_page <= total_count" v-on:click="next_page()" id="btn-next">
        <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m2.009 12.002c0-5.517 4.48-9.997 9.998-9.997s9.998 4.48 9.998 9.997c0 5.518-4.48 9.998-9.998 9.998s-9.998-4.48-9.998-9.998zm8.211-4.843c-.141-.108-.3-.157-.456-.157-.389 0-.755.306-.755.749v8.501c0 .445.367.75.755.75.157 0 .316-.05.457-.159 1.554-1.203 4.199-3.252 5.498-4.258.184-.142.29-.36.29-.592 0-.23-.107-.449-.291-.591z" fill-rule="nonzero" fill="white"/></svg>
    </a>

      <div class="container-result" v-for="e in crawledData">
        <p>{{ e.url }}</p>
        <a class="biglink" :href="e.url">{{ e.title }}</a>
        <p>{{ e.description }}</p>
      </div>
  </div>
</template>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700;900&display=swap");

    #page-wrapper {
        min-height: 100vh;
        overflow: hidden;
        background-image: url(https://cdn.panrotas.com.br/portal-panrotas-statics/media-files-cache/311503/53c8cbdd2e3d048bf37522db26ccb06456cotnbfdw656542/full/full,1/0/default.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        background-attachment: fixed;
    }

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
      width: 50vw;
      font-size: 30px;
      border-radius: 10px;
      margin-top: 5vh;
    }

    .gooluguloo {
        margin-top: 3vh;
        margin-bottom: 3vh;
        padding: 1vh;
        border-radius: 5px;
        border: 0;
        font-size: 20px;
        transition: 0.15s;
        font-weight: 900;
        cursor: pointer;
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
      border: 1px solid #888;
      box-shadow: 0 50px 100px rgba(255, 255, 255, .7);
    }

    .container-result {
        width: 80vw;
        margin: 0 auto;
        margin-bottom: 2vh;
        padding: 2vh;
        background-color: #00000098;
        color: #ddd;
        border: 2px solid #aaa;
        border-radius: 10px;
        transition: 1s;
    }
    .container-result:hover {
        background-color: black;
        color: white;
    }

    .container-result a {
        font-size: 1.5em;
        color: hsla(160, 100%, 37%, 1);
        font-weight: bold;
    }

    svg {
        width: 40px;
        height: 40px;
    }
    #btn-prev, #btn-next {
        position: fixed;
        top: 50vh;
        cursor: pointer;
    }
    #btn-prev {
        left: 1vh;
    }
    #btn-next {
        right: 1vh;
    }
</style>
