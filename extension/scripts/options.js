"use strict";
    
function saveAddress(url)
{
	chrome.storage.sync.set(
	{
		url: url
	});
}

window.addEventListener("load", function (e)
{
	var address = $("#settings-address");
	var template = $("#settings-address-current-template");
	var list = $("#settings-address-current-list");

	$("[data-i18n]").each(function(index, e)
	{
		e = $(e);
		e.text(chrome.i18n.getMessage(e.data("i18n")));
	});
	
	$("[data-i18n-content]").each(function(index, e)
	{
		e = $(e);
		e.html(chrome.i18n.getMessage(e.data("i18n-content")));
	});

	$("[data-i18n-attrs]").each(function(index, e)
	{
		e = $(e);
        e.data("i18n-attrs").split(",").forEach(function(a)
        {
            a = a.split("=");
            e.attr(a[0], chrome.i18n.getMessage(a[1]));
        });
	});

	chrome.storage.sync.get(
	{
		url: ""
	}, function (items)
	{
		address.val(items.url);
	});

	address.on("input", function()
	{
		saveAddress(address.val());
	});
	
	$("nav a").click(function (e)
	{
		e.preventDefault();
		$(this).tab("show");
	});
	
	$(".settings-address-current-url").click(function (e)
	{
		var url = $(this).data("url");
		address.val(url);
		saveAddress(url);
	});
		
	chrome.tabs.query( {}, function (tabs)
	{
		for (var n = 0; n < tabs.length; n++)
		{
			var tab = tabs[n];
			list.append(template.clone(true).removeAttr("id").removeAttr("hidden").find(".settings-address-current-url").html(tab.title || tab.url).data("url", tab.url).end());
		}
	});
	
}, false);
