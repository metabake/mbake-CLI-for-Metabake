#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commandLineArgs = require("command-line-args");
const IDB_1 = require("./lib/IDB");
const FileOpsExtra_1 = require("mbake/lib/FileOpsExtra");
const IntuApp_1 = require("./IntuApp");
const AppLogic_1 = require("./lib/AppLogic");
const AppLogic_2 = require("./lib/AppLogic");
const logger = require('tracer').console();
const optionDefinitions = [
    { name: 'intu', defaultOption: true },
    { name: 'help', alias: 'h', type: Boolean },
    { name: 'CRUD', alias: 'c', type: Boolean },
    { name: 'ShopShip', alias: 's', type: Boolean },
];
const argsParsed = commandLineArgs(optionDefinitions);
console.log(argsParsed);
const cwd = process.cwd();
function unzipSS() {
    new FileOpsExtra_1.Download('intu4SS', cwd).autoUZ();
    console.info('Extracted a starter Ship and Shop app');
}
function unzipC() {
    new FileOpsExtra_1.Download('CRUD', cwd).autoUZ();
    console.info('Extracted a starter CRUD app');
}
function runISrv() {
    const ip = require('ip');
    const ipAddres = ip.address();
    const hostIP = 'http://' + ipAddres + ':';
    console.log("TCL: hostIP", hostIP);
    const idb = new IDB_1.IDB(AppLogic_2.Util.intuPath, '/IDB.sqlite');
    const mainEApp = new IntuApp_1.IntuApp(idb, ['*']);
    mainEApp.start();
}
function help() {
    console.info();
    console.info('intu version: ' + AppLogic_1.AppLogic.veri());
    console.info();
    console.info('Usage:');
    console.info(' To run:                                                intu');
    console.info(' and then open a browser on the specified port. There is small app inROOT');
    console.info();
    console.info('  For starter CRUD app:                                  intu -c');
    console.info('  For an example of an e-commerce (shop and ship) app:   intu -s');
}
if (argsParsed.CRUD)
    unzipC();
else if (argsParsed.help)
    help();
else if (argsParsed.ShopShip)
    unzipSS();
else
    runISrv();
