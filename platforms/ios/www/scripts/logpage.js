!function(){$(document).on("pageshow","#logPage",function(){var e=this,t=ApiClient;t.getJSON(t.getUrl("System/Logs")).then(function(a){var r="";r+='<ul data-role="listview" data-inset="true">',r+=a.map(function(e){var a=t.getUrl("System/Logs/Log",{name:e.Name});a+="&api_key="+t.accessToken();var r='<li><a href="'+a+'" target="_blank">';r+="<h3>",r+=e.Name,r+="</h3>";var i=parseISO8601Date(e.DateModified,{toLocal:!0}),o=i.toLocaleDateString();return o+=" "+LibraryBrowser.getDisplayTime(i),r+="<p>"+o+"</p>",r+="</li>"}).join(""),r+="</ul>",Events.trigger($(".serverLogs",e).html(r)[0],"create")})})}();