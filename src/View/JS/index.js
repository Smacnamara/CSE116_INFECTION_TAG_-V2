const electron = require(electron)

const {app, BrowserWindow} = require(electron)

let win //stops win from being garbage collected by JVM

function createWindow(){
    let win = new BrowserWindow({width: 800, height: 600})

    win.loadFile('index.html')


    //opens Dev tools
    win.webContents.openDevTools()
    

    //handles win closed
    win.on('closed', () => {
        win = null //deletes corresponding element
    })
}

app.on('ready', createWindow)

app.on("window-all-closed", () => {
    if(process.platform !== darwin){
        app.quit()
    }
})

app.on("activate", () => {
    if(win === null){
        createWindow()
    }
})

