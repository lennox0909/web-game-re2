window.__require = function t(e, a, i) {
    function n(r, c) {
        if (!a[r]) {
            if (!e[r]) {
                var s = r.split("/");
                if (s = s[s.length - 1], !e[s]) {
                    var h = "function" == typeof __require && __require;
                    if (!c && h) return h(s, !0);
                    if (o) return o(s, !0);
                    throw new Error("Cannot find module '" + r + "'")
                }
                r = s
            }
            var l = a[r] = {
                exports: {}
            };
            e[r][0].call(l.exports, function(t) {
                return n(e[r][1][t] || t)
            }, l, l.exports, t, e, a, i)
        }
        return a[r].exports
    }
    for (var o = "function" == typeof __require && __require, r = 0; r < i.length; r++) n(i[r]);
    return n
}({
    GSAudioManager: [function(t, e) {
        "use strict";
        cc._RF.push(e, "03cb1LEFS5JHIHcNGe9Pbpu", "GSAudioManager");
        var a = function() {
                function t() {}
                t.getInstance = function() {
                    return i || (i = new t), i
                };
                var e = t.prototype;
                return e.init = function(t, e) {
                    this.bgMusicCache = new Map, this.soundCache = new Map, this.isMute = !1, this.soundConfig = t, this.musicConfig = e, this.currentPlayMusicPath = "";
                    var a = GS.KVStorage.loadStr(GS.Constants.AUDIO_MUTE_KEY, "0");
                    this.isMute = "0" !== a
                }, e.loadRes = function() {
                    var t = this;
                    this.soundConfig && Reflect.ownKeys(this.soundConfig).forEach(function(e) {
                        if ("length" != e)
                            for (var a in t.soundConfig[e]) {
                                var i = t.soundConfig[e][a];
                                !t.soundCache.has(i) && t.addSoundByPath(i)
                            }
                    }), this.musicConfig && Reflect.ownKeys(this.musicConfig).forEach(function(e) {
                        if ("length" != e)
                            for (var a in t.musicConfig[e]) {
                                var i = t.musicConfig[e][a];
                                !t.bgMusicCache.has(i) && t.addMusicByPath(i)
                            }
                    })
                }, e.addSoundByPath = function(t, e) {
                    var a = this;
                    void 0 === e && (e = !1);
                    try {
                        this.soundCache.has(t) ? e && this.playSound(t) : cc.loader.loadRes(t.split(".")[0], function(i, n) {
                            i ? a.log.error("addSoundByPath", t) : (a.soundCache.set(t, n), e && a.playSound(t))
                        })
                    } catch (i) {
                        this.log.error("addSoundByPath", t)
                    }
                }, e.addMusicByPath = function(t, e) {
                    var a = this;
                    void 0 === e && (e = !1);
                    try {
                        this.bgMusicCache.has(t) ? is_play && this.playMusic(url) : cc.loader.loadRes(t, function(i, n) {
                            i ? a.log.error("addMusicByPath", t) : (a.bgMusicCache.set(t, n), e && a.playMusic(t))
                        })
                    } catch (i) {
                        this.log.error("addMusicByPath", t)
                    }
                }, e.playMusic = function(t, e, a) {
                    void 0 === e && (e = !0), void 0 === a && (a = 1), this.currentPlayMusicPath = t, this.stopMusic(), this.isMute || (this.bgMusicCache.has(t) ? cc.audioEngine.play(this.bgMusicCache.get(t), e, a) : this.addMusicByPath(t, !0))
                }, e.stopMusic = function() {
                    cc.audioEngine.stopAll()
                }, e.playSound = function(t, e) {
                    this.isMute || (this.soundCache.has(t) ? cc.audioEngine.play(this.soundCache.get(t), !1, e) : this.addSoundByPath(t, !0))
                }, e.setMute = function(t) {
                    this.isMute = t;
                    var e = this.isMute ? "1" : "0";
                    GS.KVStorage.saveStr(GS.Constants.AUDIO_MUTE_KEY, e)
                }, t
            }(),
            i = null;
        e.exports = a.getInstance(), cc._RF.pop()
    }, {}],
    GSConstants: [function(t, e) {
        "use strict";
        cc._RF.push(e, "2f06bbwanlBk6ovKiH68aNk", "GSConstants");
        e.exports = {
            currentScore: 0,
            currentLevel: 1
        }, cc._RF.pop()
    }, {}],
    GSDate: [function(t, e) {
        "use strict";
        cc._RF.push(e, "eaeb56EkQdByq40hF6Y+m6i", "GSDate");
        var a = {
            timeStamp: function() {
                return (new Date).getTime()
            },
            formatTime: function(t) {
                var e = new Date(t),
                    a = e.getFullYear(),
                    i = e.getMonth() + 1,
                    n = e.getDate();
                return e.getHours(), e.getMinutes(), e.getSeconds(), a + "-" + add0(i) + "-" + add0(n)
            },
            dateDifference: function() {
                var t = a.formatTime(ts1),
                    e = a.formatTime(ts2);
                ts1 = new Date(t.replace(/-/g, "/")), ts2 = new Date(e.replace(/-/g, "/"));
                var i = ts1.getTime() - ts2.getTime();
                return parseInt(i / 864e5)
            },
            formatCountDownTime: function(t) {
                var e = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09"],
                    a = parseInt(t / 36e5),
                    i = parseInt((t - 36e5 * a) / 6e4),
                    n = parseInt((t - 36e5 * a - 6e4 * i) / 1e3);
                return (a = a < 10 ? e[a] : a + "") + ":" + (i = i < 10 ? e[i] : i + "") + ":" + (n < 10 ? e[n] : n + "")
            },
            getTodayDayTag: function() {
                return a.formatTime((new Date).getTime())
            },
            getTimeByDateTag: function(t) {
                var e = t.split("-"),
                    a = parseInt(e[0]),
                    i = parseInt(e[1]),
                    n = parseInt(e[2]),
                    o = new Date;
                return o.setFullYear(a), o.setMonth(i - 1), o.setDate(n), o.getTime()
            }
        };
        e.exports = a, cc._RF.pop()
    }, {}],
    GSKVStorage: [function(t, e) {
        "use strict";
        cc._RF.push(e, "abf66OOxaNNEqtDcQU6ihYs", "GSKVStorage");
        var a = null,
            i = function() {
                function t() {}
                t.getInstance = function() {
                    return a || (a = new t), a
                };
                var e = t.prototype;
                return e.saveStr = function(t, e) {
                    cc.sys.localStorage.setItem(t, e)
                }, e.loadStr = function(t, e) {
                    return void 0 === e && (e = ""), cc.sys.localStorage.getItem(t) || e
                }, e.saveObj = function(t, e) {
                    var a = JSON.stringify(e);
                    this.saveStr(t, a)
                }, e.loadObj = function(t, e) {
                    void 0 === e && (e = "");
                    var a = this.loadStr(t, e);
                    return a ? JSON.parse(a) : a
                }, e.remove = function(t) {
                    cc.sys.localStorage.removeItem(t)
                }, t
            }();
        e.exports = i.getInstance(), cc._RF.pop()
    }, {}],
    GS: [function(t, e) {
        "use strict";
        cc._RF.push(e, "84257ENSUNE3pT/xWF/hwzD", "GS"), cc.log("GS IS LOAD"), window.GS = {}, GS.Constants = t("./commonJs/GSConstants"), GS.KVStorage = t("./commonJs/GSKVStorage"), GS.AudioManager = t("./commonJs/GSAudioManager"), GS.Date = t("./commonJs/GSDate"), GS.GetCurrentLevel = t("./commonJs/getCurrentLevel").getCurrentLevel, GS.SetCurrentLevel = t("./commonJs/getCurrentLevel").setCurrentLevel, GS.RemoveCurrentLevel = t("./commonJs/getCurrentLevel").removeCurrentLevel, cc.log("GS IS END"), cc._RF.pop()
    }, {
        "./commonJs/GSAudioManager": "GSAudioManager",
        "./commonJs/GSConstants": "GSConstants",
        "./commonJs/GSDate": "GSDate",
        "./commonJs/GSKVStorage": "GSKVStorage",
        "./commonJs/getCurrentLevel": "getCurrentLevel"
    }],
    GameConfig: [function(t, e) {
        "use strict";
        cc._RF.push(e, "f0663sWtfNKCKOL+Hvnt0cI", "GameConfig");
        var a = {
            GameClubButton: null,
            GameScene: null,
            launchScene: null,
            Bros: null,
            caS: null,
            MAIN_MENU_NUM: "Classic",
            gameScore: 0,
            standScore: 30,
            GAME_OVER_BOOL: !0,
            publicGameBool: !1,
            ranLinkData: null,
            recGameData: null,
            InfoData: null,
            endShow0: null,
            endShow1: null,
            endShow2: null,
            endShow3: null,
            infoGameName: null,
            showText: null,
            startText: null,
            moreGameText: null,
            playAgainText: null,
            playNum: 0,
            noTouchBool: !0,
            returnRanNum: function(t, e) {
                return t + Math.floor(Math.random() * (e - t + 1))
            }
        };
        e.exports = a, cc._RF.pop()
    }, {}],
    GameData: [function(t, e) {
        "use strict";
        cc._RF.push(e, "e0520FlQPZBJakCpLLYMmnA", "GameData"), window.GameData = {
            isGooglePlay: !1,
            isOnline: !0,
            isStart: !0,
            isover: !1,
            bestScore: 0,
            score: 0,
            MainGameJS: null,
            arrPos: [],
            UIJS: null,
            scoreHeight: 0,
            speedUpJS: null,
            isGameOver: !1,
            isTouch: !1,
            speed: 800,
            rootJS: null,
            mapWidth: 140,
            isdestory: !1,
            GameScale: 1,
            onCarArr: [],
            carPosArr: [],
            isRepaly: !0,
            isMute: !1,
            key: !0,
            isfuhuo: !1
        }, cc._RF.pop()
    }, {}],
    GameUiTools: [function(t, e) {
        "use strict";
        cc._RF.push(e, "b21e8tF461OFalpptyeuAE2", "GameUiTools"), t("GameConfig");
        var a = {
            newSprite: function(t, e) {
                var a = new cc.Node;
                return e ? (t = t.split(".")[0], a.addComponent(cc.Sprite).spriteFrame = GameTools.love2048FrameCache.getSpriteFrame(t)) : a.addComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame("res/raw-assets/resources/" + t), a
            },
            setNodeSpriteFrame: function(t, e) {
                t.getComponent(cc.Sprite).spriteFrame = GameTools.love2048FrameCache.getSpriteFrame(e)
            },
            setButtonClickEvents: function(t, e, a, i, n) {
                var o = new Array;
                null == e.length ? o[0] = e : o = e;
                for (var r = 0; r < o.length; r++) {
                    var c = new cc.Component.EventHandler;
                    c.target = t.node, c.component = t.node.name, c.handler = a, null == e.length ? c.customEventData = i : c.customEventData = r;
                    var s = o[r].addComponent(cc.Button);
                    s.clickEvents.push(c), (null == n || n) && (s.transition = cc.Button.Transition.SCALE, s.duration = .1, s.zoomScale = 1.2)
                }
            },
            scheduleOnce: function(t, e, a) {
                t.runAction(cc.sequence(cc.delayTime(a), cc.callFunc(e, t)))
            },
            loadingScene: function(t, e) {
                e ? cc.loader.loadRes("panel/LoadingLayer", function(e, a) {
                    var i = cc.instantiate(a);
                    cc.director.getScene().children[0].addChild(i), cc.director.preloadScene(t, function() {
                        cc.director.loadScene(t)
                    })
                }) : cc.director.preloadScene(t, function() {
                    cc.director.loadScene(t)
                })
            },
            loadingLayer: function(t) {
                cc.loader.loadRes(t, function(t, e) {
                    if (!t) {
                        var a = cc.instantiate(e);
                        cc.director.getScene().children[0].addChild(a, 100)
                    }
                })
            }
        };
        e.exports = a, cc._RF.pop()
    }, {
        GameConfig: "GameConfig"
    }],
    HttpManagerJs: [function(t, e) {
        "use strict";
        var a;
        cc._RF.push(e, "197e1hfNnxIcJx73V3VhUxY", "HttpManagerJs");
        var i = t("GameConfig"),
            n = ((a = {
                URL: "http://g.vsane.com/Service/Share/index",
                cacheList: null,
                isBusy: null,
                req: null,
                perform: null,
                retGameId: 0
            }).cacheList = [], a.ctor = function() {}, a.checkHave = function() {
                this.isBusy || this.sendOne()
            }, a.httpInitUrl = function(t) {
                var e = window.location.href,
                    a = e.substring(0, e.lastIndexOf("//") + 2) + window.location.host + "/Service/Share/index";
                this.URL = a, console.log("data", this.URL), this.retGameId = t
            }, a.send = function(t, e, a, i) {
                this.cacheList.push({
                    type: t,
                    data: e,
                    func: a,
                    target: i
                }), this.isBusy || this.sendOne()
            }, a.sendOne = function() {
                if (0 != this.cacheList.length) {
                    this.isBusy = !0, this.perform = this.cacheList.shift(), this.req = cc.loader.getXMLHttpRequest(), this.req.onreadystatechange = this.onDataHandler.bind(this), this.req.onerror = this.onErrorHandler.bind(this), this.req.ontimeout = this.onTimeoutHandler.bind(this), this.req.timeout = 2e3, cc.log("pos", this.URL), this.req.open("POST", this.URL), this.req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
                    var t = this.returnLanguage();
                    console.log("gameIdid", this.retGameId);
                    var e = this.retGameId,
                        a = {
                            type: this.perform.type,
                            gid: e,
                            mid: null,
                            data: this.perform.data,
                            languageType: t
                        },
                        i = "send=" + JSON.stringify(a);
                    this.req.send(i)
                }
            }, a.onDataHandler = function() {
                if (404 != this.req.status) {
                    if (4 == this.req.readyState && this.req.status >= 200 && this.req.status <= 207 && this.req.responseText) {
                        var t = JSON.parse(this.req.responseText);
                        this.isBusy = !1, this.perform.target ? this.perform.func.call(this.perform.target, t.error, t.data, t.commendGame, t.gameInfo) : this.perform.func(t)
                    }
                } else {
                    var e = i.launchScene,
                        a = i.Bros;
                    i.caS, cc.director.loadScene(e, null, function() {
                        if (a) {
                            var t = document.getElementById("GameDiv");
                            t && (t.style.backgroundImage = "")
                        }
                        cc.loader.onProgress = null, console.log("Success to load scene: " + e)
                    })
                }
            }, a.returnLanguage = function() {
                return ("" + window.navigator.language).toLocaleLowerCase()
            }, a.onErrorHandler = function() {
                cc.log("\u7f51\u7edc\u9519\u8bef"), this.isBusy = !1, this.perform.target ? this.perform.func.call(this.perform.target, -1) : this.perform.func(-1)
            }, a.onTimeoutHandler = function() {
                cc.log("\u8bf7\u6c42\u8d85\u65f6"), this.isBusy = !1, this.perform.target ? this.perform.func.call(this.perform.target, -1) : this.perform.func(-1)
            }, a.clearAll = function() {
                for (var t = this.cacheList.length, e = 0; e < t; e++) {
                    var a = this.cacheList[e];
                    a && (a.target ? a.func.call(a.target, -1) : a.func(-1))
                }
                this.cacheList.length = 0
            }, a);
        e.exports = n, cc._RF.pop()
    }, {
        GameConfig: "GameConfig"
    }],
    LanguageSetJs: [function(t, e) {
        "use strict";
        cc._RF.push(e, "4754e8KuPZJCqklCNyKpG29", "LanguageSetJs"), e.exports = {
            language_1: {
                game_name: "\u300c\u5c04\u82f9\u679c\u300d",
                game_name1: "\u5c04\u82f9\u679c",
                game_info: "\u628a\u63e1\u65f6\u673a\uff0c\u5c04\u4e2d\u82f9\u679c\u3002",
                txtStart: "\u5f00\u59cb",
                txtMore: "\u66f4\u591a\u6e38\u620f",
                txtAgain: "\u518d\u73a9\u4e00\u6b21",
                txtShare1: "\u5728\u6e38\u620f\u4e2d ",
                txtShare2: "\u5f97\u5206\u4e86\uff0c\u597d\u554a!\u4f60\u548c\u6211\u4e00\u8d77\u6765\u6bd4\u8d5b!",
                bgRgb: "#3698C5",
                gameT1: "\u5173\u6ce8\u6211\u4eec",
                gameT2: "\u7eb8\u724c\u63a5\u9f99",
                gameT3: "\u9526\u4e0a\u6dfb\u82b1",
                gameUrl1: "http://g.regogame.com/game/9/",
                gameUrl2: "http://g.regogame.com/game/3/",
                gameT11: "\u5173\u6ce8\u5fae\u4fe1",
                gameT12: "\u5173\u6ce8Kakao",
                gameT13: "\u5173\u6ce8Line",
                gameEndL: "\u6e38 \u620f \u7ed3 \u675f",
                gameEndL1: "\u7a0d \u5019 \u67e5 \u770b \u5206 \u6570"
            },
            language_2: {
                game_name: "\u300cShot Apples\u300d",
                game_name1: "Shot Apples",
                game_info: "Seize the opportunity and shoot the apple.",
                txtStart: "Start",
                txtMore: "More Game",
                txtAgain: "Play Again",
                txtShare1: "In Game ",
                txtShare2: " Let's play together!",
                bgRgb: "#3698C5",
                gameT1: "Follow Us",
                gameT2: "Thousand Flower",
                gameT3: "Eliminate Star",
                gameUrl1: "http://g.fromgame.com/game/53",
                gameUrl2: "http://g.fromgame.com/game/13",
                gameT11: "Focus WeChat",
                gameT12: "Focus Kakao",
                gameT13: "Focus Line",
                gameEndL: "Game OVer",
                gameEndL1: "View the score later"
            }
        }, cc._RF.pop()
    }, {}],
    LevelSettingArray: [function(t, e) {
        "use strict";
        cc._RF.push(e, "38cd0WYrfJASJCe34D5TNDJ", "LevelSettingArray");
        var a = {
            level_1: [
                [{
                    prefab: 0,
                    position: cc.v2(0, 400)
                }, {
                    prefab: 0,
                    position: cc.v2(0, -320)
                }, {
                    prefab: 0,
                    position: cc.v2(0, 0)
                }],
                [{
                    prefab: 0,
                    position: cc.v2(0, 400)
                }, {
                    prefab: 1,
                    position: cc.v2(0, -320)
                }, {
                    prefab: 1,
                    position: cc.v2(0, 0)
                }],
                [{
                    prefab: 1,
                    position: cc.v2(0, -400)
                }, {
                    prefab: 1,
                    position: cc.v2(0, 320)
                }, {
                    prefab: 3,
                    position: cc.v2(0, 0)
                }],
                [{
                    prefab: 1,
                    position: cc.v2(0, 400)
                }, {
                    prefab: 1,
                    position: cc.v2(0, 240)
                }, {
                    prefab: 1,
                    position: cc.v2(0, 160)
                }],
                [{
                    prefab: 1,
                    position: cc.v2(0, 400)
                }, {
                    prefab: 1,
                    position: cc.v2(0, 240)
                }, {
                    prefab: 1,
                    position: cc.v2(0, 160)
                }],
                [{
                    prefab: 1,
                    position: cc.v2(0, 400)
                }, {
                    prefab: 1,
                    position: cc.v2(0, 240)
                }, {
                    prefab: 1,
                    position: cc.v2(0, 160)
                }]
            ]
        };
        window.LevelSettingArray = a, cc._RF.pop()
    }, {}],
    LoadSceneJs: [function(t, e) {
        "use strict";
        cc._RF.push(e, "3ef908fwfNIwJsOjET8tCh2", "LoadSceneJs");
        var a = {
            goToCover: function(t, e, a, i, n) {
                var o = t;
                o = null == o || null == o || t, this.needShow = !1, o && o ? (this.needShow = !0, showMyAds()) : this.needShow = !1, this.needShow ? (null == preloader && this.startGoToGame(a, i, n), resCompleteFlag = !0, adCompleteFlag && resCompleteFlag && this.startGoToGame(a, i, n)) : this.startGoToGame(a, i, n)
            },
            startGoToGame: function() {
                noAdGoToScene()
            }
        };
        e.exports = a, cc._RF.pop()
    }, {}],
    MainGameJS: [function(t, e) {
        "use strict";
        cc._RF.push(e, "0e7a8SkMLxEY7nCB1Bqi8WZ", "MainGameJS");
        var a = t("GameConfig"),
            i = t("GameUiTools"),
            n = t("MainManage");
        cc.Class({
            extends: cc.Component,
            properties: {
                googleLinkNode: cc.Node
            },
            onLoad: function() {
                this.platFromNum = 1, this.judgeCurPlatform(), this.adapterScreen(), a.publicGameBool || n.init(), this.gameOveEndBool = !1, this.gameOverNum = 0, GameData.gameWidth = cc.winSize.width, GameData.gameHeight = cc.winSize.height, a.playNum++, i.loadingLayer("panel/LinkIconSpr"), GameData.isStart && (GameData.isStart = !1, a.publicGameBool), GameData.MainGameJS = this.node.getComponent("MainGameJS"), this.googleLinkNode.active = !1, cc.sys.os == cc.sys.OS_ANDROID && other.returnCurrentLanType(), this.googleLinkNode.active = !1
            },
            linkGooglePlay: function() {
                this.scheduleOnce(function() {
                    window.location.href = "https://play.google.com/store/apps/details?id=com.wesane.ManTianGuo"
                }, .1)
            },
            addTopSpr: function() {
                var t = !1,
                    e = !1;
                "zh-CN" == window.navigator.language || "zh-cn" == window.navigator.language || (t = "zh-TW" == window.navigator.language || "zh-HK" == window.navigator.language || "ko-KR" == window.navigator.language || "ja-JP" == window.navigator.language || (window.navigator.language, !0)), /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) && (e = !0), t && !e && showFlower()
            },
            play: function() {},
            enableButtons: function() {},
            advertisementFun: function() {
                0 == a.publicGameBool && adBreak({
                    type: "next",
                    name: "restart-game"
                })
            },
            showVideoAd: function(t, e) {
                var a = this;
                this.videoBack = null, this.errorBack = null, t && (this.videoBack = t), e && (this.errorBack = e), adBreak({
                    type: "reward",
                    name: "dasdf",
                    beforeReward: function(t) {
                        t()
                    },
                    adDismissed: function() {
                        a.errorVideo()
                    },
                    adViewed: function() {
                        a.finishVideo()
                    },
                    adBreakDone: function() {
                        a.finishVideo()
                    }
                })
            },
            finishVideo: function() {
                this.videoBack && this.videoBack(), this.videoBack = null, this.errorBack = null
            },
            errorVideo: function() {
                this.errorBack && this.errorBack(), this.videoBack = null, this.errorBack = null
            },
            judgeCurPlatform: function() {
                var t, e, a, i, n, o, r, c = (t = navigator.userAgent, e = /(?:Windows Phone)/.test(t), a = /(?:SymbianOS)/.test(t) || e, i = /(?:Android)/.test(t), n = /(?:Firefox)/.test(t), /(?:Chrome|CriOS)/.test(t), {
                    isTablet: o = /(?:iPad|PlayBook)/.test(t) || i && !/(?:Mobile)/.test(t) || n && /(?:Tablet)/.test(t),
                    isPhone: r = /(?:iPhone)/.test(t) && !o,
                    isAndroid: i,
                    isPc: !r && !i && !a
                });
                c.isAndroid || c.isPhone ? this.platFromNum = 1 : c.isTablet ? this.platFromNum = 2 : c.isPc && (this.platFromNum = 3)
            },
            adapterScreen: function() {
                var t = cc.find("Canvas").getComponent(cc.Canvas);
                2 == this.platFromNum || 3 == this.platFromNum ? (t.fitWidth = !0, t.fitHeight = !0) : (t.fitWidth = !0, t.fitHeight = !1)
            }
        }), cc._RF.pop()
    }, {
        GameConfig: "GameConfig",
        GameUiTools: "GameUiTools",
        MainManage: "MainManage"
    }],
    MainManage: [function(t, e) {
        "use strict";
        cc._RF.push(e, "946adGkxvdBmZXnlD952XtK", "MainManage");
        var a = t("HttpManagerJs"),
            i = t("LanguageSetJs"),
            n = t("GameConfig"),
            o = t("LoadSceneJs"),
            r = t("GameUiTools"),
            c = {
                gameHttpId: 0,
                subScoreHttp: null,
                gameNameText: null,
                gameInfoText: null,
                txtStartText: null,
                txtMoreText: null,
                txtAgainText: null,
                gameEndLText: null,
                gameEndL1Text: null,
                bgLayRgb: null,
                gameEndName1: null,
                gameEndName2: null,
                gameEndUrl1: null,
                gameEndUrl2: null,
                langugeType: 1,
                ranLinkData: null,
                adShowBefore: !1,
                adShowAfter: !0,
                endLayCol: null,
                moreBtnBgCol: null,
                moreBtnTextCol: null,
                recGameData: null,
                recGameUrl: null,
                recGameDelPau: null,
                recGameDelPer: null,
                recGameimg1: null,
                recGameimg2: null,
                recGamePos: null,
                InfoData: null,
                endShow0: null,
                endShow1: null,
                endShow2: null,
                endShow3: null,
                infoGameName: null,
                showText: null,
                startText: null,
                moreGameText: null,
                playAgainText: null,
                endHttpShowInfo: null,
                moreGameUrl: null,
                init: function(t, e, i) {
                    if (!n.publicGameBool) {
                        if (n.playNum >= 1) return;
                        n.playNum++
                    }
                    n.launchScene = t, n.Bros = e, n.caS = i, this.curType = 1, this.getHttpGameId(), this.gamePV_load(), console.log("thisg", this.gameHttpId), a.httpInitUrl(this.gameHttpId);
                    var r = this.initLanguage();
                    this.gameNameText = r.game_name, this.gameInfoText = r.game_info, this.txtStartText = r.txtStart, this.txtMoreText = r.txtMore, this.txtAgainText = r.txtAgain, this.gameEndLText = r.gameEndL, this.gameEndL1Text = r.gameEndL1, this.bgLayRgb = r.bgRgb, this.gameEndName1 = r.gameT2, this.gameEndName2 = r.gameT3, this.gameEndUrl1 = r.gameUrl1, this.gameEndUrl2 = r.gameUrl2, this.langugeType = this.curType, o.goToCover(this.adShowBefore, this.adShowAfter, t, e, i)
                },
                getHttpGameId: function() {
                    var t = window.location.href,
                        e = t.substring(0, t.lastIndexOf("//") + 2),
                        a = window.location.host;
                    this.subScoreHttp = e + a + "/Service/Score/index", this.gamePvHttp = e + a + "/Service/GamePv/index";
                    var i = document.URL,
                        n = i.lastIndexOf("/"),
                        o = i.substring(0, n),
                        r = (n = o.lastIndexOf("/"), o.substring(n + 1, o.length));
                    this.gameHttpId = r, console.log("gameIdNew", r), t.substring(t.lastIndexOf("//") + 4, t.lastIndexOf("com") + 3);
                    var c = e + a;
                    console.log("moreGame", c);
                    var s = c.lastIndexOf("//"),
                        h = c.substring(s + 2, c.indexOf("//") + 4);
                    if ("g." == h) {
                        var l = c.replace(h, "");
                        console.log("chagee", l), c = l
                    } else console.log("noChange");
                    this.moreGameUrl = c
                },
                gameOverShowText: function(t, e) {
                    this.ajaxLoad(this.subScoreHttp, "gameScore=" + t + "&gameId=" + this.gameHttpId + "&gameType=" + e, this.scoreResult)
                },
                gamePV_load: function() {
                    return;
                },
                ajaxOnLogoResult: function() {},
                ajaxLoad: function(t, e, a) {
                    var i = cc.loader.getXMLHttpRequest();
                    i.onreadystatechange = a, i.open("POST", t), i.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), i.send(e)
                },
                scoreResult: function(t) {
                    if (null != t.currentTarget.response && "" != t.currentTarget.response) {
                        var e = JSON.parse(t.currentTarget.response);
                        cc.log("endshow", e.content), c.endHttpShowInfo = e.content
                    }
                },
                initLanguage: function() {
                    var t = null;
                    return cc.sys.language == cc.sys.LANGUAGE_CHINESE ? (this.curType = 1, t = i.language_1) : (cc.log("\u82f1\u6587"), this.curType = 2, t = i.language_2), t
                },
                getLinkGameReturn: function(t, e, a, i) {
                    if (console.log("err0", t), console.log("err1", e), console.log("err2", a), console.log("err3", i), 0 == t) {
                        this.ranLinkData = e, this.adShowBefore = this.ranLinkData.gameSet.adShowBefore, this.adShowAfter = this.ranLinkData.gameSet.adShowAfter, this.endLayCol = this.ranLinkData.gameSet.endLayerColor, this.moreBtnBgCol = this.ranLinkData.gameSet.moreBtnBgCol, this.moreBtnTextCol = this.ranLinkData.gameSet.moreBtnTextCol, this.moreGameUrl = this.ranLinkData.gameSet.moreBtnUrl, this.recGameData = a, this.ranRecGameData(), this.InfoData = i, this.endShow0 = this.InfoData.endShow0, this.endShow1 = this.InfoData.endShow1, this.endShow2 = this.InfoData.endShow2, this.endShow3 = this.InfoData.endShow3, this.infoGameName = this.InfoData.gameName, this.showText = this.InfoData.showText, this.startText = this.InfoData.startText, this.moreGameText = this.InfoData.moreGame, this.playAgainText = this.InfoData.rePlay, this.gameInfoText = this.InfoData.showText, this.txtStartText = this.InfoData.startText, this.txtMoreText = this.InfoData.moreGame, this.txtAgainText = this.InfoData.rePlay, console.log("LoadMainGameScnee");
                        var r = n.launchScene,
                            c = n.Bros,
                            s = n.caS;
                        o.goToCover(this.adShowBefore, this.adShowAfter, r, c, s)
                    }
                },
                ranRecGameData: function() {
                    if (null != this.recGameData && "" != this.recGameData) {
                        this.returnBool = !1;
                        var t = this.recGameData.length,
                            e = n.returnRanNum(1, t) - 1;
                        cc.log("ranNNN", e), this.recGameUrl = this.recGameData[e].data_link, this.recGameDelPer = this.recGameData[e].delay_per, this.recGameDelPau = this.recGameData[e].delay_pau, this.recGameimg1 = this.recGameData[e].img_1, this.recGameimg2 = this.recGameData[e].img_2, this.recGamePos = this.recGameData[e].poistion
                    }
                },
                ranLinkUrl: function() {
                    if (null != this.ranLinkData && this.ranLinkData.gameList && null != this.ranLinkData.gameList) {
                        var t = this.ranLinkData.gameList.length,
                            e = n.returnRanNum(1, t) - 1;
                        return cc.log("templ", e, this.ranLinkData.gameList), cc.log("url", this.ranLinkData.gameList[0].gameName, this.ranLinkData.gameList[0].gameUrl), e
                    }
                    return null
                },
                gotoEndLayer: function() {
                    this.showGameEndLayer()
                },
                showGameEndLayer: function() {
                    r.loadingLayer("panel/GameOverLayer")
                },
                gameFeedback: function(t) {
                    this.ajaxLoad("http://www.wesane.com/services.php/Feedback/index", "gameId=" + this.gameHttpId + "&content=" + t, this.feedBackResult), console.log("\u4e0a\u4f20\u53cd\u9988\u4fe1\u606f")
                },
                feedBackResult: function(t) {
                    null != t.currentTarget.response && "" != t.currentTarget.response && 4 == t.currentTarget.readyState && (console.log("\u53cd\u9988\u7ed3\u675f"), 0 == JSON.parse(t.currentTarget.response).error ? (console.log("\u53cd\u9988\u6210\u529f"), cc.find("Canvas/set").getComponent("set").callBackClick(0)) : (console.log("\u53cd\u9988\u5931\u8d25"), cc.find("Canvas/set").getComponent("set").callBackClick(1)))
                }
            };
        e.exports = c, cc._RF.pop()
    }, {
        GameConfig: "GameConfig",
        GameUiTools: "GameUiTools",
        HttpManagerJs: "HttpManagerJs",
        LanguageSetJs: "LanguageSetJs",
        LoadSceneJs: "LoadSceneJs"
    }],
    PhysicsParticle: [function(t, e, a) {
        "use strict";
        cc._RF.push(e, "f0f50PV9bBEg6DeG9u4K7db", "PhysicsParticle"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var i = cc._decorator,
            n = i.ccclass,
            o = i.property,
            r = function(t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.gravityScale = 0, e.dropTime = 0, e.deadTime = 0, e.dropTimeTicker = 0, e.isDead = !1, e.velocity = cc.v2(0, 0), e
                }
                return __extends(e, t), e.prototype.Reset = function() {
                    this.node.stopAllActions(), this.node.scale = 1, this.velocity = cc.v2(0, 0), this.dropTimeTicker = 0, this.isDead = !1
                }, e.prototype.SetVelocity = function(t, e) {
                    this.velocity = t, this.dropTime = e, this.dropTimeTicker = this.dropTime
                }, e.prototype.update = function(t) {
                    this.node.x += this.velocity.x * t, this.node.y += this.velocity.y * t, this.velocity.y += this.gravityScale * t, this.isDead || (this.dropTimeTicker -= t, this.dropTimeTicker <= 0 && (this.isDead = !0, this.node.runAction(cc.sequence(cc.scaleTo(this.deadTime, 0), cc.callFunc(function() {}, this)))))
                }, __decorate([o], e.prototype, "gravityScale", void 0), __decorate([o], e.prototype, "dropTime", void 0), __decorate([o], e.prototype, "deadTime", void 0), __decorate([o(cc.Vec2)], e.prototype, "velocity", void 0), __decorate([n], e)
            }(cc.Component);
        a.default = r, cc._RF.pop()
    }, {}],
    ValueManger: [function(t, e) {
        "use strict";
        cc._RF.push(e, "771ccHw5PlGSr5nNwuAgI+e", "ValueManger");
        var a = {
            levelNum: 1,
            isOnline: !1,
            nowScore: 0,
            heightScore: 0,
            mapX: 0,
            mapY: 0,
            levelCarArr: [],
            replayCount: 0,
            getData: function() {
                if (!this.isOnline) {
                    var t = cc.sys.localStorage.getItem("csml_5");
                    if (null == t || "" == t) this.heightScore = 0, this.levelNum = 1;
                    else {
                        var e = JSON.parse(t);
                        this.heightScore = e.heightScore, this.levelNum = e.levelNum, this.mapX = e.mapX, this.mapY = e.mapY, this.levelCarArr = e.levelCarArr, this.replayCount = e.replayCount, this.nowScore = e.nowScore
                    }
                }
            },
            setData: function() {
                if (!this.isOnline) {
                    var t = {
                        heightScore: this.heightScore,
                        levelNum: this.levelNum,
                        mapX: this.mapX,
                        mapY: this.mapY,
                        levelCarArr: this.levelCarArr,
                        replayCount: this.replayCount,
                        nowScore: this.nowScore
                    };
                    cc.sys.localStorage.setItem("csml_5", JSON.stringify(t))
                }
            }
        };
        window.ValueManger = a, cc._RF.pop()
    }, {}],
    bg: [function(t, e) {
        "use strict";
        cc._RF.push(e, "39dfbWFnTpHoI4v9IIuOm3D", "bg"), cc.Class({
            extends: cc.Component,
            onLoad: function() {
                this.node.height = GameData.gameHeight + 10, this.node.width = GameData.gameWidth + 10
            }
        }), cc._RF.pop()
    }, {}],
    car: [function(t, e) {
        "use strict";
        cc._RF.push(e, "183f4czHe1Oh5O5Iz2FbKKp", "car"), cc.Class({
            extends: cc.Component,
            properties: {
                shadowPre: cc.Prefab,
                carSprite: [cc.SpriteFrame],
                shadow: [cc.SpriteFrame],
                liziNode: cc.Node,
                liziPre: cc.Prefab,
                weiqi: cc.ParticleSystem,
                pzPre: [cc.Prefab],
                point: cc.Node
            },
            onLoad: function() {
                this.point.width = GameData.mapWidth, this.point.height = GameData.mapWidth, this.node.zIndex = 2, this.speed = GameData.speed, this.rootJs = this.node.parent.getComponent("view_root"), this.leftUp = this.node.parent.getChildByName("leftup"), this.leftDown = this.node.parent.getChildByName("leftdown"), this.rightUp = this.node.parent.getChildByName("rightup"), this.rightDown = this.node.parent.getChildByName("rightdown"), this.leftUp_right = this.node.parent.getChildByName("leftup_right"), this.leftUp_down = this.node.parent.getChildByName("leftup_down"), this.leftDown_up = this.node.parent.getChildByName("leftdown_up"), this.leftDown_right = this.node.parent.getChildByName("leftdown_right"), this.rightUp_left = this.node.parent.getChildByName("rightup_left"), this.rightUp_down = this.node.parent.getChildByName("rightup_down"), this.rightDown_up = this.node.parent.getChildByName("rightdown_up"), this.rightDown_left = this.node.parent.getChildByName("rightdown_left"), this.node.getComponent(cc.BoxCollider).size.width = this.node.width - 10, this.node.getComponent(cc.BoxCollider).size.height = this.node.height - 10, this.addClickBtns(), this.carState = 0, this.allTouch = !0, this.fuhuoAngle0 = 0, this.fuhuoAngle1 = 0, this.fuhuoPos0 = cc.v2(), this.fuhuoPos1 = cc.v2(), this.ispeng = !1, this.bool = !0, this.yanlizi = null
            },
            setCarAngle: function(t) {
                switch (this.fordir = t, void 0 === t && (this.fordir = 2), this.fordir) {
                    case 1:
                        this.node.angle = 180;
                        break;
                    case 2:
                        this.node.angle = 0;
                        break;
                    case 3:
                        this.node.angle = -90;
                        break;
                    case 4:
                        this.node.angle = 90
                }
                this.createShadow(), this.fuhuoPos0 = this.node.position, this.fuhuoAngle0 = this.node.angle
            },
            createShadow: function() {
                var t = other.randomInt(0, this.carSprite.length - 1);
                this.node.getComponent(cc.Sprite).spriteFrame = this.carSprite[t], this.shadowNode = cc.instantiate(this.shadowPre), this.shadowNode.parent = this.node.parent, this.shadowNode.angle = this.node.angle, this.node.width, this.shadowNode.width = this.node.width, this.shadowNode.height = this.node.height, this.shadowNode.position = cc.v2(this.node.position.x + 5, this.node.position.y - 5), this.shadowNode.getComponent(cc.Sprite).spriteFrame = this.shadow[t], this.shadowNode.zIndex = 1
            },
            start: function() {
                this.getRotSpeed(), this.allTouch = !0, this.isOne = !0
            },
            onCollisionEnter: function(t, e) {
                var a = this;
                if (0 == this.bool) {
                    var i = e.node.getComponent("car").carState,
                        n = t.node.getComponent("car").carState;
                    1 == i && 1 == n || (this.fuhuoAngle1 = this.node.angle, t.node.getComponent("car").fuhuoAngle1 = t.node.angle, this.fuhuoPos1 = this.node.position, t.node.getComponent("car").fuhuoPos1 = cc.v2(t.node.x, t.node.y), this.ispeng = !0, t.node.getComponent("car").ispeng = !0, 0 == this.carState && this.node.stopAllActions(), 0 == t.node.getComponent("car").carState && t.node.stopAllActions(), this.rootJs.endAction(!0), this.weiqi.node.active = !1, this.endWQ(), this.scheduleOnce(function() {
                        a.endWQ()
                    }, .3), GS.AudioManager.playSound("audio/zc", .2), this.carOverAni(t.node, e.node), this.collisionEffect(t.node, e.node), this.scheduleOnce(function() {
                        GameData.isfuhuo ? (this.node.parent.parent.getChildByName("over").active = !0, GS.AudioManager.playSound("audio/over", .3)) : this.node.parent.parent.getChildByName("fuhuo").active = !0
                    }, 1))
                }
            },
            endWQ: function() {
                for (var t = this.rootJs.carArr, e = 0; e < t.length; e++) t[e].getComponent("car").weiqi.node.active = !1
            },
            collisionEffect: function(t, e) {
                var a = this,
                    i = cc.v2((t.x + e.x) / 2, (t.y + e.y) / 2);
                this.createEffect(i, 0), this.addPoints(i), this.scheduleOnce(function() {
                    a.createEffect(i, 1), a.addPoints(i)
                }, .3)
            },
            createEffect: function(t, e) {
                var a = cc.instantiate(this.pzPre[e]);
                a.position = t, a.scale = .1, a.zIndex = 10, a.parent = this.node.parent, a.runAction(cc.sequence(cc.spawn(cc.scaleTo(.5, 1).easing(cc.easeQuadraticActionOut()), cc.sequence(cc.delayTime(.3), cc.fadeOut(.2))), cc.removeSelf()))
            },
            carOverAni: function(t, e) {
                var a = this,
                    i = t.position.sub(e.position).normalize(),
                    n = e.position.sub(t.position).normalize(),
                    o = other.randomInt(20, 30),
                    r = t.getComponent("car").carState,
                    c = e.getComponent("car").carState;
                if (GameData.isfuhuo) {
                    var s = cc.spawn(cc.moveBy(.5, cc.v2(n.x * o, n.y * o)).easing(cc.easeQuarticActionOut()), cc.rotateBy(.5, other.randomZF(1, 60)).easing(cc.easeQuarticActionOut()));
                    s.setTag(11), e.runAction(s);
                    var h = cc.spawn(cc.moveBy(.5, cc.v2(i.x * o, i.y * o)).easing(cc.easeQuarticActionOut()), cc.rotateBy(.5, other.randomZF(1, 60)).easing(cc.easeQuarticActionOut()));
                    h.setTag(11), t.runAction(h), this.scheduleOnce(function() {
                        a.addlizi(i), t.getComponent("car").addlizi(n)
                    }, .5)
                } else if (0 == r && 0 == c) {
                    var l = cc.spawn(cc.moveBy(.5, cc.v2(n.x * o, n.y * o)).easing(cc.easeQuarticActionOut()), cc.rotateBy(.5, other.randomZF(1, 60)).easing(cc.easeQuarticActionOut()));
                    l.setTag(11), e.runAction(l);
                    var u = cc.spawn(cc.moveBy(.5, cc.v2(i.x * o, i.y * o)).easing(cc.easeQuarticActionOut()), cc.rotateBy(.5, other.randomZF(1, 60)).easing(cc.easeQuarticActionOut()));
                    u.setTag(11), t.runAction(u), this.scheduleOnce(function() {
                        a.addlizi(i), t.getComponent("car").addlizi(n)
                    }, .5)
                }
            },
            addlizi: function(t) {
                if (null == this.yanlizi) {
                    var e = other.convetOtherNodeSpaceAR(this.liziNode, this.node.parent),
                        a = cc.instantiate(this.liziPre);
                    this.yanlizi = a, a.position = cc.v2(e.x + 10 * t.x, e.y + 10 * t.y), a.zIndex = 5, a.parent = this.node.parent
                }
            },
            clossLizi: function() {
                null != this.yanlizi && (this.yanlizi.active = !1)
            },
            update: function() {
                this.updateShadow()
            },
            lateUpdate: function() {
                this.updateShadow()
            },
            updateShadow: function() {
                this.shadowNode.angle = this.node.angle, this.shadowNode.position = cc.v2(this.node.position.x + 10, this.node.position.y - 10)
            },
            on_touch_start: function() {
                var t = this;
                1 == this.rootJs.carNum && (this.rootJs.shou.active = !1), GS.AudioManager.playSound("audio/movecar", .4), this.getCarDir(this.fordir), this.scheduleOnce(function() {
                    t.weiqi.node.active = !0
                }, .3), this.bool = !1
            },
            on_touch_end: function() {
                this.allTouch = !1
            },
            cheakCarLen: function() {
                for (var t = GameData.onCarArr, e = 0; e < t.length; e++) t[e].isCheak = !1;
                if (this.node.isCheak = !0, t.length >= 2)
                    for (var a = 0; a < t.length; a++)
                        if (0 == t[a].isCheak) {
                            var i = this.node.position.sub(t[a].position).mag();
                            if (i >= GameData.mapWidth && i <= 1.5 * GameData.mapWidth) return void this.createEffect(this.node.position, 6);
                            if (i > 1.5 * GameData.mapWidth && i <= 2 * GameData.mapWidth) return void this.createEffect(this.node.position, 5);
                            if (i > 2 * GameData.mapWidth && i <= 2.5 * GameData.mapWidth) return void this.createEffect(this.node.position, 4)
                        }
            },
            getRotSpeed: function() {
                var t = Math.PI * GameData.mapWidth / 4 / this.speed;
                this.rSpeed = -90 / t
            },
            setCarAnchor: function() {
                this.shadowNode.active = !1;
                var t = cc.v2(1.5, .5),
                    e = (t.x - this.node.anchorX) * this.node.width,
                    a = (t.y, this.node.anchorY, this.node.height, cc.misc.degreesToRadians(this.node.angle)),
                    i = e * Math.cos(a),
                    n = e * Math.sin(a),
                    o = other.convetOtherNodeSpaceAR(this.point, this.node.parent);
                this.node.x = o.x + i, this.node.y = o.y + n, this.node.getComponent(cc.BoxCollider).offset.x -= this.node.width, this.weiqi.node.x -= this.node.width, this.liziNode.x -= this.node.width, this.node.anchorX = t.x, this.node.anchorY = t.y
            },
            backCarAnchor: function() {
                if (.5 != this.node.anchorX || .5 != this.node.anchorY) {
                    this.shadowNode.active = !0;
                    var t = cc.v2(.5, .5),
                        e = (t.x - this.node.anchorX) * this.node.width,
                        a = (t.y, this.node.anchorY, this.node.height, cc.misc.degreesToRadians(this.node.angle)),
                        i = e * Math.cos(a),
                        n = e * Math.sin(a),
                        o = other.convetOtherNodeSpaceAR(this.point, this.node.parent);
                    this.node.x = o.x + i, this.node.y = o.y + n, this.node.getComponent(cc.BoxCollider).offset.x += this.node.width, this.weiqi.node.x += this.node.width, this.liziNode.x += this.node.width, this.node.anchorX = t.x, this.node.anchorY = t.y
                }
            },
            carMove: function(t) {
                var e = cc.misc.degreesToRadians(this.node.angle);
                this.node.x += -Math.sin(e) * t, this.node.y += Math.cos(e) * t
            },
            getCarDir: function(t) {
                var e = cc.v2(0, 0),
                    a = cc.v2(0, 0),
                    i = [],
                    n = [];
                switch (t) {
                    case 1:
                        e = cc.v2(this.node.x, this.leftUp.y - GameData.mapWidth / 2), a = cc.v2(this.node.x - GameData.mapWidth / 2, this.leftUp.y), i = [this.leftUp_right.position, this.leftDown_up.position, this.rightDown_left.position, this.rightUp_down.position], n = [Math.abs(this.node.y - e.y) / this.speed, Math.abs(a.x - this.leftUp_right.x) / this.speed, Math.abs(this.leftUp_down.y - this.leftDown_up.y) / this.speed, Math.abs(this.leftDown_right.x - this.rightDown_left.x) / this.speed, Math.PI * GameData.mapWidth / 4 / this.speed], this.moveCar(e, a, i, n);
                        break;
                    case 2:
                        e = cc.v2(this.node.x, this.rightDown.y + GameData.mapWidth / 2), a = cc.v2(this.node.x + GameData.mapWidth / 2, this.rightDown.y), i = [this.rightDown_left.position, this.rightUp_down.position, this.leftUp_right.position, this.leftDown_up.position], n = [Math.abs(this.node.y - e.y) / this.speed, Math.abs(a.x - this.rightDown_left.x) / this.speed, Math.abs(this.rightDown_up.y - this.rightUp_down.y) / this.speed, Math.abs(this.rightUp_left.x - this.leftUp_right.x) / this.speed, Math.PI * GameData.mapWidth / 4 / this.speed], this.moveCar(e, a, i, n);
                        break;
                    case 3:
                        e = cc.v2(this.leftDown.x + GameData.mapWidth / 2, this.node.y), a = cc.v2(this.leftDown.x, this.node.y - GameData.mapWidth / 2), i = [this.leftDown_up.position, this.rightDown_left.position, this.rightUp_down.position, this.leftUp_right.position], n = [Math.abs(this.node.x - e.x) / this.speed, Math.abs(a.y - this.leftDown_up.y) / this.speed, Math.abs(this.leftDown_right.x - this.rightDown_left.x) / this.speed, Math.abs(this.rightDown_up.y - this.rightUp_down.y) / this.speed, Math.PI * GameData.mapWidth / 4 / this.speed], this.moveCar(e, a, i, n);
                        break;
                    case 4:
                        e = cc.v2(this.rightUp.x - GameData.mapWidth / 2, this.node.y), a = cc.v2(this.rightUp.x, this.node.y + GameData.mapWidth / 2), i = [this.rightUp_down.position, this.leftUp_right.position, this.leftDown_up.position, this.rightDown_left.position], n = [Math.abs(this.node.x - e.x) / this.speed, Math.abs(a.y - this.rightUp_down.y) / this.speed, Math.abs(this.rightUp_left.x - this.leftUp_right.x) / this.speed, Math.abs(this.leftUp_down.y - this.leftDown_up.y) / this.speed, Math.PI * GameData.mapWidth / 4 / this.speed], this.moveCar(e, a, i, n)
                }
            },
            moveCar: function(t, e, a, i) {
                var n = this;
                i[1] <= .2 && (i[1] = .05), this.node.runAction(cc.sequence(cc.moveTo(i[0], t), cc.callFunc(function() {
                    n.setCarAnchor()
                }), cc.rotateBy(i[4], 90), cc.callFunc(function() {
                    n.backCarAnchor(), n.node.position = e
                }), cc.callFunc(function() {
                    n.isOne && (n.isOne = !1, n.carState = 1, GameData.onCarArr.push(n.node), n.palyAudio(), n.cheakCarLen(), n.node.runAction(cc.sequence(cc.moveTo(i[1], a[0]), cc.callFunc(function() {
                        n.setCarAnchor()
                    }), cc.rotateBy(i[4], 90), cc.callFunc(function() {
                        n.backCarAnchor()
                    }), cc.moveTo(i[2], a[1]), cc.callFunc(function() {
                        n.setCarAnchor()
                    }), cc.rotateBy(i[4], 90), cc.callFunc(function() {
                        n.backCarAnchor()
                    }), cc.moveTo(i[3], a[2]), cc.callFunc(function() {
                        n.setCarAnchor()
                    }), cc.rotateBy(i[4], 90), cc.callFunc(function() {
                        n.backCarAnchor()
                    }), cc.moveTo(i[2], a[3]), cc.callFunc(function() {
                        n.setCarAnchor()
                    }), cc.rotateBy(i[4], 90), cc.callFunc(function() {
                        n.backCarAnchor()
                    }), cc.callFunc(function() {
                        n.node.runAction(cc.sequence(cc.moveTo(i[3], a[0]), cc.callFunc(function() {
                            n.setCarAnchor()
                        }), cc.rotateBy(i[4], 90), cc.callFunc(function() {
                            n.backCarAnchor()
                        }), cc.moveTo(i[2], a[1]), cc.callFunc(function() {
                            n.setCarAnchor()
                        }), cc.rotateBy(i[4], 90), cc.callFunc(function() {
                            n.backCarAnchor()
                        }), cc.moveTo(i[3], a[2]), cc.callFunc(function() {
                            n.setCarAnchor()
                        }), cc.rotateBy(i[4], 90), cc.callFunc(function() {
                            n.backCarAnchor()
                        }), cc.moveTo(i[2], a[3]), cc.callFunc(function() {
                            n.setCarAnchor()
                        }), cc.rotateBy(i[4], 90), cc.callFunc(function() {
                            n.backCarAnchor()
                        }))).repeatForever()
                    }))))
                })))
            },
            palyAudio: function() {
                var t = GameData.onCarArr.length;
                1 == t ? GS.AudioManager.playSound("audio/combo1", .3) : 2 == t ? GS.AudioManager.playSound("audio/combo2", .3) : 3 == t ? GS.AudioManager.playSound("audio/combo3", .3) : 4 == t ? GS.AudioManager.playSound("audio/combo4", .3) : 5 == t ? GS.AudioManager.playSound("audio/combo5", .3) : t >= 6 && GS.AudioManager.playSound("audio/combo6", .3)
            },
            addClickBtns: function() {
                var t = this;
                t.point.on(cc.Node.EventType.TOUCH_START, function() {
                    t.allTouch && t.on_touch_start()
                }), t.point.on(cc.Node.EventType.TOUCH_MOVE, function() {
                    t.allTouch
                }), t.point.on(cc.Node.EventType.TOUCH_END, function() {
                    t.allTouch && t.on_touch_end()
                }), t.point.on(cc.Node.EventType.TOUCH_CANCEL, function() {
                    t.allTouch && t.on_touch_end()
                })
            },
            addPoints: function(t) {
                for (var e = 0; e < 10; e++) {
                    var a = other.randomInt(2, 3),
                        i = cc.instantiate(this.pzPre[a]);
                    i.position = t, i.zIndex = 10, i.scale = .3 + .5 * Math.random(), i.opacity = other.randomInt(150, 200), i.parent = this.node.parent;
                    var n = other.randomInt(80, 120),
                        o = other.randomInt(150, 200);
                    this.moveDegressAni(i, null, n, o);
                    var r = other.randomInt(-180, 180);
                    i.runAction(cc.rotateBy(.5, r).repeatForever())
                }
            },
            moveDegressAni: function(t, e, a, i, n, o) {
                e = e || other.randomInt(-180, 180);
                var r = cc.misc.degreesToRadians(e),
                    c = cc.v2(Math.cos(r) * a, Math.sin(r) * a),
                    s = a / i,
                    h = n ? 0 : t.scale,
                    l = o ? 0 : t.opacity;
                t.runAction(cc.sequence(cc.spawn(cc.scaleTo(s + .1, h), cc.moveBy(s, c).easing(cc.easeQuadraticActionOut()), cc.sequence(cc.fadeTo(s - .2, l), cc.fadeOut(.2))), cc.removeSelf(!0))).repeatForever()
            }
        }), cc._RF.pop()
    }, {}],
    enemy: [function(t, e) {
        "use strict";
        cc._RF.push(e, "e2062/aAZJLOZnG0HhYbeEF", "enemy"), cc.Class({
            extends: cc.Component,
            properties: {
                point: cc.Node
            },
            onLoad: function() {},
            start: function() {
                var t = this;
                this.node.runAction(cc.sequence(cc.callFunc(function() {
                    t.setCarAnchor()
                }), cc.rotateBy(5, 90), cc.callFunc(function() {
                    t.backCarAnchor(), cc.log(t.node.position)
                }), cc.moveBy(1, 0, 20), cc.delayTime(0), cc.callFunc(function() {
                    cc.log(t.node.position)
                })))
            },
            update: function() {},
            setCarAnchor: function() {
                cc.log("\u8bbe\u7f6e");
                var t = cc.v2(1.5, .5),
                    e = (t.x - this.node.anchorX) * this.node.width,
                    a = (t.y, this.node.anchorY, this.node.height, cc.misc.degreesToRadians(this.node.angle)),
                    i = e * Math.cos(a),
                    n = e * Math.sin(a),
                    o = other.convetOtherNodeSpaceAR(this.point, this.node.parent);
                this.node.x = o.x + i, this.node.y = o.y + n, this.node.anchorX = t.x, this.node.anchorY = t.y
            },
            backCarAnchor: function() {
                cc.log("\u8fd8\u539f");
                var t = cc.v2(.5, .5),
                    e = (t.x - this.node.anchorX) * this.node.width,
                    a = (t.y, this.node.anchorY, this.node.height, cc.misc.degreesToRadians(this.node.angle)),
                    i = e * Math.cos(a),
                    n = e * Math.sin(a),
                    o = other.convetOtherNodeSpaceAR(this.point, this.node.parent);
                this.node.x = o.x + i, this.node.y = o.y + n, this.node.anchorX = t.x, this.node.anchorY = t.y
            }
        }), cc._RF.pop()
    }, {}],
    gameOverJs: [function(t, e) {
        "use strict";
        cc._RF.push(e, "3621brbM61BsYFG7fM/74TL", "gameOverJs");
        var a = t("GameUiTools"),
            i = t("GameConfig"),
            n = t("MainManage");
        cc.Class({
            extends: cc.Component,
            properties: {
                bgLayer: cc.Node,
                scoreBg: cc.Node,
                overScoreT: cc.Label,
                overInfoT: cc.Label,
                moreBtn: cc.Button,
                leftBtn: cc.Button,
                rightBtn: cc.Button,
                midGameText: cc.Label,
                leftBtnText: cc.Label,
                rightBtnText: cc.Label,
                maxScoreText: cc.Label
            },
            onLoad: function() {
                GameData.gameOverJs = this.node.getComponent("gameOverJs"), this.bgLayer.color = cc.color("#68b951"), this.standardScore = i.standScore, this.game_max_score = 200, this.rigthBtnGameName = null, this.rightBtnGameUrl = null, this.UIPosChange(), this.addClickBtns();
                var t, e = this.returnCurrentLanType();
                t = 1 == e ? "\u6700\u9ad8\u7eaa\u5f55:" : 2 == e ? "\u6700\u9ad8\u7d00\u9304:" : 4 == e ? "\ucd5c\uace0 \uae30\ub85d:" : "Highest Record:";
                var a = i.gameScore,
                    n = this.getHighScore();
                n ? n < i.gameScore && (this.setHisSocre(i.gameScore), n = i.gameScore) : (this.setHisSocre(i.gameScore), n = a), this.maxScoreText.string = t + n
            },
            returnCurrentLanType: function() {
                var t = 1;
                switch (cc.sys.language) {
                    case cc.sys.LANGUAGE_CHINESE:
                        "zh-TW" == window.navigator.language || "zh-tw" == window.navigator.language || "zh-HK" == window.navigator.language || "zh-hk" == window.navigator.language ? (cc.log("\u7e41\u4f53"), t = 2) : (cc.log("\u7b80\u4f53"), t = 1);
                        break;
                    case cc.sys.LANGUAGE_KOREAN:
                        t = 4;
                        break;
                    default:
                        t = 3
                }
                return t
            },
            setHisSocre: function(t) {
                cc.sys.localStorage.setItem("HigScore_JiaoTong", t)
            },
            getHighScore: function() {
                return cc.sys.localStorage.getItem("HigScore_JiaoTong")
            },
            UIPosChange: function() {
                this.overScoreT.string = i.gameScore, console.log("lang", n.langugeType);
                var t = null;
                t = 1 == n.langugeType ? this.getContentByScore(i.gameScore, n.gameNameText) : this.getContentByScore2(i.gameScore, n.gameNameText), console.log("nihao", n.endHttpShowInfo), null != n.endHttpShowInfo && "" != n.endHttpShowInfo && (cc.log("gototo"), t = n.endHttpShowInfo), this.overInfoT.string = t;
                var e = this.overInfoT.node.height;
                if (this.overInfoT.node.height = Math.ceil(t.length * this.overInfoT.fontSize / this.overInfoT.node.width) * e, document.title = t, console.log("gameOver txtMoreText", n.txtMoreText), this.midGameText.string = n.txtMoreText, this.leftBtnText.string = n.txtAgainText, this.tempArr = this.gameFocus(), null != n.ranLinkUrl()) {
                    var a = n.ranLinkUrl(),
                        o = n.ranLinkData.gameList[a].gameName;
                    this.rigthBtnGameName = o, this.rightBtnGameUrl = n.ranLinkData.gameList[a].gameUrl
                }
                null != this.rigthBtnGameName && "" != this.rigthBtnGameName ? this.rightBtnText.string = this.rigthBtnGameName : this.rightBtnText.string = this.tempArr[0]
            },
            gameFocus: function() {
                var t = [],
                    e = null,
                    a = null;
                return Math.random() <= .5 ? (e = n.gameEndName1, a = n.gameEndUrl1) : (e = n.gameEndName2, a = n.gameEndUrl2), t.push(e), t.push(a), t
            },
            addClickBtns: function() {
                var t = this;
                t.moreBtn.node.on(cc.Node.EventType.TOUCH_START, function() {}), t.moreBtn.node.on(cc.Node.EventType.TOUCH_END, function() {
                    console.log("MoreGame"), window.location.href = n.moreGameUrl
                }), t.leftBtn.node.on(cc.Node.EventType.TOUCH_START, function() {}), t.leftBtn.node.on(cc.Node.EventType.TOUCH_END, function() {
                    i.GAME_OVER_BOOL = !0, i.gameScore = 0, a.loadingScene("MainGameScene")
                }), t.rightBtn.node.on(cc.Node.EventType.TOUCH_START, function() {}), t.rightBtn.node.on(cc.Node.EventType.TOUCH_END, function() {
                    var e;
                    e = null != t.rightBtnGameUrl && "" != t.rightBtnGameUrl ? t.rightBtnGameUrl : t.tempArr[1], window.location.href = e
                })
            },
            getContentByScore: function(t, e) {
                var a = "\u6211\u771f\u662f\u592a\u5389\u5bb3\uff0c\u5728" + e + "\u4e2d\u7adf\u7136\u5f97\u4e861\u5206\uff0c\u5168\u7403\u53ea\u67091\u4e2a\u4eba\u5f971\u5206\uff01",
                    i = parseInt(.3 * this.standardScore),
                    n = parseInt(1.5 * this.standardScore),
                    o = parseInt(2.5 * this.standardScore),
                    r = parseInt(4 * this.standardScore);
                return t > 0 && t <= i ? a = "\u6211\u5728" + e + "\u4e2d\u5f97\u4e86" + t + "\u5206\uff0c\u771f\u662f\u592a\u68d2\u4e86\uff0c\u518d\u7ec3\u7ec3\u5c31\u80fd\u8fbe\u5230\u6e38\u5203\u6709\u4f59\u7684\u5883\u754c\uff01" : t > i && t <= this.standardScore ? a = "\u6211\u5728" + e + "\u4e2d\u5f97\u4e86" + t + "\u5206\uff0c\u771f\u662f\u592a\u68d2\u4e86\uff0c\u518d\u7ec3\u7ec3\u5c31\u80fd\u8fbe\u5230\u6e38\u5203\u6709\u4f59\u7684\u5883\u754c\uff01" : t > this.standardScore && t <= n ? a = "\u6211\u5728" + e + "\u4e2d\u5f97\u4e86" + t + "\u5206\uff0c\u51fb\u8d25\u4e86\u5168\u7403" + (Math.floor(12 * (t - this.standardScore) / (n - this.standardScore)) + 80) + "%\u7684\u73a9\u5bb6\uff0c\u8fdb\u5165\u4e86\u4fe1\u624b\u62c8\u6765\u7684\u5883\u754c\uff01" : t > n && t <= o ? a = "\u6211\u5728" + e + "\u4e2d\u5f97\u4e86" + t + "\u5206\uff0c\u51fb\u8d25\u4e86\u5168\u7403" + (Math.floor(7 * (t - n) / (o - n)) + 92) + "%\u7684\u73a9\u5bb6\uff0c\u8fdb\u5165\u4e86\u8fd0\u7528\u81ea\u5982\u7684\u5883\u754c\uff01" : t > o && t <= r ? a = "\u6211\u5728" + e + "\u4e2d\u5f97\u4e86" + t + "\u5206\uff0c\u51fb\u8d25\u4e86\u5168\u740399%\u7684\u73a9\u5bb6\uff0c\u8fbe\u5230\u4e86\u884c\u4e91\u6d41\u6c34\u7684\u5883\u754c\uff01" : t > r && t < this.game_max_score ? a = "\u6211\u5728" + e + "\u4e2d\u5f97\u4e86" + t + "\u5206\uff0c\u636e\u8bf4\u5168\u7403\u53ea\u6709 " + (20 - Math.ceil(17 * (t - r) / (this.game_max_score - r))) + "\u4e2a\u4eba\u8fbe\u5230\u8fd9\u4e2a\u6c34\u5e73\uff0c\u72ec\u5b64\u6c42\u8d25\uff01" : t >= this.game_max_score && (a = "\u6211\u5728" + e + "\u4e2d\u5f97\u4e86" + t + "\u5206\uff0c\u8d85\u8d8a\u4e86\u72ec\u5b64\u6c42\u8d25\uff0c\u5fc3\u6709\u7075\u7280\uff01"), a
            },
            strlen: function(t) {
                for (var e = 0, a = 0; a < t.length; a++) {
                    var i = t.charCodeAt(a);
                    i >= 1 && i <= 126 || 65376 <= i && i <= 65439 ? e++ : e += 2
                }
                return e
            },
            getContentByScore2: function(t, e) {
                var a = "I'm awesome\uff0cin" + e + "get 0 score\uff0conly one person in the world has a 0\uff01",
                    i = parseInt(.3 * this.standardScore),
                    n = parseInt(1.5 * this.standardScore),
                    o = parseInt(2.5 * this.standardScore),
                    r = parseInt(4 * this.standardScore);
                return t >= this.game_max_score ? a = "I got " + t + " points in the game, defeating all players worldwide, waiting for you to fight!" : t > 0 && t <= i ? a = "I got " + t + " points in the game, really great\uff01" : t > i && t <= this.standardScore ? a = "I got " + t + " points in the game, really great\uff01" : t > this.standardScore && t <= n ? a = "I got in the game in " + t + " points, beating out " + (Math.floor(12 * (t - this.standardScore) / (n - this.standardScore)) + 80) + "% of global players\uff01" : t > n && t <= o ? a = "I got in the game in " + t + " points, beating out " + (Math.floor(7 * (t - n) / (o - n)) + 92) + "% of global players\uff01" : t > o && t <= r ? a = "I got in the game in " + t + " points, beating out 99% of global players\uff01" : t > r && t < this.game_max_score && (a = "I got " + t + " points in the game, it said to be the world's only " + (20 - Math.ceil(17 * (t - r) / (this.game_max_score - r))) + " people to reach this level! Have you?"), a
            },
            start: function() {}
        }), cc._RF.pop()
    }, {
        GameConfig: "GameConfig",
        GameUiTools: "GameUiTools",
        MainManage: "MainManage"
    }],
    getCurrentLevel: [function(t, e) {
        "use strict";
        cc._RF.push(e, "5bda5nWigFGXblJwkytAaz9", "getCurrentLevel");
        var a = "jexmcurrentScore";
        e.exports = {
            getCurrentLevel: function() {
                var t = Number(GS.KVStorage.loadStr(a, null));
                return t || (t = GS.Constants.currentLevel, GS.KVStorage.saveStr(a, t)), GS.Constants.currentLevel
            },
            setCurrentLevel: function(t) {
                GS.Constants.currentLevel = t, GS.KVStorage.saveStr(a, t)
            },
            removeCurrentLevel: function() {
                GS.Constants.currentLevel = null, GS.KVStorage.remove(a)
            }
        }, cc._RF.pop()
    }, {}],
    linkHttpIconJs: [function(t, e) {
        "use strict";
        cc._RF.push(e, "95474fr0oNDP7SAidILF03q", "linkHttpIconJs");
        var a = t("MainManage"),
            i = t("GameConfig");
        cc.Class({
            extends: cc.Component,
            properties: {
                iconSpr: cc.Node,
                iconSpr1: cc.Node
            },
            onLoad: function() {
                if (this._imageArr = [], this.stopUpdateBool = !0, this.gameWidth = cc.winSize.width, this.gameHeight = cc.winSize.height, null != a.recGameData && "" != a.recGameData && null != a.recGameimg1 && "" != a.recGameimg1) {
                    var t = 50 - this.gameWidth / 2,
                        e = this.gameHeight - 50 - this.gameHeight / 2;
                    null != a.recGamePos && "" != a.recGamePos && (1 == a.recGamePos ? (t = 50 - this.gameWidth / 2, e = this.gameHeight - 50 - this.gameHeight / 2) : 2 == a.recGamePos ? (t = this.gameWidth - 50 - this.gameWidth / 2, e = this.gameHeight - 50 - this.gameHeight / 2) : 3 == a.recGamePos ? (t = this.gameWidth - 50 - this.gameWidth / 2, e = 50 - this.gameHeight / 2) : 4 == a.recGamePos && (t = 50 - this.gameWidth / 2, e = 50 - this.gameHeight / 2));
                    var i = a.recGameimg1,
                        n = a.recGameimg2,
                        o = this.iconSpr,
                        r = this.iconSpr1,
                        c = this;
                    cc.loader.load(i, function(a, i) {
                        o.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(i), c.iconSpr.opacity = 0, c.iconSpr.x = t, c.iconSpr.y = e, c._imageArr.push(c.iconSpr)
                    }), cc.loader.load(n, function(a, i) {
                        r.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(i), c.iconSpr1.opacity = 0, c.iconSpr1.x = t, c.iconSpr1.y = e, c._imageArr.push(c.iconSpr1)
                    })
                }
            },
            showLinkPic: function() {
                var t, e;
                t = null != a.recGameDelPau ? a.recGameDelPau : 6, cc.log("dMainManager.recGameDelPer", a.recGameDelPer), e = null != a.recGameDelPer ? a.recGameDelPer : .7, this._imageArr[0].opacity = 255, this._imageArr[0].runAction(cc.repeatForever(cc.sequence(cc.delayTime(t), cc.rotateBy(e, 0, 180), cc.callFunc(function() {
                    this._imageArr[0].setRotation(0), this._imageArr[0].opacity = 0, this._imageArr[1].opacity = 255
                }, this), cc.delayTime(t), cc.callFunc(function() {
                    this.flowerAction(this._imageArr[1], e)
                }, this), cc.delayTime(e), cc.callFunc(function() {
                    this._imageArr[1].opacity = 0, this._imageArr[0].opacity = 255
                }, this))))
            },
            flowerAction: function(t, e) {
                t.runAction(cc.sequence(cc.rotateBy(e, 0, 180), cc.callFunc(function() {
                    t.setRotation(0)
                })))
            },
            start: function() {},
            addTouchEvents: function() {
                var t = this,
                    e = {
                        event: cc.EventListener.TOUCH_ONE_BY_ONE,
                        onTouchBegan: function(e) {
                            var n = e.getLocation();
                            if (t._imageArr.length >= 2) {
                                var o = Math.abs(n.x - t.gameWidth / 2 - t._imageArr[0].x),
                                    r = Math.abs(n.y - t.gameHeight / 2 - t._imageArr[0].y);
                                o <= 30 && r <= 30 && (i.noTouchBool = !1, null != a.recGameUrl && "" != a.recGameUrl && (t._imageArr[0].runAction(cc.sequence(cc.scaleTo(.1, .8), cc.scaleTo(.1, 1), cc.callFunc(function() {
                                    window.location.href = a.recGameUrl
                                }))), t._imageArr[1].runAction(cc.sequence(cc.scaleTo(.1, .8), cc.scaleTo(.1, 1)))), console.log("touchLinkHttp"))
                            }
                            return !0
                        },
                        onTouchMoved: function() {},
                        onTouchEnded: function() {}
                    };
                cc.eventManager.addListener(e, t.node)
            },
            update: function() {
                this.stopUpdateBool && this._imageArr.length >= 2 && (this.stopUpdateBool = !1, this.showLinkPic())
            }
        }), cc._RF.pop()
    }, {
        GameConfig: "GameConfig",
        MainManage: "MainManage"
    }],
    loadBg: [function(t, e) {
        "use strict";
        cc._RF.push(e, "b2963l6gdFClZw0Q+ij3T/y", "loadBg"), cc.Class({
            extends: cc.Component,
            properties: {
                bgOneNode: cc.Node,
                bgTwoNode: cc.Node
            },
            onLoad: function() {
                this.speed = 100, this.bgOneNode.y = 0, this.bgTwoNode.y = GameData.gameHeight
            },
            start: function() {},
            update: function(t) {
                this.bgOneNode.y -= this.speed * t, this.bgTwoNode.y -= this.speed * t, this.bgOneNode.y < -GameData.gameHeight && (this.bgOneNode.y = GameData.gameHeight), this.bgTwoNode.y < -GameData.gameHeight && (this.bgTwoNode.y = GameData.gameHeight)
            }
        }), cc._RF.pop()
    }, {}],
    moveCircle: [function(t, e) {
        "use strict";
        cc._RF.push(e, "ec196670gRDz41PfRX4W0Hj", "moveCircle");
        var a = function(t, e) {
            var a = e.x - t.x,
                i = e.y - t.y;
            return Math.sqrt(a * a + i * i)
        };
        cc.MoveCircleBy = cc.Class({
            name: "cc.MoveCircleBy",
            extends: cc.ActionInterval,
            statics: {
                _reverse: !1
            },
            ctor: function(t, e, a, i) {
                this._radius = 0, this._deltaAngle = 0, this._startAngle = 0, this._startPosition = cc.v2(0, 0), this._centerPosition = cc.v2(0, 0), void 0 !== e && (e *= cc.MoveCircleBy._reverse ? 1 : -1, this.initWithDuration(t, e, a, i))
            },
            initWithDuration: function(t, e, a, i) {
                return !!cc.ActionInterval.prototype.initWithDuration.call(this, t, a, i) && (this._deltaAngle = e, void 0 !== a.x && (i = a.y, a = a.x), this._centerPosition.x = a, this._centerPosition.y = i, !0)
            },
            clone: function() {
                var t = new cc.MoveCircleBy;
                return this._cloneDecoration(t), t.initWithDuration(this._duration, this._deltaAngle, this._centerPosition), t
            },
            startWithTarget: function(t) {
                cc.ActionInterval.prototype.startWithTarget.call(this, t), this._startAngle = t.angle, this._startPosition.x = t.x, this._startPosition.y = t.y, this._radius = a(this._centerPosition, this._startPosition), this.target.x >= this._centerPosition.x ? this.target.y >= this._centerPosition.y ? (this.forX = -1, this.forY = 1) : (this.forX = 1, this.forY = -1) : this.target.y >= this._centerPosition.y ? (this.forX = 1, this.forY = -1) : (this.forX = -1, this.forY = 1)
            },
            update: function(t) {
                if (t = this._computeEaseTime(t), this.target) {
                    var e = this.forX * this._radius * Math.sin((this._startAngle + this._deltaAngle * t) / 180 * Math.PI),
                        a = this.forY * this._radius * Math.cos((this._startAngle + this._deltaAngle * t) / 180 * Math.PI);
                    this.target.x = this._centerPosition.x + e, this.target.y = this._centerPosition.y + a, this.target.angle = this._startAngle + this._deltaAngle * t
                }
            },
            reverse: function() {
                var t = new cc.MoveCircleBy;
                return t.initWithDuration(this._duration, -this._deltaAngle, this._centerPosition), this._cloneDecoration(t), this._reverseEaseList(t), t
            }
        }), cc.moveCircleBy = function(t, e, a, i) {
            return new cc.MoveCircleBy(t, e, a, i)
        }, cc.MoveCircleTo = cc.Class({
            name: "cc.MoveCircleTo",
            extends: cc.ActionInterval,
            statics: {
                _reverse: !1
            },
            ctor: function(t, e, a, i) {
                this._angle = 0, this._radius = 0, this._dstAngle = 0, this._startAngle = 0, this._startPosition = cc.v2(0, 0), this._centerPosition = cc.v2(0, 0), void 0 !== e && this.initWithDuration(t, e, a, i)
            },
            initWithDuration: function(t, e, a, i) {
                return !!cc.ActionInterval.prototype.initWithDuration.call(this, t) && (this._dstAngle = e, void 0 !== a.x && (i = a.y, a = a.x), this._centerPosition.x = a, this._centerPosition.y = i, !0)
            },
            clone: function() {
                var t = new cc.MoveCircleTo;
                return this._cloneDecoration(t), t.initWithDuration(this._duration, this._dstAngle, this._centerPosition), t
            },
            startWithTarget: function(t) {
                cc.ActionInterval.prototype.startWithTarget.call(this, t);
                var e = t.angle % 360,
                    i = cc.MoveCircleTo._reverse ? this._dstAngle - e : this._dstAngle + e;
                i > 180 && (i -= 360), i < -180 && (i += 360), this._startAngle = e, this._angle = cc.MoveCircleTo._reverse ? i : -i, this._startPosition.x = t.x, this._startPosition.y = t.y, this._radius = a(this._centerPosition, this._startPosition)
            },
            reverse: function() {
                cc.logID(1016)
            },
            update: function(t) {
                if (t = this._computeEaseTime(t), this.target) {
                    this.target.angle = this._startAngle + this._angle * t;
                    var e = -this._radius * Math.sin((this._startAngle + this._angle * t) / 180 * Math.PI),
                        a = this._radius * Math.cos((this._startAngle + this._angle * t) / 180 * Math.PI);
                    this.target.x = this._centerPosition.x + e, this.target.y = this._centerPosition.y + a
                }
            }
        }), cc.moveCircleTo = function(t, e, a, i) {
            return new cc.MoveCircleTo(t, e, a, i)
        }, cc._RF.pop()
    }, {}],
    other: [function(t, e) {
        "use strict";
        cc._RF.push(e, "b15a31PTr5I2aEXTtyfgDVd", "other");
        var a = {
            randomInt: function(t, e, a) {
                return a ? Math.random() * (e - t) + t : Math.floor(Math.random() * (e - t + 1) + t)
            },
            randomZF: function(t, e, a) {
                var i = Math.random() < .5 ? -1 : 1;
                return a ? i * Math.random() * (e - t) + t : i * Math.floor(Math.random() * (e - t + 1) + t)
            },
            randomOne: function() {
                return Math.random() < .5 ? -1 : 1
            },
            CollisionFun: function() {
                cc.director.getPhysicsManager().enabled = !0, cc.director.getPhysicsManager().gravity = cc.v2(0, -1e3), this.manager = cc.director.getCollisionManager(), this.manager.enabled = !0, this.manager.enabledDebugDraw = !0, cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit | cc.PhysicsManager.DrawBits.e_pairBit | cc.PhysicsManager.DrawBits.e_centerOfMassBit | cc.PhysicsManager.DrawBits.e_jointBit | cc.PhysicsManager.DrawBits.e_shapeBit, cc.director.getPhysicsManager().debugDrawFlags = 0, cc.director.getCollisionManager().enabledDebugDraw = !1
            },
            judgeArrExist: function(t, e, a) {
                if (a) {
                    for (var i = 0; i < e.length; i++)
                        if (e[i].x == t.x && e[i].y == t.y) return !0
                } else
                    for (i = 0; i < e.length; i++)
                        if (e[i] === t) return !0;
                return !1
            },
            InversionArrFun: function(t) {
                for (var e = [], a = 0; a < t.length; a++) e.push(t[t.length - 1 - a]);
                return e
            },
            getAngleByPos: function(t, e) {
                var a = e.x - t.x,
                    i = e.y - t.y;
                return 360 * Math.atan(i / a) / (2 * Math.PI)
            },
            FindTheAngle: function(t, e, a) {
                var i = (t.x < e.x ? t.x : e.x) < a.x ? t.x < e.x ? t.x : e.x : a.x,
                    n = (t.y < e.y ? t.y : e.y) < a.y ? t.y < e.y ? t.y : e.y : a.y,
                    o = cc.v2(t.x - i, t.y - n),
                    r = cc.v2(e.x - i, e.y - n),
                    c = cc.v2(a.x - i, a.y - n),
                    s = Math.sqrt(Math.pow(o.x - r.x, 2) + Math.pow(o.y - r.y, 2)),
                    h = Math.sqrt(Math.pow(o.x - c.x, 2) + Math.pow(o.y - c.y, 2)),
                    l = Math.sqrt(Math.pow(r.x - c.x, 2) + Math.pow(r.y - c.y, 2)),
                    u = (Math.pow(s, 2) + Math.pow(h, 2) - Math.pow(l, 2)) / (2 * s * h);
                return Math.round(180 * Math.acos(u) / Math.PI)
            },
            getNormalizeVector: function(t, e) {
                return e.sub(t).normalize()
            },
            getVector: function(t, e) {
                return e.sub(t)
            },
            getCircumferencePos: function(t, e, a) {
                var i = cc.v2(0, 0);
                return i.x = t.x + Math.sin(2 * Math.PI / 360 * a) * e, i.y = t.y + Math.cos(2 * Math.PI / 360 * a) * e, i
            },
            upsetArr: function(t) {
                return t.sort(function() {
                    return Math.random() > .5 ? -1 : 1
                })
            },
            addNowArr: function(t, e, a) {
                if (a) {
                    for (var i = 0; i < t.length; i++)
                        if (t[i].x == e.x && t[i].y == e.y) return !1;
                    return t.push(e), !0
                }
                return t.indexOf(e) < 0 && (t.push(e), !0)
            },
            addArrForIndex: function(t, e, a) {
                return t.splice(e, 0, a)
            },
            deleteArrItem: function(t, e, a) {
                if (a) {
                    for (var i = 0; i < t.length; i++)
                        if (t[i].x == e.x && t[i].y == e.y) return t.splice(i, 1), !0
                } else
                    for (i = 0; i < t.length; i++)
                        if (t[i] == e) return t.splice(i, 1), !0;
                return !1
            },
            deleteObjArrItem: function(t, e) {
                for (var a = 0; a < t.length; a++)
                    if (t[a].x == e.x && t[a].y == e.y) return t[a].active = !1, t.splice(a, 1), !0;
                return !1
            },
            pDistance: function(t, e) {
                return t.sub(e).mag()
            },
            AngleToRadian: function(t) {
                return t * Math.PI / 180
            },
            degreesToVectors: function(t) {
                var e = cc.misc.degreesToRadians(t);
                return cc.v2(0, 1).rotate(-e)
            },
            vectorsToDegress: function(t, e) {
                if (Math.abs(t.x) + Math.abs(t.y) !== 0) {
                    var a = cc.v2(0, 1),
                        i = t.signAngle(a),
                        n = cc.misc.radiansToDegrees(i);
                    return e ? i : n
                }
                return 0
            },
            setSprite: function(t, e, a) {
                var i = t.getSpriteFrame(a);
                e.getComponent(cc.Sprite).spriteFrame = i
            },
            findEightPos: function(t, e, a) {
                for (var i = [], n = t.x - 1; n <= t.x + 1; n++)
                    for (var o = t.y - 1; o <= t.y + 1; o++) n < 0 || o < 0 || n >= e || o >= a || n == t.x && o == t.y || i.push(cc.v2(n, o));
                return i
            },
            TakeSymbols: function(t) {
                return t / Math.abs(t)
            },
            AdjustLabelInterval: function(t, e, a) {
                a.scheduleOnce(function() {
                    for (var a = t.children, i = 0, n = 0; n < a.length; n++) i += a[n].width * Math.abs(a[n].scaleX);
                    i += e * (a.length - 1);
                    for (var o = 0; o < a.length; o++) a[o].x = 0 == o ? -.5 * i + .5 * a[o].width * Math.abs(a[o].scaleX) : a[o - 1].x + .5 * a[o - 1].width * Math.abs(a[o - 1].scaleX) + e + .5 * a[o].width * Math.abs(a[o].scaleX)
                }, 0)
            },
            CalculatedArea: function(t) {
                for (var e = t[0].y * (t[t.length - 1].x - t[1].x), a = 1; a < t.length; a++) e += t[a].y * (t[a - 1].x - t[(a + 1) % t.length].x);
                return Math.abs(e) / 2
            },
            localConvertWorldPointAR: function(t) {
                return t ? t.convertToWorldSpaceAR(cc.v2(0, 0)) : null
            },
            localConvertWorldPoint: function(t) {
                return t ? t.convertToWorldSpace(cc.v2(0, 0)) : null
            },
            worldConvertLocalPointAR: function(t, e) {
                return t ? t.convertToNodeSpaceAR(e) : null
            },
            worldConvertLocalPoint: function(t, e) {
                return t ? t.convertToNodeSpace(e) : null
            },
            convetOtherNodeSpaceAR: function(t, e) {
                if (!t || !e) return null;
                var a = this.localConvertWorldPointAR(t);
                return this.worldConvertLocalPointAR(e, a)
            },
            convetOtherNodeSpace: function(t, e) {
                if (!t || !e) return null;
                var a = this.localConvertWorldPoint(t);
                return this.worldConvertLocalPoint(e, a)
            },
            LocalCoordinatesToTheWorldAR: function(t, e) {
                return t ? t.convertToWorldSpaceAR(e) : null
            },
            LocalCoordinatesToTheWorld: function(t, e) {
                return t ? t.convertToWorldSpace(e) : null
            },
            setPos: function(t, e) {
                var a = t.width,
                    i = t.height,
                    n = this.randomInt(0, e - a / 2),
                    o = Math.sqrt(e * e - n * n),
                    r = this.randomInt(0, o - i / 2);
                return 1 == this.randomInt(1, 2) && (n = -n), 1 == this.randomInt(1, 2) && (r = -r), cc.v2(n, r)
            },
            sortArr: function(t, e) {
                for (var a = 0; a < t.length - 1; a++)
                    for (var i = 0; i < t.length - 1; i++) {
                        switch (e) {
                            case 0:
                                var n = t[i] > t[i + 1];
                                break;
                            case 1:
                                n = t[i].x > t[i + 1].x;
                                break;
                            case 2:
                                n = t[i].y > t[i + 1].y
                        }
                        if (n) {
                            var o = t[i];
                            t[i] = t[i + 1], t[i + 1] = o
                        }
                    }
            },
            sortArr_1: function(t, e, a) {
                if (!(e > a)) {
                    for (var i = e, n = a, o = t[e]; i != n;) {
                        for (; t[n] >= o && n > i;) n--;
                        for (; t[i] <= o && i < n;) i++;
                        if (i < n) {
                            var r = t[i];
                            t[i] = t[n], t[n] = r
                        }
                    }
                    i == n && (t[e] = t[i], t[i] = o), this.sortArr_1(t, e, i - 1), this.sortArr_1(t, i + 1, a)
                }
            },
            getDistance: function(t, e) {
                return t.sub(e).mag()
            },
            CenterFun: function(t) {
                for (var e, a, i = t[0].x, n = t[0].x, o = t[0].y, r = t[0].y, c = 0; c < t.length; c++) t[c].x > i && (i = t[c].x), t[c].y > o && (o = t[c].y), t[c].x < n && (n = t[c].x), t[c].y < r && (r = t[c].y);
                e = (i - n) / 2 + n, a = (o - r) / 2 + r;
                for (var s = 0; s < t.length; s++) t[s].x -= e, t[s].y -= a;
                return t
            },
            ShockScreen: function(t, e) {
                var a = t.x,
                    i = t.y,
                    n = cc.repeatForever(cc.sequence(cc.moveTo(.018, cc.v2(a + (2 + e), i + (e + 3))), cc.moveTo(.018, cc.v2(a - (3 + e), i + (e + 3))), cc.moveTo(.018, cc.v2(a - (6 + e), i + (e + 1))), cc.moveTo(.018, cc.v2(a + (1 + e), i - (e + 6))), cc.moveTo(.018, cc.v2(a - (2 + e), i + (e + 2))), cc.moveTo(.018, cc.v2(a + (1 + e), i - (e + 4))), cc.moveTo(.018, cc.v2(a - (4 + e), i - (e + 5))), cc.moveTo(.018, cc.v2(a + (1 + e), i + (e + 5))), cc.moveTo(.018, cc.v2(a + (0 + e), i + (e + 0)))));
                t.runAction(n), setTimeout(function() {
                    t.stopAction(n), t.x = a, t.y = i
                }, 300)
            },
            RandomIndexFromArr: function(t) {
                for (var e = new Array, a = new Array, i = 0, n = 0; n < t.length; n++) t[n] > 0 && (e.push(t[n]), a.push(n), i += t[n]);
                var o = 100 / i;
                for (n = 0; n < e.length; n++) e[n] *= o, e[n] = Math.round(e[n]);
                var r = Math.floor(100 * Math.random()),
                    c = -1;
                for (n = 0; n < e.length; n++) {
                    for (var s = 0, h = n; h >= 0; h--) s += e[h];
                    r >= s - e[n] && r < s && (c = n)
                }
                return -1 == c && (c = 0), a[c]
            },
            returnCurrentLanType: function() {
                var t = 1;
                switch (cc.sys.language) {
                    case cc.sys.LANGUAGE_CHINESE:
                        "zh-TW" == window.navigator.language || "zh-tw" == window.navigator.language || "zh-HK" == window.navigator.language || "zh-hk" == window.navigator.language ? (cc.log("\u7e41\u4f53"), t = 2) : (cc.log("\u7b80\u4f53"), t = 1);
                        break;
                    case cc.sys.LANGUAGE_KOREAN:
                        t = 3;
                        break;
                    default:
                        t = 4
                }
                return t
            },
            pinjieFun: function(t, e) {
                return t.concat(e)
            }
        };
        window.other = a, cc._RF.pop()
    }, {}],
    people: [function(t, e) {
        "use strict";
        cc._RF.push(e, "bc1ecg77BZNh4+/q58sw/1B", "people"), cc.Class({
            extends: cc.Component,
            properties: {
                liziPre: cc.Prefab,
                cutPre: cc.Prefab,
                shuizi: cc.Prefab
            },
            onLoad: function() {
                this.speed = 100, this.iscut = !0;
                var t = this.getComponent(cc.Animation);
                this.node.runAction(cc.sequence(cc.spawn(cc.moveBy(1, cc.v2(-140, 0)), cc.callFunc(function() {
                    t.stop(), t.play("people_1")
                })), cc.spawn(cc.moveBy(1, cc.v2(140, 0)), cc.callFunc(function() {
                    t.stop(), t.play("people_2")
                })))).repeatForever(), this.carNode = this.node.parent.parent.getChildByName("car_2"), this.carpos = other.convetOtherNodeSpaceAR(this.carNode, this.node.parent), this.score = this.node.parent.parent.getChildByName("score")
            },
            start: function() {},
            update: function(t) {
                var e = this;
                this.node.y -= GameData.speed * t, this.node.y < -GameData.gameHeight && this.node.destroy(), GameData.isdestory && this.node.runAction(cc.spawn(cc.fadeOut(.2), cc.callFunc(function() {
                    e.node.destroy()
                })));
                var a = Math.abs(this.carpos.y - this.node.y);
                GameData.isTouch && this.carpos.y > this.node.y - 30 && a <= 80 && (this.pos1 = this.node.position, this.pos2 = cc.v2(this.node.position.x, this.node.position.y + 200), this.pos3 = cc.v2(this.score.position.x, this.score.position.y), this.node.stopAllActions(), this.getComponent(cc.Animation).stop(), this.addPoints(cc.v2(0, 0)), this.iscut && (this.iscut = !1, this.cutScore(), GameData.score -= 5, GS.AudioManager.playSound("audio/shoushang", 1.5), this.score.runAction(cc.sequence(cc.scaleTo(.2, 1.2).easing(cc.easeElasticOut()), cc.scaleTo(.3, 1).easing(cc.easeElasticOut())))))
            },
            cutScore: function() {
                this.node.x > 0 ? this.for_x = -100 : this.for_x = 100;
                var t = cc.instantiate(this.cutPre);
                t.scale = .1, t.position = this.node.position, t.parent = this.node.parent, t.runAction(cc.sequence(cc.spawn(cc.scaleTo(.3, 1), cc.moveBy(.5, cc.v2(0, 50)).easing(cc.easeQuadraticActionOut())), cc.removeSelf(!0)));
                var e = cc.instantiate(this.shuizi);
                e.scale = .1, e.parent = this.node, e.zIndex = -1, e.runAction(cc.spawn(cc.scaleTo(.3, 1), cc.fadeTo(.2, 255)))
            },
            addPoints: function(t) {
                for (var e = 0; e < 5; e++) {
                    var a = cc.instantiate(this.liziPre);
                    a.position = t, a.scale = .5 + 1 * Math.random(), a.opacity = other.randomInt(200, 255), a.parent = this.node;
                    var i = other.randomInt(50, 70),
                        n = other.randomInt(100, 150);
                    this.moveDegressAni(a, null, i, n);
                    var o = other.randomInt(-180, 180);
                    a.runAction(cc.rotateBy(.5, o).repeatForever())
                }
            },
            moveDegressAni: function(t, e, a, i, n, o) {
                e = e || other.randomInt(-180, 180);
                var r = cc.misc.degreesToRadians(e),
                    c = cc.v2(Math.cos(r) * a, Math.sin(r) * a),
                    s = a / i,
                    h = n ? 0 : t.scale,
                    l = o ? 0 : t.opacity;
                t.runAction(cc.sequence(cc.spawn(cc.scaleTo(s + .1, h), cc.moveBy(s, c).easing(cc.easeQuadraticActionOut()), cc.sequence(cc.fadeTo(s - .2, l), cc.fadeOut(.2))), cc.removeSelf(!0))).repeatForever()
            }
        }), cc._RF.pop()
    }, {}],
    player: [function(t, e) {
        "use strict";
        cc._RF.push(e, "6ccd4gaLaFHDILocbsnZvZU", "player"), cc.Class({
            extends: cc.Component,
            properties: {},
            onLoad: function() {
                var t = cc.moveCircleBy(5, 180, 100, 0);
                this.node.runAction(t)
            },
            update: function() {}
        }), cc._RF.pop()
    }, {}],
    set: [function(t, e) {
        "use strict";
        cc._RF.push(e, "30c8bcu/UdLLY//wcGULWxG", "set");
        var a = t("MainManage");
        cc.Class({
            extends: cc.Component,
            properties: {
                bg: cc.Node,
                setButton: cc.Node,
                setButtonBg: cc.Sprite,
                moreGameButton: cc.Node,
                muteButton: cc.Node,
                muteButtonBg: cc.Sprite,
                editButton: cc.Node,
                editButtonBg: cc.Sprite,
                replayButton: cc.Node,
                replayButtonBg: cc.Sprite,
                editBox: cc.Node,
                tishi: cc.Node,
                touch: cc.Node,
                setButtonSprArr: [cc.SpriteFrame],
                muteButtonSprArr: [cc.SpriteFrame],
                editButtonSprArr: [cc.SpriteFrame],
                replayButtonSprArr: [cc.SpriteFrame]
            },
            onLoad: function() {
                this.node.position = cc.v2(-GameData.gameWidth / 2 + 60, GameData.gameHeight / 2 - 60), this.editBox.position = cc.v2(GameData.gameWidth / 2 - 60, -GameData.gameHeight / 2 + 60), this.tishi.position = cc.v2(GameData.gameWidth / 2 - 60, -GameData.gameHeight / 2 + 60), this.touch.position = cc.v2(GameData.gameWidth / 2 - 60, -GameData.gameHeight / 2 + 60), this.replayButton.position = cc.v2(GameData.gameWidth - 120, 0), this.touch.width = GameData.gameWidth, this.touch.height = GameData.gameHeight, this.isSetButton = !1, this.isMuteButton = !1, this.isEditButton = !1, this.isReplayButton = !1, this.addClickBtns()
            },
            start: function() {
                GameData.isMute ? (this.muteButtonBg.spriteFrame = this.muteButtonSprArr[1], GS.AudioManager.setMute(!0), this.isMuteButton = !0) : (this.muteButtonBg.spriteFrame = this.muteButtonSprArr[0], GS.AudioManager.setMute(!1), this.isMuteButton = !1)
            },
            setButtonClick: function() {
                var t = this;
                0 == this.isSetButton ? this.setButton.runAction(cc.spawn(cc.sequence(cc.callFunc(function() {
                    t.setButtonBg.spriteFrame = t.setButtonSprArr[1]
                }), cc.rotateBy(.5, 180).easing(cc.easeQuadraticActionOut())), cc.callFunc(function() {
                    t.bgClick(), t.allTouch = !0, t.touch.active = !0, t.isSetButton = !0
                }))) : this.setButton.runAction(cc.spawn(cc.sequence(cc.callFunc(function() {
                    t.setButtonBg.spriteFrame = t.setButtonSprArr[0]
                }), cc.rotateBy(.5, 180).easing(cc.easeQuadraticActionOut())), cc.callFunc(function() {
                    t.bgClick(), t.allTouch = !1, t.touch.active = !1, t.isSetButton = !1
                })))
            },
            bgClick: function() {
                0 == this.isSetButton ? this.bg.runAction(cc.moveTo(.5, 0, 0).easing(cc.easeQuadraticActionOut())) : this.bg.runAction(cc.moveTo(.5, 0, 600).easing(cc.easeQuadraticActionOut()))
            },
            moreGame: function() {
                window.location.href = a.moreGameUrl
            },
            muteButtonClick: function() {
                0 == this.isMuteButton ? (this.muteButtonBg.spriteFrame = this.muteButtonSprArr[1], GS.AudioManager.setMute(!0), GameData.isMute = !0, this.isMuteButton = !0) : (this.muteButtonBg.spriteFrame = this.muteButtonSprArr[0], GS.AudioManager.setMute(!1), GameData.isMute = !1, this.isMuteButton = !1)
            },
            editButtonClick: function() {
                0 == this.isEditButton ? (this.editButtonBg.spriteFrame = this.editButtonSprArr[1], this.isEditButton = !0, this.editBox.runAction(cc.scaleTo(.5, 1).easing(cc.easeQuadraticActionOut()))) : (this.editButtonBg.spriteFrame = this.editButtonSprArr[0], this.isEditButton = !1, this.editBox.runAction(cc.scaleTo(.5, 0).easing(cc.easeQuadraticActionOut())))
            },
            replayButtonClick: function() {
                GameData.MainGameJS.advertisementFun(), 0 == this.isReplayButton ? (this.replayButtonBg.spriteFrame = this.replayButtonSprArr[1], this.isReplayButton = !0, GameData.isRepaly = !1, cc.director.loadScene("MainGameScene")) : (this.replayButtonBg.spriteFrame = this.replayButtonSprArr[0], this.isReplayButton = !1)
            },
            closeButtonClick: function() {
                this.editButtonBg.spriteFrame = this.editButtonSprArr[0], this.isEditButton = !1, this.editBox.runAction(cc.scaleTo(.5, 0).easing(cc.easeQuadraticActionOut()))
            },
            closeTishiClick: function() {
                var t = this;
                this.tishi.runAction(cc.scaleTo(.5, 0).easing(cc.easeQuadraticActionOut())), this.setButton.runAction(cc.spawn(cc.sequence(cc.callFunc(function() {
                    t.setButtonBg.spriteFrame = t.setButtonSprArr[0]
                }), cc.rotateBy(.5, 180).easing(cc.easeQuadraticActionOut())), cc.callFunc(function() {
                    t.bgClick(), t.allTouch = !1, t.touch.active = !1, t.isSetButton = !1
                })))
            },
            entButtonClick: function() {
                var t = this.editBox.getComponent(cc.EditBox).string;
                this.closeButtonClick(), /^[\u4E00-\u9FA5A-Za-z0-9\u3002\uff0c\uff1f\uff01\u3001]+$/.test(t) ? a.gameFeedback(t) : this.callBackClick(2)
            },
            callBackClick: function(t) {
                switch (t) {
                    case 0:
                        this.string = "\u53cd\u9988\u6210\u529f!";
                        break;
                    case 1:
                        this.string = "\u53cd\u9988\u5931\u8d25!";
                        break;
                    case 2:
                        this.string = "\u53cd\u9988\u5931\u8d25!\n\u8bf7\u8f93\u5165\u6709\u6548\u5185\u5bb9\uff01"
                }
                this.tishi.getComponentInChildren(cc.Label).string = this.string, this.tishi.runAction(cc.scaleTo(.5, 1).easing(cc.easeQuadraticActionOut()))
            },
            on_touch_start: function() {
                this.closeTishiClick(), this.closeButtonClick()
            },
            addClickBtns: function() {
                var t = this;
                t.touch.on(cc.Node.EventType.TOUCH_START, function() {
                    t.allTouch && t.on_touch_start()
                }), t.touch.on(cc.Node.EventType.TOUCH_MOVE, function() {
                    t.allTouch
                }), t.touch.on(cc.Node.EventType.TOUCH_END, function() {
                    t.allTouch
                }), t.touch.on(cc.Node.EventType.TOUCH_CANCEL, function() {
                    t.allTouch
                })
            }
        }), cc._RF.pop()
    }, {
        MainManage: "MainManage"
    }],
    speedUpNode: [function(t, e) {
        "use strict";
        cc._RF.push(e, "eac00VaWPRKKYgTcb5k+6fg", "speedUpNode"), cc.Class({
            extends: cc.Component,
            properties: {
                a: cc.Node,
                b: cc.Node,
                c: cc.Node,
                Hp: 2
            },
            onLoad: function() {},
            hpClick: function() {
                this.Hp--, this.bleedClick()
            },
            bleedClick: function() {
                2 == this.Hp ? (this.a.active = !0, this.b.active = !1, this.c.active = !1) : 1 == this.Hp ? (this.a.active = !1, this.b.active = !0, this.c.active = !1) : 0 == this.Hp && this.schedule(function() {
                    this.node.getComponent(cc.RigidBody).active = !1, this.a.active = !1, this.b.active = !1, this.c.active = !0, this.liekai()
                }, 0)
            },
            liekai: function() {
                var t = this;
                cc.tween(this.node).call(function() {
                    var e = [];
                    (e = t.c.children)[0].runAction(cc.spawn(cc.jumpBy(.3, cc.v2(-2, -2), 2, 1), cc.fadeOut(.2))), e[1].runAction(cc.spawn(cc.jumpBy(.3, cc.v2(2, -2), 2, 1), cc.fadeOut(.2))), e[2].runAction(cc.spawn(cc.jumpBy(.3, cc.v2(0, 2), 2, 1), cc.fadeOut(.2)))
                }).start(), this.schedule(function() {
                    this.node.destroy()
                }, .5)
            }
        }), cc._RF.pop()
    }, {}],
    startGameJs: [function(t, e) {
        "use strict";
        cc._RF.push(e, "280c3rsZJJKnZ9RqbALVwtK", "startGameJs");
        var a = t("GameUiTools"),
            i = (t("HttpManagerJs"), t("MainManage")),
            n = (t("LoadSceneJs"), t("GameConfig"));
        cc.Class({
            extends: cc.Component,
            properties: {
                showInfoT: cc.Label,
                startT: cc.Label
            },
            onLoad: function() {
                n.publicGameBool && i.init(), this.showInfoT.string = i.gameInfoText, this.startT.string = i.txtStartText, this.node.on("touchend", function() {
                    this.node.x = -2e3
                }, this)
            },
            addTouchEvents: function() {
                var t = {
                    event: cc.EventListener.TOUCH_ONE_BY_ONE,
                    onTouchBegan: function() {
                        return a.loadingScene("MainGameScene"), !0
                    },
                    onTouchMoved: function() {},
                    onTouchEnded: function() {}
                };
                cc.eventManager.addListener(t, this.node)
            },
            update: function() {}
        }), cc._RF.pop()
    }, {
        GameConfig: "GameConfig",
        GameUiTools: "GameUiTools",
        HttpManagerJs: "HttpManagerJs",
        LoadSceneJs: "LoadSceneJs",
        MainManage: "MainManage"
    }],
    tuowei: [function(t, e) {
        "use strict";
        cc._RF.push(e, "a3ecb+NHixNXZ2cujdPo/cz", "tuowei"), cc.Class({
            extends: cc.Component,
            properties: {},
            onLoad: function() {
                this.node.getComponent(cc.MotionStreak).color = this.node.color
            },
            start: function() {
                this.node.getComponent(cc.MotionStreak).color = this.node.color
            },
            update: function() {
                this.node.getComponent(cc.MotionStreak).color = this.node.color
            }
        }), cc._RF.pop()
    }, {}],
    use_reversed_rotateTo: [function(t, e) {
        "use strict";
        cc._RF.push(e, "2cda0InyPFPiZ6F+F3mfqqS", "use_reversed_rotateTo"), cc.RotateTo._reverse = !0, cc._RF.pop()
    }, {}],
    "use_v2.1.x_cc.Action": [function(t, e) {
        "use strict";
        cc._RF.push(e, "3d955FA+LRGIrucKnjwx5hy", "use_v2.1.x_cc.Action"), cc.macro.ROTATE_ACTION_CCW = !0, cc._RF.pop()
    }, {}],
    view_bg: [function(t, e) {
        "use strict";
        cc._RF.push(e, "eb058xh9utPWI6kbfQb1e7r", "view_bg"), cc.Class({
            extends: cc.Component,
            properties: {
                bg2: cc.Node,
                bg3: cc.Node,
                leftUp: cc.Node,
                leftDown: cc.Node,
                rightUp: cc.Node,
                rightDown: cc.Node,
                angleNode: [cc.Node]
            },
            onLoad: function() {
                this.rootJS = this.node.parent.getComponent("view_root"), this.mapWidth = GameData.mapWidth, GameData.isRepaly ? (ValueManger.getData(), this.max_x = ValueManger.mapX, this.max_y = ValueManger.mapY, this.saveMap(), this.setMap()) : (this.setLineNum(), this.setMap()), this.posArr = [], this.start_x = -(this.mapWidth * this.max_x / 2 - this.mapWidth / 2), this.start_y = -(this.mapWidth * this.max_y / 2 - this.mapWidth / 2);
                for (var t = 0; t < this.max_x; t++)
                    for (var e = this.start_x + this.mapWidth * t, a = 0; a < this.max_y; a++) {
                        var i = this.start_y + this.mapWidth * a,
                            n = {
                                pos: cc.v2(e, i),
                                carNode: !1,
                                line: cc.v2(t, a),
                                dirArr: [1, 2, 3, 4],
                                theDir: 0
                            };
                        this.posArr.push(n)
                    }
                GameData.arrPos = this.posArr, GameData.isRepaly ? (GameData.isRepaly = !1, this.rootJS.replayCreate()) : this.rootJS.init(), this.setRootScale()
            },
            saveMap: function() {
                ValueManger.mapX = this.max_x, ValueManger.mapY = this.max_y, ValueManger.setData()
            },
            setMap: function() {
                this.bg3.width = this.mapWidth * this.max_x + 50, this.bg3.height = this.mapWidth * this.max_y + 50, this.bg2.width = this.bg3.width + 2 * GameData.mapWidth, this.bg2.height = this.bg3.height + 2 * GameData.mapWidth, this.leftUp.position = cc.v2(-this.bg2.width / 2 + GameData.mapWidth / 2, this.bg2.height / 2 - GameData.mapWidth / 2), this.leftDown.position = cc.v2(-this.bg2.width / 2 + GameData.mapWidth / 2, -this.bg2.height / 2 + GameData.mapWidth / 2), this.rightUp.position = cc.v2(this.bg2.width / 2 - GameData.mapWidth / 2, this.bg2.height / 2 - GameData.mapWidth / 2), this.rightDown.position = cc.v2(this.bg2.width / 2 - GameData.mapWidth / 2, -this.bg2.height / 2 + GameData.mapWidth / 2), this.angleNode[0].position = cc.v2(-this.bg2.width / 2 + GameData.mapWidth, this.bg2.height / 2 - GameData.mapWidth / 2), this.angleNode[1].position = cc.v2(-this.bg2.width / 2 + GameData.mapWidth / 2, this.bg2.height / 2 - GameData.mapWidth), this.angleNode[2].position = cc.v2(-this.bg2.width / 2 + GameData.mapWidth / 2, -this.bg2.height / 2 + GameData.mapWidth), this.angleNode[3].position = cc.v2(-this.bg2.width / 2 + GameData.mapWidth, -this.bg2.height / 2 + GameData.mapWidth / 2), this.angleNode[4].position = cc.v2(this.bg2.width / 2 - GameData.mapWidth, this.bg2.height / 2 - GameData.mapWidth / 2), this.angleNode[5].position = cc.v2(this.bg2.width / 2 - GameData.mapWidth / 2, this.bg2.height / 2 - GameData.mapWidth), this.angleNode[6].position = cc.v2(this.bg2.width / 2 - GameData.mapWidth / 2, -this.bg2.height / 2 + GameData.mapWidth), this.angleNode[7].position = cc.v2(this.bg2.width / 2 - GameData.mapWidth, -this.bg2.height / 2 + GameData.mapWidth / 2)
            },
            setLineNum: function() {
                var t = this.rootJS.carNum;
                1 == t ? (this.max_x = 3, this.max_y = 3) : t >= 2 && t <= 3 ? (this.max_x = other.randomInt(2, 3), this.max_y = other.randomInt(4, 4)) : t > 3 && t <= 4 ? (this.max_x = other.randomInt(3, 3), this.max_y = other.randomInt(4, 5)) : t > 4 && t <= 6 ? (this.max_x = other.randomInt(3, 3), this.max_y = other.randomInt(5, 6)) : t > 6 && t <= 8 ? (this.max_x = other.randomInt(3, 4), this.max_y = other.randomInt(5, 6)) : t > 8 && t <= 10 ? (this.max_x = other.randomInt(3, 4), this.max_y = other.randomInt(5, 7)) : t > 10 && t <= 15 ? (this.max_x = other.randomInt(3, 4), this.max_y = other.randomInt(6, 8)) : t > 15 && t <= 18 ? (this.max_x = other.randomInt(4, 5), this.max_y = other.randomInt(7, 8)) : t >= 18 && (this.max_x = other.randomInt(4, 5), this.max_y = other.randomInt(8, 10)), this.saveMap()
            },
            setRootScale: function() {
                (this.max_x >= 3 || this.max_y >= 7) && (this.node.parent.scale = .9, GameData.GameScale = .9), (this.max_x >= 4 || this.max_y >= 8) && (this.node.parent.scale = .8, GameData.GameScale = .8), (this.max_x >= 5 || this.max_y >= 10) && (this.node.parent.scale = .7, GameData.GameScale = .7)
            },
            start: function() {},
            update: function() {}
        }), cc._RF.pop()
    }, {}],
    view_over: [function(t, e) {
        "use strict";
        cc._RF.push(e, "58d7dpNgoBCPY+OyepQcAsV", "view_over");
        var a = t("MainManage");
        cc.Class({
            extends: cc.Component,
            properties: {
                bg: cc.Node,
                gameOver: cc.Node,
                gameOverT1: cc.Label,
                gameOverT2: cc.Label,
                nowScore: cc.Label,
                bestScore: cc.Label,
                paiMing: cc.Label,
                end: cc.Node,
                repaly: cc.Node,
                scroe: cc.Label,
                car: cc.Node,
                more: cc.Node,
                ggPlay: cc.Node,
                moreSpr: [cc.SpriteFrame],
                set: cc.Node,
                gg: cc.Node,
                googleLinkNode: cc.Node
            },
            onLoad: function() {
                var t = this;
                this.more.y = .5 * GameData.gameHeight - 100, this.more.x = .5 * -GameData.gameWidth + 100, this.car.y = .5 * GameData.gameHeight - 900, this.ggPlay.y = .5 * GameData.gameHeight - 900, this.car.scale = .1, this.repaly.y = .5 * GameData.gameHeight - 750, this.paiMing.node.y = .5 * GameData.gameHeight - 600, this.nowScore.node.y = .5 * GameData.gameHeight - 350, this.bestScore.node.parent.y = .5 * GameData.gameHeight - 500, this.islook = !1, this.theNum = 0, this.bg.height = GameData.gameHeight + 10, this.bg.width = GameData.gameWidth + 10, this.scroe.node.runAction(cc.moveBy(.3, cc.v2(0, 500)).easing(cc.easeQuadraticActionOut())), this.set.runAction(cc.moveBy(.3, cc.v2(0, 500)).easing(cc.easeQuadraticActionOut())), this.gg.runAction(cc.moveBy(.3, cc.v2(0, 500)).easing(cc.easeQuadraticActionOut())), this.gameOver.runAction(cc.sequence(cc.moveTo(.3, cc.v2(0, 0)).easing(cc.easeQuadraticActionOut()), cc.callFunc(function() {
                    t.allTouch = !0
                }))), this.isNeedGgPlay(), this.showNumClick(), this.gameEnd1(), this.googleLinkNode.active = !1, cc.find("Canvas").getComponent("MainGameJS").googleLinkNode.active = !1
            },
            showGoogleIcon: function() {
                cc.sys.os == cc.sys.OS_ANDROID && 1 != other.returnCurrentLanType() ? this.googleLinkNode.active = !0 : this.googleLinkNode.active = !1
            },
            linkGooglePlay: function() {
                this.scheduleOnce(function() {
                    window.location.href = "https://play.google.com/store/apps/details?id=com.wesane.ManTianGuo"
                }, .1)
            },
            start: function() {
                cc.tween(this.bg).to(.3, {
                    opacity: 255
                }).start(), GameData.score >= GameData.bestScore && (GameData.bestScore = GameData.score), this.saveBestScore(), this.nowScore.string = GameData.score, this.bestScore.string = GameData.bestScore, this.addClickBtns()
            },
            saveBestScore: function() {
                var t = GameData.bestScore;
                ValueManger.levelNum = GameData.score, ValueManger.heightScore = t, ValueManger.setData()
            },
            addClickBtns: function() {
                var t = this;
                t.node.on(cc.Node.EventType.TOUCH_START, function() {
                    t.allTouch && t.on_touch_start()
                }), t.node.on(cc.Node.EventType.TOUCH_START, function() {
                    t.overTouch && t.on_touch_over()
                })
            },
            on_touch_start: function() {
                GameData.MainGameJS.advertisementFun(), this.allTouch = !1, this.islook = !0, this.gameOver.runAction(cc.moveTo(.3, cc.v2(0, 1e3)).easing(cc.easeQuadraticActionOut())), this.end.runAction(cc.moveTo(.3, cc.v2(0, 0)).easing(cc.easeQuadraticActionOut())), this.car.active && this.car.runAction(cc.scaleTo(.5, .5).easing(cc.easeQuadraticActionOut())), this.repaly.runAction(cc.sequence(cc.delayTime(2), cc.scaleTo(.3, 1.2).easing(cc.easeSineInOut()), cc.scaleTo(.3, 1).easing(cc.easeSineInOut()))).repeatForever(), this.scheduleOnce(function() {
                    this.overTouch = !0
                }, .3)
            },
            on_touch_over: function() {
                GameData.MainGameJS.advertisementFun(), GameData.isRepaly = !0, GameData.isfuhuo = !1, this.overTouch = !1, cc.director.loadScene("MainGameScene")
            },
            showNumClick: function() {
                var t = GameData.score;
                t <= 50 ? (this.showNum = other.randomInt(40, 49, !1), this.forNum = 3) : t > 50 && t <= 60 ? (this.showNum = other.randomInt(50, 59, !1), this.forNum = 4) : t > 60 && t <= 70 ? (this.showNum = other.randomInt(60, 69, !1), this.forNum = 5) : t > 70 && t <= 80 ? (this.showNum = other.randomInt(70, 79, !1), this.forNum = 6) : t > 80 && t <= 90 ? (this.showNum = other.randomInt(80, 89, !1), this.forNum = 7) : t > 90 && t < 100 ? (this.showNum = other.randomInt(90, 95, !1), this.forNum = 8) : t >= 100 && (this.showNum = other.randomInt(95, 99, !1), this.forNum = 8)
            },
            moreGame: function() {
                1 == this.ggPlay.active ? window.location.href = "https://play.google.com/store/apps/details?id=org.cocos2d.HeavyTraffic_MD_WS" : window.location.href = a.moreGameUrl
            },
            ggPlayGame: function() {
                window.location.href = "https://play.google.com/store/apps/details?id=org.cocos2d.HeavyTraffic_MD_WS"
            },
            gameEnd1: function() {
                switch (a.gameOverShowText(GameData.bestScore, 1), other.returnCurrentLanType()) {
                    case 1:
                        this.gameOverT1.string = "\u6e38 \u620f \u7ed3 \u675f", this.gameOverT2.string = "\u70b9 \u51fb \u67e5 \u770b \u6210 \u7ee9", this.setScoreLanguage(1);
                        break;
                    case 2:
                        this.gameOverT1.string = "\u904a \u6232 \u7d50 \u675f", this.gameOverT2.string = "\u9ede \u64ca \u67e5 \u770b \u6210 \u7e3e", this.setScoreLanguage(2);
                        break;
                    case 3:
                        this.gameOverT1.string = "\uac8c\uc784 \uc885\ub8cc", this.gameOverT2.string = "\ud074\ub9ad \ud558\uc5ec \uc131\uc801 \ubcf4\uae30", this.setScoreLanguage(3);
                        break;
                    case 4:
                        this.gameOverT1.string = "Game Over", this.gameOverT2.string = "Click to view results", this.setScoreLanguage(4)
                }
                this.gameOverT2.node.runAction(cc.sequence(cc.delayTime(2), cc.scaleTo(.3, 1.2).easing(cc.easeSineInOut()), cc.scaleTo(.3, 1).easing(cc.easeSineInOut()))).repeatForever()
            },
            setScoreLanguage: function(t) {
                switch (t) {
                    case 1:
                        this.label = "\u51fb\u8d25\u4e86\u5168\u7403" + this.showNum + "%\u7684\u73a9\u5bb6!", this.paiMing.string = this.label;
                        break;
                    case 2:
                        this.label = "\u64ca\u6557\u4e86\u5168\u7403" + this.showNum + "%\u7684\u73a9\u5bb6!", this.paiMing.string = this.label;
                        break;
                    case 3:
                        this.label = "\uc804 \uc138\uacc4" + this.showNum + "%\uc758 \uc720 \uc800 \ub97c \ucc98\uce58 \ud558 \uc600 \uc2b5 \ub2c8 \ub2e4!", this.paiMing.string = this.label;
                        break;
                    case 4:
                        this.label = "Beat" + this.showNum + "%of the world's players!", this.paiMing.string = this.label
                }
                this.ggPlay.getComponent(cc.Sprite).spriteFrame = this.moreSpr[t]
            },
            isNeedGgPlay: function() {
                if (0 != GameData.isGooglePlay) {
                    var t = !1,
                        e = !1;
                    "zh-CN" == window.navigator.language || "zh-cn" == window.navigator.language || (t = "zh-TW" == window.navigator.language || "zh-HK" == window.navigator.language || "ko-KR" == window.navigator.language || "ja-JP" == window.navigator.language || (window.navigator.language, !0)), /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) && (e = !0), t && !e && (this.more.x = 0, this.more.getComponent(cc.Sprite).spriteFrame = this.moreSpr[0], this.more.scale = .7, this.car.active = !1, this.ggPlay.active = !0)
                }
            }
        }), cc._RF.pop()
    }, {
        MainManage: "MainManage"
    }],
    view_root: [function(t, e) {
        "use strict";
        cc._RF.push(e, "f9220YKCphARIugocuHuc43", "view_root"), cc.Class({
            extends: cc.Component,
            properties: {
                GamePre: [cc.Prefab],
                score: cc.Label,
                liziPre: [cc.Prefab],
                startNode: cc.Node,
                startLabel: cc.Label,
                startCarNode: cc.Node,
                startPlayNode: cc.Node,
                startNameSpr: cc.Sprite,
                startNameSprArr: [cc.SpriteFrame],
                ggNode1: cc.Node,
                ggNode2: cc.Node
            },
            onLoad: function() {
                this.node.x = 1500, GameData.onCarArr = [], this.node.height = 720, this.node.width = 1280, this.score.node.position = cc.v2(0, GameData.gameHeight / 2 - 60), this.ggNode1.position = cc.v2(150, GameData.gameHeight / 2 - 60), this.CollisionFun(), this.carArr = [], ValueManger.getData();
                var t = ValueManger.heightScore,
                    e = ValueManger.levelNum,
                    a = ValueManger.replayCount;
                GameData.bestScore = t, GameData.score = e, this.score.string = e, cc.log(a), null == a && (GameData.isRepaly = !1, ValueManger.replayCount = 0, ValueManger.setData(), cc.director.loadScene("MainGameScene")), a < 1 && (GameData.isRepaly = !1, ValueManger.replayCount = a + 1, ValueManger.setData(), cc.director.loadScene("MainGameScene")), 1 == e && (GameData.isRepaly = !1), GS.AudioManager.init([{
                    carover: "audio/defen"
                }]), GS.AudioManager.loadRes(), this.getCarNum(), this.getCarSpeed(), this.isOne = !0, this.isStart = !0, this.dtNum = 0, this.carNodeArr = [], this.repalyData = [], this.isNeedGgPlay(), this.onLoadStartNode()
            },
            onLoadStartNode: function() {
                GameData.key && GameData.MainGameJS.advertisementFun()
            },
            startNodeClick: function() {
                var t = this;
                GameData.MainGameJS.advertisementFun(), this.startNode.runAction(cc.sequence(cc.fadeOut(.2, 1), cc.callFunc(function() {
                    t.startNode.active = !1
                }))), GameData.key = !1
            },
            setStartLanguage: function() {
                var t = other.returnCurrentLanType();
                switch (this.startNameSpr.spriteFrame = this.startNameSprArr[t], t) {
                    case 1:
                        this.label = "\u70b9\u6c7d\u8f66\uff01\u5f00\u51fa\u53bb\uff01\u522b\u649e\u8f66\uff01", this.startLabel.string = this.label;
                        break;
                    case 2:
                        this.label = "\u9ede\u6c7d\u8eca\uff01 \u958b\u51fa\u53bb\uff01 \u5225\u649e\u8eca\uff01", this.startLabel.string = this.label;
                        break;
                    case 3:
                        this.label = "\uc790\ub3d9 \ucc28 \ub97c \uc8fc\ubb38 \ud558 \uc138 \uc694!\ub098 \uac00!\ucc28 \uc5d0 \ubd80 \ub52a \uce58\uc9c0 \ub9c8 \uc138 \uc694!", this.startLabel.string = this.label;
                        break;
                    case 4:
                        this.label = "Order a car! Get out! Don't crash!", this.startLabel.string = this.label
                }
            },
            isNeedGgPlay: function() {
                if (0 != GameData.isGooglePlay) {
                    var t = !1,
                        e = !1;
                    "zh-CN" == window.navigator.language || "zh-cn" == window.navigator.language || (t = "zh-TW" == window.navigator.language || "zh-HK" == window.navigator.language || "ko-KR" == window.navigator.language || "ja-JP" == window.navigator.language || (window.navigator.language, !0)), /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) && (e = !0), t && !e && (this.ggNode1.active = !0, this.ggNode2.active = !0)
                }
            },
            ggPlayGame: function() {
                window.location.href = "https://play.google.com/store/apps/details?id=org.cocos2d.HeavyTraffic_MD_WS"
            },
            getCarNum: function() {
                var t = GameData.score;
                1 == t ? this.carNum = 1 : 2 == t ? this.carNum = 2 : 3 == t ? this.carNum = 3 : 4 == t ? this.carNum = 4 : 5 == t ? this.carNum = 5 : t > 5 && t <= 10 ? this.carNum = 6 : t > 10 && t <= 15 ? this.carNum = 7 : t > 15 && t <= 20 ? this.carNum = 8 : t > 20 && t <= 25 ? this.carNum = 9 : t > 25 && t <= 30 ? this.carNum = 10 : t > 30 && t <= 35 ? this.carNum = 11 : t > 35 && t <= 40 ? this.carNum = 12 : t > 40 && t <= 45 ? this.carNum = 13 : t > 45 && t <= 50 ? this.carNum = 14 : t > 50 && t <= 60 ? this.carNum = 15 : t > 60 && (this.carNum = 16)
            },
            getCarSpeed: function() {
                var t = GameData.score;
                t <= 50 ? GameData.speed = 500 : t > 55 && t <= 60 ? GameData.speed = 550 : t > 55 && t <= 60 ? GameData.speed = 600 : t > 60 && t <= 65 ? GameData.speed = 625 : t > 65 && t <= 70 ? GameData.speed = 650 : t > 70 && t <= 75 ? GameData.speed = 675 : t > 75 && t <= 80 ? GameData.speed = 700 : t > 80 && t <= 85 ? GameData.speed = 725 : t > 85 && t <= 90 ? GameData.speed = 750 : t > 90 && t <= 95 ? GameData.speed = 775 : t > 95 && t <= 100 ? GameData.speed = 800 : t > 100 && (GameData.speed = other.randomInt(600, 800))
            },
            init: function() {
                if (1 == this.carNum) {
                    var t = other.randomInt(1, 4);
                    this.createCar(GameData.arrPos[4], t), this.shou = cc.instantiate(this.GamePre[1]), this.shou.position = cc.v2(GameData.arrPos[4].pos.x, GameData.arrPos[4].pos.y - 10), this.shou.parent = this.node, this.shou.scale = .5, this.shou.zIndex = 3
                } else
                    for (var e = 0; e < this.carNum; e++) this.cheakCreate(e);
                this.clearBug(), this.saveLevelData(), this.node.runAction(cc.moveTo(.5, cc.v2(0, 0)).easing(cc.easeQuadraticActionOut()))
            },
            replayCreate: function() {
                ValueManger.getData();
                for (var t = ValueManger.levelCarArr, e = 0; e < t.length; e++)
                    for (var a = 0; a < GameData.arrPos.length; a++)
                        if (t[e].line.x == GameData.arrPos[a].line.x && t[e].line.y == GameData.arrPos[a].line.y) {
                            var i = cc.instantiate(this.GamePre[0]);
                            i.position = GameData.arrPos[a].pos, i.parent = this.node, i.getComponent("car").setCarAngle(t[e].dir), this.carArr.push(i), this.carNodeArr.push(i)
                        }
                this.clearBug(), this.node.runAction(cc.moveTo(.5, cc.v2(0, 0)).easing(cc.easeQuadraticActionOut()))
            },
            clearBug: function() {
                for (var t = 0; t < this.carArr.length; t++)
                    for (var e = 0; e < this.carArr.length; e++)
                        if (t != e && this.carArr[t].isValid && this.carArr[t].isValid) {
                            var a = cc.v2(this.carArr[t].x, this.carArr[t].y),
                                i = cc.v2(this.carArr[e].x, this.carArr[e].y);
                            if (other.pDistance(a, i) <= GameData.mapWidth / 2) return this.carArr[t].getComponent("car").shadowNode.destroy(), this.carArr[t].destroy(), this.carArr.splice(t, 1), void this.clearBug()
                        }
            },
            cheakCreate: function() {
                if (!(GameData.arrPos.length <= 0)) {
                    for (var t = 0; t < GameData.arrPos.length; t++) GameData.arrPos[t].dirArr.length <= 0 && (GameData.arrPos[t].carNode = !0);
                    if (this.isStart) {
                        if (GameData.arrPos.length <= 0) return;
                        if (this.dtNum >= 2e3) return void(this.dtNum = 0);
                        this.dtNum++;
                        var e = other.randomInt(0, GameData.arrPos.length - 1);
                        if (GameData.arrPos[e].carNode) this.isStart = !0, this.cheakCreate();
                        else {
                            var a = GameData.arrPos[e].dirArr.length;
                            if (a <= 0) return this.isStart = !0, void this.cheakCreate();
                            var i = other.randomInt(0, a - 1);
                            if (this.diguicar(GameData.arrPos[e].dirArr[i], GameData.arrPos[e].line)) {
                                if (this.dtNum++, this.dtNum >= 2e3) return void(this.dtNum = 0);
                                this.isStart = !0, this.cheakCreate()
                            } else {
                                if (this.dirIsdeng(GameData.arrPos[e].dirArr[i]), this.dirIsdeng(GameData.arrPos[e].dirArr[i])) return;
                                this.createCar(GameData.arrPos[e], GameData.arrPos[e].dirArr[i]), this.isStart = !1
                            }
                        }
                    } else if (this.canCheakArr.length <= 0) this.cheakBefore();
                    else {
                        var n = other.randomInt(0, this.canCheakArr.length - 1),
                            o = this.canCheakArr[n].dirArr.length;
                        if (o <= 0) return this.isStart = !0, void this.cheakCreate();
                        var r = other.randomInt(0, o - 1);
                        if (this.dirIsdeng(this.canCheakArr[n].dirArr[r])) return;
                        this.createCar(this.canCheakArr[n], this.canCheakArr[n].dirArr[r]), this.canCheakArr.splice(n, 1), GameData.carPosArr.push(this.canCheakArr)
                    }
                }
            },
            cheakBefore: function() {
                var t = other.randomInt(0, GameData.carPosArr.length - 1);
                if (t <= 0) this.isStart = !0, this.cheakCreate();
                else {
                    var e = other.randomInt(0, GameData.carPosArr[t].length - 1);
                    if (e <= 0) this.isStart = !0, this.cheakCreate();
                    else {
                        var a = GameData.carPosArr[t][e].dirArr.length;
                        if (a <= 0) return this.isStart = !0, void this.cheakCreate();
                        var i = other.randomInt(0, a - 1);
                        if (this.dirIsdeng(GameData.carPosArr[t][e].dirArr[i]), this.dirIsdeng(GameData.carPosArr[t][e].dirArr[i])) return;
                        this.createCar(GameData.carPosArr[t][e], GameData.carPosArr[t][e].dirArr[i]), GameData.carPosArr[t].splice(e, 1)
                    }
                }
            },
            dirIsdeng: function(t) {
                if (this.carNodeArr.length >= 2 && this.carNodeArr[this.carNodeArr.length - 1].dir == t && this.carNodeArr[this.carNodeArr.length - 2].dir == t) return this.isStart = !0, this.cheakCreate(), !0
            },
            diguicar: function(t, e) {
                switch (t) {
                    case 1:
                        for (var a = 0; a < GameData.arrPos.length; a++)
                            if (GameData.arrPos[a].line.x == e.x && GameData.arrPos[a].line.y >= e.y && GameData.arrPos[a].carNode) return !0;
                        break;
                    case 2:
                        for (var i = 0; i < GameData.arrPos.length; i++)
                            if (GameData.arrPos[i].line.x == e.x && GameData.arrPos[i].line.y <= e.y && GameData.arrPos[i].carNode) return !0;
                        break;
                    case 3:
                        for (var n = 0; n < GameData.arrPos.length; n++)
                            if (GameData.arrPos[n].line.x <= e.x && GameData.arrPos[n].line.y == e.y && GameData.arrPos[n].carNode) return !0;
                        break;
                    case 4:
                        for (var o = 0; o < GameData.arrPos.length; o++)
                            if (GameData.arrPos[o].line.x >= e.x && GameData.arrPos[o].line.y == e.y && GameData.arrPos[o].carNode) return !0
                }
            },
            createCar: function(t, e) {
                if (t.carNode) return this.isStart = !0, void this.cheakCreate();
                if (t.dirArr.length <= 0) return this.isStart = !0, void this.cheakCreate();
                var a = cc.instantiate(this.GamePre[0]);
                a.position = t.pos, a.parent = this.node;
                var i = {
                    pos: t.pos,
                    dir: e,
                    line: t.line
                };
                a.dir = e, a.line = t.line, a.getComponent("car").setCarAngle(e), t.carNode = !0, this.carArr.push(a), this.carNodeArr.push(a), this.repalyData.push(i), this.cheakCar(e, t.line)
            },
            cheakCar: function(t, e) {
                switch (this.canCheakArr = [], t) {
                    case 1:
                        for (var a = 0; a < GameData.arrPos.length; a++) GameData.arrPos[a].line.x == e.x && GameData.arrPos[a].line.y >= e.y && (this.deleteArr(2, GameData.arrPos[a].dirArr), this.isStart && (GameData.arrPos[a].carNode = !0)), GameData.arrPos[a].line.x == e.x + 1 && GameData.arrPos[a].line.y == e.y && (this.deleteArr(1, GameData.arrPos[a].dirArr), this.deleteArr(2, GameData.arrPos[a].dirArr), this.deleteArr(4, GameData.arrPos[a].dirArr), this.canCheakArr.push(GameData.arrPos[a])), GameData.arrPos[a].line.x == e.x - 1 && GameData.arrPos[a].line.y == e.y && (this.deleteArr(1, GameData.arrPos[a].dirArr), this.deleteArr(2, GameData.arrPos[a].dirArr), this.deleteArr(3, GameData.arrPos[a].dirArr), this.canCheakArr.push(GameData.arrPos[a])), GameData.arrPos[a].line.x == e.x && GameData.arrPos[a].line.y == e.y - 1 && (this.deleteArr(2, GameData.arrPos[a].dirArr), this.deleteArr(3, GameData.arrPos[a].dirArr), this.deleteArr(4, GameData.arrPos[a].dirArr), this.canCheakArr.push(GameData.arrPos[a]));
                        break;
                    case 2:
                        for (var i = 0; i < GameData.arrPos.length; i++) GameData.arrPos[i].line.x == e.x && GameData.arrPos[i].line.y <= e.y && (this.deleteArr(1, GameData.arrPos[i].dirArr), this.isStart && (GameData.arrPos[i].carNode = !0)), GameData.arrPos[i].line.x == e.x + 1 && GameData.arrPos[i].line.y == e.y && (this.deleteArr(1, GameData.arrPos[i].dirArr), this.deleteArr(2, GameData.arrPos[i].dirArr), this.deleteArr(4, GameData.arrPos[i].dirArr), this.canCheakArr.push(GameData.arrPos[i])), GameData.arrPos[i].line.x == e.x - 1 && GameData.arrPos[i].line.y == e.y && (this.deleteArr(1, GameData.arrPos[i].dirArr), this.deleteArr(2, GameData.arrPos[i].dirArr), this.deleteArr(3, GameData.arrPos[i].dirArr), this.canCheakArr.push(GameData.arrPos[i])), GameData.arrPos[i].line.x == e.x && GameData.arrPos[i].line.y == e.y + 1 && (this.deleteArr(1, GameData.arrPos[i].dirArr), this.deleteArr(3, GameData.arrPos[i].dirArr), this.deleteArr(4, GameData.arrPos[i].dirArr), this.canCheakArr.push(GameData.arrPos[i]));
                        break;
                    case 3:
                        for (var n = 0; n < GameData.arrPos.length; n++) GameData.arrPos[n].line.x <= e.x && GameData.arrPos[n].line.y == e.y && (this.deleteArr(4, GameData.arrPos[n].dirArr), this.isStart && (GameData.arrPos[n].carNode = !0)), GameData.arrPos[n].line.x == e.x + 1 && GameData.arrPos[n].line.y == e.y && (this.deleteArr(1, GameData.arrPos[n].dirArr), this.deleteArr(2, GameData.arrPos[n].dirArr), this.deleteArr(4, GameData.arrPos[n].dirArr), this.canCheakArr.push(GameData.arrPos[n])), GameData.arrPos[n].line.x == e.x && GameData.arrPos[n].line.y == e.y + 1 && (this.deleteArr(1, GameData.arrPos[n].dirArr), this.deleteArr(3, GameData.arrPos[n].dirArr), this.deleteArr(4, GameData.arrPos[n].dirArr), this.canCheakArr.push(GameData.arrPos[n])), GameData.arrPos[n].line.x == e.x && GameData.arrPos[n].line.y == e.y - 1 && (this.deleteArr(2, GameData.arrPos[n].dirArr), this.deleteArr(3, GameData.arrPos[n].dirArr), this.deleteArr(4, GameData.arrPos[n].dirArr), this.canCheakArr.push(GameData.arrPos[n]));
                        break;
                    case 4:
                        for (var o = 0; o < GameData.arrPos.length; o++) GameData.arrPos[o].line.x >= e.x && GameData.arrPos[o].line.y == e.y && (this.deleteArr(3, GameData.arrPos[o].dirArr), this.isStart && (GameData.arrPos[o].carNode = !0)), GameData.arrPos[o].line.x == e.x - 1 && GameData.arrPos[o].line.y == e.y && (this.deleteArr(1, GameData.arrPos[o].dirArr), this.deleteArr(2, GameData.arrPos[o].dirArr), this.deleteArr(3, GameData.arrPos[o].dirArr), this.canCheakArr.push(GameData.arrPos[o])), GameData.arrPos[o].line.x == e.x && GameData.arrPos[o].line.y == e.y + 1 && (this.deleteArr(1, GameData.arrPos[o].dirArr), this.deleteArr(3, GameData.arrPos[o].dirArr), this.deleteArr(4, GameData.arrPos[o].dirArr), this.canCheakArr.push(GameData.arrPos[o])), GameData.arrPos[o].line.x == e.x && GameData.arrPos[o].line.y == e.y - 1 && (this.deleteArr(2, GameData.arrPos[o].dirArr), this.deleteArr(3, GameData.arrPos[o].dirArr), this.deleteArr(4, GameData.arrPos[o].dirArr), this.canCheakArr.push(GameData.arrPos[o]))
                }
            },
            deleteArr: function(t, e) {
                for (var a = 0; a < e.length; a++)
                    if (e[a] == t) return e.splice(a, 1), !0
            },
            endAction: function(t) {
                for (var e = 0; e < this.carArr.length; e++) t && this.carArr[e].pauseAllActions(), this.carArr[e].getComponent("car").allTouch = !1
            },
            fuhuoShi: function() {
                var t = this;
                adBreak({
                    type: "reward",
                    name: "dasdf",
                    beforeReward: function(t) {
                        t()
                    },
                    adDismissed: function() {},
                    adViewed: function() {},
                    adBreakDone: function() {
                        console.log("\u89c6\u9891\u5956\u52b12"), GameData.isfuhuo = !0, t.node.parent.getChildByName("fuhuo").active = !1;
                        for (var e = 0; e < t.carArr.length; e++)
                            if (t.carArr[e].getComponent("car").clossLizi(), t.carArr[e].getComponent("car").ispeng) {
                                if (1 == t.carArr[e].getComponent("car").carState && (t.carArr[e].setPosition(t.carArr[e].getComponent("car").fuhuoPos1), t.carArr[e].angle = t.carArr[e].getComponent("car").fuhuoAngle1, t.carArr[e].resumeAllActions(), t.carArr[e].getComponent("car").weiqi.node.active = !0), 0 == t.carArr[e].getComponent("car").carState) {
                                    switch (t.carArr[e].stopAllActions(), t.carArr[e].getComponent("car").backCarAnchor(), t.carArr[e].setPosition(t.carArr[e].getComponent("car").fuhuoPos0), t.carArr[e].getComponent("car").fordir) {
                                        case 1:
                                            t.carArr[e].angle = 180;
                                            break;
                                        case 2:
                                            t.carArr[e].angle = 0;
                                            break;
                                        case 3:
                                            t.carArr[e].angle = -90;
                                            break;
                                        case 4:
                                            t.carArr[e].angle = 90
                                    }
                                    t.carArr[e].getComponent("car").allTouch = !0
                                }
                                t.carArr[e].getComponent("car").ispeng = !1, t.carArr[e].getComponent("car").bool = !0
                            } else if (1 == t.carArr[e].getComponent("car").carState && (t.carArr[e].resumeAllActions(), t.carArr[e].getComponent("car").weiqi.node.active = !0), 0 == t.carArr[e].getComponent("car").carState) {
                            switch (t.carArr[e].stopAllActions(), t.carArr[e].getComponent("car").backCarAnchor(), t.carArr[e].setPosition(t.carArr[e].getComponent("car").fuhuoPos0), t.carArr[e].getComponent("car").fordir) {
                                case 1:
                                    t.carArr[e].angle = 180;
                                    break;
                                case 2:
                                    t.carArr[e].angle = 0;
                                    break;
                                case 3:
                                    t.carArr[e].angle = -90;
                                    break;
                                case 4:
                                    t.carArr[e].angle = 90
                            }
                            t.carArr[e].getComponent("car").allTouch = !0
                        }
                    }
                })
            },
            fuhuoFou: function() {
                this.node.parent.getChildByName("fuhuo").active = !1, this.node.parent.getChildByName("over").active = !0, GS.AudioManager.playSound("audio/over", .3)
            },
            cheaklevel: function() {
                for (var t = 0; t < this.carArr.length; t++)
                    if (0 == this.carArr[t].getComponent("car").carState) return;
                this.getPointPos(), GS.AudioManager.playSound("audio/cg", .4), this.scheduleOnce(function() {
                    this.endAction(), this.node.runAction(cc.fadeOut(.5)), this.scheduleOnce(function() {
                        GameData.score >= GameData.bestScore && (GameData.bestScore = GameData.score), GameData.isRepaly = !1, this.saveBestScore(), cc.director.loadScene("MainGameScene")
                    }, .5)
                }, 1.5)
            },
            saveBestScore: function() {
                var t = GameData.bestScore;
                ValueManger.levelNum = GameData.score + 1, ValueManger.heightScore = t, ValueManger.setData()
            },
            saveLevelData: function() {
                var t = this.repalyData;
                ValueManger.levelCarArr = t, ValueManger.setData()
            },
            CollisionFun: function() {
                cc.director.getPhysicsManager().enabled = !0, cc.director.getPhysicsManager().gravity = cc.v2(0, -1e3), this.manager = cc.director.getCollisionManager(), this.manager.enabled = !0, this.manager.enabledDebugDraw = !0, cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit | cc.PhysicsManager.DrawBits.e_pairBit | cc.PhysicsManager.DrawBits.e_centerOfMassBit | cc.PhysicsManager.DrawBits.e_jointBit | cc.PhysicsManager.DrawBits.e_shapeBit, cc.director.getPhysicsManager().debugDrawFlags = 0, cc.director.getCollisionManager().enabledDebugDraw = !1
            },
            update: function() {
                this.isOne && this.cheaklevel()
            },
            getcolor: function() {
                var t = ["fe0100", "fefe00", "b702e7", "00fffd", "0083f7", "fefe00"];
                return t[other.randomInt(0, t.length - 1)]
            },
            getPointPos: function() {
                this.isOne = !1, this.effectAni()
            },
            addPoints: function(t) {
                for (var e = 0; e < 20; e++) {
                    var a = other.randomInt(0, this.liziPre.length - 1),
                        i = cc.instantiate(this.liziPre[a]);
                    i.position = t, i.color = cc.color().fromHEX(this.getcolor()), i.scale = .3 + .5 * Math.random(), i.opacity = other.randomInt(150, 200), i.parent = this.node;
                    var n = other.randomInt(100, 500),
                        o = other.randomInt(100, 200);
                    this.moveDegressAni(i, null, n, o);
                    var r = other.randomInt(-180, 180);
                    i.runAction(cc.rotateBy(.5, r).repeatForever())
                }
            },
            moveDegressAni: function(t, e, a, i, n, o) {
                e = e || other.randomInt(20, 70);
                var r = cc.misc.degreesToRadians(e),
                    c = cc.v2(Math.cos(r) * a, Math.sin(r) * a),
                    s = a / i,
                    h = n ? 0 : t.scale;
                o || t.opacity, t.runAction(cc.sequence(cc.spawn(cc.scaleTo(s + .1, h), cc.moveBy(s, c).easing(cc.easeQuadraticActionOut())), cc.removeSelf(!0))).repeatForever()
            },
            effectAni: function() {
                for (var t = 0; t < 80; t++) {
                    var e = other.randomInt(0, this.liziPre.length - 1),
                        a = cc.instantiate(this.liziPre[e]);
                    a.color = cc.color().fromHEX(this.getcolor()), a.parent = this.node, a.zIndex = 100;
                    var i = 0;
                    Math.random() >= .5 ? (a.x = GameData.gameWidth / 2 + a.width, i = other.randomInt(-100, -GameData.gameWidth)) : (a.x = -GameData.gameWidth / 2 - a.width, i = other.randomInt(100, GameData.gameWidth)), a.y = other.randomInt(0, GameData.gameHeight / 2);
                    var n = -GameData.gameHeight - 200,
                        o = .3 * Math.random();
                    a.runAction(cc.sequence(cc.delayTime(o), cc.spawn(cc.moveBy(.84, cc.v2(0, .3 * -n)).easing(cc.easeExponentialOut()), cc.moveBy(2.8, cc.v2(i, 0)).easing(cc.easeCircleActionOut()), cc.moveBy(2.8 * (.2 * Math.random() + .8), cc.v2(0, 1.2 * n)).easing(cc.easeSineIn())), cc.removeSelf(!0))), a.scale = .8, a.runAction(cc.rotateBy(1, other.randomInt(180, 360)).repeatForever())
                }
            }
        }), cc._RF.pop()
    }, {}],
    view_ui: [function(t, e) {
        "use strict";
        cc._RF.push(e, "bc983xU6xNFM7NvhglLeBu9", "view_ui"), cc.Class({
            extends: cc.Component,
            properties: {
                scroe: cc.Label,
                kLevel: cc.Node,
                fishNum: cc.Label,
                over: cc.Node,
                camera: cc.Node
            },
            onLoad: function() {
                ValueManger.getData();
                var t = ValueManger.heightScore;
                this.cheakNum = GS.GetCurrentLevel(), GameData.UIJS = this.node.getComponent("view_ui");
                var e = GameData.cheakRnum;
                this.fishNum.string = e, this.scroe.string = GameData.score, GameData.bestScore = t
            },
            start: function() {
                this.scroe.node.active = !0, this.kLevel.active = !0, cc.tween(this.scroe.node).to(.3, {
                    position: cc.v2(.5 * GameData.gameWidth - 100, .5 * GameData.gameHeight - 80)
                }).start(), cc.tween(this.kLevel).to(.3, {
                    position: cc.v2(-(.5 * GameData.gameWidth - 100), .5 * GameData.gameHeight - 80)
                }).start(), this.cheakNum > 10 && (GS.AudioManager.playSound("audio/over4", .4), this.over.active = !0)
            },
            gensui: function() {
                var t = this.camera.position;
                this.node.position = t
            },
            huiheOver: function() {
                cc.tween(this.scroe.node).to(.3, {
                    position: cc.v2(.5 * GameData.gameWidth - 100, .5 * GameData.gameHeight + 150)
                }).start(), cc.tween(this.kLevel).to(.3, {
                    position: cc.v2(-(.5 * GameData.gameWidth - 100), .5 * GameData.gameHeight + 150)
                }).start(), this.scroe.node.active = !1, this.kLevel.active = !1
            },
            cheakOver: function() {
                cc.tween(this.kLevel).to(.2, {
                    scale: 1.2
                }).to(.1, {
                    scale: 1
                }).start();
                var t = 10 - this.cheakNum;
                GameData.cheakRnum = t, this.fishNum.string = t
            },
            addScore: function() {
                var t = GameData.score;
                t++, GameData.score = t, this.scroe.string = GameData.score;
                var e = GameData.bestScore;
                cc.log(e), t > e && (e = GameData.score, GameData.bestScore = e), this.saveBestScore(), cc.tween(this.scroe.node).to(.2, {
                    scale: 1.2
                }).to(.1, {
                    scale: 1
                }).start()
            },
            saveBestScore: function() {
                var t = GameData.bestScore;
                ValueManger.heightScore = t, ValueManger.setData()
            }
        }), cc._RF.pop()
    }, {}]
}, {}, ["GS", "HttpManagerJs", "LanguageSetJs", "LoadSceneJs", "MainGameJS", "MainManage", "GameData", "LevelSettingArray", "PhysicsParticle", "ValueManger", "bg", "car", "enemy", "loadBg", "moveCircle", "other", "people", "player", "set", "speedUpNode", "tuowei", "view_bg", "view_over", "view_root", "view_ui", "GSAudioManager", "GSConstants", "GSDate", "GSKVStorage", "GameConfig", "GameUiTools", "getCurrentLevel", "gameOverJs", "linkHttpIconJs", "startGameJs", "use_reversed_rotateTo", "use_v2.1.x_cc.Action"]);