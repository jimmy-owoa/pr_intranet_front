export async function fetchCategories({ commit }) {
  try {
    const { data } = await this.$axios.get("/hc_categories")
    return data
  } catch (e) {
    return false
  } finally {

  }
}

export async function fetchQuestionsImportant({ commit }) {
  try {
    const { data } = await this.$axios.get(`/hc_questions/importants`)
    return data
  } catch (e) {
    return false
  } finally {}
}

export async function fetchCategory({ commit }, categorySlug) {
  try {
    const { data } = await this.$axios(`/hc_categories/${categorySlug}`)
    return data
  } catch (e) {
    return false
  } finally {
  }
}

export async function fetchSearch({ commit }, payload) {
  try {
    const { data } = await this.$axios.get(`/hc_questions/search`, { search: payload })
    return data
  } catch (e) {
    return false
  } 
  finally {}
}