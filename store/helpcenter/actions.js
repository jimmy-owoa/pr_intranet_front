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

export async function fetchSubcategory({ commit }, subcategorySlug) {
  try {
    const { data } = await this.$axios(`/hc_subcategories/${subcategorySlug}`)
    return data
  } catch (e) {
    return false
  } finally {}
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

export async function fetchQuestion({ commit }, questionId) {
  try {
    const { data } = await this.$axios(`/hc_questions/${questionId}`)
    return data
  } catch (e) {
    // router.push("/centro-de-ayuda")
  } 
  finally {}
}