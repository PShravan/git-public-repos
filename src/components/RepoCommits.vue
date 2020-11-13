<template>
  <div>
    <!-- input to search the commits table -->
    <div class="search-input mb-4">
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          v-model="commit_filter"
          placeholder="search commits"
        />
      </div>
    </div>

    <!-- commit table section -->
    <div>
      <table class="table table-sm table-bordered" v-if="show_commits_table">
        <thead class="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Date</th>
            <th scope="col">Committer</th>
            <th scope="col">message</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(object, index) in filterCommits.slice(0, 20)"
            :key="index"
          >
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ getFormattedDate(object.commit.committer.date) }}</td>
            <td>{{ object.commit.committer.name }}</td>
            <td>{{ object.commit.message }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else>loading</p>
    </div>
  </div>
</template>
<script>
import { getFormattedDate } from "@/common/utility.js";

export default {
  name: "RepoCommits",
  props: {
    repo_commits_url: {
      type: String,
      required: true,
    },
  },
  data: () => {
    return {
      repo_commits: [],
      commit_filter: "",
      show_commits_table: false,
    };
  },
  methods: {
    async getCommits() {
      // fetches the commits of the repository if not already fetched
      let response = await fetch(this.repo_commits_url.slice(0, -6));
      if (response.status === 200) {
        const detail = await response.json();
        this.repo_commits = detail;
        this.show_commits_table = true;
      }
    },
    getFormattedDate,
  },
  computed: {
    filterCommits() {
      // filters the commit table in message and committers column, based on input given
      return this.repo_commits.filter((object) => {
        const commit_message = object.commit.message.toString().toLowerCase();
        const committer_name = object.commit.committer.name
          .toString()
          .toLowerCase();
        const commitSearchTerm = this.commit_filter.toLowerCase();

        //returns if search term presents in the message or committers cells of this row
        return (
          commit_message.includes(commitSearchTerm) ||
          committer_name.includes(commitSearchTerm)
        );
      });
    },
  },
  created() {
    this.getCommits();
  },
};
</script>
<style scoped>
table thead tr {
  text-align: center !important;
}
</style>