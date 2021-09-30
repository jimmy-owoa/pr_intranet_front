<template>
  <div></div>
</template>
<script>
export default {
  middleware: "auth-login",
  methods: {
    async loginUser(email) {
      const response = await this.$auth.login({
        data: { user: { user_code: email } },
      })
      
      if (response.data.success) {
        this.$router.push("/")
      } else {
        this.alertError = true;
      }
    },
  },
  created() {
    let user_code = this.$route.query.code || ""
    this.loginUser(user_code)
  },
};
</script>
