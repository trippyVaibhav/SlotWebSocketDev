"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePayLines = exports.addPayLineSymbols = exports.gameWining = exports.UiInitData = exports.playerData = exports.gameSettings = void 0;
var SlotDataInit_1 = require("./SlotDataInit");
var testData_1 = require("./testData");
var utils_1 = require("./utils");
exports.gameSettings = {
    currentGamedata: {
        id: "",
        linesApiData: [],
        Symbols: [
            {
                Name: "",
                Id: null,
                weightedRandomness: 0,
                useWildSub: false,
                multiplier: []
            }
        ]
    },
    matrix: { x: 5, y: 3 },
    payLine: [],
    scatterPayTable: [],
    bonusPayTable: [],
    useScatter: false,
    useWild: true,
    wildSymbol: {},
    // Symbols: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',"10","11","12"],
    // Weights: [0.1, 0.1, 0.05, 0.05, 0.01, 0.1, 0.1, 0.1, 0.01, 0.01, 0.1, 0.01, 0.01],
    Symbols: [],
    Weights: [],
    resultSymbolMatrix: [],
    lineData: [],
    fullPayTable: [],
    jackpot: {
        symbolName: '',
        symbolsCount: 0,
        symbolId: 0,
        defaultAmount: 0,
        increaseValue: 0
    },
    bonus: {
        start: false,
        stopIndex: -1,
        game: null,
        // game: new bonusGame(5),
    },
    currentBet: 5,
    initiate: function (GameID, clientID) { return __awaiter(void 0, void 0, void 0, function () {
        var data, currentGameData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('https://664c355635bbda10987f44ff.mockapi.io/api/gameId/' + GameID)];
                case 1:
                    data = _a.sent();
                    return [4 /*yield*/, data.json()];
                case 2:
                    data = _a.sent();
                    currentGameData = testData_1.gameData.filter(function (element) { return element.id == GameID; });
                    // gameSettings.currentGamedata=currentGameData[0];
                    exports.gameSettings.currentGamedata = data;
                    exports.gameSettings.Symbols = initSymbols();
                    exports.gameSettings.Weights = initWeigts();
                    exports.UiInitData.paylines = (0, utils_1.convertSymbols)(exports.gameSettings.currentGamedata.Symbols);
                    makePayLines();
                    (0, SlotDataInit_1.sendInitdata)(clientID);
                    return [2 /*return*/];
            }
        });
    }); }
};
function initSymbols() {
    var _a;
    var symbols = [];
    for (var i = 0; i < (exports.gameSettings === null || exports.gameSettings === void 0 ? void 0 : exports.gameSettings.currentGamedata.Symbols.length); i++) {
        symbols.push((_a = exports.gameSettings === null || exports.gameSettings === void 0 ? void 0 : exports.gameSettings.currentGamedata.Symbols[i].Id) === null || _a === void 0 ? void 0 : _a.toString());
    }
    return symbols;
}
function initWeigts() {
    var _a;
    var weights = [];
    for (var i = 0; i < (exports.gameSettings === null || exports.gameSettings === void 0 ? void 0 : exports.gameSettings.currentGamedata.Symbols.length); i++) {
        weights.push((_a = exports.gameSettings.currentGamedata.Symbols[i]) === null || _a === void 0 ? void 0 : _a.weightedRandomness);
    }
    return weights;
}
exports.playerData = {
    Balance: 1000,
    haveWon: 0,
    // haveUsed: 0
};
exports.UiInitData = {
    paylines: (0, utils_1.convertSymbols)(exports.gameSettings.currentGamedata.Symbols),
    spclSymbolTxt: [],
    AbtLogo: {
        logoSprite: "https://iili.io/JrMCqPf.png",
        link: "https://dingding-game.vercel.app/login",
    },
    ToULink: "https://dingding-game.vercel.app/login",
    PopLink: "https://dingding-game.vercel.app/login",
};
exports.gameWining = {
    winningSymbols: undefined,
    WinningLines: undefined,
    TotalWinningAmount: 0,
    shouldFreeSpin: undefined,
    freeSpins: 0,
    currentBet: 0,
};
function addPayLineSymbols(symbol, repetition, pay, freeSpins) {
    var line = Array(repetition).fill(symbol); // Create an array with 'repetition' number of 'symbol'
    if (line.length != exports.gameSettings.matrix.x) {
        var lengthToAdd = exports.gameSettings.matrix.x - line.length;
        for (var i = 0; i < lengthToAdd; i++)
            line.push("any");
    }
    exports.gameSettings.payLine.push({
        line: line,
        pay: pay,
        freeSpins: freeSpins
    });
}
exports.addPayLineSymbols = addPayLineSymbols;
function makePayLines() {
    exports.gameSettings.currentGamedata.Symbols.forEach(function (element) {
        var _a, _b;
        if (element.useWildSub || ((_a = element.multiplier) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            (_b = element.multiplier) === null || _b === void 0 ? void 0 : _b.forEach(function (item, index) {
                var _a;
                addPayLineSymbols((_a = element.Id) === null || _a === void 0 ? void 0 : _a.toString(), 5 - index, item[0], item[1]);
            });
        }
        else {
            handleSpecialSymbols(element);
        }
    });
}
exports.makePayLines = makePayLines;
function handleSpecialSymbols(symbol) {
    switch (symbol.Name) {
        case utils_1.specialIcons.jackpot:
            exports.gameSettings.jackpot.symbolName = symbol.Name;
            exports.gameSettings.jackpot.symbolId = symbol.Id;
            exports.gameSettings.jackpot.symbolsCount = symbol.symbolsCount;
            exports.gameSettings.jackpot.defaultAmount = symbol.defaultAmount;
            exports.gameSettings.jackpot.increaseValue = symbol.increaseValue;
            break;
        case utils_1.specialIcons.wild:
            exports.gameSettings.wildSymbol.SymbolName = symbol.Name;
            exports.gameSettings.wildSymbol.SymbolID = symbol.Id;
            break;
        case utils_1.specialIcons.scatter:
            exports.gameSettings.scatterPayTable.push({
                symbolCount: symbol.count,
                symbolID: symbol.Id,
                pay: symbol.pay,
                freeSpins: symbol.freeSpin
            });
            break;
        case utils_1.specialIcons.bonus:
            exports.gameSettings.bonusPayTable.push({
                symbolCount: symbol.symbolCount,
                symbolID: symbol.Id,
                pay: symbol.pay,
                highestPayMultiplier: symbol.highestMultiplier
            });
            break;
        default:
            break;
    }
}
