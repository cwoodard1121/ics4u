<template>
    <div>
      <h2>Admin Login</h2>
      <form @submit.prevent="login">
        <div>
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('/api/login', {
            username: this.username,
            password: this.password
          });
          // Handle successful login, e.g., store token in local storage
          console.log('Login successful:', response.data);
        } catch (error) {
          console.error('Login error:', error);
          // Handle login error, e.g., display error message
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your CSS styles here */
  </style>