<template>
  <div id="repositories">
    <!-- list of repositories found -->
    <ol>
      <li v-for="(repo, index) in repos" :key="index">
        <h6
          data-toggle="tooltip"
          data-placement="right"
          :title="repo.description"
          v-on:click="toggleCommitTable(repo.id, index)"
          class="repo-title"
        >
          {{ repo.name }}
        </h6>
        <!-- commits table section, hidden until clicked -->
        <div
          class="repo-commits card mb-4 shadow p-3 mb-5 bg-white rounded"
          :id="'commit_table_' + repo.id + '_' + index"
        >
          <div class="card-body">
            <h3 class="card-heading">{{ repo.name }}</h3>
            <p>
              <em>{{ repo.description }}</em>
            </p>
            <p>created: {{ getFormattedDate(repo.created_at) }}</p>
            <RepoCommits
              :repo_commits_url="repo.commits_url"
              v-if="index in components_loaded"
            />
            <p v-else>loading...</p>
          </div>
        </div>
      </li>
    </ol>
    .
  </div>
</template>
<script>
import Vue from "vue";
import RepoCommits from "./RepoCommits.vue";
import { getFormattedDate } from "@/common/utility.js";

export default {
  name: "Repos",
  props: {
    repos: {
      type: Array,
      required: true,
    },
  },
  data: () => {
    return {
      components_loaded: {},
    };
  },
  components: {
    RepoCommits,
  },
  methods: {
    toggleCommitTable(repo_id, index) {
      // hides/shows the commit table and updates components_loaded if toggled for first time
      if (!(index in this.components_loaded)) {
        Vue.set(this.components_loaded, index, true);
      }
      var x = document.querySelector("#commit_table_" + repo_id + "_" + index);
      if (x.style.display === "block") {
        x.style.display = "none";
      } else {
        x.style.display = "block";
      }
    },
    getFormattedDate,
  },
};
</script>
<style scoped>
#repositories {
  text-align: left;
}

li::marker {
  color: red;
}
.repo-title {
  cursor: pointer;
  line-height: 2rem;
}
.repo-commits {
  display: none;
}
</style>