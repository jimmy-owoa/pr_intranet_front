export default async function({$auth, redirect, store}) {
  if($auth.loggedIn) {
    redirect('/')
  }
}