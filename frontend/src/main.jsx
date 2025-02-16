import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Importing extra props
  import './functions/__string_props';

sessionStorage.setItem('logout_route', '/logout')

window.$_LOGOUT_ROUTE = "/logout"

window.$_BG_IMAGE_URL_DEF = "https://img.freepik.com/free-vector/geometric-science-education-background-vector-gradient-blue-digital-remix_53876-125993.jpg"
window.$_BG_IMAGE_URL_01 = "https://i.pinimg.com/736x/60/e7/77/60e77739943c4f1cb0d83252abe0e622.jpg"
window.$_NA_PROFILE_IMAGE_URL = "https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png"
window.$_NA_ANY_IMAGE_URL = "https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg"
window.$_NA_PROFILE_IMAGE_URL = "https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  </StrictMode>,
)
