import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './base.css'
import { CssBaseline } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { ErrorComponent, RouterProvider, createRouter } from '@tanstack/react-router'
// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { Spinner } from './components/spinner'

// Create a new query client instance
const queryClient = new QueryClient();

// Create a new router instance
const router = createRouter({
  routeTree,
  defaultPendingComponent: () => (
    <div className={`p-2 text-2xl`}>
      <Spinner />
    </div>
  ),
  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  context: {
    queryClient,
  },
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>,
  )
}