/* Guarda UTMs e parâmetros de atribuição e acrescenta-os aos checkouts avulsos (plano do funil, secção 6). */
(function(){
  var KEY="tu_utm";
  var KEEP=["utm_source","utm_medium","utm_campaign","utm_content","utm_term","utm_id","sck","src","xcod"];
  try{
    var params=new URLSearchParams(location.search);
    var saved={};
    try{saved=JSON.parse(localStorage.getItem(KEY)||"{}")||{}}catch(e){saved={}}
    var changed=false;
    KEEP.forEach(function(k){
      var v=params.get(k);
      if(v){saved[k]=v;changed=true}
    });
    if(changed) localStorage.setItem(KEY,JSON.stringify(saved));
    var keys=Object.keys(saved);
    if(!keys.length) return;
    document.querySelectorAll("a[data-checkout]").forEach(function(a){
      var url=new URL(a.getAttribute("href"),location.origin);
      keys.forEach(function(k){
        if(saved[k]&&!url.searchParams.get(k)) url.searchParams.set(k,saved[k]);
      });
      a.setAttribute("href",url.toString());
    });
  }catch(e){}
})();
