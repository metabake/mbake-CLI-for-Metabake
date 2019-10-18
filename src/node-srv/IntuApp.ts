
import { ExpressRPC } from 'mbake/lib/Serv'

// import { ExpressRPC, iAuth } from './Serv'

import { EditorHandler } from './handlers/editorHandler'
import { AdminHandler } from './handlers/adminHandler'
import { UploadHandler } from './handlers/uploadHandler'
const logger = require('tracer').console()

import { IDB } from './lib/IDB';

import { VersionNag } from 'mbake/lib/FileOpsExtra';
import { AppLogic } from './lib/AppLogic';

export class IntuApp extends ExpressRPC {

    db: IDB
    uploadRoute
    configIntu

    constructor(db: IDB, origins: Array<string>, configIntu) {
        super()
        this.makeInstance(origins)

        this.db = db
        this.configIntu = configIntu
        this.uploadRoute = new UploadHandler(this.db, this.configIntu)

        VersionNag.isCurrent('intu', AppLogic.veri()).then(function (isCurrent_: boolean) {
            try {
                if (!isCurrent_)
                    logger.trace('There is a newer version of intu(INTUITION.DEV), please update.')
            } catch (err) {
                logger.trace(err)
            }
        })// 
    }//()

    async run(intuPath) {
        this.appInst.use(function (req, res, next) {
            logger.trace("--req.url", req.url)
            next()
        })

        // await this.db.isSetupDone()
        // order of Handler: api, all intu apps, Web App
        logger.trace('----running')
        //1 API
        const ar = new AdminHandler(this.db, this.configIntu)
        const er = new EditorHandler(this.db, this.configIntu)

        this.routeRPC('/admin', 'admin', ar.handleRPC.bind(ar))

        this.routeRPC('/api', 'editors', er.handleRPC.bind(er))

        this.appInst.post('/upload', this.uploadRoute.upload.bind(this.uploadRoute))

        // get version
        this.appInst.get('/iver', (req, res) => {
            return res.send(AppLogic.veri)
        })

        // 2 INTU
        this.serveStatic(intuPath, null, null)

    }//()


}//class

module.exports = {
    IntuApp
}