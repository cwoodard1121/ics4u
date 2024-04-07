<template>
    <div>
      <h2>Schedule</h2>
      <div v-if="events.length === 0">
        <p>No upcoming events</p>
      </div>
      <div v-else>
        <div v-for="event in events" :key="event._id">
          <h3>{{ event.title }}</h3>
          <p>Date: {{ event.date }}</p>
          <p>Time: {{ event.time }}</p>
          <p>Location: {{ event.location }}</p>
          <!-- Add more event details as needed -->
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      events: Array // Array of events to display in the schedule
    }
  };
  </script>
  
  <style scoped>
  /* Add your CSS styles here */
  </style>
  