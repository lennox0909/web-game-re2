window.adCompleteFlag = true;
window.adEndComplete = true;
window.resCompleteFlag = true;
window.resEndComplete = true;

window.showAd = function(cb) { if(typeof cb === 'function') cb(true); };
window.showRewardAd = function(cb) { if(typeof cb === 'function') cb(true); };
window.initAds = function(cb) { if(typeof cb === 'function') cb(true); };

// 定義真正能啟動遊戲的函數
window.noAdGoToScene = function() {
    console.log("執行免廣告進入遊戲邏輯...");
    
    // 1. 清除所有網頁層級的載入遮罩與廣告容器
    var elementsToHide = ['block-Box', 'adContainer', 'loadingText', 'loadingImg', 'splash'];
    elementsToHide.forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });

    // 2. 確保遊戲畫布設定為可見
    var canvas = document.getElementById('GameCanvas');
    if (canvas) {
        canvas.style.visibility = 'visible';
        canvas.style.display = 'block';
    }

    // 3. 呼叫 Cocos 引擎載入主場景 (MainGameScene)
    if (typeof cc !== 'undefined' && cc.director) {
        cc.game.resume();
        cc.director.loadScene("MainGameScene", null, function() {
            console.log("MainGameScene 載入成功！");
        });
    }
};

// 設定定時器，在資源載入差不多時自動強制觸發進入遊戲
setTimeout(function() {
    if (typeof window.noAdGoToScene === 'function') {
        window.noAdGoToScene();
    }
}, 1500);