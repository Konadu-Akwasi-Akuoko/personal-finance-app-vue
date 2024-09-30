<script setup lang="ts">
import Logo from "~/components/icons/Logo.vue";
</script>

<template>
  <div
    class="h-full w-full rounded-t-none bg-login-image bg-cover bg-top bg-no-repeat lg:max-w-[560px] lg:rounded-xl"
  >
    <div class="flex h-full flex-col justify-between p-10">
      <Logo />

      <div class="flex flex-col gap-6 text-white">
        <h2 class="text-4xl font-medium text-green-500">
          Keep track of your money and save for your future
        </h2>
        <p class="text-sm font-bold text-green-500 lg:font-light">
          Personal finance app puts you in control of your spending. Track
          transactions, set budgets, and add to savings pots easily.
        </p>
      </div>
    </div>
  </div>
</template>
