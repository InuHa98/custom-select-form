/*!
 * custom-select-form.js v1.0.0
 * https://github.com/InuHa98/custom-select-form
 *
 * @author InuHa
 */

;(function (factory) {
    "use strict";

    try {
        if (typeof define === 'function' && define.amd) {
            define(['jquery'], factory);
        }
        else if (typeof exports == "object" && typeof module == "object") {
            module.exports = factory(require('jquery'));
        }
        else {
            factory(jQuery);
        }
    } catch (error) {
        factory();
    }

})(function($) {
    "use strict";

    let CUSTOM_SELECT = {
        _class: {
            selection: 'js-custom-select',
            selection_show: 'show',
            placeholder: 'show-placeholder',
            hidden_default_select: 'js-custom-select--hidden',
            select_container: 'js-custom-select__container',
            select_title: 'js-custom-select__container-title',
            select_arrow: 'js-custom-select__container-arrow',
            option_container: 'js-custom-option__container',
            option_ul: 'js-custom-option__ul',
            option_li: 'js-custom-option__li',
            option_placeholder: 'js-custom-option__placeholder',
            select_title_multiple: 'js-custom-select__container-title--multiple',
            select_title_multiple_ul: 'js-custom-select-multiple__ul',
            select_title_multiple_li: 'js-custom-select-multiple__li',
            empty_option: 'js-custom-option__container--empty',
            search: 'js-custom-search',
            remove_selected: 'remove-selected'
        },

        _data: {
            id_selection: 'data-custom-select-id',
            id_option: 'data-custom-option-id',
            placeholder: 'data-placeholder',
            option_id: 'data-option-id',
            min_width: 'data-min-width',
            max_width: 'data-max-width',
            min_height: 'data-min-height',
            max_height: 'data-max-height',
            enable_search: 'enable-search',
            data_html: 'data-html'
        },

        _icon: {
            search: '<i class="fas fa-search"></i>',
            show: '<i class="fas fa-chevron-up"></i>',
            hidden: '<i class="fas fa-chevron-down"></i>',
            remove: '<i class="fas fa-times"></i>',
            empty: '<svg width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 1)" fill="none" fill-rule="evenodd"><ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse><g fill-rule="nonzero" stroke="#d9d9d9"><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa"></path></g></g></svg>'
        },

        _role: {
            input_search: 'input-search',
            select_title: 'select-title',
            select_arrow: 'select-arrow',
            option_list: 'option-list',
            remove_selected: 'remove-selected'
        },

        _text: {
            empty_selected: 'Please select an item',
            empty_option: 'No data',
            search: 'Search'
        },

        id_selection: 0,
        id_option: 0,

        init: function() {
            let list_selects = $('select.' + this._class.selection);

            if(list_selects.length < 1) {
                return;
            }

            this.render_selects(list_selects);
            this.build_events();
        },

        set_role: function(role) {
            return 'role="' + this._role[role] + '"';
        },

        get_role: function(role) {
            return '[role="' + this._role[role] + '"]';
        },

        render_selects: function(list_selects) {
            if(list_selects.length < 1) {
                return;
            }

            list_selects.each((index, select) => {
                let default_select = $(select);
                if(default_select.prop('tagName') != 'SELECT') {
                    return;
                }

                if(default_select.attr(this._data.id_selection)) {
                    return;
                }

                this.build_html_select(default_select);

            });
        },
        
        add_id_options: function(default_select) {
            let options = default_select.find('option');
            if(options.length > 0) {
                options.each((index, option) => {
                    if(!$(option).attr(this._data.id_option)) {
                        $(option).attr(this._data.id_option, this.id_option++);
                    }
                });
            }
        },

        build_title: function(select_container, default_select, title) {
            if(select_container.length < 1) {
                return;
            }

            let id_selection = select_container.attr(this._data.id_selection);

            if(default_select.length < 1) {
                default_select = $('.' + this._class.selection + '[' + this._data.id_selection+ '="' + id_selection + '"]');
            }

            if(!title) {
                title = select_container.find(this.get_role('select_title'));
            }

            let placeholder = default_select.attr(this._data.placeholder) || null;
            let isMultiple = default_select.prop('multiple');

            if(!default_select.find('option:selected').length && !default_select.find('option[selected]').length) {
                return title.html(placeholder || this._text.empty_selected).addClass(this._class.placeholder);
            }

            title.removeClass(this._class.placeholder);

            if(isMultiple) {
                if(!default_select.find('option[selected]').length) {
                    return title.html(placeholder || this._text.empty_selected).addClass(this._class.placeholder);
                }
                let ul = $('<ul class="' + this._class.select_title_multiple_ul + '"></ul>');
                title.html(ul).addClass(this._class.select_title_multiple);
                default_select.find('option[selected]').each((index, option) => {
                    let html_option = option.getAttribute(this._data.data_html);
                    ul.append('<li class="' + this._class.select_title_multiple_li + '"><span class="' + this._class.remove_selected + '" ' + this.set_role('remove_selected') + this._data.id_option + '="' + option.getAttribute(this._data.id_option) + '">' + this._icon.remove + '</span><span>' + (html_option || option.innerText || option.value) + '</span></li>');
                });

            } else {
                let html_option = default_select.find('option:selected').attr(this._data.data_html);
                let value = default_select.find('option:selected').text() || default_select.val();
                title.html(html_option || value || '<span class="' + this._class.option_placeholder + '">' + placeholder + '</span>');
            }

        },

        build_html_select: function(default_select) {

            
            this.add_id_options(default_select);
            
            let id_selection = this.id_selection++;

            let select_container = $('\
            <span>\
                <span ' + this.set_role('select_title') + '></span>\
                <span ' + this.set_role('select_arrow') + '>' + this._icon.hidden + '</span>\
            </span>');
            
            let title = select_container.find(this.get_role('select_title')),
                arrow = select_container.find(this.get_role('select_arrow')),
                data = {
                    min_width: default_select.attr(this._data.min_width) || null,
                    max_width: default_select.attr(this._data.max_width) || null,
                    min_height: default_select.attr(this._data.min_height) || null,
                    max_height: default_select.attr(this._data.max_height) || null
                },
                styles = {};

            if(data.min_width) {
                styles['min-width'] = data.min_width;
            }

            if(data.max_width) {
                styles['max-width'] = data.max_width;
            }

            if(data.min_height) {
                styles['min-height'] = data.min_height;
            }

            if(data.max_height) {
                styles['max-width'] = data.max_height;
            }

            title.addClass(this._class.select_title);
            arrow.addClass(this._class.select_arrow);

            this.build_title(select_container, default_select, title);


            select_container.css(styles).addClass(this._class.select_container).attr(this._data.id_selection, id_selection);
            default_select.addClass(this._class.hidden_default_select).attr(this._data.id_selection, id_selection);
            default_select.after(select_container);



            (() => {

                const observer = new MutationObserver((mutationsList, observer) => {
                    this.add_id_options(default_select);
                    this.build_title(select_container, default_select);
                });

                observer.observe(default_select[0], {
                    childList: true,
                    subtree: false,
                    attributes: false,
                    characterData: false
                });
            })();
        },

        build_html_option: function(select_container) {
            let id_selection = select_container.attr(this._data.id_selection),
                default_select = $('.' + this._class.selection + '[' + this._data.id_selection+ '="' + id_selection + '"]'),
                option_container = $('<div class="' + this._class.option_container + '"></div>');

            let html = '';
            if(default_select.find('option').length > 0) {

                html = '<ul class="' + this._class.option_ul + '">';
                default_select.find('option').each((index, option) => {
                    let id_option = option.getAttribute(this._data.id_option); // option_selected.attr(this._data.id_option) == id_option
                    let value = option.innerText || option.value;

                    let html_option = option.getAttribute(this._data.data_html);
                    if(value.trim() == '') {
                        html += '<li class="' + this._class.option_placeholder +'">' + default_select.attr(this._data.placeholder) + '</li>';
                    } else {
                        html += '<li class="' + this._class.option_li + ($(option).is(':selected') ? ' selected' : '') + '" ' + this._data.id_option + '="' + id_option + '">' + (html_option || value) + '</li>';
                    }
                });
                html += '</ul>';
            } else {
                html = '<div class="' + this._class.empty_option + '">' + this._icon.empty + '<div>' + this._text.empty_option + '</div></div>';
            }
            
            option_container.attr(this._data.id_selection, id_selection).html(html);

            const enable_search = default_select.attr(this._data.enable_search);
            if(enable_search) {
                option_container.prepend('\
                <div class="' + this._class.search + '">\
                    <span class="icon">' + this._icon.search +'</span>\
                    <input ' + this.set_role('input_search') +' type="text" placeholder="' + this._text.search + '">\
                </div>');

                let empty_result = option_container.find('.' + this._class.empty_option);
                if(!empty_result.length) {
                    empty_result = $('<div class="' + this._class.empty_option + '">' + this._icon.empty + '<div>' + this._text.empty_option + '</div></div>');
                    empty_result.hide();
                    option_container.append(empty_result);
                }

                option_container.find(this.get_role('input_search')).off('keyup.search').on('keyup.search', (e) => {
                    const target = e.currentTarget;
                    const list_item = option_container.find('ul.' + this._class.option_ul);

                    if(!list_item.length) {
                        return;
                    }

                    let isFound = false;
                    list_item.find('li.' + this._class.option_li).each((index, item) => {
                        if(item.innerText.toLowerCase().indexOf(target.value.toLowerCase()) !== -1) {
                            item.style.display = 'block';
                            isFound = true;
                        } else {
                            item.style.display = 'none';
                        }
                    });

                    if(isFound) {
                        empty_result.hide();
                    } else {
                        empty_result.show();
                    }
                });
            }
            $('body').append(option_container);

            let offset_select = select_container.offset();

            let top = offset_select.top + select_container.outerHeight() + 5,
                left = offset_select.left;
            option_container.css({
                top: top + 'px',
                left: left + 'px',
                visibility: 'visible',
                // '-webkit-transform': 'scale(1)',
                // transform: 'scale(1)',
                'min-width': select_container.outerWidth(),
                'max-width': $(window).width() - left - 20
            });

        },

        build_events: function() {
            //event show option
            $(document).off('click.show_option').on('click.show_option', '.' + this._class.select_container, (e) => {
                e.stopPropagation();
                let select_container = $(e.currentTarget),
                    option_container = $('.' + this._class.option_container),
                    select_arrow = select_container.find(this.get_role('select_arrow'));
                
                if(select_container.length < 1) {
                    return;
                }

                select_container.toggleClass(this._class.selection_show);

                $('.' + this._class.select_container + '.' + this._class.selection_show).each((index, select) => {
                    if(select != select_container[0]) {
                        $(select).removeClass(this._class.selection_show);
                        let arrow = $(select).find(this.get_role('select_arrow'));
                        arrow.html(this._icon.hidden);                        
                    }
                });

                if(option_container.length > 0) {
                    option_container.remove();
                }

                if(select_container.hasClass(this._class.selection_show)) {
                    select_arrow.html(this._icon.show);
                    this.build_html_option(select_container);
                } else {
                    select_arrow.html(this._icon.hidden);
                }
            });

            //event click background
            $(document).off('click.hide_option').on('click.hide_option', (e) => {

                let option_container = $('.' + this._class.option_container);
                
                if(option_container.length < 1) {
                    return;
                }

                let target = $(e.target);

                if(target.closest('.' + this._class.option_container).length) {
                    return;
                }

                this.close(option_container);
            });

            //event option click
            $(document).off('click.option_click').on('click.option_click', '.' + this._class.option_li, e => {
                e.stopPropagation();

                let option = $(e.currentTarget),
                    option_container = option.parents('.' + this._class.option_container);
                
                if(option_container.length < 1) {
                    return;
                }

                let id_selection = option_container.attr(this._data.id_selection),
                    id_option = option.attr(this._data.id_option),
                    default_select = $('.' + this._class.selection + '[' + this._data.id_selection + '="' + id_selection + '"]');

                if(default_select.length < 1) {
                    return;
                }
                let current_selected = default_select.find('option:selected') || default_select.find('option[selected]');
                let current_value =  current_selected.val() || current_selected.text();

                let selected_option = default_select.find('option[' + this._data.id_option + '="' + id_option + '"]');
                let value = selected_option.val() || selected_option.text();

                if(selected_option.length < 1) {
                    return;
                }

                let select_container = $('.' + this._class.select_container + '[' + this._data.id_selection + '="' + id_selection + '"]');
                let isMultiple = default_select.prop('multiple');
                if(!isMultiple) {
                    default_select.find('option').removeAttr('selected');
                    default_select.find('option').prop('selected', false);
                    selected_option.attr('selected', true);
                    selected_option.prop('selected', true);
                } else {
                    if(selected_option.attr('selected') || selected_option.is(':selected')) {
                        selected_option.removeAttr('selected');
                        selected_option.prop('selected', false);
                    } else {
                        selected_option.attr('selected', true);
                        selected_option.prop('selected', true);
                    }
                }
                select_container.click();

                (current_value != value) && default_select.change();
                //this.build_title(select_container, default_select);
            });


            //event change title
            $(document).off('change.update_title').on('change.update_title', '.' + this._class.selection, e => {
                e.stopPropagation();

                let target = $(e.currentTarget),
                    select_container = target.parent().find('.' + this._class.select_container);
                
                if(select_container.length < 1) {
                    return;
                }

                this.build_title(select_container, target);
            });


            //event remove click
            $(document).off('click.remove_selected').on('click.remove_selected', this.get_role('remove_selected'), e => {
                e.stopPropagation();
                let target = $(e.currentTarget),
                    id_option = target.attr(this._data.id_option),
                    select_container = target.parents('.' + this._class.select_container);
                
                if(select_container.length < 1 || !id_option) {
                    return;
                }

                let id_selection = select_container.attr(this._data.id_selection),
                    default_select = $('.' + this._class.selection + '[' + this._data.id_selection + '="' + id_selection + '"]');

                if(default_select.length < 1) {
                    return;
                }

                if(!default_select.prop('multiple')) {
                    return;
                }

                let selected_option = default_select.find('option[' + this._data.id_option + '="' + id_option + '"]');

                if(selected_option.length < 1) {
                    return;
                }

                selected_option.removeAttr('selected');
                this.build_title(select_container, default_select);
            });

            $(window).off('resize.custom_select').on('resize.custom_select', (e) => {
                let option_container = $('.' + this._class.option_container);
                if(option_container.length < 1) {
                    return;
                }
                this.close(option_container);
            });
        },

        close: function(option_container) {

            $('.' + this._class.select_container + '.' + this._class.selection_show).each((index, select) => {
                $(select).removeClass(this._class.selection_show);
                let arrow = $(select).find(this.get_role('select_arrow'));
                arrow.html(this._icon.hidden);
            });

            if(option_container.length < 1) {
                option_container = $('.' + this._class.option_container);
            }
            option_container.remove();
        }
    };

    window.addEventListener('DOMContentLoaded', function() {
        CUSTOM_SELECT.init();
    });

    window.JSCustomSelect = function() {
        CUSTOM_SELECT.init();
    };
});