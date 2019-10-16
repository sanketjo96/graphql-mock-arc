export const hierarchyVariable = {
    "buyingSessionWhereInput": {
        "id": "ck0de2qq1005007149t4lax4q"
    },
    "genderId": "ck0cax8fu02120714x9yoi99g",
    "quantityType": "BET",
    "productWhereInput": {
        "OR": [
            {
                "product": {}
            }
        ],
        "buyingSession": {
            "id": "ck0de2qq1005007149t4lax4q"
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
    "limit": 100,
    "skip": 0,
    "userId": "ck1ar4499cmkl0793hehx7jsk",
    "zoneIdWhere": null
};

export const updateProduct = {
    buyingSessionProductId: "ck0xftj04grcd0793ib0w0lau",
    quantity: "1211"
}
