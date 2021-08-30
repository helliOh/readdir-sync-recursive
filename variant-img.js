const fs = require('fs')
const path = require('path')

const isImage = file => (
    [
        '.png', 
        '.jpg', 
        '.gif' 
    ]
    .some(ext => file.name.includes(ext))
)

const readdirSyncRecursive = (current, options={ filterBy : () => true }) =>{
    const { filterBy } = options

    const files = fs.readdirSync(current, { withFileTypes : true })

    const dirs = files
    .filter(file => file.isDirectory())
    .map(file => file.name)

    const normalFiles = files
    .filter(file => !file.isDirectory())
    .filter(file => filterBy(file) )
    .map(file => file.name)

    return {
        root : current === '.',
        path : current,
        isDir : true,
        children : [ 
            ...dirs.map(dir => readdirSyncRecursive( path.resolve(current, dir), options ) ), 
            ...normalFiles.map(normalFile => ({
                root : false,
                path : path.resolve(current, normalFile),
                isDir : false,
                children : undefined
            })) 
        ]
    }
}

const test = readdirSyncRecursive('./dir1', {
    filterBy : isImage 
    
})

// test.children.forEach(e => console.log(e))

console.log(test.children)
console.log()
test.children.forEach(e => console.log(e))