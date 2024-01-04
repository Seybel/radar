<template>
  <div
    class="grid grid-cols-2 py-4 border-b border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 font-bold"
  >
    <div class="flex items-center justify-between">
      {{ date }}
    </div>

    <div class="flex items-center justify-end mr-10">
      {{ currency }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { type ITransaction } from "~/utils/interfaces/Transaction"

const props = defineProps({
  date: String,
  transactions: {
    type: Array as PropType<ITransaction[]>,
    default: () => []
  }
});

const sum = computed(() => {
  let sum = 0;

  props.transactions.forEach((transaction: ITransaction) => {
    if (transaction.type.toLowerCase() === "income") {
      sum += transaction.amount;
    } else {
      sum -= transaction.amount;
    }
  });

  return sum;
});

const { currency } = useCurrency(sum);
</script>
