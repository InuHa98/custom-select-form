# custom-select-form

Replace default select to select with more eye-catching css.
## Required
- Jquery
- FontAwesome

## Example

![alt](https://raw.githubusercontent.com/InuHa98/custom-select-form/main/demo/1.png)

Select multiple items:

![alt](https://raw.githubusercontent.com/InuHa98/custom-select-form/main/demo/4.png)

## Installation

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demo Custom Select</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
    <link rel="stylesheet" type="text/css" href="src/custom-select-form.css">
</head>
<body>

    <div class="container">
        <label>Select item:</label>

        <select class="js-custom-select">
            <option value="0">Item 0</option>
            <option value="1">Item 1</option>
            <option value="2">Item 2</option>
            <option value="3">Item 3</option>
        </select>

    </div>
    
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="src/custom-select-form.js"></script>
</body>
```
Add class="**js-custom-select**" to the select tag to use.

## Options

### `data-placeholder`
text displayed when no drug item is selected.

![alt](https://raw.githubusercontent.com/InuHa98/custom-select-form/main/demo/3.png)

```html
<select class="js-custom-select" data-placeholder="-- Please select item --">
    ...
</select>
```

### `data-min-width`
Minimum select width limit.
```html
<select class="js-custom-select" data-min-width="200px">
    ...
</select>
```

### `data-max-width`
Maximum select width limit.
```html
<select class="js-custom-select" data-max-width="500px">
    ...
</select>
```
### `data-min-height`
Minimum select height limit.
```html
<select class="js-custom-select" data-min-width="50px">
    ...
</select>
```
### `data-max-height`
Maximum select height limit.
```html
<select class="js-custom-select" data-max-width="100px">
    ...
</select>
```

## `enable-search`
Show search bar.

![alt](https://raw.githubusercontent.com/InuHa98/custom-select-form/main/demo/2.png)

```html
<select class="js-custom-select" enable-search="true">
    ...
</select>
```

##`data-html`
show html in **option* tag.

![alt](https://raw.githubusercontent.com/InuHa98/custom-select-form/main/demo/5.png)

```html
<select class="js-custom-select" data-placeholder="-- Please select item --" multiple>
    <option value="0">Item 0</option>
    <option value="1">Item 1</option>
    <option value="2">Item 2</option>
    <option value="3" data-html="<span class='flex'><img src='avatar.png' /> <b>InuHa98</b></span>"></option>
</select>
```

