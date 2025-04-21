import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { createFileRoute, useNavigate, useRouter } from '@tanstack/react-router';
import axios from 'axios';
import CreateAccount from '../../components/account/create-account';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/accounts/')({
    component: Accounts,
    loader: (opts) => {opts.context.queryClient.ensureQueryData(accountsQueryOptions)}
})

const accountsQueryOptions = queryOptions(
    {queryKey: ['accounts'], queryFn: accountsQuery}
);

function accountsQuery() {
    return axios.get('/api/accounts');
}

export function Accounts() {
    const navigate = useNavigate();
    const router = useRouter();
    const accountsQuery = useSuspenseQuery(accountsQueryOptions)
    const accounts = accountsQuery.data.data;

    var message;
    if (accounts.length == 0) {
        message = (<div>No accounts added yet.</div>);
    }

    function onCreated() {
        //navigate({to: '/accounts'});
        //router.invalidate(() => {});
    }

    return (
        <Box>
            {message}
            <CreateAccount onCreated={onCreated}></CreateAccount>
            <List>
                {accounts.map((account: any) => {return (
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => {navigate({to: '/accounts/' + account.id})}}>
                            <ListItemText primary={account.name} />
                        </ListItemButton>
                    </ListItem>
                )})}
            </List>
        </Box>
    )
}