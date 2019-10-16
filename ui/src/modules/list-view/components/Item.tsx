import * as React from 'react';
import { ListSubheader, Typography } from '@material-ui/core';
import { Query, useQuery } from "react-apollo";
import ListRow from './Row';
import { GET_COLLECTION } from '../../wijmo-table/graphql/collection';
import _ from 'lodash';

const uuidv4 = require('uuid/v4');

export interface RowProps {
    data: Array<any>
    index: number,
    style: any
};

export const Item: React.SFC<RowProps> = ({ data, index, style }) => {
    const item = data[index];
    let productList = new Array(item.totalProducts);
    const products = {
        "where": {
            "buyingSession": {
                "id": "ck0de2qq1005007149t4lax4q"
            },
            "product": {
                "AND": [
                    {
                        "attributes_some": {
                            "definition": {
                                "name": "activity"
                            },
                            "strVal": "LEATHER GOODS"
                        }
                    },
                    {
                        "attributes_some": {
                            "definition": {
                                "name": "family"
                            },
                            "strVal": "MEDIUM LEATHER GOODS"
                        }
                    },
                    {
                        "attributes_some": {
                            "definition": {
                                "name": "line"
                            },
                            "strVal": "BOND"
                        }
                    }
                ]
            }
        },
        "limit": 100,
        "skip": 0,
        "userId": "ck1q7cctx03lo0814msrg2u45",
        "zoneIdWhere": null
    };
    products.where.product.AND[0].attributes_some.strVal = item.category.name;
    products.where.product.AND[1].attributes_some.strVal = item.children1.name;
    products.where.product.AND[2].attributes_some.strVal = item.children2.name;

    const { loading, data: productData } = useQuery(GET_COLLECTION, {
        variables: products
    });


    const getListData = () => {
        if (loading && _.isEmpty(productData)) {
            return (
                _.map(productList, () => {
                    return <ListRow key={uuidv4()}></ListRow>
                })
            )
        } else {
            productList = productData.buyingSessionProductsConnection.edges;
            return (
                _.map(productList, (edge: any) => {
                    return <ListRow key={uuidv4()} item={edge.node.product}></ListRow>
                })
            )
        }
    }

    return (
        <div key={index} style={style}>
            <ListSubheader disableGutters style={{ backgroundColor: 'white' }}>
                <div>
                    <ListRow item={item.category} type="category"></ListRow>
                    <ListRow item={item.children1} type="category"></ListRow>
                    <ListRow item={item.children2} type="category"></ListRow>
                </div>
            </ListSubheader>
            {getListData()}
        </div>
    );
}