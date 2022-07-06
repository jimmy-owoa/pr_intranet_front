export async function fetchSocieties({ commit }) {
  try {
    const { data } = await this.$axios.get("/societies")
    return data
  } catch (e) {
    return false
  } finally {

  }
}
export async function fetchDivisas({ commit }) {
  try {
    const { data } = await this.$axios.get("expense_report_requests/divisas")
    return data
  } catch (e) {
    return false
  } finally {

  }
}
export async function fetchSubcategories({ commit }) {
  try {
    const { data } = await this.$axios.get("/subcategories")
    return data
  } catch (e) {
    return false
  } finally {

  }
}
export async function createRequest({ commit }, payload) {
  try {
    const { data } = await this.$axios.post(`/expense_report_requests`, payload)
    return data
  } catch (e) {
    return false
  } 
  finally {}
}
export async function fetchRequests({ commit }, status) {
  try {
    const { data } = await this.$axios({
      method: "GET",
      url: `/expense_report_requests`,
      params: { status }
    })
    return data
  } catch (e) {
    return false
  } 
  finally {}
}

export async function fetchRequest({ commit }, id) {
  try {
    const { data } = await this.$axios(`/expense_report_requests/${id}`)
    return data
  } catch (e) {
    this.$router.push('/')
  } 
  finally {}
}
export async function fetchRequestState({ commit }, payload){
  try {
    const { data } = await this.$axios.post(`/expense_report_requests/review_request?approved_to_review=${payload}`)
    return data
  } catch (e) {
    return false
  }
  finally {}
}
  export async function fetchResponseRequest({ commit }, request){
    try {
      const { data } = await this.$axios({
        method: "GET",
        url: `expense_report_requests/response_request`,
        params: { request }

      })
      return data
    } catch (e) {
      return false
    }
    finally {}
  }