"use strict";

    var jsonFromApi = new Object;
    var selctedDDIndex = 0;
    var spanElem = document.createElement("span");
    spanElem.innerHTML = "&nbsp;";
    
    var HttpClient = function() {
        this.get = function(aUrl, aCallback) {
            var anHttpRequest = new XMLHttpRequest();
            anHttpRequest.onreadystatechange = function() { 
                if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                    aCallback(anHttpRequest.responseText);
            }

            anHttpRequest.open( "GET", aUrl, true );            
            anHttpRequest.send( null );
        }
    }

    var client = new HttpClient();
    client.get('http://pb-api.herokuapp.com/bars', function(response) {
        jsonFromApi = JSON.parse(response);
        startIt();
    });

    function startIt() {
        //Create an Dropdown from JSON.
        var dropdownElem = document.createElement("select");
        dropdownElem.id = "dd1";
        var i = 0;
        for (i=0; i<jsonFromApi.bars.length; i++) {
            var op = new Option();
            op.value = i+1;
            op.text = "#Progress" + (i+1);
            dropdownElem.options.add(op);

            var percentId = "percent"+(i+1);
            document.getElementById("progressBars").innerHTML += '<div class="progress"><div id=' + percentId + ' class="progress-bar" role="progressbar" style="width: ' + jsonFromApi.bars[i] + '%"' + '></div></div>';
        }
        document.getElementById("footer").appendChild(dropdownElem);
        document.getElementById("dd1").classList.add('selectpicker');
        document.getElementById("dd1").addEventListener("change", intializePrgBar);
        document.getElementById("footer").appendChild(spanElem);
        
        //Create an Input type from JSON.  
        for(i=0; i<jsonFromApi.buttons.length; i++){
          var btn1 = document.createElement("BUTTON"); 
          btn1.id ='btn' + i;  
          btn1.innerHTML = jsonFromApi.buttons[i]; 
          btn1.dataset.val = jsonFromApi.buttons[i]; 
          btn1.dataset.cnt = jsonFromApi.buttons[i];
          //btn1.setAttribute("id", "btn1");
          var foo = document.getElementById("footer"); 
          foo.appendChild(btn1);
          document.getElementById("btn" + i).addEventListener("click", changeWidth);   
        }         
    }


    function intializePrgBar(){
        console.log(this);
        var e = this;
        var selOptVal = e.options[e.selectedIndex].value;
        selctedDDIndex = e.selectedIndex;
        var id = 'percent'+(selOptVal);
        var progressTag = document.getElementById(id);
        progressTag.style.width = jsonFromApi.bars[e.selectedIndex] + "%";
    }

    function changeWidth(){
        var id = "percent" + (selctedDDIndex+1);
        var progressTag = document.getElementById(id);
        //var countTag = this;
        var count = parseInt(progressTag.style.width);
        var amt = parseInt(this.dataset.val);
        console.log(count);
        console.log(amt);
        if(amt < 0){
            if(count >= 0){
                count = count + amt;
            }        
        }else {
            if(count <= parseInt(jsonFromApi.limit)){
                count = count + amt;
            }
        }
        if(count > parseInt(jsonFromApi.limit)){
            count = parseInt(jsonFromApi.limit);
        } else if(count < 0) {
            count = 0;
        }
        if (count <= 40){
            progressTag.classList.remove('progress-bar-warning');
            progressTag.classList.remove('progress-bar-danger');
            progressTag.classList.add('progress-bar-success');
        } else if (count > 40 && count < 80){
            progressTag.classList.remove('progress-bar-success');
            progressTag.classList.remove('progress-bar-danger');
            progressTag.classList.add('progress-bar-warning');
        } else if (count >= 80 && count < parseInt(jsonFromApi.limit)){
            progressTag.classList.remove('progress-bar-warning');
            progressTag.classList.remove('progress-bar-success');
            progressTag.classList.add('progress-bar-danger');
        }
        //countTag.dataset.cnt = count;
        progressTag.style.width = count + "%";
    }