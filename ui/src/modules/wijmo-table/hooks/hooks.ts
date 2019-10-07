import { useQuery } from '@apollo/react-hooks';
import { BUYING_SESSION_PRODUCTS_HIERARCHY_KPIS } from '../graphql/buyingSessionProductsHierarchyKPIs';
import { useState, useEffect } from 'react';

/**
 * Hook for querying user notifications
 */
export const useProductHierarchy = (options: any = null): [Array<any>, Array<any>, boolean] => {
  const [categories, setCategories] = useState([]);
  const [dfs, setDFS] = useState([]);
  const { loading, error, data } = useQuery(BUYING_SESSION_PRODUCTS_HIERARCHY_KPIS, options);
  // Mark the leaf nodes with dummy
  // child nodes so that wijmo can enable
  // collapse icon
  useEffect(() => {
    if (!loading && data) {
      const dfsTraversal: any = [];
      const KPIcategories = data.buyingSessionProductsKPIs.categories;
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
      setCategories(KPI);
      setDFS(dfsTraversal);
    }
  }, [data]);

  return [
    categories,
    dfs,
    loading
  ]
}