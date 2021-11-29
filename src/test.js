window.addEventListener('DOMContentLoaded', (event) => {
    console.log('this is a test script');

    var script_tag = document.getElementById('searcher')
    var search_term = script_tag.getAttribute("data-url");
    console.log(search_term);
})