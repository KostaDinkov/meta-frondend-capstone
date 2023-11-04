import styles from './styles.module.scss';

export default function FormErrorField({ display, message }) {

    let stylesArray = [];
    stylesArray.push(styles.errorField);
    if(display){
        stylesArray.push(styles.errorDisplay)
    }
    else(
        stylesArray.push(styles.errorHide)
    )
    return(
        <div className={stylesArray.join(' ')}>{message}</div>
    )
}
