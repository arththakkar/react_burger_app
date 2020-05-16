import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    const ingridientSummary = Object.keys(props.ingridients)
        .map(igKey => {
            return(
                <li key={igKey}>
                    <span style={{textTransform: "capitalize"}}>{igKey}</span>: {props.ingridients[igKey]}
                </li>
            );
        });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingridients:</p>
            <ul>
                {ingridientSummary}
            </ul>
            <p><strong>Total Price: {props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCanceled}>Cancel</Button>
            <Button btnType="Success" clicked={props.purchaseContinue}>Continue</Button>
        </Aux>
    );
};

export default OrderSummary;