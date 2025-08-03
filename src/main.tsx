import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Auth from './pages/Auth'
import SignUp from './pages/SignUp'
import Login from './pages/LogIn'
import Dashboard from './pages/Dashboard'
const ListItems = lazy(() => import('./pages/ListItems'))
import Items from './pages/Items'
import CreateItem from './pages/CreateItem'
import EditItems from './pages/EditItems'
import Favorites from './pages/Favorites'
import Orders from './pages/Orders'
import Loading from './components/Loading/Loading'
const routes = createBrowserRouter([
  {
    path: '/',
    element: <Auth />,
    children: [
      { path: "", element: <Login /> },
      { path: "signup", element: <SignUp /> }
    ]
  }, {
    path: "/dashboard",
    element :<Dashboard />,
    children: [
      {
        path: "",
        element: <Items />,
        children: [
          {
            path: "",
            element: <Suspense fallback={<Loading />}>
              <ListItems />
            </Suspense>,
            loader: async () => {
              const response = await fetch("https://vica.website/api/items", {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                  "Accept": "application/json"
                }
              })
              if (!response.ok) {
                throw new Error("couldn't fetch data");
              }
              return response.json()
            }
          },
          {
            path: "create",
            element: <CreateItem />
          },
          {
            path: "edit/:id",
            element: <EditItems />,
            loader: async ({params}) => {
              const response = await fetch("https://vica.website/api/items/" + params.id, {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                  "Accept": "application/json"
                }
              })
              if (!response.ok) {
                throw new Error("couldn't fetch data");
              }
              return response.json()
            }
          },
        ]
      },
      {
        path: "favorites",
        element: <Favorites />
      },
      {
        path: "orders",
        element: <Orders />
      },
    ]
  }
],)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>,
)
