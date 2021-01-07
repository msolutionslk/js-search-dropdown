This Project is Basic and simple use only

Prerequisite :
1. jQuery 3 or greater

How does this library works:

* This basic search box send the request to the live server url to get the data (as json), this library will be helpful
for quick startup of a basic search box (you can control the number of rows etc.. through your API endpoint).

How to use:

1. Import the "js-search-dropdown.js" file bottom of your page before closing the BODY tag.
    ex: 
    
    <script type="text/javascript" src="js-search-dropdown.js"></script>

2. use the below example code after the import.
    code:

    <script type="text/javascript">
      Jsd({
        identifier: "js-search", //<input type="text" name="countries" id="js-search">
        fetch: "/json.php", //path for your json response
        param: "q", //search parameter ex: https://google.com/search?q=
      });
    </script>

How the json response should be formatted:


    [
        {"value":1,"title":"United Kingdom"},
        {"value":2,"title":"United State"},
        {"value":3,"title":"United Arab Emirates"},
        {"value":4,"title":"Canada"},
        {"value":5,"title":"Sri Lanka"}
    ]


