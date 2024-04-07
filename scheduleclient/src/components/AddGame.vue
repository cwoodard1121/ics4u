<template>
    <div>
      <h2>Add Game</h2>
      <form @submit.prevent="addGame">
        <div>
          <label for="title">Title:</label>
          <input type="text" id="title" v-model="title" required>
        </div>
        <div>
          <label for="date">Date:</label>
          <input type="date" id="date" v-model="date" required>
        </div>
        <!-- Add input fields for other game details (time, location, teams, etc.) -->
        <button type="submit">Add Game</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        title: '',
        date: ''
        // Add data properties for other game details
      };
    },
    methods: {
      async addGame() {
        try {
          const response = await axios.post('/api/games', {
            title: this.title,
            date: this.date
            // Add other game details as needed
          });
          console.log('Game added:', response.data);
          // Optionally, redirect to a different page after adding the game
        } catch (error) {
          console.error('Error adding game:', error);
          // Handle error (e.g., display error message)
        }
      }
    }
  };
  </script>
  
  <style>
  /* Add your CSS styles here */
  </style>