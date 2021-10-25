<template>
  <div></div>
</template>
<script>
export default {
  middleware: "auth-login",
  methods: {
    async loginUser(email) {
      try {
        const response = await this.$auth.login({
          data: { user: { user_code: email } },
        })
        
        if (response.data.success) {
          this.$router.push("/")
        } else {
          this.alertError = true;
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
  created() {
    let user_code = this.$route.query.code || ""
    this.loginUser(user_code)
  }, 
};
</script>