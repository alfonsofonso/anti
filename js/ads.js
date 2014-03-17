/**
 User: alfonso
 Data: 14/03/14 , 10:51
 */

Ads=new function(){

    this.publicita=function(){
        var _sa = _sa || [];
        _sa.push(['initialize', 'e159be60-c55a-449e-9293-2aecca195237']);
        _sa.push(['displayAd']);
        (function () {
            var sa = document.createElement('script');
            sa.type = 'text/javascript'; sa.async = true; sa.src = '//admin.appnext.com/an.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(sa, s);
        })();
    };


    this.publica=function(){

        var sa = document.createElement('script');
        sa.type = 'text/javascript'; sa.async = true; sa.src = '//admin.appnext.com/an.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(sa, s);
    };
};

