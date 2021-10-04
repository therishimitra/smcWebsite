import React from 'react'
import CustomBtn from './customBtn'
import logo from '../logo.png'
import logoMobile from'../logo.png'
import {Toolbar, Typography} from '@material-ui/core'
import {makeStyles} from "@material-ui/core/styles"; 
import { Link } from 'react-router-dom';


const styles = makeStyles({
    bar:{
        paddingTop: "0.40rem",
        backgroundColor: "#FEF5E5",
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
            color:  "#F82528"
        },
        ['@media (max-width:780px)']: { 
            paddingBottom: "1rem"    }
    }
})

function NavBar() {
    const classes = styles()
    return (
        <Toolbar position="sticky" color="rgba(0, 0, 0, 0.87)" className={classes.bar}>   
                
                <a href="https://pfw-smc.notion.site/pfw-smc/PFW-Sweetwater-Music-Center-17d134f1dd704a56909044ddb24d61ed">
                <img src={logo} className={classes.logo}/> 
                <img src={logoMobile} className={classes.logoMobile}/> 
                </a>
                
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;

                <Link to='/'>
                    <CustomBtn txt="Calendar"/>
                </Link>
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;

                <Link to='/Recording'>
                    <CustomBtn txt="Recording Studio"/>
                </Link>
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;

                <Link to='/Rehearsal'>
                    <CustomBtn txt="Rehearsal Spaces"/>
                </Link>
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;

                <Link to='/EditAndCollab'>
                    <CustomBtn txt="Edit and Collab Spaces"/>
                </Link>

            </Toolbar>
    )
}

export default NavBar
