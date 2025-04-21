import { Box, Container } from '@mui/material'
import { createRootRouteWithContext, Outlet, useRouterState } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Footer } from '../components/footer'
import Header from '../components/header'
import { Spinner } from '../components/spinner'
import { QueryClient } from '@tanstack/react-query'

function RouterSpinner() {
  const isLoading = useRouterState({ select: (s) => s.status === 'pending' })
  return <Spinner show={isLoading} />
}

export const Route = createRootRouteWithContext<{queryClient: QueryClient}>()({
  component: () => (
    <Box sx={{display: 'flex', flexDirection: 'column', height: 1}}>
      <Header />
      <Container sx={{flexGrow: 1, pt: '1em'}}>
        <RouterSpinner />
        <Outlet />
      </Container>
      <Footer />
      <TanStackRouterDevtools />
    </Box>
  ),
})