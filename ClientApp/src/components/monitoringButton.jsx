import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
root: {
'& > *': {
margin: theme.spacing(1),
},
},
}));

export default function TextButtons() {
const classes = useStyles();

return (
<Button className="monitoringButton">مانیتورینگ آنلاین ویزیتورها</Button>
);
}