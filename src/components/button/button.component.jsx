import './button.styles.scss';

const BUTTON_CLASSES = {
    google:'google-sign-in',
    inverted: 'inverted',
}

const Button = ({ children, buttonType, ...otherProp }) => {
    return(
        <div>
            <button className={`${BUTTON_CLASSES[buttonType]} button-container`} {...otherProp}>
                { children }
            </button>
        </div>
    )
}

export default Button;