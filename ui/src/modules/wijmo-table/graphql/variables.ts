export const hierarchyVariable = {
    "buyingSessionWhereInput": {
        "id": "ck0xfthdhgp7g0793wm97j91m"
    },
    "genderId": "ck0wnredmt4jl0793kg8zjnzq",
    "quantityType": "BET",
    "productWhereInput": {
        "OR": [
            {
                "product": {}
            }
        ],
        "buyingSession": {
            "id": "ck0xfthdhgp7g0793wm97j91m"
        }
    }
};

export const products = {
    where: {
        buyingSession: {
            "id": "ck0xfthdhgp7g0793wm97j91m"
        },
        product: {
            AND: [
                {
                    attributes_some: {
                        definition: {
                            name: "activity"
                        },
                        strVal: "LEATHER GOODS"
                    }
                },
                {
                    attributes_some: {
                        definition: {
                            name: "family"
                        },
                        strVal: "SLG"
                    }
                },
                {
                    attributes_some: {
                        definition: {
                            name: "line"
                        },
                        strVal: "AUTRE"
                    }
                }
            ]
        }
    },
    limit: 20,
    skip: 0,
    userId: "ck0wnq39vt2wp0793qt6cxsnb",
    zoneIdWhere: null
};

export const products1 = {
    where: {
        buyingSession: {
            "id": "ck0xfthdhgp7g0793wm97j91m"
        },
        product: {
            AND: [
                {
                    attributes_some: {
                        definition: {
                            name: "activity"
                        },
                        strVal: "LEATHER GOODS"
                    }
                },
                {
                    attributes_some: {
                        definition: {
                            name: "family"
                        },
                        strVal: "BELTS"
                    }
                },
                {
                    attributes_some: {
                        definition: {
                            name: "line"
                        },
                        strVal: "AUTRE"
                    }
                }
            ]
        }
    },
    limit: 20,
    skip: 0,
    userId: "ck0wnq39vt2wp0793qt6cxsnb",
    zoneIdWhere: null
};

export const updateProduct = {
    buyingSessionProductId: "ck0xftj04grcd0793ib0w0lau",
    quantity: "1211"
}
