export const hierarchyVariable = {
    "buyingSessionWhereInput": {
        "id": "ck1bm3a4n3r3o0793049tn8yn"
    },
    "genderId": "ck1ar8n7tcog707930uqdpydw",
    "quantityType": "BET",
    "productWhereInput": {
        "OR": [
            {
                "product": {}
            }
        ],
        "buyingSession": {
            "id": "ck1bm3a4n3r3o0793049tn8yn"
        }
    }
};

export const products = {
    "where": {
        "buyingSession": {
            "id": "ck1bm3a4n3r3o0793049tn8yn"
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
                        "strVal": "LLG"
                    }
                },
                {
                    "attributes_some": {
                        "definition": {
                            "name": "line"
                        },
                        "strVal": "GV3"
                    }
                }
            ]
        }
    },
    "limit": 20,
    "skip": 0,
    "userId": "ck1ar4499cmkl0793hehx7jsk",
    "zoneIdWhere": null
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
