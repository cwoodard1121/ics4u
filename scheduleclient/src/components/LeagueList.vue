<template>
    <div>
      <h2>Leagues</h2>
      <input type="text" v-model="searchQuery" placeholder="Search leagues...">
      <ul>
        <li v-for="league in filteredLeagues" :key="league._id">
          {{ league.name }}
          <!-- Add buttons for editing and deleting leagues -->
        </li>
      </ul>
      <!-- Add league form and other UI elements as needed -->
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchQuery: ''
      };
    },
    computed: {
      filteredLeagues() {
        return this.leagues.filter(league =>
          league.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
    props: {
      leagues: Array // Array of leagues to display
    }
  };
  </script>
  
  
  <style scoped>
  /* Add your CSS styles here */
  </style>
  