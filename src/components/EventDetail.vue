<template>
  <div class="container mx-auto p-4">
    <div v-if="event">
      <img :src="event.image" alt="Event Image" class="mb-4 w-full h-64 object-cover rounded-lg">
      <h1 class="text-3xl font-bold mb-2">{{ event.title }}</h1>
      <p class="text-xl text-gray-600 mb-4">{{ formatDate(event.start) }} - {{ formatDate(event.end) }}</p>
      <div v-html="event.description" class="text-lg"></div>
      <button @click="goBack" class="mt-4 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400">Back</button>
    </div>
    <div v-else>
      <p>Loading event details...</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      event: null // Initially set to null
    };
  },
  created() {
    fetch('/data/events.json')
      .then(response => response.json())
      .then(data => {
        this.event = data.find(e => e.id === parseInt(this.id));
        if (!this.event) {
          console.error('Event not found');
        }
      })
      .catch(error => console.error('Failed to fetch event data', error));
  },
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    goBack() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
/* Add any additional styling here */
</style>
