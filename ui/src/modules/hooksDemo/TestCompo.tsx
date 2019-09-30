import * as React from 'react';
import UseTime from './hook';
import { useLazyQuery } from '@apollo/react-hooks';
import { GET_COLLECTION } from '../wijmo-table/graphql/collection';
import { products1, products } from '../wijmo-table/graphql/variables';

export interface TestProps {

}

const Test = () => {
    const [productQuery, { called, data }] = useLazyQuery(GET_COLLECTION);
    return (
        <React.Fragment>
            <div>
                {data && data.buyingSessionProductsConnection.edges[0].node.product.name}
            </div>
            <button onClick={() => productQuery({
                variables: products
            })}>Timer 1</button>
            <button onClick={() => productQuery({
                variables: products1
            })}>Timer 2</button>
        </React.Fragment>
    );
}
             
export default Test;