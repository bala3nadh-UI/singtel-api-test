    json1 = new Object;
    var selctedIndex1 = 0;

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
        json1 = JSON.parse(response);
        startIt();
    });

    function startIt() {
        //Create an Dropdown from JSON.
        dropdownElem = document.createElement("select");
        dropdownElem.id = "dd1";
        for (i=0; i<json1.bars.length; i++) {
            var op = new Option();
            op.value = i+1;
            op.text = "#Progress" + (i+1);
            dropdownElem.options.add(op);

            var percentId = "percent"+(i+1);
            document.getElementById("progressBars").innerHTML += '<div class="progress"><div id=' + percentId + ' class="progress-bar" role="progressbar" style="width: ' + json1.bars[i] + '%"' + '></div></div>';
        }
        document.getElementById("footer").appendChild(dropdownElem);
        document.getElementById("dd1").addEventListener("change", intializePrgBar);

        //Create an Input type from JSON.  
        for(i=0; i<json1.buttons.length; i++){
          var btn1 = document.createElement("BUTTON"); 
          btn1.id ='btn' + i;  
          btn1.innerHTML = json1.buttons[i]; 
          btn1.dataset.val = json1.buttons[i]; 
          btn1.dataset.cnt = json1.buttons[i];
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
        selctedIndex1 = e.selectedIndex;
        var id = 'percent'+(selOptVal);
        var progressTag = document.getElementById(id);
        progressTag.style.width = json1.bars[e.selectedIndex] + "%";
    }

    function changeWidth(){
        var id = "percent" + (selctedIndex1+1);
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
            if(count <= parseInt(json1.limit)){
                count = count + amt;
            }
        }
        if(count > parseInt(json1.limit)){
            count = parseInt(json1.limit);
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
        } else if (count >= 80 && count < parseInt(json1.limit)){
            progressTag.classList.remove('progress-bar-warning');
            progressTag.classList.remove('progress-bar-success');
            progressTag.classList.add('progress-bar-danger');
        }
        //countTag.dataset.cnt = count;
        progressTag.style.width = count + "%";
    }