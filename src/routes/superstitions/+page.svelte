<script lang="ts">
  import { onMount } from 'svelte';
  import NavBar from '$lib/components/navigation/nav_bar.svelte';
  import { SuperstitionService } from '$lib/services/superstitions/superstitions.api';
  import { RegionsService } from '$lib/services/regions/region.api';
  import Modal from '$lib/components/modal/modal.svelte';

  import type { Superstition } from '$lib/services/superstitions/superstition.d.ts';
	import type { Region } from '$lib/services/regions/regions';

  const superstitionsService = new SuperstitionService();
  const regionsService = new RegionsService();

  let superstitions: any[];
  let regions: Region[];
  let modalOpen = false;
  let editingSuperstition: Superstition | null = null;
  let searchQuery = '';

  const fetchSuperstitions = async () => {
    const superstitions = await superstitionsService.getSuperstitions(searchQuery);

    return superstitions
  }

  const fetchData = async () => {
    const superstitionsFromDB = await fetchSuperstitions();
    const regionsFromDB = await regionsService.getRegions();

    superstitions = superstitionsFromDB.data;
    regions = regionsFromDB.data
  };

  const handleDelete = async (id: string) => {
    await superstitionsService.deleteSuperstition(id);

    fetchData();
  };

  const handleEdit = (superstition: Superstition) => {
    editingSuperstition = { ...superstition };
    modalOpen = true;
  };

  const handleCreate = () => {
    editingSuperstition = null;
    modalOpen = true;
  };

  function handleSearch() {
    fetchSuperstitions();
  }

  onMount(fetchData);
</script>

<div class="min-h-screen bg-gray-900 text-white">
  <NavBar currentRoute="/supersticiones" />

  <div class="p-8">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-3xl font-bold">Supersticiones</h1>
        
      <button
        class="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
        on:click={handleCreate}
      >
        Crear Superstición
      </button>
    </div>

    <!-- <div class="form-group flex space-x-4 my-4">
      <input
        type="text"
        bind:value={searchQuery}
        placeholder="Search for a superstition..."
        class="flex-1 px-4 py-2 border bg-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      <button
        on:click={handleSearch}
        class="px-4 py-2 text-white bg-indigo-600 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Search
      </button>
    </div>   -->

    <table class="table-auto w-full text-left bg-gray-800">
      <thead>
        <tr class="bg-gray-700">
          <th class="p-4">Nombre</th>
          <th class="p-4">Descripción</th>
          <th class="p-4">Región</th>
          <th class="p-4">Origen</th>
          <th class="p-4">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {#each superstitions as superstition}
          <tr class="border-t border-gray-700">
            <td class="p-4">{superstition.name}</td>
            <td class="p-4">{superstition.description}</td>
            <td class="p-4">{superstition.region_id.region_name}</td>
            <td class="p-4">{superstition.origin}</td>
            <td class="p-4">
              <button
                class="bg-yellow-500 px-2 py-1 rounded hover:bg-yellow-600 mr-2"
                on:click={() => handleEdit(superstition)}
              >
                Editar
              </button>
              {#if superstition._id !== undefined}
                <button
                  class="bg-red-500 px-2 py-1 rounded hover:bg-red-600"
                  on:click={() => handleDelete(superstition._id)}
                >
                  Eliminar
                </button>
              {/if}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  {#if modalOpen}
    <Modal
      bind:open={modalOpen}
      superstition={editingSuperstition}
      regions={regions}
      on:success={fetchData}
    />
  {/if}
</div>
