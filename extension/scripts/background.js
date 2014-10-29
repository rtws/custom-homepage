"use strict";

var speedDialUrl = "opera://startpage/#speeddial";
var blankPage = chrome.extension.getURL("pages/blank.html");

function redirectSpeedDial(id, url)
{
	if (url === speedDialUrl)
	{
		chrome.storage.sync.get(
		{
			url: blankPage
		}, function(items)
		{
			if (items.url !== speedDialUrl)
			{
				chrome.tabs.update(id,
				{
					url: items.url ? items.url : blankPage
				});
            }
		});
	}
}

chrome.tabs.onCreated.addListener(function (tab)
{
	redirectSpeedDial(tab.id, tab.url);
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab)
{
	if (changeInfo.url)
		redirectSpeedDial(tabId, changeInfo.url);
});
