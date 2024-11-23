<script lang="ts">
  import NavBar from '$lib/components/navigation/nav_bar.svelte';
</script>

<div class="min-h-screen bg-gray-900 text-white">
  <NavBar currentRoute="/dashboard" />

  <div class="p-8">
    <h1 class="text-4xl font-bold mb-6">Bienvenido al Dashboard</h1>
    <p class="text-gray-300">
      Navega por las supersticiones y las regiones para administrar la información.
    </p>
  </div>
</div>
