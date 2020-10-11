import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
    let InputType=null;
    switch(props.propstype){
        case 'text':
            InputType=<input className={classes.InputType} {...props} onChange={props.changed}/>
            break;
        case 'checkbox':
            InputType=<input type={props.propstype} className={classes.CheckboxType} {...props} onChange={props.changed}/>
            break;
        default:
            InputType=<input className={classes.InputType} {...props}/>    
    }
    console.log(props.elementtype);
    return (
        <div className={classes.InputDiv}>
            {props.propstype ==='checkbox' ? <label className={classes.Label}>Captcha</label> : null }
            {InputType}
        </div>

    );
}

export default input;