import { useQuery } from '@apollo/react-hooks';
import { BUYING_SESSION_PRODUCTS_HIERARCHY_KPIS } from '../graphql/buyingSessionProductsHierarchyKPIs';
import { useState, useEffect } from 'react';

/**
 * Hook for querying user notifications
 */
export const useProductHierarchy = (options: any = null): [boolean, Array<any>] => {
  const [categories, setCategories] = useState([]);
  const { loading, error, data: hierarchy } = useQuery(BUYING_SESSION_PRODUCTS_HIERARCHY_KPIS, options);

  // Return proccessed data
  // and tree to traverse
  useEffect(() => {
    if (!loading && hierarchy) {
      let data: any = []
      hierarchy.buyingSessionProductsKPIs.categories.forEach((category: any) => {
        // Activity
        category.children.forEach((children1: any) => {
          // Family
          if (children1.children) {
            // Line
            children1.children.forEach((children2: any) => {
              // TODO: Define interface
              let object: any = {
                category,
                children1,
                children2,
                totalProducts: children2.totalProducts,
                headers: 3,
                products: []
              }

              data.push(object)
            })
          } else {
            let object: any = {
              category,
              children1,
              totalProducts: children1.totalProducts,
              headers: 2,
              products: []
            }
            data.push(object)
          }
        })
      });
      setCategories(data);
    }
  }, [hierarchy]);

  return [
    loading,
    categories
  ]
}