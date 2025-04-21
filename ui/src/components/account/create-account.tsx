import { Addchart } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

function create(name: string) {
    return axios.post('/api/accounts', null, {params: {'name': name}});
}

function CreateAccount({onCreated} : {onCreated: any}) {
    const [accountName, setAccountName] = useState('');
    const [creating, setCreating] = useState(false);

    const queryClient = useQueryClient();
    const accountMutation = useMutation({
        mutationFn: create,
        onSuccess: () => {
            setAccountName('');
            setCreating(false);
            queryClient.invalidateQueries({ queryKey: ['accounts'], exact: true })
        },
    })

    if (creating) {
        return (
                <TextField
                required
                id="account-name"
                label="Account name"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                slotProps={{
                    input: {
                        endAdornment:
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label='Add Account'
                                    onClick={() => accountMutation.mutate(accountName)}
                                    edge="end"
                                >
                                    <Addchart />
                                </IconButton>
                            </InputAdornment>,
                    },
                }}
                ></TextField>
        );
    } else {
        return (
            <Button variant="contained" tabIndex={-1} onClick={() => setCreating(true)} size="large">Add new Account</Button>
        );
    }
}

export default CreateAccount;