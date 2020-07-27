//all fetch calls here 

const remoteURL = "http://localhost:4040"

export default {
        //"embed" is an optional parameter. the function will work without it.  
        //If "id is omitted, call the function with an empty string in the id parameter"
        getEmbedded(table, id, embed) {
            return fetch(`${remoteURL}/${table}/${id}?_embed=${embed}`)
                .then(result => result.json())
        },
        //"expand" is an optional parameter. the function will work without it.
        getExpanded(table, id, expand) {
            return fetch(`${remoteURL}/${table}/${id}?_expand=${expand}`)
                .then(result => result.json())
        },
        getAll(table) {
            return fetch(`${remoteURL}/${table}`)
                .then(result => result.json())
        },
        //can add to any table
        addObject(table, newObject) {
            return fetch(`${remoteURL}/${table}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newObject)
            }).then(data => data.json())
        },
        deleteObject(table, id) {
            return fetch(`${remoteURL}/${table}/${id}`, {
                method: "DELETE"
            }).then(result => result.json())
        },
        editObject(table, editedObject) {
            return fetch(`${remoteURL}/${table}/${editedObject.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(editedObject)
            }).then(data => data.json());
        }


}