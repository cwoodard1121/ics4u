<template>
  <div id="app">
    <h1>School Sports App</h1>
    <!-- Render your components here -->
    <EventList :events="events" />
    <LeagueList :leagues="leagues" />
    <!-- Other components rendering -->
  </div>
</template>

<script>
import axios from 'axios';
// Import your components here
import EventList from './components/EventList.vue';
import LeagueList from './components/LeagueList.vue';
// Other components imports...

export default {
  name: 'App',
  data() {
    return {
      events: [],
      leagues: []
    };
  },
  created() {
    this.fetchEvents();
    this.fetchLeagues();
  },
  methods: {
    async fetchEvents() {
      try {
        const response = await axios.get('/api/events');
        this.events = response.data;
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    },
    async fetchLeagues() {
      try {
        const response = await axios.get('http://localhost:3000/api/leagues');
        console.log(response.status);
        this.leagues = response.data;
        console.log(response.data.length);
      } catch (error) {
        console.error('Error fetching leagues:', error);
      }
    }
  },
  components: {
    EventList,
    LeagueList,
  }
};
</script>

<style>
/* Add your CSS styles here */
</style>