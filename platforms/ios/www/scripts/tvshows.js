define(["events","libraryBrowser","imageLoader","alphaPicker","listView","emby-itemscontainer"],function(e,t,a,r,n){return function(e,i,o){function l(e){var a=u(e),r=S[a];return r||(r=S[a]={query:{SortBy:"SortName",SortOrder:"Ascending",IncludeItemTypes:"Series",Recursive:!0,Fields:"PrimaryImageAspectRatio,SortName,SyncInfo",ImageTypeLimit:1,EnableImageTypes:"Primary,Backdrop,Banner,Thumb",StartIndex:0,Limit:g},view:t.getSavedView(a)||t.getDefaultItemsView("Poster","Poster")},r.query.ParentId=i.topParentId,t.loadSavedQueryValues(a,r.query)),r}function s(e){return l(e).query}function u(e){return e.savedQueryKey||(e.savedQueryKey=t.getSavedQueryKey("series")),e.savedQueryKey}function d(e){Dashboard.showLoadingMsg();var r=s(e);ApiClient.getItems(Dashboard.getCurrentUserId(),r).then(function(i){function l(){r.StartIndex+=r.Limit,d(o)}function s(){r.StartIndex-=r.Limit,d(o)}window.scrollTo(0,0),c(e);var m,g=LibraryBrowser.getQueryPagingHtml({startIndex:r.StartIndex,limit:r.Limit,totalRecordCount:i.TotalRecordCount,showLimit:!1,updatePageSizeSetting:!1,addLayoutButton:!1,sortButton:!1,filterButton:!1}),S=y.getCurrentViewStyle();m="Thumb"==S?t.getPosterViewHtml({items:i.Items,shape:"backdrop",preferThumb:!0,context:"tv",lazy:!0,overlayPlayButton:!0}):"ThumbCard"==S?t.getPosterViewHtml({items:i.Items,shape:"backdrop",preferThumb:!0,context:"tv",lazy:!0,cardLayout:!0,showTitle:!0,showSeriesYear:!0}):"Banner"==S?t.getPosterViewHtml({items:i.Items,shape:"banner",preferBanner:!0,context:"tv",lazy:!0}):"List"==S?n.getListViewHtml({items:i.Items,context:"tv",sortBy:r.SortBy}):t.getPosterViewHtml("PosterCard"==S?{items:i.Items,shape:"portrait",context:"tv",showTitle:!0,showYear:!0,lazy:!0,cardLayout:!0}:{items:i.Items,shape:"portrait",context:"tv",centerText:!0,lazy:!0,overlayPlayButton:!0});var v,h,f=o.querySelectorAll(".paging");for(v=0,h=f.length;h>v;v++)f[v].innerHTML=g;for(f=o.querySelectorAll(".btnNextPage"),v=0,h=f.length;h>v;v++)f[v].addEventListener("click",l);for(f=o.querySelectorAll(".btnPreviousPage"),v=0,h=f.length;h>v;v++)f[v].addEventListener("click",s);var p=o.querySelector(".itemsContainer");p.innerHTML=m,a.lazyChildren(p),t.saveQueryValues(u(e),r),Dashboard.hideLoadingMsg()})}function c(e){var t=s(e);y.alphaPicker.value(t.NameStartsWithOrGreater)}function m(e){var a=e.querySelector(".alphaPicker");a.addEventListener("alphavaluechanged",function(t){var a=t.detail.value,r=s(e);r.NameStartsWithOrGreater=a,r.StartIndex=0,d(e)}),y.alphaPicker=new r({element:a,valueChangeEvent:"click"}),e.querySelector(".btnFilter").addEventListener("click",function(){y.showFilterMenu()}),e.querySelector(".btnSort").addEventListener("click",function(a){t.showSortMenu({items:[{name:Globalize.translate("OptionNameSort"),id:"SortName"},{name:Globalize.translate("OptionImdbRating"),id:"CommunityRating,SortName"},{name:Globalize.translate("OptionDateAdded"),id:"DateCreated,SortName"},{name:Globalize.translate("OptionDatePlayed"),id:"DatePlayed,SortName"},{name:Globalize.translate("OptionMetascore"),id:"Metascore,SortName"},{name:Globalize.translate("OptionParentalRating"),id:"OfficialRating,SortName"},{name:Globalize.translate("OptionPlayCount"),id:"PlayCount,SortName"},{name:Globalize.translate("OptionReleaseDate"),id:"PremiereDate,SortName"}],callback:function(){s(e).StartIndex=0,d(e)},query:s(e),button:a.target})});var n=e.querySelector(".btnSelectView");n.addEventListener("click",function(e){t.showLayoutMenu(e.target,y.getCurrentViewStyle(),"Banner,List,Poster,PosterCard,Thumb,ThumbCard".split(","))}),n.addEventListener("layoutchange",function(a){var r=a.detail.viewStyle;l(e).view=r,t.saveViewSetting(u(e),r),s(e).StartIndex=0,d(e)})}var y=this,g=t.getDefaultPageSize(),S={};y.showFilterMenu=function(){require(["components/filterdialog/filterdialog"],function(e){var t=new e({query:s(o),mode:"series"});Events.on(t,"filterchange",function(){s(o).StartIndex=0,d(o)}),t.show()})},y.getCurrentViewStyle=function(){return l(o).view},m(o),y.renderTab=function(){d(o),c(o)},y.destroy=function(){}}});