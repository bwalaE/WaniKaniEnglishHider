$(document).ready( async function(){
    hideEnglish()
    //$("ul.subject-queue__items").append("<button id='wkBtn2'>Re-run</button>")

    // Select the node that will be observed for mutations
    const targetNode = document.body;

    // Options for the observer (which mutations to observe)
    const config = { attributes: true, childList: true, subtree: true };

    // Callback function to execute when mutations are observed
    const callback = (mutationList, observer) => {
        var classE = false
        var times = 0
        for (const mutation of mutationList) {
            if (mutation.type === "childList") {
               console.log("A child node has been added or removed.");
            } else if (mutation.type === "attributes") {
                console.log(`The ${mutation.attributeName} attribute was modified.`);
            }
            
            if (mutation.attributeName === "aria-busy"){
                if (times < 1) {
                    times++
                } else {
                    //alert("class E")
                    hideEnglish()
                    hideDefinition()
                    break
                }
            }
        }
    }

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);

    function hideEnglish() {
        //alert("hello") // this runs
        $("div.context-sentences p.wk-text[lang!='ja']").hide()
        $("div.context-sentences p.wk-text[lang='ja']").append("<p class='visibleP' style='background-color:#9F00EF;color:white'>[Click to reveal]</p>")

        $("p.visibleP").click(function() {
            $(this).parent().next().show()
            $(this).hide()
        });
    }

    function hideDefinition() {
        $("div.character-header__meaning").hide()
        $("div.character-header__characters").append("<div class='visibleD' style='background-color:white;color:#9F00EF;font-size:0.3em'>[Click to reveal]</div>")

        $("div.visibleD").click(function() {
            $(this).parent().next().show()
            $(this).hide()
        });
    }

    function hideEnglishReload() {
        //alert("hello") // this runs
        $("div.context-sentences p.wk-text[lang!='ja']").hide()
        $("p.visibleP").show()
    }
});