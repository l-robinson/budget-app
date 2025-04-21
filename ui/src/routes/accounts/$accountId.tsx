import { queryOptions, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios';

function accountQueryOptions(accountId: number) {
  return queryOptions({
    queryKey: ['account', accountId],
    queryFn: accountQuery,
  });
}

export const Route = createFileRoute('/accounts/$accountId')({
  component: RouteComponent,
  loader: (ctx) => ctx.context.queryClient.ensureQueryData(accountQueryOptions(Number(ctx.params.accountId))),
})

function accountQuery(l: any) {
  return axios.get('/api/accounts/' + l.queryKey[1]);
}

function RouteComponent() {
  const data = Route.useLoaderData().data;
  return <div>{data.name}</div>
}
