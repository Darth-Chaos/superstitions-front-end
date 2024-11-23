<script lang="ts">
  export let currentRoute: string;
</script>

<nav class="bg-gray-800 p-4 text-white flex justify-between">
  <div class="font-bold text-lg">Supersticiones</div>
  <ul class="flex gap-4">
    <li>
      <a
        href="/dashboard"
        class="hover:text-gray-300 {currentRoute === '/dashboard' ? 'underline' : ''}"
      >
        Dashboard
      </a>
    </li>
    <li>
      <a
        href="/superstitions"
        class="hover:text-gray-300 {currentRoute === '/supersticiones' ? 'underline' : ''}"
      >
        Supersticiones
      </a>
    </li>
  </ul>
</nav>
