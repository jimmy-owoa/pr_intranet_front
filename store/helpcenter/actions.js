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
    this.$router.push('/')
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
    this.$router.push('/')
  } 
  finally {}
}

export async function fetchTickets({ commit }) {
  try {
    const { data } = await this.$axios(`/hc_tickets`)
    return data
  } catch (e) {
    return false
  } 
  finally {}
}

export async function createTicket({ commit }, payload) {
  try {
    const { data } = await this.$axios.post(`/hc_tickets`, payload)
    return data
  } catch (e) {
    return false
  } 
  finally {}
}

export async function fetchTicket({ commit }, id) {
  try {
    const { data } = await this.$axios(`/hc_tickets/${id}`)
    return data
  } catch (e) {
    this.$router.push('/')
  } 
  finally {}
}

// fetch divisas
export async function fetchDivisas({ commit }) {
  try {
    const { data } = await this.$axios(`/hc_tickets/divisas`)
    return data
  } catch (e) {
    this.$router.push('/')
  } 
  finally {}
}

export async function createMessage({ commit }, payload) {
  try {
    const { data } = await this.$axios.post(`/hc_tickets/${payload.ticketId}/hc_messages`, { message: { content: payload.content } })
    return data
  } catch (e) {
    return false
  } 
  finally {}
}

export async function createSatisfactionAnswer({ commit }, payload) {
  try {
    const { data } = await this.$axios.post(`/hc_tickets/${payload.ticketId}/hc_satisfaction_answers`, { answer: { value: payload.value } })
    return data
  } catch (e) {
    return false
  } 
  finally {}
}

export async function fetchTicketState({ commit }, payload){
  try {
    const { data } = await this.$axios(`/hc_tickets/review_ticket?aproved_to_review=${payload}`)
    return data
  } catch (e) {
    return false
  }
  finally {}
}