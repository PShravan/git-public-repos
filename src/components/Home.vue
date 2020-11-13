<template>
  <div class="container">
    <h1>{{ msg }}</h1>
    <h5 class="lead mt-5">search public repositories of a user</h5>
    <div class="row">
      <div class="col-2"></div>
      <div class="col-8">
        <form class="text-center" @submit.prevent="onSubmit">
          <div class="input-group">
            <!-- user input section -->
            <input
              type="text"
              class="form-control"
              placeholder="Enter username of user"
              v-model="username"
            />
            <div class="input-group-append">
              <button type="submit" class="btn btn-primary">Get repos</button>
            </div>
          </div>
        </form>
      </div>
      <div class="col-2"></div>
    </div>
    <div v-if="error" class="mt-5">
      <!-- when api gives an error -->
      <h3 class="text-danger">{{ error }}</h3>
    </div>
    <div v-else-if="repos" class="mt-5">
      <div v-if="repos.length">
        <!-- if there are public repos -->
        <h4 class="text-success mb-4">
          Found {{ repos.length }} repositories of {{ username }}
        </h4>
        <Repos :repos="repos" />
      </div>
      <div v-else>
        <!-- if there are no public repos  -->
        <h4 class="text-info">{{ username }} has no public repositories</h4>
      </div>
    </div>
  </div>
</template>

<script>
import Repos from "./Repos.vue";

export default {
  name: "Home",
  props: {
    msg: String,
  },
  data: () => {
    return {
      username: "",
      repos: null,
      error: null,
    };
  },
  components: {
    Repos,
  },
  methods: {
    async onSubmit() {
      if (this.username) {
        // fetches the repos through github api of the username entered
        this.repos = null;
        let response = await fetch(
          `https://api.github.com/users/${this.username}/repos`
        );
        if (response.status !== 200) {
          // when no user with entered username is found
          document.title = "404 - Not Found";
          this.error = "404 - User Not Found";
        } else {
          this.repos = await response.json();
          this.error = null;
          document.title = "github repos";
        }
      } else {
        // when input is empty
        this.error = "the username can't be empty";
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  /* display: inline-block; */
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
