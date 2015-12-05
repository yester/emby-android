!function(e){function t(){return"Poster"}function a(){return"Thumb"}function r(){return browserInfo.mobile&&AppInfo.enableAppLayouts}function i(){return r()?"overflowPortrait":"portrait"}function o(){return r()?"overflowBackdrop":"backdrop"}function n(e,a,r){var o=18,n={IncludeItemTypes:"Movie",Limit:o,Fields:"PrimaryImageAspectRatio,MediaSourceCount,SyncInfo",ParentId:r,ImageTypeLimit:1,EnableImageTypes:"Primary,Backdrop,Banner,Thumb"};ApiClient.getJSON(ApiClient.getUrl("Users/"+a+"/Items/Latest",n)).then(function(a){var r=t(),o="";"PosterCard"==r?o+=LibraryBrowser.getPosterViewHtml({items:a,lazy:!0,shape:i(),overlayText:!1,showTitle:!0,showYear:!0,cardLayout:!0,showDetailsMenu:!0}):"Poster"==r&&(o+=LibraryBrowser.getPosterViewHtml({items:a,shape:i(),centerText:!0,lazy:!0,overlayText:!1,showDetailsMenu:!0}));var n=e.querySelector("#recentlyAddedItems");n.innerHTML=o,ImageLoader.lazyChildren(n),LibraryBrowser.setLastRefreshed(e)})}function s(t,r,i){var n=e(window).width(),s={SortBy:"DatePlayed",SortOrder:"Descending",IncludeItemTypes:"Movie",Filters:"IsResumable",Limit:n>=1920?6:n>=1600?4:3,Recursive:!0,Fields:"PrimaryImageAspectRatio,MediaSourceCount,SyncInfo",CollapseBoxSetItems:!1,ParentId:i,ImageTypeLimit:1,EnableImageTypes:"Primary,Backdrop,Banner,Thumb"};ApiClient.getItems(r,s).then(function(r){r.Items.length?e("#resumableSection",t).show():e("#resumableSection",t).hide();var i=a(),n="";"ThumbCard"==i?n+=LibraryBrowser.getPosterViewHtml({items:r.Items,preferThumb:!0,shape:o(),showTitle:!0,showYear:!0,lazy:!0,cardLayout:!0,showDetailsMenu:!0}):"Thumb"==i&&(n+=LibraryBrowser.getPosterViewHtml({items:r.Items,preferThumb:!0,shape:o(),overlayText:!0,showTitle:!1,lazy:!0,showDetailsMenu:!0,overlayPlayButton:!0}));var s=t.querySelector("#resumableItems");s.innerHTML=n,ImageLoader.lazyChildren(s)})}function l(e){var a="",o="";switch(e.RecommendationType){case"SimilarToRecentlyPlayed":o=Globalize.translate("RecommendationBecauseYouWatched").replace("{0}",e.BaselineItemName);break;case"SimilarToLikedItem":o=Globalize.translate("RecommendationBecauseYouLike").replace("{0}",e.BaselineItemName);break;case"HasDirectorFromRecentlyPlayed":case"HasLikedDirector":o=Globalize.translate("RecommendationDirectedBy").replace("{0}",e.BaselineItemName);break;case"HasActorFromRecentlyPlayed":case"HasLikedActor":o=Globalize.translate("RecommendationStarring").replace("{0}",e.BaselineItemName)}a+='<div class="homePageSection">',a+='<h1 class="listHeader">'+o+"</h1>",a+=r()?'<div class="hiddenScrollX">':"<div>";var n=t();return"PosterCard"==n?a+=LibraryBrowser.getPosterViewHtml({items:e.Items,lazy:!0,shape:i(),overlayText:!1,showTitle:!0,showYear:!0,cardLayout:!0,showDetailsMenu:!0}):"Poster"==n&&(a+=LibraryBrowser.getPosterViewHtml({items:e.Items,shape:i(),centerText:!0,lazy:!0,showDetailsMenu:!0})),a+="</div>",a+="</div>"}function c(t,a){var r=e(window).width(),i=ApiClient.getUrl("Movies/Recommendations",{userId:a,categoryLimit:r>=1200?4:3,ItemLimit:r>=1920?9:r>=1600?8:r>=1200?7:6,Fields:"PrimaryImageAspectRatio,MediaSourceCount,SyncInfo",ImageTypeLimit:1,EnableImageTypes:"Primary,Backdrop,Banner,Thumb"});ApiClient.getJSON(i).then(function(a){if(!a.length)return e(".noItemsMessage",t).show(),void(t.querySelector(".recommendations").innerHTML="");var r=a.map(l).join("");e(".noItemsMessage",t).hide();var i=t.querySelector(".recommendations");i.innerHTML=r,ImageLoader.lazyChildren(i)})}function d(t,a){var i=a.querySelectorAll(".itemsContainer");r()?e(i).addClass("hiddenScrollX"):e(i).removeClass("hiddenScrollX"),e(i).createCardMenus()}function m(e,t){var a=LibraryMenu.getTopParentId(),r=Dashboard.getCurrentUserId();LibraryBrowser.needsRefresh(t)&&(s(t,r,a),n(t,r,a),AppInfo.enableMovieHomeSuggestions&&c(t,r,a))}function u(e,t){var a=e.querySelector(".pageTabContent[data-index='"+t+"']"),r=[],i="MoviesPage",o="",n="";switch(t){case 0:n="initSuggestedTab",o="renderSuggestedTab";break;case 1:r.push("scripts/movies"),r.push("scripts/queryfilters"),o="renderMoviesTab",n="initMoviesTab";break;case 2:r.push("scripts/movietrailers"),o="renderTrailerTab",n="initTrailerTab";break;case 3:r.push("scripts/moviecollections"),o="renderCollectionsTab",n="initCollectionsTab";break;case 4:r.push("scripts/moviegenres"),o="renderGenresTab";break;case 5:r.push("scripts/moviestudios"),o="renderStudiosTab"}require(r,function(){n&&!a.initComplete&&(window[i][n](e,a),a.initComplete=!0),window[i][o](e,a)})}function p(t,a){if(a.NowPlayingItem&&"Video"==a.NowPlayingItem.MediaType){var r=e(e.mobile.activePage)[0],i=r.querySelector("neon-animated-pages");i.dispatchEvent(new CustomEvent("tabchange",{}))}}window.MoviesPage=window.MoviesPage||{},window.MoviesPage.renderSuggestedTab=m,window.MoviesPage.initSuggestedTab=d,pageIdOn("pageinit","moviesPage",function(){var t=this;e(".recommendations",t).createCardMenus();var a=t.querySelector("paper-tabs"),r=t.querySelector("neon-animated-pages"),i="movies.html",o=LibraryMenu.getTopParentId();o&&(i+="?topParentId="+o),LibraryBrowser.configurePaperLibraryTabs(t,a,r,i),r.addEventListener("tabchange",function(e){u(t,parseInt(e.target.selected))})}),pageIdOn("pagebeforeshow","moviesPage",function(){var t=this;if(!t.getAttribute("data-title")){var a=LibraryMenu.getTopParentId();a?ApiClient.getItem(Dashboard.getCurrentUserId(),a).then(function(e){t.setAttribute("data-title",e.Name),LibraryMenu.setTitle(e.Name)}):(t.setAttribute("data-title",Globalize.translate("TabMovies")),LibraryMenu.setTitle(Globalize.translate("TabMovies")))}e(MediaController).on("playbackstop",p)}),pageIdOn("pagebeforehide","moviesPage",function(){e(MediaController).off("playbackstop",p)})}(jQuery,document);