export async function fetchCurrentUser({ commit }) {
  try {
    const { data } = await this.$axios.get(`/users/current_user_vue`);
    commit("setCurrentUser", data.user);
  } catch (e) {
    commit("usersError", e.message);
  } finally {}
}