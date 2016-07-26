define(["jQuery","datetime","paper-icon-button-light"],function(e,t){function a(e){var t=d.Items.filter(function(t){return t.Id==e})[0];Dashboard.alert({title:l(t,!1),message:t.StatusMessage})}function i(e,t){var a=d.Items.filter(function(e){return e.Id==t})[0],i=Globalize.translate("MessageFileWillBeDeleted")+"<br/><br/>"+a.OriginalPath+"<br/><br/>"+Globalize.translate("MessageSureYouWishToProceed");require(["confirm"],function(a){a(i,Globalize.translate("HeaderDeleteFile")).then(function(){Dashboard.showLoadingMsg(),ApiClient.deleteOriginalFileFromOrganizationResult(t).then(function(){Dashboard.hideLoadingMsg(),s(e)},Dashboard.processErrorResponse)})})}function r(e,t){n(e,t)}function n(e,t){require(["components/fileorganizer/fileorganizer"],function(a){a.show(t).then(function(){s(e)})})}function o(e,t){var a=d.Items.filter(function(e){return e.Id==t})[0];if(!a.TargetPath)return void("Episode"==a.Type&&r(e,a));var i=Globalize.translate("MessageFollowingFileWillBeMovedFrom")+"<br/><br/>"+a.OriginalPath+"<br/><br/>"+Globalize.translate("MessageDestinationTo")+"<br/><br/>"+a.TargetPath;a.DuplicatePaths.length&&(i+="<br/><br/>"+Globalize.translate("MessageDuplicatesWillBeDeleted"),i+="<br/><br/>"+a.DuplicatePaths.join("<br/>")),i+="<br/><br/>"+Globalize.translate("MessageSureYouWishToProceed"),require(["confirm"],function(a){a(i,Globalize.translate("HeaderOrganizeFile")).then(function(){Dashboard.showLoadingMsg(),ApiClient.performOrganization(t).then(function(){Dashboard.hideLoadingMsg(),s(e)},Dashboard.processErrorResponse)})})}function s(e){Dashboard.showLoadingMsg(),ApiClient.getFileOrganizationResults(b).then(function(t){d=t,u(e,t),Dashboard.hideLoadingMsg()},Dashboard.processErrorResponse)}function l(e,t){var a=e.Status,i=null;return"SkippedExisting"==a?a=Globalize.translate("StatusSkipped"):"Failure"==a&&(i="#cc0000",a=Globalize.translate("StatusFailed")),"Success"==a&&(i="green",a=Globalize.translate("StatusSuccess")),t?e.StatusMessage?'<a style="color:'+i+';" data-resultid="'+e.Id+'" href="#" class="btnShowStatusMessage">'+a+"</a>":'<span data-resultid="'+e.Id+'" style="color:'+i+';">'+a+"</span>":a}function u(r,n){var l=n.Items.map(function(e){var a="";a+="<tr>",a+="<td>";var i=t.parseISO8601Date(e.Date,!0);a+=i.toLocaleDateString(),a+="</td>",a+="<td>";var r=e.Status;return"SkippedExisting"==r?(a+='<a data-resultid="'+e.Id+'" style="color:blue;" href="#" class="btnShowStatusMessage">',a+=e.OriginalFileName,a+="</a>"):"Failure"==r?(a+='<a data-resultid="'+e.Id+'" style="color:red;" href="#" class="btnShowStatusMessage">',a+=e.OriginalFileName,a+="</a>"):(a+='<div style="color:green;">',a+=e.OriginalFileName,a+="</div>"),a+="</td>",a+="<td>",a+=e.TargetPath||"",a+="</td>",a+='<td class="organizerButtonCell">',"Success"!=e.Status&&(a+='<button type="button" is="paper-icon-button-light" data-resultid="'+e.Id+'" class="btnProcessResult organizerButton autoSize" title="'+Globalize.translate("ButtonOrganizeFile")+'"><i class="md-icon">folder</i></button>',a+='<button type="button" is="paper-icon-button-light" data-resultid="'+e.Id+'" class="btnDeleteResult organizerButton autoSize" title="'+Globalize.translate("ButtonDeleteFile")+'"><i class="md-icon">delete</i></button>'),a+="</td>",a+="</tr>"}).join(""),u=e(".resultBody",r).html(l).parents(".tblOrganizationResults").table("refresh").trigger("create");e(".btnShowStatusMessage",u).on("click",function(){var e=this.getAttribute("data-resultid");a(e)}),e(".btnProcessResult",u).on("click",function(){var e=this.getAttribute("data-resultid");o(r,e)}),e(".btnDeleteResult",u).on("click",function(){var e=this.getAttribute("data-resultid");i(r,e)});var g=LibraryBrowser.getQueryPagingHtml({startIndex:b.StartIndex,limit:b.Limit,totalRecordCount:n.TotalRecordCount,showLimit:!1,updatePageSizeSetting:!1});e(r)[0].querySelector(".listTopPaging").innerHTML=g,n.TotalRecordCount>b.Limit&&n.TotalRecordCount>50?e(".listBottomPaging",r).html(g).trigger("create"):e(".listBottomPaging",r).empty(),e(".btnNextPage",r).on("click",function(){b.StartIndex+=b.Limit,s(r)}),e(".btnPreviousPage",r).on("click",function(){b.StartIndex-=b.Limit,s(r)}),n.TotalRecordCount?r.querySelector(".btnClearLog").classList.remove("hide"):r.querySelector(".btnClearLog").classList.add("hide")}function g(t,a){var i=e.mobile.activePage;("ScheduledTaskEnded"==a.MessageType&&"AutoOrganize"==a.Data.Key||"AutoOrganizeUpdate"==a.MessageType)&&s(i)}function c(){return[{href:"autoorganizelog.html",name:Globalize.translate("TabActivityLog")},{href:"autoorganizetv.html",name:Globalize.translate("TabTV")},{href:"autoorganizesmart.html",name:Globalize.translate("TabSmartMatches")}]}var d,b={StartIndex:0,Limit:50};e(document).on("pageinit","#libraryFileOrganizerLogPage",function(){var t=this;e(".btnClearLog",t).on("click",function(){ApiClient.clearOrganizationLog().then(function(){s(t)},Dashboard.processErrorResponse)})}).on("pageshow","#libraryFileOrganizerLogPage",function(){LibraryMenu.setTabs("autoorganize",0,c);var t=this;s(t),e(".btnOrganize",t).taskButton({mode:"on",progressElem:t.querySelector(".organizeProgress"),panel:t.querySelector(".organizeTaskPanel"),taskKey:"AutoOrganize"}),Events.on(ApiClient,"websocketmessage",g)}).on("pagebeforehide","#libraryFileOrganizerLogPage",function(){var t=this;d=null,e(".btnOrganize",t).taskButton({mode:"off"}),Events.off(ApiClient,"websocketmessage",g)})});