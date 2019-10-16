import { gql } from "apollo-boost";


export const BUYING_SESSION_PRODUCTS_HIERARCHY_KPIS = gql `query buyingSessionProductsHierarchyKPIs(
  $buyingSessionWhereInput: BuyingSessionWhereInputForCollection!
  $genderId: ID!
  $productWhereInput: BuyingSessionProductWhereInput!
  $quantityType: ProductQuantityType!
) {
  buyingSessionProductsKPIs(
    where: $productWhereInput,
    whereWithoutFilter: {
      buyingSession: $buyingSessionWhereInput
    }, input: {
      gender: $genderId,
      quantityType: $quantityType
    }
  ) {
    categories {
      totalProducts
      totalValue
      totalQuantity
      totalStores
      aws
      salesQty
      mixValue
      mixQuantity
      name
      averageDepth
      skuEfficiency
      childrenMeta
      children {
        totalProducts
        totalValue
        totalQuantity
        totalStores
        salesQty
        aws
        mixValue
        mixQuantity
        name
        averageDepth
        skuEfficiency
        children {
          totalProducts
          totalValue
          totalQuantity
          totalStores
          salesQty
          aws
          mixValue
          mixQuantity
          name
          averageDepth
          skuEfficiency
          
        }
      }
    }
  }
}`;
