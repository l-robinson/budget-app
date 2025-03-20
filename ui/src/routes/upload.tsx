import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, Button } from "@mui/material";
import { useMutation, useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import axios from 'axios';
import ColumnDefiner from '../components/upload/column-definer';

export const Route = createFileRoute('/upload')({
  component: UploadPage,
})

function upload(file: File) {
    const formData = new FormData()
    formData.append('file', file)
    return axios.post('/api/upload/account', formData);
}

function process({uuid, colSettings}) {
    return axios.post('/api/upload/account-process', {uuid: uuid, colSettings: colSettings.map((c) => c.col)});
}

function UploadPage() {
    const ulMutation = useMutation({
        mutationFn: upload,
    })
    const procMutation = useMutation({
        mutationFn: process,
    })

    if (ulMutation.isPending) {
        return <Box>Uploading...</Box>
    }
    
    if (ulMutation.isError) {
        return <Box>ERROR: {ulMutation.error.message}</Box>
    }

    if (ulMutation.isSuccess) {
        const data = ulMutation.data.data
        return <ColumnDefiner filename = {data.filename} rows = {data.lines} columns = {data.columns} onSubmit={(colSettings) => {procMutation.mutate({uuid: data.uuid, colSettings: colSettings})}}></ColumnDefiner>
    }

    return (
        <Box>
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
            >
                Upload files
                <input
                    style={{display: 'none'}}
                    type="file"
                    onChange={(event) => ulMutation.mutate(event.target.files[0])}
                    multiple
                />
            </Button>
        </Box>
    );
}