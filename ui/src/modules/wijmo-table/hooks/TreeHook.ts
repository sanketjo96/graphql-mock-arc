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
        category.children.forEach((children1: any, index: number) => {
          // Family
          if (children1.children) {
            // Line
            children1.children.forEach((children2: any) => {
              let object: any = {
                children1,
                children2,
                totalProducts: children2.totalProducts,
                headers: 3,
                products: [],
                itemSize: (3 * HEADERROWHEIGHT) + (CONTENTROWHEIGHT * children2.totalProducts)
              }
              object[`category${index}`] = category.name;
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
      const treeListStruct: any = {};
      const KPIcategories = hierarchy.buyingSessionProductsKPIs.categories;
      const KPI = KPIcategories.map(function iter(node: any, link: string) {
        if (!node.children) {
          const key = `${link}=${node.name}`;
          const childKeyArray = key.split("=");
          const childdepth = childKeyArray.length ? (childKeyArray.length) : 1;
          treeListStruct[key] = {
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