import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <Box>
            Hello World
        </Box>
    )
}