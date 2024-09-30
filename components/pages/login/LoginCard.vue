<script setup lang="ts">
import Button from "~/components/ui/button/Button.vue";
import Input from "~/components/ui/input/Input.vue";
import Label from "~/components/ui/label/Label.vue";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useAutoAnimate } from "@formkit/auto-animate/vue";

const { $client } = useNuxtApp();

const [parent] = useAutoAnimate();
const [parent2] = useAutoAnimate();

const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

const { errors, defineField, validateField, handleSubmit } = useForm({
  validationSchema: schema,
});

const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");

const login = handleSubmit(async (values) => {
  console.log(values);
  const data = await $client.login.mutate({
    email: values.email,
    password: values.password,
  });

  console.log("data from server: ", data);
});
</script>

<template>
  <div class="flex h-full w-full flex-1 items-center justify-center p-4">
    <div
      class="flex w-full max-w-[560px] flex-col gap-8 rounded-lg bg-white p-8"
    >
      <h1 class="text-4xl font-bold">Login</h1>
      <form class="flex w-full flex-col gap-8" @submit.prevent="login()">
        <div ref="parent2" class="flex flex-col gap-2">
          <Label for="email">Email</Label>
          <Input
            id="email"
            v-model="email"
            v-bind="emailAttrs"
            type="email"
            placeholder="Email"
            @change="validateField('email')"
          />
          <span v-if="errors.email" class="text-sm font-bold text-red-500">{{
            errors.email
          }}</span>
        </div>
        <div ref="parent" class="flex flex-col gap-2">
          <Label for="password">Password</Label>
          <Input
            id="password"
            v-model="password"
            v-bind="passwordAttrs"
            type="password"
            placeholder="Password"
            @change="validateField('password')"
          />
          <span v-if="errors.password" class="text-sm font-bold text-red-500">{{
            errors.password
          }}</span>
        </div>
        <Button type="submit">Login</Button>
      </form>
      <div class="flex flex-row justify-center text-sm font-light">
        <p>
          Need to create an account
          <span class="font-bold text-primary underline underline-offset-1">
            <NuxtLink to="/sign-up"> Sign up </NuxtLink>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
