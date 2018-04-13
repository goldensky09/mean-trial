/*
Reference: http://jsfiddle.net/BB3JK/47/
*/

$('select').each(function(){
    var $this = $(this), numberOfOptions = $(this).children('option').length;
  
    $this.addClass('select-hidden'); 
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled"></div>');

    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());
  
    var $list = $('<ul />', {
        'class': 'select-options'
    }).insertAfter($styledSelect);
  
    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }
  
    var $listItems = $list.children('li');
  
    $styledSelect.click(function(e) {
        e.stopPropagation();
        $('div.select-styled.active').not(this).each(function(){
            $(this).removeClass('active').next('ul.select-options').hide();
        });
        $(this).toggleClass('active').next('ul.select-options').toggle();
    });
  
    $listItems.click(function(e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.hide();
        //console.log($this.val());
    });
  
    $(document).click(function() {
        $styledSelect.removeClass('active');
        $list.hide();
    });

});

<h1>Custom Select <span>Without Plugin</span></h1>
<!--
TO DO:
1. Add icons to List 
2. Toogle opened state
-->

<select id="mounth">
    <option value="hide">-- Month --</option>
    <option value="january" rel="icon-temperature">January</option>
    <option value="february">February</option>
    <option value="march">March</option>
    <option value="april">April</option>
    <option value="may">May</option>
    <option value="june">June</option>
    <option value="july">July</option>
    <option value="august">August</option>
    <option value="september">September</option>
    <option value="october">October</option>
    <option value="november">November</option>
    <option value="december">December</option>
</select> 

<select id="year">
    <option value="hide">-- Year --</option>
    <option value="2010">2010</option>
    <option value="2011">2011</option>
    <option value="2012">2012</option>
    <option value="2013">2013</option>
    <option value="2014">2014</option>
    <option value="2015">2015</option>
</select>

@import "compass/css3";

@import "compass";
@import url("https://fonts.googleapis.com/css?family=Lato");

$background: #e74c3c;
$select-color: #fff;
$select-background: #c0392b;
$select-width: 220px;
$select-height: 40px;

body {
  font-family: Lato, Arial;
  color: $select-color;
  padding: 20px;
  background-color: $background;
}
h1 {
  font-weight: normal;
  font-size: 40px;
  font-weight: normal;
  text-transform: uppercase;
  span {
    font-size: 13px;
    display: block;
    padding-left: 4px;
  }
}
p {
  margin-top: 200px;
  a {
    text-transform: uppercase;
    text-decoration: none;
    display: inline-block;
    color: #fff;
    padding: 5px 10px;
    margin: 0 5px;
    background-color: darken($select-background, 2);
    @include transition(all 0.2s ease-in);
    &:hover {
      background-color: darken($select-background, 5);
    }
  }
}
.select-hidden {
  display: none;
  visibility: hidden;
  padding-right: 10px;
}
.select {
  cursor: pointer;
  display: inline-block;
  position: relative;
  font-size: 16px;
  color: $select-color;
  width: $select-width;
  height: $select-height;
}
.select-styled {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: $select-background;
  padding: 8px 15px;
  @include transition(all 0.2s ease-in);
  &:after {
    content: "";
    width: 0;
    height: 0;
    border: 7px solid transparent;
    border-color: $select-color transparent transparent transparent;
    position: absolute;
    top: 16px;
    right: 10px;
  }
  &:hover {
    background-color: darken($select-background, 2);
  }
  &:active,
  &.active {
    background-color: darken($select-background, 5);
    &:after {
      top: 9px;
      border-color: transparent transparent $select-color transparent;
    }
  }
}

.select-options {
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  left: 0;
  z-index: 999;
  margin: 0;
  padding: 0;
  list-style: none;
  background-color: darken($select-background, 5);
  li {
    margin: 0;
    padding: 12px 0;
    text-indent: 15px;
    border-top: 1px solid darken($select-background, 10);
    @include transition(all 0.15s ease-in);
    &:hover {
      color: $select-background;
      background: $select-color;
    }
    &[rel="hide"] {
      display: none;
    }
  }
}
