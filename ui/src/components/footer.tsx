import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function versionQuery() {
    return axios.get('/api/version', { responseType: 'text' });
}

export function Footer() {
    const info = useQuery({ queryKey: ['version'], queryFn: versionQuery })

    if (info.isError) return info.error.message;

    if (info.isFetching) return 'Fetching';

    return (
        <Box>
            {info.data.data}
        </Box>
    )
}
