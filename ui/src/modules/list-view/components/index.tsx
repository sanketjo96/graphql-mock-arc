import * as React from 'react';
import { useProductHierarchy } from "../../wijmo-table/hooks/hooks";
import { hierarchyVariable } from '../../wijmo-table/graphql/variables';
import CategoryVirtualizedList from './List';

export interface ListContainerProps {
    
}
 
const ListContainer: React.SFC<ListContainerProps> = () => {
    const [loading, data] = useProductHierarchy({variables: hierarchyVariable});
    if (loading || data.length === 0) return <h6>loading</h6>;
    return (
        <CategoryVirtualizedList data={data}></CategoryVirtualizedList>
    );
}
 
export default ListContainer;