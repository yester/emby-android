!function(){function e(e,t){var a=Globalize.translate("CancelSyncJobConfirmation");Dashboard.confirm(a,Globalize.translate("HeaderCancelSyncJob"),function(a){a&&(Dashboard.showLoadingMsg(),ApiClient.ajax({url:ApiClient.getUrl("Sync/Jobs/"+t),type:"DELETE"}).then(function(){c(e)}))})}function t(e){var t=".85",a="rgba(204,51,51,"+t+")",r=Globalize.translate("SyncJobStatus"+e.Status);"Completed"==e.Status?a="rgba(82, 181, 75, "+t+")":"CompletedWithError"==e.Status||("Queued"==e.Status?a="rgba(51, 136, 204, "+t+")":"ReadyToTransfer"==e.Status?a="rgba(51, 136, 204, "+t+")":"Transferring"==e.Status?a="rgba(72, 0, 255, "+t+")":"Converting"==e.Status&&(a="rgba(255, 106, 0, "+t+")"));var n="";return n+='<div class="syncStatusBanner" data-status="'+e.Status+'" style="background-color:'+a+';position:absolute;top:0;right:0;padding:.5em .5em; text-align:left;color: #fff; font-weight: 500; text-transform:uppercase; border-bottom-left-radius: 3px;">',n+=r,n+="</div>"}function a(e,a,r,n){var i="";i+="<div class='card squareCard' data-id='"+a.Id+"' data-status='"+a.Status+"'>",i+='<div class="'+r+'">',i+='<div class="cardScalable">',i+='<div class="cardPadder"></div>',n+="?id="+a.Id,i+='<a class="cardContent" href="'+n+'">';var o,s="";a.PrimaryImageItemId?(o=ApiClient.getScaledImageUrl(a.PrimaryImageItemId,{type:"Primary",width:400,tag:a.PrimaryImageTag}),s="background-position:center center;"):(s="background-color:#38c;background-position:center center;",o="css/images/items/detail/video.png"),i+='<div class="cardImage coveredCardImage lazy" data-src="'+o+'" style="'+s+'">';var c=a.Progress||0,d="cardFooter fullCardFooter lightCardFooter";(0==c||c>=100)&&(d+=" hide"),i+='<div class="'+d+'">',i+="<div class='cardText cardProgress'>",i+='<progress class="itemProgressBar" min="0" max="100" value="'+c+'"></progress>',i+="</div>",i+="</div>",i+="</div>",i+=t(a),i+="</a>",i+="</div>",i+='<div class="cardFooter outerCardFooter">';var l=[];a.ParentName&&l.push(a.ParentName),l.push(a.Name),l.push(1==a.ItemCount?Globalize.translate("ValueItemCount",a.ItemCount):Globalize.translate("ValueItemCountPlural",a.ItemCount)),a.ParentName||l.push("&nbsp;"),i+='<div class="cardText" style="text-align:right; float:right;padding:0;">',i+='<paper-icon-button icon="'+AppInfo.moreIcon+'" class="btnJobMenu"></paper-icon-button>',i+="</div>";for(var u=0,g=l.length;g>u;u++)i+="<div class='cardText' style='margin-right:30px;'>",i+=l[u],i+="</div>";return i+="</div>",i+="</div>",i+="</div>"}function r(e,t){if((new Date).getTime()-g<6e4)return void n(e,t);g=(new Date).getTime();var r="",i="",c="cardBox visualCardBox",d="syncjob.html",l=!0;$(e).hasClass("mySyncPage")&&(d="mysyncjob.html",l=!s());for(var u=0,v=t.length;v>u;u++){var p=t[u];if(l){var m=p.TargetName||"Unknown";m!=i&&(i&&(r+="<br/>",r+="<br/>",r+="<br/>"),i=m,r+='<div class="detailSectionHeader">',r+="<div>"+m+"</div>",r+="</div>")}r+=a(e,p,c,d)}var b=$(".syncActivity",e).html(r).lazyChildren();Events.trigger(b[0],"create"),$(".btnJobMenu",b).on("click",function(){o(e,this)}),t.length||b.html('<div style="padding:1em .25em;">'+Globalize.translate("MessageNoSyncJobsFound")+"</div>")}function n(e,t){for(var a=0,r=t.length;r>a;a++){var n=t[a];i(e,n)}}function i(e,a){var r=e.querySelector(".card[data-id='"+a.Id+"']");if(r){var n=r.querySelector(".syncStatusBanner");if(n.getAttribute("data-status")==a.Status){var i=document.createElement("div");i.innerHTML=t(a),i=i.querySelector(".syncStatusBanner"),i.parentNode.removeChild(i),n.parentNode.replaceChild(i,n)}var o=a.Progress||0,s=r.querySelector(".cardFooter");0==o||o>=100?s.classList.add("hide"):(s.classList.remove("hide"),s.querySelector(".itemProgressBar").value=o)}}function o(t,a){var r=$(a).parents(".card"),n=r.attr("data-id"),i=r.attr("data-status"),o=[];o.push("Cancelled"==i?{name:Globalize.translate("ButtonDelete"),id:"delete",ironIcon:"delete"}:{name:Globalize.translate("ButtonCancelSyncJob"),id:"cancel",ironIcon:"delete"}),require(["actionsheet"],function(){ActionSheetElement.show({items:o,positionTo:a,callback:function(a){switch(a){case"delete":e(t,n);break;case"cancel":e(t,n)}}})})}function s(){return Dashboard.capabilities().SupportsSync}function c(e){g=0,Dashboard.showLoadingMsg();var t={};Dashboard.getCurrentUser().then(function(){$(e).hasClass("mySyncPage")&&(t.UserId=Dashboard.getCurrentUserId(),s()&&(t.TargetId=ApiClient.deviceId())),ApiClient.getJSON(ApiClient.getUrl("Sync/Jobs",t)).then(function(t){r(e,t.Items),Dashboard.hideLoadingMsg()})})}function d(e,t){var a=$($.mobile.activePage)[0];if("SyncJobs"==t.MessageType){var n=t.Data;if(s()){var i=ApiClient.deviceId();n=n.filter(function(e){return e.TargetId==i})}r(a,n)}}function l(e){var t="0,1500";$(e).hasClass("mySyncPage")&&(t+=","+Dashboard.getCurrentUserId()),ApiClient.isWebSocketOpen()&&ApiClient.sendWebSocketMessage("SyncJobsStart",t)}function u(){ApiClient.isWebSocketOpen()&&ApiClient.sendWebSocketMessage("SyncJobsStop","")}var g=0;$.fn.lazyChildren=function(){for(var e=0,t=this.length;t>e;e++)ImageLoader.lazyChildren(this[e]);return this},$(document).on("pageinit",".syncActivityPage",function(){var e=this;$(".btnSyncSupporter",e).on("click",function(){requirejs(["scripts/registrationservices"],function(){RegistrationServices.validateFeature("sync").then(function(){})})}),$(".supporterPromotion .mainText",e).html(Globalize.translate("HeaderSyncRequiresSupporterMembership"))}).on("pageshow",".syncActivityPage",function(){var e=this;Dashboard.getPluginSecurityInfo().then(function(t){t.IsMBSupporter?$(".supporterPromotionContainer",e).hide():$(".supporterPromotionContainer",e).show()}),c(e),$(".btnSync",e).taskButton({mode:"on",progressElem:e.querySelector(".syncProgress"),taskKey:"SyncPrepare"}),l(e),$(ApiClient).on("websocketmessage",d)}).on("pagebeforehide",".syncActivityPage",function(){var e=this;$(".btnSync",e).taskButton({mode:"off"}),u(),$(ApiClient).off("websocketmessage",d)})}();