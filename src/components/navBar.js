import React from 'react'
import CustomBtn from './customBtn'
import logo from '../SOM2.png'
import logoMobile from'../logo.png'
import {Toolbar, Typography} from '@material-ui/core'
import {makeStyles} from "@material-ui/core/styles"; 
import { NavLink } from 'react-router-dom';
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';

const styles = makeStyles({
    bar:{
        paddingTop: "0.40rem",
        backgroundColor: "#000000",
        ['@media (max-width:780px)']: { 
           flexDirection: "column"
          }
    },
    logo: {
        width: "100%", 
        ['@media (max-width:780px)']: { 
           display: "none"
           }
    },
    logoMobile:{
        width: "100%", 
        display: "none", 
        ['@media (max-width:780px)']: { 
            display: "inline-block"
            }
    },
    menuItem: {
        cursor: "pointer", 
        flexGrow: 1,
        "&:hover": {
            color:  "#CFB991"
        },
        ['@media (max-width:780px)']: { 
            paddingBottom: "1rem"    }
    }
})

function NavBar() {
    const classes = styles()
    return (
        <Grid container>
        <Grid item xs={12}>
        <Toolbar position="sticky" color="rgba(0, 0, 0, 0.87)" className={classes.bar}>   
                
                <a href="https://pfw-smc.notion.site/pfw-smc/PFW-Sweetwater-Music-Center-17d134f1dd704a56909044ddb24d61ed">
                    <img src={logo} /> 
                </a>
                
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;

                <NavLink exact to='/' style={{ textDecoration: 'none' }} className="main-nav" activeClassName="main-nav-active">
                    <CustomBtn txt="Book Rooms"/>                   
                </NavLink>
                

                <NavLink to='/schedules' style={{ textDecoration: 'none' }} className="main-nav" activeClassName="main-nav-active" >
                    <CustomBtn txt="Room Schedules"/>
                </NavLink>
                

                <NavLink to='/gear' style={{ textDecoration: 'none' }} className="main-nav" activeClassName="main-nav-active">
                    <CustomBtn txt="Gear Checkout"/>
                </NavLink>
                

                <NavLink to='/contact' style={{ textDecoration: 'none' }} className="main-nav" activeClassName="main-nav-active">
                    <CustomBtn txt="Contact Us"/>
                </NavLink>

            </Toolbar>
            </Grid>
            </Grid>
    )
}

export default NavBar
