import { useQuery } from '@apollo/react-hooks';
import { BUYING_SESSION_PRODUCTS_HIERARCHY_KPIS } from '../graphql/buyingSessionProductsHierarchyKPIs';
import { useState, useEffect } from 'react';

export const HEADERROWHEIGHT = 40;
export const CONTENTROWHEIGHT = 40;

/**
 * Hook for querying user notifications
 */
export const useProductHierarchy = (options: any = null): [boolean, Array<any>, Array<any>, any] => {
  const [categories, setCategories] = useState([]);
  const [navData, setNavData] = useState([]);
  const [dfs, setDfs] = useState([]);
  const { loading, error, data: hierarchy } = useQuery(BUYING_SESSION_PRODUCTS_HIERARCHY_KPIS, options);

  const getStartPositionWithinList = (result: any) => {
    const previousCategory = (result.length) ? result[result.length - 1] : null
    const previousCategoryStartAt = previousCategory ? previousCategory.itemStartInList : 0;
    const previousCategorySize = previousCategory ? previousCategory.itemSize : 0;
    return previousCategoryStartAt + previousCategorySize;
  }

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
              let object: any = {
                category,
                children1,
                children2,
                totalProducts: children2.totalProducts,
                headers: 3,
                products: [],
                itemSize: (3 * HEADERROWHEIGHT) + (CONTENTROWHEIGHT * children2.totalProducts)
              }
              object.itemStartInList = getStartPositionWithinList(data);
              object.itemEndInList = object.itemStartInList + object.itemSize;
              data.push(object)
            })
          } else {
            let object: any = {
              category,
              children1,
              totalProducts: children1.totalProducts,
              headers: 2,
              products: [],
              itemSize: (2 * HEADERROWHEIGHT) + (CONTENTROWHEIGHT * children1.totalProducts)
            }
            object.itemStartInList = getStartPositionWithinList(data);
            object.itemEndInList = object.itemStartInList + object.itemSize;
            data.push(object)
          }
        })
      });
      setCategories(data);
    }
  }, [hierarchy]);

  // Return proccessed data
  // and tree to traverse
  useEffect(() => {
    if (!loading && hierarchy) {
      const dfsTraversal: any = [];
      const KPIcategories = hierarchy.buyingSessionProductsKPIs.categories;
      const KPI = KPIcategories.map(function iter(node: any, link: string) {
        if (!node.children) {
          dfsTraversal.push(`${link}=${node.name}`)
          return {
            key: `${link}=${node.name}`,
            label: node.name
          }
        }

        if (Array.isArray(node.children)) {
          const rootLink = link ? `${link}=${node.name}` : node.name;
          dfsTraversal.push(rootLink)
          return {
            key: rootLink,
            label: node.name,
            children: node.children.map((child: any) => iter(child, rootLink))
          };
        }
      });
      setNavData(KPI);
      setDfs(dfsTraversal)
    }
  }, [hierarchy]);

  return [
    loading,
    categories,
    navData,
    dfs
  ]
}