window.adCompleteFlag = true;
window.adEndComplete = true;
window.resCompleteFlag = true;
window.resEndComplete = true;

window.showAd = function(cb) { if(typeof cb === 'function') cb(true); };
window.showRewardAd = function(cb) { if(typeof cb === 'function') cb(true); };
window.initAds = function(cb) { if(typeof cb === 'function') cb(true); };

window.noAdGoToScene = function() { 
    console.log("noAdGoToScene 被呼叫，隱藏載入畫面，進入遊戲"); 
    
    // 取得並隱藏所有擋在最上層的 HTML 載入元素
    var loadText = document.getElementById('loadingText');
    if (loadText) loadText.style.display = 'none';
    
    var loadImg = document.getElementById('loadingImg');
    if (loadImg) loadImg.style.display = 'none';
    
    var splash = document.getElementById('splash');
    if (splash) splash.style.display = 'none';
};

window.showAd = function(cb) { if(typeof cb === 'function') cb(true); };
window.showRewardAd = function(cb) { if(typeof cb === 'function') cb(true); };
window.initAds = function(cb) { if(typeof cb === 'function') cb(true); };