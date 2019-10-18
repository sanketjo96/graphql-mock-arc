import { useQuery } from '@apollo/react-hooks';
import { BUYING_SESSION_PRODUCTS_HIERARCHY_KPIS } from '../graphql/buyingSessionProductsHierarchyKPIs';
import { useState, useEffect } from 'react';

export const HEADERROWHEIGHT = 40;
export const CONTENTROWHEIGHT = 100;
export const MAXCHILDDEPTH = 3

/**
 * Hook for querying user notifications
 */
export const useProductHierarchy = (options: any = null): [boolean, Array<any>, Array<any>, any] => {
  const [categories, setCategories] = useState([]);
  const [listView, setListView] = useState([]);
  const [navData, setNavData] = useState([]);
  const { loading, error, data: hierarchy } = useQuery(BUYING_SESSION_PRODUCTS_HIERARCHY_KPIS, options);


  // Return proccessed data
  // and tree to traverse
  useEffect(() => {
    if (!loading && hierarchy) {
      const treeListStruct: any = {};
      const KPIcategories = hierarchy.buyingSessionProductsKPIs.categories;
      const KPI = KPIcategories.map(function iter(node: any, link: string) {
        if (!node.children) {
          const key = `${link}=${node.name}`;
          const childKeyArray = key.split("=");
          const childdepth = childKeyArray.length ? (childKeyArray.length) : 1;
          treeListStruct[key] = {
            key,
            isSticky: true,
            height: HEADERROWHEIGHT,
            ...node,
            depth: childdepth
          };

          if (childdepth === MAXCHILDDEPTH) {
            treeListStruct[key].children = [`${key}-products`];
            treeListStruct[`${key}-products`] = {
              param: key,
              products: new Array(node.totalProducts).fill(true),
              height: (node.totalProducts * CONTENTROWHEIGHT),
              depth: MAXCHILDDEPTH + 1
            }
          }
          treeListStruct[key].productheight = (node.totalProducts * CONTENTROWHEIGHT);
          return {
            key,
            label: node.name
          }
        }

        if (Array.isArray(node.children)) {
          const rootKey = link ? `${link}=${node.name}` : node.name;
          const children = node.children.map((child: any) => iter(child, rootKey));
          const keyArray = rootKey.split("=");
          const depth = keyArray.length ? (keyArray.length) : 1;
          treeListStruct[rootKey] = {
            ...node,
            key: rootKey,
            depth,
            isSticky: true,
            height: HEADERROWHEIGHT,
            children: children.map((item: any) => item.key)
          };

          return {
            key: rootKey,
            label: node.name,
            children: children
          };
        }
      });
      setNavData(KPI);
      setListView(treeListStruct)
    }
  }, [hierarchy]);

  return [
    loading,
    categories,
    navData,
    listView
  ]
}