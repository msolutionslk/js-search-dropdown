function Jsd(config) {
  /**
   * configuration variables
   */
  const identifier = config.identifier;
  const fetch_url = config.fetch;
  const param = config.param ?? "q";
  const identifierName = $("#" + identifier).attr("name");
  /**
   * library configuration (DO NOT RENAME)
   */
  let currentlySelected = -1;
  let totalEntries = 0;
  let oldSelected = -1;
  /**
   * unset the name value from the text field
   */
  $("#" + identifier).removeAttr("name");
  /**
   * appending search area
   */
  const idSelectElement =
    '<input type="hidden" id="' + identifier + '-hidden" />';
  $(
    idSelectElement +
      '<div class="jsd-search-container" id="' +
      identifier +
      '-search"></div>'
  ).insertAfter("#" + identifier);
  const identify = $("#" + identifier);
  const getInputWidth = $("#" + identifier).css("width");
  const ul = document.createElement("ul");
  $("#" + identifier + "-search").css("width", getInputWidth);
  $("#" + identifier + "-search").append(ul);
  $(ul).append('<li class="loader"></li>');
  /**
   *
   * @param {pass here the fetch url} url
   */

  const getData = async function (url) {
    const get = await fetch(url).then((res) => {
      return res.json();
    });
    return get;
  };
  /**
   * this function is to identify the changes in text field and fetch data
   */
  let startExecute = null;
  identify
    .keyup(function (event) {
      event.preventDefault();
      const code = event.keyCode;
      if (code === 38 || code === 40 || code === 13) {
        switch (code) {
          case 38:
            //up button
            if (currentlySelected > 0) {
              hoverListedItem(--currentlySelected);
            }
            return;
          case 40:
            //down button
            if (currentlySelected < totalEntries) {
              hoverListedItem(++currentlySelected);
            }
            return;
          case 13:
            selectSelected(currentlySelected);
            return;
          default:
            return false;
        }
        return;
      }
      clearTimeout(startExecute);
      $("#" + identifier + "-search").show();
      $(ul).html('<li class="loader"></li>');
      const runFetch = function () {
        const val = event.target.value;
        getData(fetch_url + "?" + param + "=" + val).then((response) => {
          $(ul).html("");
          clearLibraryValues();
          response.map((item) => {
            let liElement = document.createElement("li");
            let attr = document.createAttribute("data-id");
            attr.value = item.value;
            liElement.textContent = item.title;
            liElement.setAttributeNode(attr);
            $(ul).append(liElement);
            $(liElement)
              .mouseover(function () {
                $(this).addClass("active");
              })
              .mouseout(function () {
                $(this).removeClass("active");
              });
            $(liElement).click(function () {
              const id = $(this).attr("data-id");

              $("#" + identifier + "-hidden")
                .prop("name", identifierName)
                .val(id);
              $("#" + identifier + "-search").hide();
            });
          });
          totalEntries = ul.childNodes.length - 1;
        });
      };
      startExecute = setTimeout(runFetch, 1000);
    })
    .blur(function () {
      $("#" + identifier + "-search").hide();
    });

  /**
   *
   * @param {parse the index of LI} index
   */
  function hoverListedItem(index) {
    if (totalEntries < index) {
      return false;
    }
    const selectUL = ul.childNodes;
    for (inx in selectUL) {
      if (inx == index) {
        $(selectUL[inx]).addClass("active");
        if (oldSelected > -1) {
          $(selectUL[oldSelected]).removeClass("active");
        }
        oldSelected = inx;
      }
    }
  }

  /**
   *
   * @param {pass the selected index to select the value} index
   */
  function selectSelected(index) {
    if (totalEntries < index) {
      return false;
    }
    const selectUL = ul.childNodes;
    for (inx in selectUL) {
      if (inx == index) {
        const html = selectUL[inx].innerHTML;
        const value = $(selectUL[inx]).attr("data-id");
        identify.val(html);
        $("#" + identifier + "-hidden").val(value);
        $("#" + identifier + "-search").hide();
      }
    }
  }

  /**
   * set default value on search
   */
  function clearLibraryValues() {
    currentlySelected = -1;
    oldSelected = -1;
  }
}
