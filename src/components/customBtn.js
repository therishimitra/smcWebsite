import React from 'react'
import {Button} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const StyledButton = withStyles({
    root: {
        width: '230px',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "44px",
        padding: "0 25px",
        boxSizing: "border-box",
        borderRadius: 0, 
        background: "#0075bf",
        color: "#fff",
        transform: "none",
        boxShadow: "2px 2px 0 0 red",
        transition: "background 0.5s,border-color .2s,color 0.2s",
        "&:hover": {
            backgroundColor:  "#F82528"
          },
    },
    label: {
      textTransform: 'capitalize',
    },
  })(Button);

function CustomBtn(props) {
    return (
        
            <StyledButton variant="contained"> {props.txt} </StyledButton>
        
    )
}

export default CustomBtn
