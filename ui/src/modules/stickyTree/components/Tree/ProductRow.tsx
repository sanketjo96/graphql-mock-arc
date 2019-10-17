import * as React from 'react';
import TreeListRow from './TreeRow';
import { useQuery } from 'react-apollo';
import { GET_COLLECTION } from '../../../wijmo-table/graphql/collection';
import Skeleton from '@material-ui/lab/Skeleton';
import _ from 'lodash';
import { CONTENTROWHEIGHT } from '../../../wijmo-table/hooks/TreeHook';
const uuidv4 = require('uuid/v4');

export interface ProductRowProps {
    parent: any
}

const ProductRows: React.SFC<ProductRowProps> = ({ parent }) => {
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

    const params = parent.param.split("=");
    products.where.product.AND[0].attributes_some.strVal = params[0];
    products.where.product.AND[1].attributes_some.strVal = params[1];
    products.where.product.AND[2].attributes_some.strVal = params[2];

    const { loading, data: productData } = useQuery(GET_COLLECTION, {
        variables: products
    });

    let rows;
    if (loading && _.isEmpty(productData)) {
        rows = parent.products.map((product: any, index: number) => {
            return <Skeleton variant="rect" style={{margin: '5px'}} width={1733} height={CONTENTROWHEIGHT - 10} />
        })
    } else {
        const productList = productData.buyingSessionProductsConnection.edges;
        rows = productList.map((edge: any, index: number) => {
            return <TreeListRow key={uuidv4()} item={edge.node.product}></TreeListRow>
        })
    }

    return rows;
}
export default ProductRows;