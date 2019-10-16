import { gql } from "apollo-boost";


export const UPDATE_PRODUCT = gql`mutation updateBuyingSessionProductBetQauntity(
    $buyingSessionProductId: ID!
    $quantity: Int
    $zoneIdWhere: ZoneAssortmentProductWhereInput
  ) {
    updateBuyingSessionProductBetQauntity(
      input: { quantity: $quantity }
      where: { id: $buyingSessionProductId }
    ) {
      id
      isActive
      productStatus
      moq
      avgRatingCount
      storeCount
      comments(first: 1) {
        id
      }
      productClusterStatus {
        id
        status {
          id
          name
        }
        cluster {
          id
          name
        }
      }
      retailPrice: centralRetailPrice {
        id
        price
        priceList {
          id
          currency {
            id
            code
          }
        }
      }
      totalFavourites: favourites {
        id
      }
      buyingSession {
        id
        status
      }
      channels {
        id
        name
      }
      freeTags {
        id
        name
      }
      salesPeriod {
        id
        name
        startDate
        endDate
      }
      buy {
        id
        quantity
      }
      bet {
        id
        quantity
      }
      assortmentProducts: clusterAssortmentProducts {
        id
        assortment {
          id
          cluster {
            id
            name
            colorHex
          }
        }
      }
      zoneAssortmentProducts: zoneAssortmentProducts(where: $zoneIdWhere) {
        id
        storeCount
        bet {
          id
          quantity
        }
        buy {
          id
          quantity
        }
        zoneAssortment {
          id
          zone {
            id
            name
          }
        }
        buyerClusters {
          id
          name
          colorHex
        }
        retailPrice: zoneRetailPrice {
          id
          price
          priceList {
            id
            currency {
              id
              code
            }
          }
        }
      }
      product {
        name
        id
        active
        image {
          id
        }
        looks {
          id
          image {
            id
          }
        }
        attributes {
          id
          strVal
          intVal
          tag {
            id
            name
          }
          definition {
            id
            name
            displayName {
              id
              singular
            }
          }
        }
        type {
          id
          name
        }
      }
  }
}`;
