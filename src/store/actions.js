export const ActionTypes = {
    UPDATE_ITEMS_LIST: "UPDATE_ITEMS_LIST"
}

export const updateItemsList = (tableId, tableData) => {
    return {
        type: ActionTypes.UPDATE_ITEMS_LIST,
        tableId,
        tableData
    }
}