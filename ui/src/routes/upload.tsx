import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, Button } from "@mui/material";
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/upload')({
  component: UploadPage,
})

export default function UploadPage() {
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
                    onChange={(event) => console.log(event.target.files)}
                    multiple
                />
            </Button>
        </Box>
    );
}