!function(){window.PlaylistManager={showPanel:function(e){require(["playlisteditor"],function(n){(new n).show(e)})},supportsPlaylists:function(e){return"Program"==e.Type?!1:e.RunTimeTicks||e.IsFolder||"Genre"==e.Type||"MusicGenre"==e.Type||"MusicArtist"==e.Type}}}(jQuery,document);