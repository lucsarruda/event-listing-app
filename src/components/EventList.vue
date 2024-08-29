<template>
  <div class="container mx-auto p-4">
    <header class="flex justify-between items-center py-4">
      <div class="text-3xl font-bold text-green-600">ticketpass</div>
      <input type="text" v-model="searchQuery" placeholder="Search" class="p-2 border rounded-md w-1/4" />
    </header>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
      <div v-for="event in paginatedEvents" :key="event.id" class="bg-white rounded-lg shadow-lg p-4">
        <img :src="event.image" alt="Event Image" class="mb-4 w-full h-40 object-cover rounded-t-lg">
        <div class="p-4">
          <h2 class="text-lg font-semibold mb-2">{{ event.title }}</h2>
          <p class="text-sm text-gray-600 mb-4">{{ formatDate(event.start) }} - {{ formatDate(event.end) }}</p>
          <button @click="$router.push(`/event/${event.id}`)" class="bg-green-500 text-white w-full py-2 rounded-lg hover:bg-green-600">View</button>
        </div>
      </div>
    </div>

    <!-- Pagination Controls -->
    <div class="flex justify-center mt-8">
      <button @click="previousPage" :disabled="currentPage === 1" class="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 mr-2">Previous</button>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400">Next</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      events: [],
      currentPage: 1,
      itemsPerPage: 8,
      searchQuery: ""
    };
  },
  computed: {
    filteredEvents() {
      if (this.searchQuery) {
        return this.events.filter(event =>
          event.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } else {
        return this.events;
      }
    },
    paginatedEvents() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredEvents.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredEvents.length / this.itemsPerPage);
    }
  },
  created() {
    fetch('/data/events.json')
      .then(response => response.json())
      .then(data => {
        this.events = data;
      });
  },
  methods: {
    previousPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }
  }
};
</script>

<style scoped>
/* Additional styles can be added here if needed */
</style>
