;(function ($, window, document, undefined) {

    "use strict";

    let defaults = {
        data: {},
        placeholder: false,
        maxLevels: 10,
        loggingEnabled: false,
        selectedKey: false,
        defaultPath: false,
        sortByValue: false,
        onSelectedCallback: false,
        selectCssClass: 'form-select px-5'
    };

    function ChainedSelect(element, options) {
        this.element = $(element);
        this.options = $.extend({}, defaults, options);
        this.init();
    }

    $.extend(ChainedSelect.prototype, {
        init() {
            this.chain_id = this.generateSID();
            this.levels = {};
            this.levels[this.chain_id] = [];
            this.levels[this.chain_id][0] = this.element;
            
            this.element.data('chain-id', this.chain_id);
            this.element.data('level-id', 0);
            
            if (this.options.data) {
                this.fillLevelData(this.chain_id, 0, this.options.data);
            }
            
            this.element.on('change', () => {
                this.handleSelectChange(this.element);
            });
        },

        generateSID() {
            return Math.random().toString(36).substr(2, 9);
        },

        handleSelectChange(select) {
            const chainId = select.data('chain-id');
            const level = select.data('level-id');
            const selectedOption = select.find(':selected');
            const value = selectedOption.val();
            
            // Remove all subsequent levels
            this.removeSubsequentLevels(chainId, level);
            
            if (!value) return;
            
            const data = this.options.data;
            let currentData = data;
            
            // Navigate to the current level's data
            for (let i = 0; i <= level; i++) {
                const currentSelect = this.levels[chainId][i];
                const currentValue = currentSelect.val();
                if (currentData[currentValue]) {
                    currentData = currentData[currentValue];
                }
            }
            
            // If we have nested data, create a new select
            if (typeof currentData === 'object' && Object.keys(currentData).length > 0) {
                this.createNextLevel(chainId, level + 1, currentData);
            }
        },

        createNextLevel(chainId, level, data) {
            // Create a wrapper div for the select and icon
            const wrapper = $('<div>')
                .css({
                    'position': 'absolute',
                    'left': '0',
                    'right': '0',
                    'top': `${(level * 55)}px`,
                    'width': '100%'
                });

            // Create the icon
            const icon = $('<i>')
                .addClass(this.element.closest('#secondChain').length ? 'bi bi-geo-alt' : 'bi bi-search')
                .css({
                    'position': 'absolute',
                    'left': '15px',
                    'top': '50%',
                    'transform': 'translateY(-50%)',
                    'color': '#6c757d',
                    'z-index': '1'
                });

            const newSelect = $('<select>')
                .addClass(this.options.selectCssClass)
                .css({
                    'height': '45px',
                    'width': '100%'
                })
                .data('chain-id', chainId)
                .data('level-id', level);
            
            // Add options
            if (this.options.placeholder) {
                newSelect.append($('<option>').val('').text(this.options.placeholder));
            }
            
            Object.keys(data).forEach(key => {
                newSelect.append($('<option>').val(key).text(key));
            });
            
            // Add icon and select to wrapper
            wrapper.append(icon).append(newSelect);
            
            // Find the parent container and append wrapper
            const parentContainer = this.element.closest('#firstChain, #secondChain');
            parentContainer.append(wrapper);
            
            // Store in levels
            this.levels[chainId][level] = newSelect;
            
            // Add change handler
            newSelect.on('change', () => {
                this.handleSelectChange(newSelect);
            });
        },

        removeSubsequentLevels(chainId, level) {
            let currentLevel = level + 1;
            while (this.levels[chainId][currentLevel]) {
                // Remove the entire wrapper div
                this.levels[chainId][currentLevel].closest('div').remove();
                delete this.levels[chainId][currentLevel];
                currentLevel++;
            }
        },

        fillLevelData(chainId, level, data) {
            const select = this.levels[chainId][level];
            select.empty();
            
            if (this.options.placeholder) {
                select.append($('<option>').val('').text(this.options.placeholder));
            }
            
            Object.keys(data).forEach(key => {
                select.append($('<option>').val(key).text(key));
            });
        }
    });

    $.fn.chainedSelects = function(options) {
        return this.each(function() {
            if (!$.data(this, 'plugin_chainedSelects')) {
                $.data(this, 'plugin_chainedSelects', new ChainedSelect(this, options));
            }
        });
    };
})(jQuery, window, document);
