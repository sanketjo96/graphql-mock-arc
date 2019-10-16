import { gql } from "apollo-boost";
export const GET_COLLECTION = gql `query getBSProducts(
	$where: BuyingSessionProductWhereInput!
	$userId: ID!
	$zoneIdWhere: ZoneAssortmentProductWhereInput
	$skip: Int!
	$limit: Int!
	$sortBy: ProductSortByInput
) {
	buyingSessionProductsConnection(
		where: $where
		sortBy: $sortBy
		limit: $limit
		offset: $skip
	) {
		pageInfo {
			hasNextPage
		}
		edges {
			node {
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
				zoneRetailPrice : zoneRetailPrice {
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
				totalFavourites : favourites{
					id
				}
				favourites(where: { user: { id: $userId } }) {
					id
				}
				buyingSession {
					id
					status
					activity {
						id
						description
					}
					collection{
						id
						description
					}
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
				clusterAssortmentProducts  {
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
				zoneAssortmentProducts(where: $zoneIdWhere)
				{
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
					buyerClusters{
						id
						name
						colorHex
					}
					zoneRetailPrice {
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
		}
	}
}`;
