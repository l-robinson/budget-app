import { Button, FormControl, FormControlLabel, InputLabel, MenuItem, Paper, Select, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Box from '@mui/material/Box';
import { useState } from 'react';

function ColumnDefiner({ filename, rows, columns, onSubmit }) {
    const [header, setHeader] = useState(false);
    const [colSettings, setColSettings] = useState(columns.map(() => {return {error: false, col: ""}}));

    function handleChange(idx, value) {
        const settings = new Array();
        const nextSettings = colSettings.map((c, i) => {
            var nextVal = i === idx ? value : c.col;
            var nextError = settings.indexOf(nextVal) >= 0;
            if (nextVal) {
                settings.push(nextVal);
            }
            return {error: nextError, col: nextVal};
        });
        setColSettings(nextSettings);
    }

    function submit() {
        onSubmit(colSettings);
    }

    return (
        <Box>
            <Box>Preview of {filename}</Box>
            <FormControlLabel
                value="header"
                control={<Switch color="primary" checked={header} onChange={(event, checked) => setHeader(checked)} />}
                label="Ignore First Row"
                labelPlacement="start"
            />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small">
                    <TableHead>
                        <TableRow>
                            {rows[0].map((c, i) => (<Header key={"col-" + i} columns={columns} idx={i} colSettings={colSettings} onChange={(idx, val) => handleChange(idx, val)}></Header>))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, idx) => {
                            if (!header || idx > 0) {
                                return (
                                    <TableRow
                                        key={"row-" + idx}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        {row.map((col, i) => (<TableCell key={"row-" + idx + "-col-" + i}>{col}</TableCell>))}
                                    </TableRow>
                                );
                            }
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained" onClick={submit}>Submit</Button>
        </Box>
    );
}

function Header({columns, idx, colSettings, onChange}) {
    const id = "header-select-" + {idx};
    return (
    <TableCell component="th">
        <FormControl sx={{ minWidth: 180 }} error={colSettings[idx].error}>
            <InputLabel id={id + "-label"}>Content Type</InputLabel>
            <Select id={id} label="Content Type" labelId={id + "-label"} value={colSettings[idx].col} onChange={(e) => onChange(idx, e.target.value)}>
                <MenuItem value="">* IGNORED *</MenuItem>
                {columns.map((col => (<MenuItem key={col.col} value={col.col}>{col.displayName}</MenuItem>)))}
            </Select>
        </FormControl>
    </TableCell>
    )
}



export default ColumnDefiner