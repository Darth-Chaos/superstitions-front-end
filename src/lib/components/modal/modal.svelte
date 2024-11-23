<script lang="ts">
  import { SuperstitionService } from '$lib/services/superstitions/superstitions.api';
  import { createEventDispatcher } from 'svelte';

  import type { Superstition } from '$lib/services/superstitions/superstition';
  import type { Region } from '$lib/services/regions/regions';

  export let open: boolean;
  export let superstition: Superstition | null = null;
  export let regions: Region[]

  const dispatch = createEventDispatcher();
  const superstitionService = new SuperstitionService()

  let name = superstition?.name || '';
  let description = superstition?.description || '';
  let origin = superstition?.origin || '';
  let positiveEffect = false
  let selectedRegion = superstition?.region_id._id || '';

  const handleSubmit = async () => {
    if (superstition) {
      await superstitionService.updateSuperstition({_id: superstition._id, name, description, origin, positive_effect: positiveEffect, region_id: selectedRegion });
    } else {
      await superstitionService.createSuperstition({ name, description, origin, positive_effect: positiveEffect, region_id: selectedRegion });
    }

    dispatch('success');
    
    open = false;
  };

  const handleRegionChange = (event: any) => {
    selectedRegion = event.target.value;
  };
</script>

{#if open}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-gray-800 p-6 rounded-lg w-1/3">
      <h2 class="text-xl font-bold mb-4">{superstition ? 'Editar Superstición' : 'Crear Superstición'}</h2>
      <form on:submit|preventDefault={handleSubmit}>
        <label class="block mb-2">
          Nombre:
          <input
            type="text"
            bind:value={name}
            class="w-full mt-1 p-2 bg-gray-700 rounded border border-gray-600"
            required
          />
        </label>
        <label class="block mb-2">
          Descripción:
          <textarea
            bind:value={description}
            class="w-full mt-1 p-2 bg-gray-700 rounded border border-gray-600"
          ></textarea>
        </label>
        <label class="block mb-4">
          Origen:
          <input
            type="text"
            bind:value={origin}
            class="w-full mt-1 p-2 bg-gray-700 rounded border border-gray-600"
            required
          />
        </label>
        <div class="my-4">
          <label for="region" class="block text-base">
            Selecciona una región:
          </label>
          <select
            id="region"
            name="region"
            class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            bind:value={selectedRegion}
            on:change={handleRegionChange}
          >
            <option value="" disabled selected>Seleccione una región</option>
            {#each regions as region}
              <option value={region._id}>{region.region_name}</option>
            {/each}
          </select>
        </div>
        <label class="mb-4 pb-4">
          Tiene efectos positivos: 
          <input
            type="checkbox"
            bind:checked={positiveEffect}
            class="mt-auto p-2 bg-gray-700 rounded border border-gray-600"
          />
        </label>
        <div class="flex justify-end gap-2 mt-4">
          <button
            type="button"
            class="bg-gray-500 px-4 py-2 rounded hover:bg-gray-600"
            on:click={() => (open = false)}
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}
