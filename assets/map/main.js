/*
We have to use an asset manager (located in assetManager.js) to download every large picture before we show anything, 
otherwise the map would be imperfect (some images may not appear or load slowly)
 */

<!-- Deleted by Summer: ended up not needing script tag here --!>

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload('images/map_grey.jpg');
ASSET_MANAGER.queueDownload('images/names.png');

ASSET_MANAGER.downloadAll(function() {
	Risk.init();
	$("#overlay").fadeOut('slow');
});
