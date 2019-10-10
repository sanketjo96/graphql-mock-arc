import ReactDOM from 'react-dom';

export const renderReactIntoGridCell = (cell: any, key: string, component: any, nodeDicts: Map<String, HTMLElement>) => {
    let reactCellDiv: HTMLDivElement;

    // Remove inline editor
    if (cell.childNodes.length === 1) {
        const item = cell.childNodes[0] as HTMLElement;  // Can also be text after editing
        if (!item.classList) {
            item.remove()
        }
    }

    if (key && nodeDicts && nodeDicts.has(key)) {
        let existingNode = nodeDicts.get(key)
        if (existingNode) {
            ReactDOM.unmountComponentAtNode(existingNode);
            nodeDicts.delete(key)
        }
        else {
            cell.appendChild(existingNode)
            return
        }
    }

    if (cell.childNodes.length === 0) {
        reactCellDiv = document.createElement('div') as HTMLDivElement;
        cell.appendChild(reactCellDiv)
        reactCellDiv.classList.add('react-cell-container')
    } else {
        reactCellDiv = cell.childNodes[0] as HTMLDivElement
    }

    ReactDOM.render(component, reactCellDiv)
    if (key) {
        if (nodeDicts) {
            nodeDicts.set(key, reactCellDiv)
        }
        else {
            console.warn(`You are rendering a dynamic react tree into a wijmo cell but not providing a dictionary to track the cell for later disposal.  You must provide a dictionary in addition to a key (${key}).  Failure to do this will lead to memory leaks!`)
        }
    }
    else {
        console.warn(`You are rendering a dynamic react tree into a wijmo cell but not providing a key to track the tree later for cleanup.  This will lead to memory leaks!`)
    }
}