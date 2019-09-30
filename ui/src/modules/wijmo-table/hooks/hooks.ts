import { useQuery } from '@apollo/react-hooks';
import { BUYING_SESSION_PRODUCTS_HIERARCHY_KPIS } from '../graphql/buyingSessionProductsHierarchyKPIs';
import { useState, useEffect } from 'react';

/**
 * Hook for querying user notifications
 */
export const useProductHierarchy = (options: any = null): [Array<any>, boolean] => {
    const [categories, setCategories] = useState([]);
    const { loading, error, data } = useQuery(BUYING_SESSION_PRODUCTS_HIERARCHY_KPIS, options)

    // Mark the leaf nodes with dummy
    // child nodes so that wijmo can enable
    // collapse icon
    useEffect(() => {
        if (!loading && data) {
            const KPIcategories = data.buyingSessionProductsKPIs.categories;
            KPIcategories.some(function iter(row: any) {
                if (!row.children) {
                    row.children = [{
                        leaf: true
                    }];
                    return true;
                }
                Array.isArray(row.children) && row.children.forEach(iter);
                return false;
            });
            setCategories(KPIcategories);
        }
    }, [data]);

    return [
        categories,
        loading
    ]
}