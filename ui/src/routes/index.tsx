import { createFileRoute, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  useRouter().navigate({to: '/accounts'})
}
