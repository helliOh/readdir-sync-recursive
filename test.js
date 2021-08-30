const fs = require('fs')
const path = require('path')

const readdirSyncRecursive = current =>{
    const files = fs.readdirSync(current, { withFileTypes : true })

    const dirs = files.filter(file => file.isDirectory()).map(file => file.name)
    const normalFiles = files.filter(file => !file.isDirectory()).map(file => file.name)

    return {
        root : current === '.',
        path : current,
        isDir : true,
        children : [ 
            ...dirs.map(dir => recursiveSearch( path.resolve(current, dir) ) ), 
            ...normalFiles.map(normalFile => ({
                root : false,
                path : path.resolve(current, normalFile),
                isDir : false,
                children : undefined
            })) 
        ]
    }
}

const test2 = recursiveSearch('.')

test2.children.forEach(e => console.log(e))