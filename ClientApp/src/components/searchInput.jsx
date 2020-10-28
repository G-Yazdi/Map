import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import {DatePicker} from 'react-persian-datepicker';
import Moment from "moment";
const useStyles = makeStyles((theme) => ({
  search: {
    position: "absolute",
    right: 0,
    bottom: "14px",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  }
}));

export default function SearchInput(props) {
  const classes = useStyles();
  const [state, setState]=React.useState(null)

  const onDataChange = (value)=> {
    props.onChange(value);
  }


  return (
    
    <div className={classes.grow}>
          <div className={classes.search} style={{display: "flex"}}>
            <DatePicker calendarStyles={ {
              calendarContainer: "calendarContainer",
              dayPickerContainer: "dayPickerContainer",
              monthsList: "monthsList",
              daysOfWeek: "daysOfWeek",
              dayWrapper: "dayWrapper",
              selected: "selected",
              heading: "heading",
              next: "next",
              prev: "prev",
              title: "title", fontFamily:'Vazir'}} style={{fontFamily:'Vazir'}}
              value={props.date !== '' ? props.date: props.defaultDate}
              defaultValue={props.defaultDate}
              onChange={(value)=>onDataChange(value)}/>
            
            <IconButton style={{color:"rgba(255, 255, 255, 0.54)"}} aria-label="search" onClick={()=>props.onClickSearch()}>
            <div className={classes.searchIcon}>
              <SearchIcon style={{color:"rgba(255, 255, 255, 0.54)"}}/>
            </div>
            </IconButton>
          </div>
    </div>
  );
}
