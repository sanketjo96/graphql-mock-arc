import React from "react";
import { useProductHierarchy } from "../../../wijmo-table/hooks/TreeHook";
import TreeList from "./ListTree";
import { hierarchyVariable } from "../../../wijmo-table/graphql/variables";

export interface TreeListProps {
    
}
 
const TreeListConatiner: React.SFC<TreeListProps> = () => {
    const [loading, categories, navData, listView] = useProductHierarchy({variables: hierarchyVariable});
    if (loading || categories.length === 0) return <h6>loading</h6>;

    return (  
        <TreeList tree={listView} root={navData}></TreeList>
    );
}
 
export default TreeListConatiner;