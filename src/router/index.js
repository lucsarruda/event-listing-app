import { createRouter, createWebHistory } from 'vue-router';
import EventList from '../components/EventList.vue';
import EventDetail from '../components/EventDetail.vue';

const routes = [
  { path: '/', component: EventList }, // Main event list page
  { path: '/event/:id', component: EventDetail, props: true }, // Event detail page
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;