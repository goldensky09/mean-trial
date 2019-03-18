<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="http://code.jquery.com/jquery-3.3.1.min.js"
        integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    <script src="jquery.typeahead.js"></script>
    <link rel="stylesheet" href="jquery.typeahead.css">
</head>

<body>


    <form id="form-user_v1" name="form-user_v1">
        <div class="typeahead__container">
            <div class="typeahead__field">
                <div class="typeahead__query">
                    <input class="js-typeahead-user_v1" name="user_v1[query]" type="search" placeholder="Search"
                        autocomplete="off">
                </div>
                <div class="typeahead__button">
                    <button type="submit">
                        <i class="typeahead__search-icon"></i>
                    </button>
                </div>
            </div>
        </div>
    </form>


    <script>
        function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

        var renameKeys = function renameKeys(keysMap, obj) {
            return Object.keys(obj).reduce(function (acc, key) {
                return {
                    ...acc,
                    ..._defineProperty({}, keysMap[key] || key, obj[key])
                };
            }, {});
        };
        $.typeahead({
            input: '.js-typeahead-user_v1',
            minLength: 1,
            order: "asc",
            dynamic: true,
            delay: 500,
            backdrop: {
                "background-color": "#fff"
            },
            template: function (query, item) {

                var color = "#777";
                if (item.status === "owner") {
                    color = "#ff1493";
                }

                return '<span class="row">' +
                    '<span class="name">{{name}} <small style="color: ' + color + ';">({{type}})</small></span>' +
                    '<span class="id">({{symbol}})</span><span class="id">({{region}})</span>' +
                    "</span>"
            },
            emptyTemplate: "no result for {{query}}",
            source: {
                bestMatches: {
                    display: "name",
                    ajax: function (query) {
                        return {
                            type: "GET",
                            url: "https://www.alphavantage.co/query",
                            path: "bestMatches",
                            data: {
                                function: "SYMBOL_SEARCH",
                                keywords: "{{query}}",
                                apikey: "PJ8DJSLQLT0VRBUV",
                                datatype: "json"
                            },
                            callback: {
                                done: function (data) {
                                    var tmpData = [];
                                    data.bestMatches.forEach(element => {
                                        tmpData.push(renameKeys({
                                            "1. symbol": "symbol",
                                            "2. name": "name",
                                            "3. type": "type",
                                            "4. region": "region",
                                            "5. marketOpen": "marketOpen",
                                            "6. marketClose": "marketClose",
                                            "7. timezone": "timezone",
                                            "8. currency": "currency",
                                            "9. matchScore": "matchScore"
                                        }, element));
                                    });
                                    data.bestMatches = tmpData;
                                    return data;
                                }
                            }
                        }
                    }

                }
            },
            callback: {
                onClick: function (node, a, item, event) {

                    // You can do a simple window.location of the item.href
                    alert(JSON.stringify(item));

                },
                onSendRequest: function (node, query) {
                    console.log('request is sent')
                },
                onReceiveRequest: function (node, query) {
                    console.log('request is received')
                }
            },
            debug: true
        });
    </script>
</body>

</html>
