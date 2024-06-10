<template>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Verified</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.verified ? 'Yes' : 'No' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup lang="ts">
  interface User {
    id: string;
    email: string;
    verified: boolean;
  }
  
  const props = defineProps<{
    users: User[];
  }>();
  </script>
  
  <style scoped>
  .table-container {
    overflow-x: auto;
    margin: 1rem 0;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
  }
  
  thead {
    background-color: #333;
    color: #fff;
  }
  
  th, td {
    padding: 0.75rem;
    text-align: left;
    border: 1px solid #ddd;
  }
  
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  tr:hover {
    background-color: #f1f1f1;
  }
  </style>
  