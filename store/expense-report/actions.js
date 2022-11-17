export async function fetchSocieties({ commit }, id) {
  try {
    const { data } = await this.$axios.get(`/societies?user_id=${id}`)
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
export async function fetchCategories({ commit }) {
  try {
    const { data } = await this.$axios.get("/categories")
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
export async function createRequestDraft({ commit }, payload) {
  try {
    const { data } = await this.$axios.post(`/expense_report_requests`, payload)
    return data
  } catch (e) {
    return false
  } 
  finally {}
}
export async function updateRequest({ commit }, payload) {
  try {
    const { data } = await this.$axios.put(`/expense_report_requests/${payload.id}`, payload.request)
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

export async function fetchRequestDraft({ commit }, id) {
  try {
    const { data } = await this.$axios(`/expense_report_requests/request_draft?id=${id}`)
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
  export async function fetchCountries({ commit }) {
    try {
      const { data } = await this.$axios.get("expense_report_requests/countries")
      return data
    } catch (e) {
      return false
    } finally {
  
    }
  }
  export async function fetchPaymentMethod({ commit }) {
    try {
      const { data } = await this.$axios.get("expense_report_requests/payment_method")
      return data
    } catch (e) {
      return false
    } finally {
    }
  }
  export async function fetchRequestUser({ commit }) {
    try {
      const { data } = await this.$axios.get("expense_report_requests/request_user")
      return data
    } catch (e) {
      return false
    } finally {
    }
  }
  