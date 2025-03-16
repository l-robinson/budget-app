import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import axios from 'axios';

export const Route = createFileRoute('/')({
    component: Index,
})

function testQuery() {
    return axios.get('/api/hello', { responseType: 'text' });
}

function Index() {
    const info = useQuery({ queryKey: ['test'], queryFn: testQuery })

    if (info.isError) return info.error.message;

    if (info.isFetching) return 'Fetching';

    return (
        <Box>
            Hello {info.data.data}
        </Box>
    )
}