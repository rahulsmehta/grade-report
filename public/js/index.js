logging = false;

var util = {
    "apply":function(list,f){ //list is an array and f is a function. NOTE: use nodeToArr to
        //convert before invoking this method
        if(list.length <= 0) return;
        var l = list.pop();
        f(l);
        util.apply(list,f);
    },
    "nodeToArr":function(nodeList){
        return Array.prototype.slice.call(nodeList);
    },
    "log":function(text){
        if(logging)console.log(text);
    }
}

var page = {
    'clicked':function(elem){
        var curr = document.getElementById('tabs').getElementsByClassName('active')[0]; //Select active tab
        curr.removeAttribute('class'); //Remove 'active' attribute 
        elem.setAttribute('class','active');
    },
    'setText':function(name){
        var elem = document.getElementById('tab-container');
        if(page.cache[name]){
            elem.innerHTML = page.cache[name];
            return;
        }
        var xhr = new XMLHttpRequest();
        xhr.open('GET','/api/data/'+name,true);
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                var text = xhr.responseText;
                elem.innerHTML = text;
                page.addToCache(name,text);
            }
        }
        xhr.send();
    },
    'setupTabs':function(elem){
        var text = elem.id;
        elem.onclick = function(){
            util.log(text+' clicked');
            page.clicked(elem);
            page.setText(text);
        }
    },
    'addToCache':function(key,val){
        console.log("'"+key+"'"+" added to cache");
        page.cache[key] = val;
    },
    'cache':{}
}

window.onload = function(){
    util.log("Page loaded!");
    var tabsNL = document.getElementById('tabs').getElementsByTagName('li'),
        tabs = util.nodeToArr(tabsNL);
    util.apply(tabs,page.setupTabs);
}
