<template>
  <Layout>
    <h1>😎 {{ $context.profile.name }}</h1>
    <h2>{{ $context.profile.status }}</h2>
    <hr />
    <ul>
      <li v-for="account in $context.profile.social" :key="account.id">
        <a :href="account.url">{{ account.name }}</a>
      </li>
    </ul>
  </Layout>
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {
      showUrl: false
    }
  },
}
</script>