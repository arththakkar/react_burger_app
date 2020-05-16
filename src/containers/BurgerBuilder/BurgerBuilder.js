import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGRIDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 0.3,
    bacon: 0.7
};

class BurgerBuilder extends Component{

    state = {
        ingridients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState (ingridients) {
        const sum = Object.keys(ingridients)
                        .map(igKey => {
                            return ingridients[igKey];
                        })
                        .reduce((sum, el) => {
                            return sum + el;
                        }, 0);
        this.setState({purchasable: sum > 0});
    }

    addIngridientHandler = (type) => {
        const oldCount = this.state.ingridients[type];
        const updatedCount = oldCount + 1;
        const updatedIngridient = {
            ...this.state.ingridients
        };
        updatedIngridient[type] = updatedCount;
        const priceAddition = INGRIDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingridients: updatedIngridient});
        this.updatePurchaseState(updatedIngridient);
    }

    removeIngridientHandler = (type) => {
        const oldCount = this.state.ingridients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngridient = {
            ...this.state.ingridients
        };
        updatedIngridient[type] = updatedCount;
        const priceSubtraction = INGRIDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceSubtraction;
        this.setState({totalPrice: newPrice, ingridients: updatedIngridient});
        this.updatePurchaseState(updatedIngridient);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        alert('You Continue!');
    }

    render (){
        const disabledInfo = {
            ...this.state.ingridients
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingridients={this.state.ingridients}
                        purchaseCanceled={this.purchaseCancelHandler}
                        purchaseContinue={this.purchaseContinueHandler} />
                </Modal>
                <Burger ingridients={this.state.ingridients} />
                <BuildControls 
                    ingridientAdd={this.addIngridientHandler}
                    ingridientLess={this.removeIngridientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandler}
                    purchasable={this.state.purchasable} />
            </Aux>
        );
    }
}

export default BurgerBuilder;