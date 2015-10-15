/* Javascript for Unity3dXBlock. */

function Unity3dXBlock(runtime, element) {

    function updateCount(result) {
       debugger;
       $('.max_score', element).text(result.max_score);
    }

    var handlerUrl = runtime.handlerUrl(element, 'set_count');

    $('.count').change(function(eventObject) {
        var new_value =  $('.count').text();
        debugger;
        $.ajax({
            type: "POST",
            url: handlerUrl,
            data: JSON.stringify({"score": new_value}),
            success: updateCount
        });
    });

    $(function ($) {

		// here write your code that you want to execute on page load

    });
}


var unity3d_config = {
    width: "100%",
    height: "600px",
    params: { enableDebugging:"0" }

};

var unityObject = new UnityObject2(unity3d_config);
//unity = GetUnity();
//unity.setWidth('80%')

function UpdateScore( arg ){
    // show the message
    // unityObject.getUnity().SendMessage("Player", "MyDieFunction", "Hello from a web page!");
    $('.count').text(arg);
    $('.count').trigger('change');
}

jQuery(function() {

    var $missingScreen = jQuery("#unityPlayer").find(".missing");
    var $brokenScreen = jQuery("#unityPlayer").find(".broken");
    $missingScreen.hide();
    $brokenScreen.hide();

    unityObject.observeProgress(function (progress) {
        switch(progress.pluginStatus) {
            case "broken":
                $brokenScreen.find("a").click(function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    u.installPlugin();
                    return false;
                });
                $brokenScreen.show();
            break;
            case "missing":
                $missingScreen.find("a").click(function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    u.installPlugin();
                    return false;
                });
                $missingScreen.show();
            break;
            case "installed":
                $missingScreen.remove();
            break;
            case "first":
            break;
        }
    });
    var app_url = "https://www.dropbox.com/s/1pdnsg7f9dpbidx/WebBuild.unity3d?dl=1";
    unityObject.initPlugin(jQuery("#unityPlayer")[0], app_url);
});