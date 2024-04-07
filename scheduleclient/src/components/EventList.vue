// EventList.vue
<script>
import axios from 'axios';

export default {
  data() {
    return {
      events: []
    };
  },
  created() {
    this.fetchEvents();
  },
  methods: {
    async fetchEvents() {
      try {
        const response = await axios.get('/api/events');
        this.events = response.data;
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    }
  }
};
</script>
