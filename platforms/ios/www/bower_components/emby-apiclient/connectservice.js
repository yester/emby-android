define([],function(){return{cleanPassword:function(l){return l=l||"",l=replaceAll(l,"&","&amp;"),l=replaceAll(l,"/","&#092;"),l=replaceAll(l,"!","&#33;"),l=replaceAll(l,"$","&#036;"),l=replaceAll(l,'"',"&quot;"),l=replaceAll(l,"<","&lt;"),l=replaceAll(l,">","&gt;"),l=replaceAll(l,"'","&#39;")}}});